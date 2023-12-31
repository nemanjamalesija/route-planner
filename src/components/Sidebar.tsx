import DistanceDurationInfo from './DistanceDurationInfo';
import WayPoint from './WayPoint';
import fetchDirections from '../helpers/fetchDirections';
import { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Heading from './ui/Heading';
import ActionButton from './ui/ActionButton';
import Input from './ui/Input';
import ClearButton from './ui/ClearButton';

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

    if (originRef.current && destinationRef.current) {
      originRef.current.value = '';
      destinationRef.current.value = '';
    }

    setWayPoints([]);
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

  // Update waypoint
  // account for the case when there are multiple waypoints
  function updateWaypoints(id: string, updatedAdress: string) {
    const newWayPoints = wayPoints.map((w) => {
      return w.id == id ? { ...w, adress: updatedAdress } : w;
    });

    setWayPoints(newWayPoints);
  }

  // Waypoint is of type {id: string, adress: string}
  // so we need to extract the adresses in order to get the coords
  function getWayPointsAdresses(waypoints: typeof wayPoints) {
    return waypoints.map((w) => w.adress);
  }
  return (
    <aside className='p-4 bg-zinc-950 shadow-lg max-h-screen overflow-y-scroll'>
      <Heading />
      <div className='flex flex-col space-between gap-2'>
        <div className='w-full flex flex-col gap-2 mb-2'>
          {/* Origin input */}
          <Input
            type='auto-complete'
            id='origin'
            placeholder='Starting point'
            ref={originRef}
            handleSetState={setOrigin}
          />
        </div>
        <div className='w-full flex flex-col gap-2 mb-4 lg:mb-5 '>
          {/* Destination input */}
          <Input
            type='auto-complete'
            id='destination'
            placeholder='Destination'
            ref={destinationRef}
            handleSetState={setDestination}
          />
        </div>

        {/* Add waypoint button */}
        <div className='w-full flex flex-col gap-2 mb-6 lg:mb-10'>
          <ActionButton
            disabled={origin == '' || destination == ''}
            handleClick={addWayPoint}
          >
            Add stop
          </ActionButton>

          {/* Appends waypoints */}
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
          {/* Travel mode input */}
          <Input
            type='select'
            id='travelMode'
            placeholder='Travel mode'
            value={travelMode}
            handleOnChange={setTravelMode}
          />
        </div>

        <div className='flex items-center gap-2'>
          {/* Get directions button */}
          <ActionButton
            disabled={origin == '' || destination == ''}
            handleClick={() => {
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
          </ActionButton>

          {/* Reset  */}
          <ClearButton
            onClear={clearRoute}
            disabled={origin == '' || destination == ''}
          />
        </div>
      </div>
      {distance && duration && (
        <DistanceDurationInfo distance={distance} duration={duration} />
      )}
    </aside>
  );
};

export default Sidebar;
