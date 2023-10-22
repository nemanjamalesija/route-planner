import { ForwardedRef, forwardRef } from 'react';
import Autocomplete from 'react-google-autocomplete';

type InputPropsType = {
  type: 'select' | 'auto-complete';
  id: string;
  placeholder: string;
  ref?: ForwardedRef<HTMLInputElement>;
  value?: string;
  handleOnChange?: React.Dispatch<React.SetStateAction<'DRIVING' | 'WALKING'>>;
  handleSetState?: React.Dispatch<React.SetStateAction<string>>;
};

const Input = forwardRef(
  (
    {
      type,
      id,
      placeholder,
      value,
      handleSetState,
      handleOnChange,
    }: InputPropsType,
    ref
  ) => {
    const baseClass =
      'rounded-md border border-stone-200 px-4 py-2 text-sm transition-all duration-400 placeholder:text-stone-500 focus:outline-none focus:ring focus:ring-emerald-500 md:px-6 md:py-3 w-full';

    if (type === 'auto-complete')
      return (
        <Autocomplete
          apiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}
          id={id}
          className={baseClass}
          type='text'
          placeholder={placeholder}
          ref={ref as ForwardedRef<HTMLInputElement>}
          onPlaceSelected={(place) => {
            // Sync origin and destination states with Autocomplete input refs
            handleSetState && handleSetState(place.formatted_address as string);
          }}
        />
      );

    if (type == 'select')
      return (
        <select
          id={id}
          className={baseClass}
          value={value}
          onChange={(e) =>
            handleOnChange &&
            handleOnChange(e.target.value as 'DRIVING' | 'WALKING')
          }
        >
          <option value='DRIVING'>Driving 🚗</option>
          <option value='WALKING'>Walking 🚶‍♂️</option>
        </select>
      );
  }
);

export default Input;
