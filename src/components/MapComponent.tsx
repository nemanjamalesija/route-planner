import { useState, useEffect } from 'react';
import { GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';
const fallbackCoords = { lat: 42.43044, lng: 19.2594 };

type MapComponentProps = {
  directionsResponse: google.maps.DirectionsResult | undefined;
  setMap: (map: google.maps.Map) => void;
};

const MapComponent = ({ directionsResponse, setMap }: MapComponentProps) => {
  const [currentCoordinates, setCurrentCoordinates] = useState(
    {} as typeof fallbackCoords
  );

  useEffect(() => {
    if (!navigator.geolocation) {
      setCurrentCoordinates(fallbackCoords);
      console.log('Geolocation is not available on this device.');
      return;
    }

    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      setCurrentCoordinates({ lat: latitude, lng: longitude });
    });
  }, []);

  return (
    <div className=' h-screen w-full'>
      <GoogleMap
        center={currentCoordinates}
        zoom={6}
        mapContainerStyle={{ width: '100%', height: '100%' }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        onLoad={(map) => setMap(map)}
      >
        <Marker
          position={currentCoordinates}
          animation={window.google.maps.Animation.BOUNCE}
        />
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
    </div>
  );
};

export default MapComponent;
