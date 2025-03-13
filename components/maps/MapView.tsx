import React from 'react';
import { Platform } from 'react-native';
import { useRoute } from '@react-navigation/native';

// Web-specific import
const WebMapView = React.lazy(() => import('./WebMapView'));
// Native-specific import
const NativeMapView = Platform.select({
  native: () => require('./NativeMapView').default,
  default: () => WebMapView,
})();

interface MapViewProps {
  latitude: number;
  longitude: number;
  zoom?: number;
}

const MapView: React.FC = () => {
  const route = useRoute();
  const { latitude, longitude, zoom } = route.params as { latitude: number; longitude: number; zoom?: number };
  
  if (Platform.OS === 'web') {
    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <WebMapView latitude={latitude} longitude={longitude} zoom={zoom} />
      </React.Suspense>
    );
  }
  return <NativeMapView latitude={latitude} longitude={longitude} zoom={zoom} />;
};

export default MapView; 