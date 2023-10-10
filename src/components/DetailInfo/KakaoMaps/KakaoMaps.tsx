/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import styles from './KakaoMaps.module.css';

interface Props {
  setMap: React.Dispatch<React.SetStateAction<any>>;
  mapX: number;
  mapY: number;
}

function DetailInfoKakaoMaps({ setMap, mapX, mapY }: Props): JSX.Element {
  const [mapState, setMapState] = useState<{
    level: number;
    center: { lat: number; lng: number };
  }>({
    level: 3,
    center: { lat: mapY, lng: mapX },
  });
  const mapRef = useRef<any>(null);

  return (
    <Map
      id="map"
      ref={mapRef}
      center={mapState.center}
      level={mapState.level}
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
      <MapMarker position={{ lat: mapY, lng: mapX }} />
    </Map>
  );
}

export default DetailInfoKakaoMaps;
