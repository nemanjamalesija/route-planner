import { GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';
const center = { lat: 42.43044, lng: 19.2594 };

type MapComponentProps = {
  directionsResponse: google.maps.DirectionsResult | undefined;
  setMap: (map: google.maps.Map) => void;
};

const MapComponent = ({ directionsResponse, setMap }: MapComponentProps) => {
  return (
    <div className=' h-screen w-full'>
      <GoogleMap
        center={center}
        zoom={15}
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
          position={center}
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
