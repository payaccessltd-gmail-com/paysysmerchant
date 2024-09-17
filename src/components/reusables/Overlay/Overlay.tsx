import { AiFillCloseCircle } from 'react-icons/ai';
import { SpinnerIcon } from '../icons';


const Overlay = ({ toggleDropdown,children,isOpen,isLoading}: any) => {
    
  const handleModalClick = (event: React.MouseEvent) => {
    // Prevent event propagation to the backdrop element
    event.stopPropagation();
  };

  return (
    <div className={`fixed h-screen overflow-y-auto flex justify-center items-center inset-0 p-0 transform delay-100 transition-all duration-300  ${isOpen
      ? "opacity-100 translate-y-0"
      : "opacity-0 -translate-y-full"}`}>
          <div
            className=" w-screen h-screen fixed inset-0 z-30 backdrop-blur-[1.6px] "
            onClick={toggleDropdown}
          ></div>
          <div className=" bg-white py-[32px] px-[15px]  md:p-[32px] rounded-[16px] gap-[10px] text-[16px] fixed z-40 shadow-sm grid  mx-[25px] border-[1px] w-[calc(100%-50px)] md:w-fit" onClick={handleModalClick}>
            <div
              className="absolute right-[2%] top-[2%] hover:cursor-pointer"
              onClick={toggleDropdown}
            >
              <AiFillCloseCircle size="25px" className='hover:text-red-400 transition-all duration-500 ease-in-out text-[#C0D1D9]' />
            </div>
            {isLoading?<div className="m-auto w-fit  grid items-center">
      <div className="m-auto text-center">
      <SpinnerIcon className='m-auto'/>
      <p>Loading...</p>
      </div>
      </div>:
            <div className="scrollbar-track scrollbar-thumb-gray-300 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">

              {children}
            </div>
            }
            
            
          </div>
        </div>
  )
}

export default Overlay