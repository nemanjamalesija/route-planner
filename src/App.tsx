import { useJsApiLoader, LoadScriptProps } from '@react-google-maps/api';
import { useState } from 'react';
import Loader from './components/ui/Loader';
import Sidebar from './components/Sidebar';
import MapComponent from './components/MapComponent';
import { Toaster } from 'react-hot-toast';

const libs: LoadScriptProps['libraries'] = ['places'];

const googleMapsKey = import.meta.env.VITE_GOOGLE_MAPS_KEY;

export default function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: googleMapsKey,
    libraries: libs,
  });

  const [, setMap] = useState<google.maps.Map | undefined>(undefined);
  const [directionsResponse, setDirectionsResponse] = useState<
    google.maps.DirectionsResult | undefined
  >(undefined);

  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <>
      <div className='flex flex-col px-2 lg:px-0 lg:grid lg:grid-cols-[450px,1fr]'>
        <Sidebar setDirectionsResponse={setDirectionsResponse} />
        <MapComponent directionsResponse={directionsResponse} setMap={setMap} />
      </div>

      <Toaster
        position='top-center'
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: '#09090b',
            color: '#fff',
          },
        }}
      />
    </>
  );
}
