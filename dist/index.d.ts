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
 * 지도 이름으로 지도 데이터를 비동기로 불러온다.
 *
 * @deprecated 번들 크기 문제로 지원이 중단되었다. 다음 major 버전에서 제거된다.
 *
 * 이 함수는 내부에 모든 지도의 동적 import 를 담고 있어서, 번들러가 실제로 쓰는
 * 지도를 가려낼 수 없다. 지도를 하나만 써도 전체 지도가 청크로 생성된다.
 * (실측: 지도 1개만 쓰는 Vite 앱에서 산출물 35MB, 빌드 중 힙 부족으로 실패)
 *
 * 대신 지도 파일을 직접 import 한다. 지연 로딩이 필요하면 동적 import 를 쓰면 되고,
 * 이 함수와 동작이 같다.
 *
 * ```ts
 * // 필요한 시점에 불러오기 (loadMap 대체)
 * const map = await import('realmap-collection/2026-07/kr-sido-low.geo.json')
 *     .then((m) => m.default);
 *
 * // 앱 시작할 때 함께 불러오기
 * import map from 'realmap-collection/2026-07/kr-sido-low.geo.json';
 * ```
 */
declare function loadMap(name: MapNames, type?: 'geojson' | 'topojson'): Promise<GeoJSON.FeatureCollection>;

/**
 * 사용 가능한 모든 지도 이름을 반환한다.
 *
 * 추가 API를 이런 식으로 별도 TS 파일에 작성하면,
 * 빌드 시 rollup 이 생성물(loadMap 등)과 합쳐 단일 index 로 번들한다.
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
 * loadMap 으로 불러온 지도에서 일부 지역만 뽑아 areas 용 지도를 만들 때 사용한다.
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

export { MapNamesEnum, createSubMap, listMaps, loadMap };
export type { CreateSubMapOptions, MapNames, RealMapFeatureCollection };
