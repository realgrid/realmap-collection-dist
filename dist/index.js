export const MapNamesEnum = {
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
  usaStateHigh: 'usaStateHigh',
  usaStateLow: 'usaStateLow',
  usaStateMid: 'usaStateMid',
};

export function loadMap(name, type = 'geojson') {
  switch (name) {
    case 'chinaAdm1High':
      return type === 'geojson'
        ? import('./js/china-adm1-high.js').then((x) => x.default)
        : import('./topojs/china-adm1-high.js').then((x) => x.default);
    case 'chinaAdm1Low':
      return type === 'geojson'
        ? import('./js/china-adm1-low.js').then((x) => x.default)
        : import('./topojs/china-adm1-low.js').then((x) => x.default);
    case 'chinaAdm1Mid':
      return type === 'geojson'
        ? import('./js/china-adm1-mid.js').then((x) => x.default)
        : import('./topojs/china-adm1-mid.js').then((x) => x.default);
    case 'continentHigh':
      return type === 'geojson'
        ? import('./js/continent-high.js').then((x) => x.default)
        : import('./topojs/continent-high.js').then((x) => x.default);
    case 'continentLow':
      return type === 'geojson'
        ? import('./js/continent-low.js').then((x) => x.default)
        : import('./topojs/continent-low.js').then((x) => x.default);
    case 'continentMid':
      return type === 'geojson'
        ? import('./js/continent-mid.js').then((x) => x.default)
        : import('./topojs/continent-mid.js').then((x) => x.default);
    case 'japanAdm1High':
      return type === 'geojson'
        ? import('./js/japan-adm1-high.js').then((x) => x.default)
        : import('./topojs/japan-adm1-high.js').then((x) => x.default);
    case 'japanAdm1Low':
      return type === 'geojson'
        ? import('./js/japan-adm1-low.js').then((x) => x.default)
        : import('./topojs/japan-adm1-low.js').then((x) => x.default);
    case 'japanAdm1Mid':
      return type === 'geojson'
        ? import('./js/japan-adm1-mid.js').then((x) => x.default)
        : import('./topojs/japan-adm1-mid.js').then((x) => x.default);
    case 'koreaHigh':
      return type === 'geojson'
        ? import('./js/korea-high.js').then((x) => x.default)
        : import('./topojs/korea-high.js').then((x) => x.default);
    case 'koreaLow':
      return type === 'geojson'
        ? import('./js/korea-low.js').then((x) => x.default)
        : import('./topojs/korea-low.js').then((x) => x.default);
    case 'koreaMid':
      return type === 'geojson'
        ? import('./js/korea-mid.js').then((x) => x.default)
        : import('./topojs/korea-mid.js').then((x) => x.default);
    case 'krDongHigh':
      return type === 'geojson'
        ? import('./js/kr-dong-high.js').then((x) => x.default)
        : import('./topojs/kr-dong-high.js').then((x) => x.default);
    case 'krDongLow':
      return type === 'geojson'
        ? import('./js/kr-dong-low.js').then((x) => x.default)
        : import('./topojs/kr-dong-low.js').then((x) => x.default);
    case 'krDongMid':
      return type === 'geojson'
        ? import('./js/kr-dong-mid.js').then((x) => x.default)
        : import('./topojs/kr-dong-mid.js').then((x) => x.default);
    case 'krSidoHigh':
      return type === 'geojson'
        ? import('./js/kr-sido-high.js').then((x) => x.default)
        : import('./topojs/kr-sido-high.js').then((x) => x.default);
    case 'krSidoLow':
      return type === 'geojson'
        ? import('./js/kr-sido-low.js').then((x) => x.default)
        : import('./topojs/kr-sido-low.js').then((x) => x.default);
    case 'krSidoMid':
      return type === 'geojson'
        ? import('./js/kr-sido-mid.js').then((x) => x.default)
        : import('./topojs/kr-sido-mid.js').then((x) => x.default);
    case 'krSigunHigh':
      return type === 'geojson'
        ? import('./js/kr-sigun-high.js').then((x) => x.default)
        : import('./topojs/kr-sigun-high.js').then((x) => x.default);
    case 'krSigunLow':
      return type === 'geojson'
        ? import('./js/kr-sigun-low.js').then((x) => x.default)
        : import('./topojs/kr-sigun-low.js').then((x) => x.default);
    case 'krSigunMid':
      return type === 'geojson'
        ? import('./js/kr-sigun-mid.js').then((x) => x.default)
        : import('./topojs/kr-sigun-mid.js').then((x) => x.default);
    case 'worldHigh':
      return type === 'geojson'
        ? import('./js/world-high.js').then((x) => x.default)
        : import('./topojs/world-high.js').then((x) => x.default);
    case 'worldLow':
      return type === 'geojson'
        ? import('./js/world-low.js').then((x) => x.default)
        : import('./topojs/world-low.js').then((x) => x.default);
    case 'worldMid':
      return type === 'geojson'
        ? import('./js/world-mid.js').then((x) => x.default)
        : import('./topojs/world-mid.js').then((x) => x.default);
    case 'usaStateHigh':
      return type === 'geojson'
        ? import('./js/usa-state-high.js').then((x) => x.default)
        : import('./topojs/usa-state-high.js').then((x) => x.default);
    case 'usaStateLow':
      return type === 'geojson'
        ? import('./js/usa-state-low.js').then((x) => x.default)
        : import('./topojs/usa-state-low.js').then((x) => x.default);
    case 'usaStateMid':
      return type === 'geojson'
        ? import('./js/usa-state-mid.js').then((x) => x.default)
        : import('./topojs/usa-state-mid.js').then((x) => x.default);
  }
}
