import DistanceDurationInfo from './DistanceDurationInfo';
import Autocomplete from 'react-google-autocomplete';
import { FaTimes } from 'react-icons/fa';
import WayPoint from './WayPoint';
import fetchDirections from '../helpers/fetchDirections';
import { HiMiniMapPin } from 'react-icons/hi2';
import { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Sidebar = ({
  setDirectionsResponse,
}: {
  setDirectionsResponse: React.Dispatch<
    React.SetStateAction<google.maps.DirectionsResult | undefined>
  >;
}) => {
  const originRef = useRef<HTMLInputElement | null>(null);
  const destinationRef = useRef<HTMLInputElement | null>(null);

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

  function clearRoute() {
    setDirectionsResponse(undefined);
    setDistance('');
    setDuration('');
    setOrigin('');
    setDestination('');
  }

  function addWayPoint() {
    setWayPoints((prev) => {
      return [...prev, { id: uuidv4(), adress: '' }];
    });
  }

  function removeWayPoint(id: string) {
    setWayPoints((prev) => {
      const newWayPoints = prev.filter((s) => s.id != id);

      return newWayPoints;
    });
  }

  function updateWaypoints(id: string, updatedAdress: string) {
    const newWayPoints = wayPoints.map((w) => {
      return w.id == id ? { ...w, adress: updatedAdress } : w;
    });

    setWayPoints(newWayPoints);
  }

  function getWayPointsAdresses(waypoints: typeof wayPoints) {
    return waypoints.map((w) => w.adress);
  }
  return (
    <aside className='p-4 bg-zinc-950 shadow-lg '>
      <h1 className='text-white text-2xl font-semibold text-center mb-6 flex items-center justify-center gap-2'>
        <HiMiniMapPin color='#10b981' size='32px' />

        <span>Route planner</span>
      </h1>
      <div className='flex flex-col space-between gap-2'>
        <div className='w-full flex flex-col gap-2 mb-4'>
          <Autocomplete
            apiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}
            placeholder='Enter starting location'
            className='rounded-md border border-stone-200 px-4 py-2 text-sm transition-all duration-400 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-emerald-500 md:px-6 md:py-3 w-full'
            ref={originRef}
            onPlaceSelected={(place) => {
              setOrigin(place.formatted_address as string);
            }}
          />
        </div>
        <div className='w-full flex flex-col gap-2 mb-4'>
          <Autocomplete
            apiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}
            placeholder='Enter destination'
            className='rounded-md border border-stone-200 px-4 py-2 text-sm transition-all duration-400 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-emerald-500 md:px-6 md:py-3 w-full'
            ref={destinationRef}
            onPlaceSelected={(place) => {
              setDestination(place.formatted_address as string);
            }}
          />
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
            <WayPoint
              key={el.id}
              onRemoveWayPoint={removeWayPoint}
              onUpdateWayPoints={updateWaypoints}
              {...el}
            />
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
            onClick={() => {
              fetchDirections(
                origin,
                destination,
                getWayPointsAdresses(wayPoints),
                travelMode,
                setDirectionsResponse,
                setDistance,
                setDuration
              );
            }}
          >
            Calculate Route
          </button>
          <button
            className='disabled:cursor-not-allowed'
            aria-label='center back'
            onClick={clearRoute}
            disabled={origin == '' || destination == ''}
          >
            <FaTimes
              color={origin == '' || destination == '' ? '#a8a29e' : '#ef4444'}
              size='32px'
            />
          </button>
        </div>
      </div>
      {distance && duration && (
        <DistanceDurationInfo distance={distance} duration={duration} />
      )}
    </aside>
  );
};

export default Sidebar;
