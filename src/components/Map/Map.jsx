import React, { useEffect, useState } from 'react';
import { fetchMapData } from '../../api';
import styles from './Map.module.css';
import ReactMapboxGl, { Feature, Layer, Marker, ZoomControl } from 'react-mapbox-gl';
import mapBoxMapAPI from './mapAPI';

const Map = ({ data }) => {
  const [mapMarkerData, setMapMarkerData] = useState([]);

  useEffect(() => {
    const fetchMapAPI = async () => {
      setMapMarkerData(await fetchMapData());
    }

    fetchMapAPI();
  }, []);


  const MapComponent = ReactMapboxGl({
    accessToken: `${mapBoxMapAPI.mapBoxMapAPIToken}`,
  })

  console.log('DATA', mapMarkerData.length)

  return (
    <div className={styles.container}>
      <h2 className={styles.maptitle}>Global Hotspots</h2>
      {mapMarkerData.length ? (
        <MapComponent 
          style={'mapbox://styles/mapbox/streets-v8'}
          containerStyle={{
            height: '100%',
            width: '100%'
          }}
          zoom={[4]}
        >
          <Layer
            type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}
          >
            {
              mapMarkerData.map((marker, i) => (
                <Feature
                  coordinates={[marker.long, marker.lat]}
                />
              ))
            }
          </Layer>
          <ZoomControl />
        </MapComponent>
      ): null}
    </div>
  )
}

export default Map;