import React, { useState } from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';
import GoogleMap from './GoogleMap/GoogleMap';
import Cuboid from './Cuboid/Cuboid';

const App = () => {
  const [cameraData, setCameraData] = useState({
    info: {
      lat: '0',
      lng: '0',
      zoom: '0',
    },
    snapshot: '',
  });
  const [snapshot, setSnapshot] = useState('');

  const handleCameraChange = data => {
    setCameraData(data);
  };

  const sendDataToAPI = () => {
    fetch(`${process.env.BASE_URL}/api/maps`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cameraData),
    })
      .then(response => {
        if (response.ok) {
          console.log('Data sent successfully!');
        } else {
          console.error('Failed to send data.');
        }
      })
      .catch(error => {
        console.error('Error sending data:', error);
      });
  };

  const handleButtonClick = () => {
    sendDataToAPI();
    setSnapshot(cameraData.snapshot);
  };

  return (
    <APIProvider
      apiKey={process.env.GOOGLE_MAPS_API_KEY}
      onLoad={() => console.log('Maps API has loaded.')}
    >
      <GoogleMap onCameraChange={handleCameraChange} />
      <Cuboid snapshot={snapshot} />
      <button onClick={handleButtonClick}>
        FLAT
        <br />
        MY
        <br />
        EARTH
      </button>
    </APIProvider>
  );
};

export default App;
