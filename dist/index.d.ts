declare const MapNamesEnum: {
    readonly chinaAdm1High: "chinaAdm1High";
    readonly chinaAdm1Low: "chinaAdm1Low";
    readonly chinaAdm1Mid: "chinaAdm1Mid";
    readonly continentHigh: "continentHigh";
    readonly continentLow: "continentLow";
    readonly continentMid: "continentMid";
    readonly japanAdm1High: "japanAdm1High";
    readonly japanAdm1Low: "japanAdm1Low";
    readonly japanAdm1Mid: "japanAdm1Mid";
    readonly koreaHigh: "koreaHigh";
    readonly koreaLow: "koreaLow";
    readonly koreaMid: "koreaMid";
    readonly krDongHigh: "krDongHigh";
    readonly krDongLow: "krDongLow";
    readonly krDongMid: "krDongMid";
    readonly krSidoHigh: "krSidoHigh";
    readonly krSidoLow: "krSidoLow";
    readonly krSidoMid: "krSidoMid";
    readonly krSigunHigh: "krSigunHigh";
    readonly krSigunLow: "krSigunLow";
    readonly krSigunMid: "krSigunMid";
    readonly worldHigh: "worldHigh";
    readonly worldLow: "worldLow";
    readonly worldMid: "worldMid";
    readonly russiaAdm1High: "russiaAdm1High";
    readonly russiaAdm1Low: "russiaAdm1Low";
    readonly russiaAdm1Mid: "russiaAdm1Mid";
    readonly ukraineAdm1High: "ukraineAdm1High";
    readonly ukraineAdm1Low: "ukraineAdm1Low";
    readonly ukraineAdm1Mid: "ukraineAdm1Mid";
    readonly usaStateHigh: "usaStateHigh";
    readonly usaStateLow: "usaStateLow";
    readonly usaStateMid: "usaStateMid";
    readonly '2026-07/kr-sido-high': "2026-07/kr-sido-high";
    readonly '2026-07/kr-sido-low': "2026-07/kr-sido-low";
    readonly '2026-07/kr-sido-mid': "2026-07/kr-sido-mid";
    readonly '2026-07/kr-sigun-high': "2026-07/kr-sigun-high";
    readonly '2026-07/kr-sigun-low': "2026-07/kr-sigun-low";
    readonly '2026-07/kr-sigun-mid': "2026-07/kr-sigun-mid";
};
type MapNames = keyof typeof MapNamesEnum;

/**
 * 사용 가능한 모든 지도 이름을 반환한다.
 *
 * 추가 API를 이런 식으로 별도 TS 파일에 작성하면,
 * 빌드 시 rollup 이 생성물(MapNamesEnum)과 합쳐 단일 index 로 번들한다.
 *
 * @returns 지도 이름 배열
 */
declare function listMaps(): MapNames[];

interface RealMapFeatureCollection extends GeoJSON.FeatureCollection {
    name?: string;
    meta?: any;
}
/**
 * createSubMap 옵션
 */
interface CreateSubMapOptions {
    map: RealMapFeatureCollection;
    targets: string[];
    mode: 'include' | 'exclude';
    meta?: any;
}
/**
 * 원본 GeoJson에서 targets에 해당하는 피처만 골라 부분 지도(SubMap)를 만든다.
 *
 * import 한 지도에서 일부 지역만 뽑아 areas 용 지도를 만들 때 사용한다.
 * 예) kr-sigun 지도에서 강릉시, 목포시만 include 하여 SubMap 을 생성.
 *
 * 매칭은 피처의 rm-id 또는 name이 targets 중 하나와 일치하는지로 판단한다.
 * (rm-id가 number인 지도가 있으므로 문자열로 정규화해서 비교한다.)
 *
 * 반환되는 GeoJson의 features는 원본 피처를 그대로 참조한다(얕은 복사).
 * 이후 피처를 직접 변형할 계획이면 호출측에서 복제해서 사용해야 원본 훼손을 피할 수 있다.
 *
 * @param options map / targets / mode / meta
 * @returns targets 기준으로 필터링된 새 GeoJson
 */
declare function createSubMap(options: CreateSubMapOptions): RealMapFeatureCollection;

/** 더미 데이터를 만들 시리즈 유형. 반환 데이터의 모양을 결정한다. */
type DummySeries = 'map' | 'bar' | 'line' | 'bubble' | 'pie' | 'route';
/** 지역-값 시리즈(map/bar/line/bubble) 데이터포인트. */
interface AreaValuePoint {
    id: string;
    value: number;
}
/** pie 시리즈 데이터포인트. value는 categories 개수만큼의 값 배열. */
interface PieValuePoint {
    id: string;
    value: number[];
}
/** route 시리즈 데이터포인트. 출발·도착 두 좌표. */
interface RoutePoint {
    coords: [[number, number], [number, number]];
}
type DummyDataPoint = AreaValuePoint | PieValuePoint | RoutePoint;
interface GenerateDummyDataOptions {
    /** 지도 데이터. GeoJSON FeatureCollection 객체이거나, geojson 파일 URL(fetch). */
    map: string | GeoJSON.FeatureCollection;
    /** 데이터 모양. 기본 'map'. */
    series?: DummySeries;
    /** 수치 최솟값(기본 map계열 0, pie 1). categories/route에는 무관. */
    min?: number;
    /** 수치 최댓값(기본 100). */
    max?: number;
    /** 정수로 만들지 여부(기본 true). */
    integer?: boolean;
    /** 값을 채울 area 개수. 생략 시 전체. (route에는 무관) */
    count?: number;
    /** 난수 시드(기본 42). 같은 입력이면 같은 결과. */
    seed?: number;
    /** series가 'pie'일 때 필수. 지역마다 이 개수만큼 값 배열을 만든다. */
    categories?: string[];
    /** series가 'route'일 때 출발 지역(지역명 또는 rm-id). to와 함께 쓴다. */
    from?: string | number;
    /** series가 'route'일 때 도착 지역들(지역명 또는 rm-id). */
    to?: Array<string | number> | string | number;
    /** series가 'route'일 때 [[출발,도착],...] 쌍 목록. from/to 대신 쓸 수 있다. */
    routes?: Array<[string | number, string | number]>;
}

/**
 * RealMap 맵차트용 더미(placeholder) 데이터를 만든다.
 *
 * series 유형이 반환 데이터의 모양을 결정한다.
 *   - map/bar/line/bubble: `{ id, value }`      (min/max/integer/count)
 *   - pie:                 `{ id, value: [...] }` (categories 필수)
 *   - route:               `{ coords: [[경도,위도],[경도,위도]] }` (from/to 또는 routes)
 *
 * 좌표(route)는 지도 area의 중앙좌표만 쓴다. 임의 경위도가 필요한 요청은 만들 수 없다.
 * 반환된 배열은 그대로 `series[].data`에 넣는다. 데이터의 id는 지도의 rm-id와 자동 연결된다.
 *
 * @example  // 지역-값(코로플레스)
 *   import krSido from 'realmap-collection/kr-sido-low.geo.json';
 *   const data = await generateDummyData({ map: krSido, min: 0, max: 100 });
 *
 * @example  // route: 서울 → 부산·제주 (중앙좌표로 연결)
 *   const data = await generateDummyData({ map: krSido, series: 'route', from: '서울', to: ['부산', '제주'] });
 *
 * @throws 지도가 없거나, 미지원 series, 해석 불가한 지역명 등 잘못된 입력.
 */
declare function generateDummyData(options: GenerateDummyDataOptions): Promise<DummyDataPoint[]>;

export { MapNamesEnum, createSubMap, generateDummyData, listMaps };
export type { AreaValuePoint, CreateSubMapOptions, DummyDataPoint, DummySeries, GenerateDummyDataOptions, MapNames, PieValuePoint, RealMapFeatureCollection, RoutePoint };
