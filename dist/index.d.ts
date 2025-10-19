export declare const MapNamesEnum: {
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
	readonly usaStateMid: "usaStateMid"
};

export type MapNames = keyof typeof MapNamesEnum;

export function loadMap(name: MapNames, type?: 'geojson' | 'topojson'): Promise<GeoJSON.FeatureCollection>;