import React from 'react'

import { BsExclamationCircle } from "react-icons/bs";
import {useNavigate} from 'react-router-dom'
import { Button } from '../../../components/reusables/DefaultButton';
import Modal from '../../../components/reusables/modal/Modal';


const ReviewModal = ({show,clicked}:any) => {
    const navigate= useNavigate()

  return (
    <Modal show={show} clicked={clicked}>
        <div className="p-[20%] w-fit lg:w-[30vw] grid-[20px] text-center">
            <div className="p-2 rounded-full bg-[#F2FCF2] text-[#25AF36] m-auto w-fit text-[20px]">
            <BsExclamationCircle />
            </div>
            <p className="text-[#101828] font-bold text-[20px]">Review</p>
            <p className="w-3/4 m-auto text-[#667085] text-[14px]">You are about to request an open-invoice form faitholuwande1@gmail.com</p>

            <Button title='Send Invoice' onClick={()=>navigate('/invoice')}/>
            <Button title='Cancel' className='!text-[#344054] !bg-white !border-[#D0D5DD] border-[1px]' onClick={clicked} />
        </div>
    </Modal>
  )
}

export default ReviewModal