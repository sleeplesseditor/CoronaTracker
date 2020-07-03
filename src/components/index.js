
import React from 'react';
import LazyLoader from './LazyLoader/LazyLoader';
import Cards from './Cards/Cards';
import CountryPicker from './CountryPicker/CountryPicker';

const ChartComponent = React.lazy(() => import('./Chart/Chart'));
const MapComponent = React.lazy(() => import('./Map/Map'));

const Chart = LazyLoader(ChartComponent);
const Map = LazyLoader(MapComponent);

export {
  Cards,
  Chart,
  CountryPicker,
  Map
}