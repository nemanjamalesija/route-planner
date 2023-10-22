import { useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import Autocomplete from 'react-google-autocomplete';

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
  const wayPoint = useRef<HTMLInputElement | null>(null);

  function handleUpdateWaypoints(id: string, adress: string) {
    onUpdateWayPoints(id, adress);
  }

  return (
    <div className='relative w-full'>
      <Autocomplete
        className='rounded-md border border-stone-200 px-4 py-2 text-sm transition-all duration-400 placeholder:text-stone-500 focus:outline-none focus:ring focus:ring-emerald-500 md:px-6 md:py-3 w-full'
        apiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}
        ref={wayPoint}
        onPlaceSelected={(place) => {
          handleUpdateWaypoints(id, place.formatted_address as string);
        }}
      />
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
