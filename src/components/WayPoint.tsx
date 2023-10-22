import { FaTimes } from 'react-icons/fa';
import { Autocomplete } from '@react-google-maps/api';

const WayPoint = () => {
  return (
    <div className='relative w-full'>
      <Autocomplete>
        <input
          id='wayPoint'
          className='rounded-md border border-stone-200 px-4 py-2 text-sm transition-all duration-400 placeholder:text-stone-500 focus:outline-none focus:ring focus:ring-emerald-500 md:px-6 md:py-3 w-full'
          type='text'
          placeholder='Stop location'
        />
      </Autocomplete>
      <button aria-label='center back' className='absolute top-4 right-2'>
        <FaTimes color='#020617' size='16px' />
      </button>
    </div>
  );
};

export default WayPoint;
