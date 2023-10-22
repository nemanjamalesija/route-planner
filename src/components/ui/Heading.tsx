import { HiMiniMapPin } from 'react-icons/hi2';

const Heading = () => {
  return (
    <h1 className='text-white text-2xl font-semibold text-center mb-6 flex items-center justify-center gap-2'>
      <HiMiniMapPin color='#10b981' size='32px' />

      <span>Route planner</span>
    </h1>
  );
};

export default Heading;
