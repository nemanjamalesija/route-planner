import { useJsApiLoader, LoadScriptProps } from '@react-google-maps/api';
import { useState } from 'react';
import Loader from './components/Loader';
import fetchDirections from './helpers/fetchDirections';
import { FaTimes } from 'react-icons/fa';
import { HiMiniMapPin } from 'react-icons/hi2';


import {
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api';

const libs: LoadScriptProps['libraries'] = ['places'];
const center = { lat: 42.43044, lng: 19.2594 };

const googleMapsKey = import.meta.env.VITE_GOOGLE_MAPS_KEY;

export default function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: googleMapsKey,
    libraries: libs,
  });
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [distance, setDistance] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [stops, setStops] = useState<{ id: string }[]>([]);
  const [travelMode, setTravelMode] = useState<string>('DRIVING');

  const [, setMap] = useState<google.maps.Map | undefined>(undefined);
  const [directionsResponse, setDirectionsResponse] = useState<
    google.maps.DirectionsResult | undefined
  >(undefined);

  if (!isLoaded) {
    return <Loader />;
  }

  fetchDirections(
    'Podgorica',
    'Budva',
    'DRIVING',
    setDirectionsResponse,
    setOrigin,
    setDestination
  );

  return (
    <div className='h-screen'>
      <div className=' h-screen w-full'>
        {/* Google Map Box */}
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
    </div>
  );
}
