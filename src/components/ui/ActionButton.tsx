import React from 'react';

type ActionButtonPropsType = {
  handleClick: () => void;
  children: React.ReactNode;
  disabled: boolean;
};

const ActionButton = ({
  handleClick,
  children,
  disabled,
}: ActionButtonPropsType) => {
  return (
    <button
      className='px-4 py-3 md:px-6 md:py-4inline-block text-sm rounded-full bg-emerald-500 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-400 hover:bg-emerald-400 focus:bg-emerald-400 focus:outline-none focus:ring focus:ring-emerald-400 focus:ring-offset-2 disabled:bg-stone-400 disabled:cursor-not-allowed mb-1'
      disabled={disabled}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default ActionButton;
