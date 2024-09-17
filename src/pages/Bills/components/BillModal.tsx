import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { Image } from '../../../assets'
import Overlay from '../../../components/reusables/Overlay/Overlay'

const BillModal = ({toggleDropdown,isOpen}:any) => {
    const selectBill=['Utilities','Cable TV','Betting']
    const navigate=useNavigate()
    function handlePage(index:number) {
        if(index===0) navigate('utilities')
        if(index===1) navigate('cable')
        if(index===2) navigate('betting')
    }
  return (
    <Overlay toggleDropdown={toggleDropdown} isOpen={isOpen}>
        <p className="text-[20px] font-bold mb-5">Select Bill</p>
        {selectBill.map((val:any,index:any)=>(
        <div className=" flex justify-between items-center md:w-[400px] border-b-[1px] py-[20px] hover:cursor-pointer hover:bg-slate-200" onClick={()=>handlePage(index)}>
            <div className="flex gap-3 font-semibold text-[20]">
                <img src={Image.receipt} alt="" />
                <p>{val}</p>
            </div>
            <IoIosArrowForward/>
        </div>

        ))}
    </Overlay>
  )
}

export default BillModal