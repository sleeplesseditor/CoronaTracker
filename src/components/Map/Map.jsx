import React from 'react';
import styles from './Map.module.css';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import mapBoxMapAPI from './mapAPI';

const Map = () => {

  const MapComponent = ReactMapboxGl({
    accessToken: `${mapBoxMapAPI.mapBoxMapAPIToken}`
  })

  // console.log('PROPS', defaultCenter, zoom)

  return (
    <div className={styles.container}>
      <MapComponent 
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: '100%',
          width: '100%'
        }}
      />
    </div>
  )
}

export default Map;