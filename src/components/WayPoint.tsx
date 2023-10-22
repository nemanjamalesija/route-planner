import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Autocomplete } from '@react-google-maps/api';

type WayPointProps = {
  id: string;
  onUpdateWayPoints: (id: string, adress: string) => void;
  onRemoveWayPoint: (id: string) => void;
};

const WayPoint = ({
  id,
  onRemoveWayPoint,
  onUpdateWayPoints,
}: WayPointProps) => {
  const [wayPoint, setWatPoint] = useState<string>('');

  return (
    <div className='relative w-full'>
      <Autocomplete>
        <input
          id='wayPoint'
          className='rounded-md border border-stone-200 px-4 py-2 text-sm transition-all duration-400 placeholder:text-stone-500 focus:outline-none focus:ring focus:ring-emerald-500 md:px-6 md:py-3 w-full'
          type='text'
          placeholder='Stop location'
          value={wayPoint}
          onChange={(e) => {
            setWatPoint(e.target.value), onUpdateWayPoints(id, e.target.value);
          }}
        />
      </Autocomplete>
      <button aria-label='center back' className='absolute top-4 right-2'>
        <FaTimes
          color='#020617'
          size='16px'
          onClick={() => onRemoveWayPoint(id)}
        />
      </button>
    </div>
  );
};

export default WayPoint;
