const DistanceDurationInfo = ({
  distance,
  duration,
}: {
  distance: string;
  duration: string;
}) => {
  return (
    <div className='gap-2 flex flex-col mt-8'>
      <p className='text-base text-white'>
        Distance to your location: {distance} km.
      </p>
      <p className='text-base text-white'>
        Estimated travel duration: {duration} hours.
      </p>
    </div>
  );
};

export default DistanceDurationInfo;
