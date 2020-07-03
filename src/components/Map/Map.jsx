import React, { PureComponent } from 'react';
import { fetchMapData } from '../../api';
import MapGL, { FullscreenControl, GeolocateControl, Marker, NavigationControl, Popup } from '@urbica/react-map-gl';
import Cluster from '@urbica/react-map-gl-cluster';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapBoxMapAPI from './mapAPI';
import MapPopup from './MapPopup';

const style = {
  width: '25px',
  height: '25px',
  color: '#fff',
  background: '#1978c8',
  borderRadius: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 'bold'
};

class ClusterMarker extends PureComponent {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { onClick, ...cluster } = this.props;
    onClick(cluster);
  }

  render() {
    const { longitude, latitude, pointCount } = this.props;

    return (
      <Marker longitude={longitude} latitude={latitude}>
        <div onClick={this.onClick} style={{ ...style, background: '#f24425' }}>
          {pointCount}
        </div>
      </Marker>
    );
  }
}

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      viewport: {
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 2
      },
      markers: [],
      selectedMarker: null
    };
    this._cluster = React.createRef();

    this.onClick = this.onClick.bind(this);
    this.onViewportChange = this.onViewportChange.bind(this);
  }

  async componentDidMount() {
    const fetchMapAPIresponse = await fetchMapData();

    this.setState({ markers: fetchMapAPIresponse });

  }

  onViewportChange(viewport) {
    this.setState({ viewport });
  }

  onClick(cluster) {
    const { clusterId, longitude, latitude } = cluster;

    const supercluster = this._cluster.current.getCluster();
    const zoom = supercluster.getClusterExpansionZoom(clusterId);

    this.setState(state => {
      const newVewport = {
        ...state.viewport,
        latitude,
        longitude,
        zoom
      };

      return { ...state, viewport: newVewport };
    });
  }

  onClickMarker = marker => {
    this.setState({
      selectedMarker: marker
    })
  }

  renderPopup() {
    const { selectedMarker } = this.state;
    return (
      selectedMarker && (
        <Popup
          tipSize={5}
          anchor="bottom"
          longitude={selectedMarker.long}
          latitude={selectedMarker.lat}
          closeOnClick={false}
          onClose={() => this.setState({ selectedMarker: null })}
        >
          <MapPopup selectedMarker={selectedMarker} />
        </Popup>
      )
    )
  }

  renderMap = (markers, viewport) => {
    return (
      <MapGL
          style={{ width: '70%', height: '800px' }}
          mapStyle='mapbox://styles/mapbox/streets-v8'
          accessToken={`${mapBoxMapAPI.mapBoxMapAPIToken}`}
          onViewportChange={this.onViewportChange}
          {...viewport}
        >
          <Cluster
            ref={this._cluster}
            radius={40}
            extent={512}
            nodeSize={64}
            component={cluster => (
              <ClusterMarker onClick={this.onClick} {...cluster} />
            )}
          >
            {markers.map(marker => (
              <Marker
                key={marker.location}
                longitude={marker.long}
                latitude={marker.lat}
                
              >
                <div style={style} onClick={() => this.onClickMarker(marker)}>
                {/* Popup here? */}
                </div>
              </Marker>
            ))}
          </Cluster>
          {this.renderPopup()}
          <FullscreenControl position='top-right' />
          <GeolocateControl position='top-right' />
          <NavigationControl showCompass showZoom position='top-right' />
        </MapGL>
    )
  }

  render() {
    const { markers, viewport } = this.state;
    return (
      <React.Fragment>
      {markers.length ? this.renderMap(markers, viewport) : null}
      </React.Fragment>
    );
  }
}

export default Map;