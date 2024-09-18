import { IoCopyOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { BsArrow90DegUp } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import {useNavigate,useLocation} from 'react-router-dom'
import { useState } from "react";
import ReviewModal from "./ReviewModal";
import { Button } from "../../../components/reusables/DefaultButton";


const Preview = () => {
    const navigate= useNavigate()
    const [isOpen, setisOpen] = useState(false)
    const location=useLocation()
    const state=location.state || {}
    function toggleModal() {
        setisOpen(!isOpen)
    }
    const details=[{item:'Sent date',key:'27th May 2023'},{item:'Amount',key:'NGN 00.00'},{item:'Status',key:'Pending'},{item:'Offline reference',key:'TTT989900002377'}]
  return (
    // <Modal show={show} clicked={toggleDropDown}>
    <div className="px-[9%] py-[6%]">
<div className="flex gap-2 items-center text-[14px] cursor-pointer" onClick={()=>navigate(-1)}>
<IoIosArrowBack />
    Back
</div>

      <div className="m-auto text-center w-full grid gap-[24px] items-start h-[80vh] lg:w-[60vw] mb-[50px]">
        <div className="border-[1px] rounded-lg w-[60px] m-auto h-[60px] ">
          <img src="" alt="logo" className="object-cover " />
        </div>
        <div>
        <p className="text-[#555555] text-[16px] ">
          A request has been sent out to{" "}
        </p>
        <p className="text-[16px] text-secondary">Faitholuwande</p>

        </div>

        <p className="font-bold text-[#555555]">NGN 00.00</p>
        <div className="w-[100%] border-[1px] border-dotted  border-[#999999] h-fit"></div>

<div className="flex  items-center justify-between  py-[20px] ">
        <div className="w-3/4  m-auto">
<div className="grid text-left m-auto">
    <p className="text-[#0C394B] text-[16px] font-bold">Invoice Link</p>
    <div className="flex items-center w-full">
    <div className="border-[1px] rounded-md py-[25px] px-[5%] border-[#A1CBDE] w-full">
        <p className=" text-[#555555] text-[16px]">TTT989900002827636363653377</p>
    </div>
    <IoCopyOutline className="ml-[-8%] cursor-pointer"/>
    </div>
</div>
        </div>
        {Object.keys(state).length &&
        <Button title='Send reminder' className='!w-fit'/>
}
</div>
<div className="w-[100%] border-[1px] border-dotted  border-[#999999] h-fit"></div>

<div className="grid gap-[40px]">
    {details.map((val,index)=>(
    <div className="flex justify-between items-center" key={index}>
        <p className="text-[#0C394B] text-[16px]">{val.item}</p>
        <p className="text-[#0C394B] text-[20px] font-bold">{val.key}</p>
    </div>

    ))}
</div>
<div className="w-[100%] border-[1px] border-dotted  border-[#999999] h-fit"></div>

<div className="w-3/4 m-auto ">
    <div className="w-3/4 flex items-center m-auto gap-[12px] justify-center">
        <button className="border-[1px] border-[#D3EEF9] rounded-lg px-[24px] py-[10px] flex items-center gap-[10px] text-[12px] text-[#363939] bg-[#F6FDFF]">
        <FiEdit />
        <p>Edit</p>
        </button>
        {Object.keys(state).length &&
    <button className="border-[1px] border-[#D3EEF9] rounded-lg px-[24px] py-[10px] flex items-center gap-[10px] text-[12px] text-[#363939] bg-[#F6FDFF]">
        <BsArrow90DegUp />
        <p>Mark as paid</p>
        </button>
}
        <button className="border-[1px] border-[#D3EEF9] rounded-lg px-[24px] py-[10px] flex items-center gap-[10px] text-[12px] text-[#363939] bg-[#F6FDFF]">
        <BsArrow90DegUp />
        <p>Delete</p>
        </button>

    </div>
{!Object.keys(state).length &&
<div className="grid gap-[20px]">

<Button title='Send Invoice' onClick={toggleModal}/>
<Button title='Save as Draft' className='!bg-white !text-secondary !border-secondary border-[1px]' />
</div>

}
</div>
      </div>
      <ReviewModal show={isOpen} clicked={toggleModal} />
</div>
    // </Modal>
  );
};

export default Preview;
