/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment } from "react";
import {  Transition,Menu } from '@headlessui/react'

import {IoIosArrowDown} from 'react-icons/io'

const CustomDropDown = ({title,options,value,setValue,label,setId,onHandleChange,extra=(()=>{})}:any) => {

    return (
        <div className="w-full">
          <p className="text-[#344054]">
          {label}

          </p>
            <Menu as='div' className='relative'>
            <Menu.Button className="inline-flex w-full justify-between border-[1px] border-[#3C425729] rounded-md bg-white bg-opacity-20 px-4 py-[12px] text-sm text-black hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 mt-1 h-fit overflow-auto">
            {value}
            <IoIosArrowDown
              className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
          <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
             <Menu.Items className="absolute right-[0] z-10 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none grid gap-[10px] overflow-auto">
            <div className="px-1 py-1 grid gap-1 max-h-[200px] overflow-y-auto">
                {options.map((val:any)=>(
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${ 
                      active || value===val ? 'bg-primary text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm  ${value===val }`}
                    

                    onClick={()=>{
                      setValue(typeof val === 'object' ? val.name : val);
                  // setId(typeof val === 'object' && val.merchantId)
                  }}
                  >
                    {typeof val === 'object' ? val.name : val}
                  </button>
                )}
              </Menu.Item>

                ))}
              </div>
              </Menu.Items>
        </Transition>
            </Menu>
        </div>



    );
};

export default CustomDropDown;