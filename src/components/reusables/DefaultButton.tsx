import { SpinnerIcon } from "./icons";

export const Button = ({ title, className,onClick,icon, disable,isLoading,isDisabled}: any) => {
  return (
    <button
      className={`w-full rounded-lg bg-primary text-white py-[10px] px-[10px] mt-[20px] ${className} flex gap-2 items-center justify-center transition-all duration-500 hover:scale-105 hover:brightness-110 ${isDisabled && 'bg-opacity-40 cursor-not-allowed'}`}  onClick={onClick}
      disabled={isDisabled||false}
    >
      {icon}
      {isLoading?<div className="flex gap-2 items-center">
      <SpinnerIcon />
      <p>Loading...</p>
      </div>:title}
      {disable}
    </button>
  );
};
