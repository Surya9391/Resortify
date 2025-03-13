import React from 'react';
import { Platform } from 'react-native';
import MapView from './components/maps/MapView';
import WebMap from './components/maps/WebMap';

interface MapLocation {
  latitude: number;
  longitude: number;
  zoom?: number;
}

const App = () => {
  const location: MapLocation = {
    latitude: 37.78825,
    longitude: -122.4324,
    zoom: 13
  };

  if (Platform.OS === 'web') {
    return <WebMap {...location} />;
  }

  return (
    <MapView 
      latitude={location.latitude} 
      longitude={location.longitude} 
      zoom={location.zoom || 13}  // Provide default zoom
    />
  );
};

export default App; 