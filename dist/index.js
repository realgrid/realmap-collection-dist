const MapNamesEnum = {
    chinaAdm1High: 'chinaAdm1High',
    chinaAdm1Low: 'chinaAdm1Low',
    chinaAdm1Mid: 'chinaAdm1Mid',
    continentHigh: 'continentHigh',
    continentLow: 'continentLow',
    continentMid: 'continentMid',
    japanAdm1High: 'japanAdm1High',
    japanAdm1Low: 'japanAdm1Low',
    japanAdm1Mid: 'japanAdm1Mid',
    koreaHigh: 'koreaHigh',
    koreaLow: 'koreaLow',
    koreaMid: 'koreaMid',
    krDongHigh: 'krDongHigh',
    krDongLow: 'krDongLow',
    krDongMid: 'krDongMid',
    krSidoHigh: 'krSidoHigh',
    krSidoLow: 'krSidoLow',
    krSidoMid: 'krSidoMid',
    krSigunHigh: 'krSigunHigh',
    krSigunLow: 'krSigunLow',
    krSigunMid: 'krSigunMid',
    worldHigh: 'worldHigh',
    worldLow: 'worldLow',
    worldMid: 'worldMid',
    russiaAdm1High: 'russiaAdm1High',
    russiaAdm1Low: 'russiaAdm1Low',
    russiaAdm1Mid: 'russiaAdm1Mid',
    ukraineAdm1High: 'ukraineAdm1High',
    ukraineAdm1Low: 'ukraineAdm1Low',
    ukraineAdm1Mid: 'ukraineAdm1Mid',
    usaStateHigh: 'usaStateHigh',
    usaStateLow: 'usaStateLow',
    usaStateMid: 'usaStateMid',
    '2026-07/kr-sido-high': '2026-07/kr-sido-high',
    '2026-07/kr-sido-low': '2026-07/kr-sido-low',
    '2026-07/kr-sido-mid': '2026-07/kr-sido-mid',
    '2026-07/kr-sigun-high': '2026-07/kr-sigun-high',
    '2026-07/kr-sigun-low': '2026-07/kr-sigun-low',
    '2026-07/kr-sigun-mid': '2026-07/kr-sigun-mid',
};

function listMaps() {
    return Object.values(MapNamesEnum);
}

function createSubMap(options) {
    const { map, targets, mode, meta } = options;
    const targetSet = new Set(targets.map((target) => String(target)));
    const matchedTargets = new Set();
    const isTarget = (feature) => {
        const id = feature.properties?.['rm-id'];
        const name = feature.properties?.['name'];
        if (id != null && targetSet.has(String(id))) {
            matchedTargets.add(String(id));
            return true;
        }
        if (name != null && targetSet.has(String(name))) {
            matchedTargets.add(String(name));
            return true;
        }
        return false;
    };
    const features = map.features.filter((feature) => {
        const matched = isTarget(feature);
        return mode === 'include' ? matched : !matched;
    });
    const unmatched = targets.filter((target) => !matchedTargets.has(String(target)));
    if (unmatched.length > 0) {
        console.warn(`createSubMap: 매칭되지 않은 target이 있습니다 -> ${unmatched.join(', ')}`);
    }
    return {
        type: 'FeatureCollection',
        name: meta?.name ?? map.name,
        meta,
        features,
    };
}

const MAX_AREAS = 4000;
function idValue(v) {
    if (typeof v !== 'string' && typeof v !== 'number')
        return null;
    const s = String(v).trim();
    return s ? s : null;
}
function num(v, dflt) {
    return typeof v === 'number' ? v : dflt;
}
async function loadFeatures(map) {
    let fc = map;
    if (typeof map === 'string') {
        const res = await fetch(map);
        if (!res.ok)
            throw new Error(`지도 파일을 불러오지 못했습니다(HTTP ${res.status}): ${map}`);
        fc = await res.json();
    }
    if (fc && Array.isArray(fc.features))
        return fc.features;
    throw new Error('map은 지도 URL 또는 GeoJSON FeatureCollection 객체여야 합니다.');
}
function toAreas(features) {
    const hasRmId = features.some((f) => idValue(f?.properties?.['rm-id']) != null);
    const seen = new Set();
    const areas = [];
    for (const f of features) {
        const p = f?.properties ?? {};
        const id = idValue(hasRmId ? p['rm-id'] : f?.id);
        if (id == null || id === 'NA' || seen.has(id))
            continue;
        seen.add(id);
        const lon = p['ctr-lon'];
        const lat = p['ctr-lat'];
        const coord = typeof lon === 'number' && typeof lat === 'number' ? [lon, lat] : null;
        areas.push({ id, name: idValue(p.name), coord });
    }
    if (areas.length === 0)
        throw new Error('지도에서 area 식별자를 찾지 못했습니다.');
    return areas;
}
function selectAreas(areas, count, rng) {
    const capped = areas.length > MAX_AREAS ? areas.slice(0, MAX_AREAS) : areas;
    return pickSubset(capped, count, rng);
}
function pickSubset(areas, count, rng) {
    if (typeof count !== 'number' || count <= 0 || count >= areas.length)
        return areas;
    const pool = areas.slice();
    for (let i = 0; i < count; i++) {
        const j = i + Math.floor(rng() * (pool.length - i));
        [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, count);
}
function resolveArea(areas, ref) {
    const s = idValue(ref);
    if (s == null)
        throw new Error('지역 참조가 비어 있습니다.');
    const byId = areas.find((a) => a.id === s);
    if (byId)
        return requireCoord(byId, s);
    const byName = areas.find((a) => a.name === s);
    if (byName)
        return requireCoord(byName, s);
    const contains = areas.filter((a) => a.name && a.name.indexOf(s) >= 0);
    if (contains.length === 1)
        return requireCoord(contains[0], s);
    if (contains.length > 1) {
        throw new Error(`"${s}"가 여러 지역과 일치합니다: ${contains.map((a) => a.name).join(', ')}. rm-id로 지정하세요.`);
    }
    throw new Error(`"${s}"에 해당하는 지역을 지도에서 찾지 못했습니다.`);
}
function requireCoord(area, ref) {
    if (!area.coord)
        throw new Error(`"${ref}" 지역에 중앙좌표(ctr-lon/ctr-lat)가 없어 좌표를 만들 수 없습니다.`);
    return area;
}

function mulberry32(seed) {
    let a = seed >>> 0;
    return function () {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}
function randValue(rng, min, max, integer) {
    const raw = min + rng() * (max - min);
    return integer ? Math.round(raw) : Math.round(raw * 100) / 100;
}

function buildAreaValues(areas, options, rng) {
    const min = num(options.min, 0);
    const max = num(options.max, 100);
    const integer = options.integer !== false;
    if (min > max)
        throw new Error('min이 max보다 큽니다.');
    return selectAreas(areas, options.count, rng).map((a) => ({
        id: a.id,
        value: randValue(rng, min, max, integer),
    }));
}
function buildPie(areas, options, rng) {
    const cats = Array.isArray(options.categories)
        ? options.categories.filter((c) => typeof c === 'string' && c)
        : [];
    if (cats.length === 0)
        throw new Error("pie는 categories:['항목1','항목2',...]가 필요합니다.");
    const min = num(options.min, 1);
    const max = num(options.max, 100);
    const integer = options.integer !== false;
    if (min > max)
        throw new Error('min이 max보다 큽니다.');
    return selectAreas(areas, options.count, rng).map((a) => ({
        id: a.id,
        value: cats.map(() => randValue(rng, min, max, integer)),
    }));
}
function buildRoutes(areas, options) {
    const pairs = normalizeRoutePairs(options);
    if (pairs.length === 0) {
        throw new Error('route는 routes:[[출발,도착],...] 또는 {from, to:[...]}로 끝점을 지정해야 합니다.');
    }
    return pairs.map((pair) => {
        const a = resolveArea(areas, pair[0]);
        const b = resolveArea(areas, pair[1]);
        return {
            coords: [a.coord.slice(), b.coord.slice()],
        };
    });
}
function normalizeRoutePairs(options) {
    if (Array.isArray(options.routes)) {
        return options.routes.filter((p) => Array.isArray(p) && p.length >= 2);
    }
    if (options.from != null && options.to != null) {
        const tos = Array.isArray(options.to) ? options.to : [options.to];
        return tos.map((t) => [options.from, t]);
    }
    return [];
}

const DUMMY_SERIES = ['map', 'bar', 'line', 'bubble', 'pie', 'route'];

async function generateDummyData(options) {
    const series = options.series ?? 'map';
    if (!DUMMY_SERIES.includes(series)) {
        throw new Error(`지원하지 않는 series입니다: '${series}'. ${DUMMY_SERIES.join('·')} 중 하나.`);
    }
    if (options.map == null)
        throw new Error('map(지도 URL 또는 GeoJSON 객체)이 필요합니다.');
    const areas = toAreas(await loadFeatures(options.map));
    if (series === 'route')
        return buildRoutes(areas, options);
    const rng = mulberry32(num(options.seed, 42));
    if (series === 'pie')
        return buildPie(areas, options, rng);
    return buildAreaValues(areas, options, rng);
}

export { MapNamesEnum, createSubMap, generateDummyData, listMaps };
