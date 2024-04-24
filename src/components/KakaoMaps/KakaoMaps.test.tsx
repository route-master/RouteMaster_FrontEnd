// import { useState } from 'react';
// import { render } from '@testing-library/react';
// import KakaoMaps from './KakaoMaps';

// // Mock the Kakao Maps API
// const { kakao } = window;
// const options = {
//   level: 13,
//   center: {
//     lat: 37.5665,
//     lng: 126.978,
//   },
// };

// it('should render kakao map', () => {
//   const [map, setMap] = useState<any>();
//   const keyword = '이태원 맛집';
//   const container = document.getElementById('map');

//   setMap(new kakao.maps.Map(container, options));
//   render(<KakaoMaps map={map} setMap={setMap} keyword={keyword} />);

//   expect(map).toBeInTheDocument();
// });
