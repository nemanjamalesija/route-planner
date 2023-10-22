import { useJsApiLoader, LoadScriptProps } from '@react-google-maps/api';
import { useState } from 'react';
import fetchDirections from './helpers/fetchDirections';
import { FaTimes } from 'react-icons/fa';
import { HiMiniMapPin } from 'react-icons/hi2';
import { v4 as uuidv4 } from 'uuid';

import {
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api';
import Loader from './components/Loader';
import WayPoint from './components/WayPoint';

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
  const [wayPoints, setWayPoints] = useState<{ id: string; adress: string }[]>(
    []
  );
  const [travelMode, setTravelMode] = useState<'DRIVING' | 'WALKING'>(
    'DRIVING'
  );

  const [, setMap] = useState<google.maps.Map | undefined>(undefined);
  const [directionsResponse, setDirectionsResponse] = useState<
    google.maps.DirectionsResult | undefined
  >(undefined);

  if (!isLoaded) {
    return <Loader />;
  }

  function addWayPoint() {
    setWayPoints((prev) => {
      return [...prev, { id: uuidv4(), adress: '' }];
    });
  }

  function clearRoute() {
    setDirectionsResponse(undefined);
    setDistance('');
    setDuration('');
    setOrigin('');
    setDestination('');
  }

  return (
    <div className='grid grid-cols-[350px,1fr]'>
      <div className='p-4 bg-zinc-950 shadow-lg '>
        <h1 className='text-white text-2xl font-semibold text-center mb-6 flex items-center justify-center gap-2'>
          <HiMiniMapPin color='#10b981' size='32px' />

          <span>Route planner</span>
        </h1>
        <div className='flex flex-col space-between gap-2'>
          <div className='w-full flex flex-col gap-2 mb-4'>
            <Autocomplete>
              <input
                id='origin'
                className='rounded-md border border-stone-200 px-4 py-2 text-sm transition-all duration-400 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-emerald-500 md:px-6 md:py-3 w-full'
                type='text'
                placeholder='Start location'
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
              />
            </Autocomplete>
          </div>
          <div className='w-full flex flex-col gap-2 mb-4'>
            <Autocomplete>
              <input
                id='destination'
                className='rounded-md border border-stone-200 px-4 py-2 text-sm transition-all duration-400 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-emerald-500 md:px-6 md:py-3 w-full'
                type='text'
                placeholder='Destination'
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </Autocomplete>
          </div>

          <div className='w-full flex flex-col gap-2 mb-4'>
            <button
              className='px-4 py-3 md:px-6 md:py-4inline-block text-sm rounded-full bg-emerald-500 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-400 hover:bg-emerald-400 focus:bg-emerald-400 focus:outline-none focus:ring focus:ring-emerald-400 focus:ring-offset-2 disabled:bg-stone-400 disabled:cursor-not-allowed mb-1'
              disabled={origin == '' || destination == ''}
              onClick={addWayPoint}
            >
              Add stop
            </button>
            {wayPoints.map((el) => (
              <WayPoint key={el.id} {...el} />
            ))}
          </div>

          <div className='flex gap-2 items-center mb-4'>
            <select
              id='travelMode'
              className='rounded-md border border-stone-200 px-4 py-2 text-sm transition-all duration-400 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-emerald-500 md:px-6 md:py-3 w-full cursor-pointer'
              value={travelMode}
              onChange={(e) =>
                setTravelMode(e.target.value as 'DRIVING' | 'WALKING')
              }
            >
              <option value='DRIVING'>Driving 🚗</option>
              <option value='WALKING'>Walking 🚶‍♂️</option>
            </select>
          </div>

          <div className='flex items-center gap-2'>
            <button
              className='px-4 py-3 md:px-6 md:py-4inline-block text-sm rounded-full bg-emerald-500 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-400 hover:bg-emerald-400 focus:bg-emerald-400 focus:outline-none focus:ring focus:ring-emerald-400 focus:ring-offset-2 disabled:bg-stone-400 disabled:cursor-not-allowed'
              type='submit'
              disabled={origin == '' || destination == ''}
              onClick={() =>
                fetchDirections(
                  origin,
                  destination,
                  travelMode,
                  setDirectionsResponse,
                  setDistance,
                  setDuration
                )
              }
            >
              Calculate Route
            </button>
            <button aria-label='center back' onClick={clearRoute}>
              <FaTimes color='#ef4444' size='32px' />
            </button>
          </div>
        </div>
        {distance && duration && (
          <div className='gap-2 flex flex-col mt-8'>
            <p className='text-base text-white'>
              Distance to your location: {distance}
            </p>
            <p className='text-base text-white'>
              Estimated travel duration: {duration}
            </p>
          </div>
        )}
      </div>

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
