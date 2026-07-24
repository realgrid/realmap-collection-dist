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
declare function loadMap(name: MapNames, type?: 'geojson' | 'topojson'): Promise<GeoJSON.FeatureCollection>;

declare function listMaps(): MapNames[];

interface RealMapFeatureCollection extends GeoJSON.FeatureCollection {
    name?: string;
    meta?: any;
}
interface CreateSubMapOptions {
    map: RealMapFeatureCollection;
    targets: string[];
    mode: 'include' | 'exclude';
    meta?: any;
}
declare function createSubMap(options: CreateSubMapOptions): RealMapFeatureCollection;

export { MapNamesEnum, createSubMap, listMaps, loadMap };
export type { CreateSubMapOptions, MapNames, RealMapFeatureCollection };
