# RealMap Collection

- 리얼맵을 사용하기 위해 필요한 지도 데이터를 모아놓은 컬렉션입니다.

# Release Note

### v1.0.7

**지도 데이터를 가져오는 API가 추가되었습니다.**

```js
import { loadMap, MapNamesEnum } from 'realmap-collection';

const map = await loadMap(MapNamesEnum.krDongLow, 'geojson');
```

- 위와 같이 loadMap을 통해 필요한 지도데이터를 ES 모듈로 로드할 수 있습니다.

### v1.0.6

**세계지도**

- 지역 중앙 좌표 및 줌인 관련 속성이 추가되었습니다.

### v1.0.5

**일본 지도**

- 지도 파일의 용량을 최적화했습니다.

### v1.0.4

**대륙별 지도**

- 지도 파일의 용량을 최적화했습니다.
- 2.41MB -> 245KB

### v1.0.3

**대륙별 지도**

- 남아메리카 대륙 경계의 오류가 수정되었습니다.

### v1.0.2

**새로운 지도가 추가되었습니다.**

- 미국, 일본, 중국 ADM1 지도
- 한반도 지도
- 시도, 시군구, 읍면동 지도
- 대륙별, 국가별 세계지도