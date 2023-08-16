/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import LikeButton from '../LikeButton/LikeButton';
import styles from './KakaoMaps.module.css';

interface Props {
  map: any;
  setMap: React.Dispatch<React.SetStateAction<any>>;
  keyword: string;
}

const mapInitState = {
  level: 13,
  center: {
    lat: 37.5665,
    lng: 126.978,
  },
};

function KakaoMaps({ map, setMap, keyword }: Props): JSX.Element {
  const [mapState, setMapState] = useState<{
    level: number;
    center: { lat: number; lng: number };
  }>(mapInitState);
  const { kakao } = window;
  const mapRef = useRef<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [info, setInfo] = useState<any>(null);

  useEffect(() => {
    if (map) {
      const ps = new kakao.maps.services.Places(); // 장소 검색 객체

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const placesSearchCB = (data: any, status: any, pagination: any) => {
        if (status === kakao.maps.services.Status.OK) {
          const bounds = new kakao.maps.LatLngBounds();
          const tempMarkers = [];

          for (let i = 0; i < data.length; i += 1) {
            tempMarkers.push({
              position: {
                lat: data[i].y,
                lng: data[i].x,
              },
              content: data[i].place_name,
            });
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }
          setMarkers(tempMarkers);
          map.setBounds(bounds);
        }
      };
      ps.keywordSearch(keyword, placesSearchCB);
    }
  }, [map, keyword]);

  return (
    <Map
      id="map"
      ref={mapRef}
      center={mapState?.center}
      level={mapState?.level}
      onCreate={setMap}
      className={styles.container}
      onZoomChanged={(map) => {
        setMapState({
          level: map.getLevel(),
          center: {
            lat: map.getCenter().getLat(),
            lng: map.getCenter().getLng(),
          },
        });
      }}
      onCenterChanged={(map) => {
        setMapState({
          level: mapState?.level,
          center: {
            lat: map.getCenter().getLat(),
            lng: map.getCenter().getLng(),
          },
        });
      }}
    >
      {markers.map((marker) => (
        <MapMarker
          key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
          position={marker.position}
          onClick={(inmarker) => {
            setInfo(marker);
            map.panTo(inmarker.getPosition());
          }}
        >
          {info && info.content === marker.content && (
            <div style={{ minWidth: '200px', height: 'fit-content' }}>
              <LikeButton />
              <div style={{ margin: '5px', color: 'black' }}>
                <br />
                <br />
                {info.content}
              </div>
              <br />
            </div>
          )}
        </MapMarker>
      ))}
    </Map>
  );
}

export default KakaoMaps;
