import React, { useRef } from 'react';
import { Map } from '@vis.gl/react-google-maps';

const GoogleMap = ({ onCameraChange }) => {
  const mapRef = useRef(null);

  const getMapSnapshot = (lat, lng, zoom) => {
    const snapshot = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=640x640&maptype=satellite&key=${process.env.GOOGLE_MAPS_API_KEY}`;
    return snapshot;
  };

  return (
    <Map
      ref={mapRef}
      defaultZoom={17}
      defaultCenter={{ lat: 12.0068714, lng: 79.8094594 }}
      onCameraChanged={ev => {
        const { lat, lng } = ev.detail.center;
        const zoom = Math.round(ev.detail.zoom);
        const snapshot = getMapSnapshot(lat, lng, zoom);
        onCameraChange({
          info: {
            lat: lat.toString(),
            lng: lng.toString(),
            zoom: zoom.toString(),
          },
          snapshot,
        });
      }}
      mapId="da37f3254c6a6d1c"
      minZoom={3}
      mapTypeId="satellite"
      disableDefaultUI={true}
      restriction={{
        latLngBounds: {
          north: 85,
          south: -85,
          east: 180,
          west: -180,
        },
        strictBounds: true,
      }}
    />
  );
};

export default GoogleMap;
