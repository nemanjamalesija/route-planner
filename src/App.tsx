import { useJsApiLoader, LoadScriptProps } from '@react-google-maps/api';
import { useState } from 'react';
import Loader from './components/Loader';
import fetchDirections from './helpers/fetchDirections';

const libs: LoadScriptProps['libraries'] = ['places'];

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
  const [travelMode, setTravelMode] = useState<string>('DRIVING');

  const [map, setMap] = useState<google.maps.Map | undefined>(undefined);
  const [directionsResponse, setDirectionsResponse] = useState<
    google.maps.DirectionsResult | undefined
  >(undefined);

  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <button
      onClick={() =>
        fetchDirections(
          origin,
          destination,
          'WALKING',
          setDirectionsResponse,
          setDistance,
          setDuration
        )
      }
    >
      Fetch directions
    </button>
  );
}
