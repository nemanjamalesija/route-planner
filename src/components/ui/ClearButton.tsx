import { FaTimes } from 'react-icons/fa';

type ClearButtonProps = {
  onClear: () => void;
  disabled: boolean;
};

const ClearButton = ({ onClear, disabled }: ClearButtonProps) => {
  return (
    <button
      className='disabled:cursor-not-allowed'
      aria-label='center back'
      onClick={onClear}
      disabled={disabled}
    >
      <FaTimes color={disabled ? '#a8a29e' : '#ef4444'} size='32px' />
    </button>
  );
};

export default ClearButton;
