import React, { useEffect, useState } from 'react';
import { fetchMapData } from '../../api';
import styles from './Map.module.css';
import ReactMapboxGl, { Feature, Layer, Popup, ZoomControl } from 'react-mapbox-gl';
import mapBoxMapAPI from './mapAPI';

const MapComponent = ReactMapboxGl({
  accessToken: `${mapBoxMapAPI.mapBoxMapAPIToken}`
})

const Map = () => {
  const [mapMarkerData, setMapMarkerData] = useState([]);
  const [mapCenter, setMapCenter] = useState([-0.109970527, 51.52916347]);
  const [mapZoom, setMapZoom] = useState([4])
  const [selectedMarker, setSelectedMarker] = useState(undefined)

  useEffect(() => {
    const fetchMapAPI = async () => {
      setMapMarkerData(await fetchMapData());
    }

    fetchMapAPI();
  }, []);

  const handleMapClick = (marker) => {
    setMapZoom([7]);
    setMapCenter([marker.long, marker.lat]);
    setSelectedMarker(marker);
  }

  const flyingSpeed = {
    speed: 0.8
  };

  console.log('POPUP', selectedMarker)

  return (
    <div className={styles.container}>
      <h2 className={styles.maptitle}>Global Hotspots (-48 Hours)</h2>
      {mapMarkerData.length ? (
        <MapComponent 
          style={'mapbox://styles/mapbox/streets-v8'}
          containerStyle={{
            height: '100%',
            width: '100%'
          }}
          center={mapCenter}
          zoom={mapZoom}
          flyToOptions={flyingSpeed}
        >
          <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
            {
              mapMarkerData.map((marker, i) => (
                <Feature
                  coordinates={[marker.long, marker.lat]}
                  onClick={() => handleMapClick(marker)}
                >
                </Feature>
              ))
            }
          </Layer>
          <Layer
            id="popupLayer"
          >
          {selectedMarker && (
            <Popup
              coordinates={[selectedMarker.lat, selectedMarker.long]}
              key={selectedMarker.location}
            >
              <div className={styles.popup}>
                <h1>Popup</h1>
                <h2>{selectedMarker.location}</h2>
              </div>
            </Popup>
          )}
          </Layer>
          <ZoomControl />
        </MapComponent>
      ): null}
    </div>
  )
}

export default Map;