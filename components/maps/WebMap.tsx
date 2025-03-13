import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

interface WebMapProps {
  google: any;
  latitude: number;
  longitude: number;
  zoom?: number;
}

const WebMap: React.FC<WebMapProps> = ({ google, latitude, longitude, zoom = 15 }) => {
  return (
    <Map
      google={google}
      zoom={zoom}
      initialCenter={{
        lat: latitude,
        lng: longitude,
      }}
    >
      <Marker position={{ lat: latitude, lng: longitude }} />
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
})(WebMap); 