import { useState } from 'react'
import {TiTick} from 'react-icons/ti'
import UpdateBusinessReg from './UpdateBusinessReg'
import UpdateIdentification from './UpdateIdentification'
import UpdateUtility from './UpdateUtility'
const KYC = () => {
  const [businessReg, setbusinessReg] = useState(false)
  const [updateUtility, setUpdateUtility] = useState(false)
  const [updateIdentification, setUpdateIdentification] = useState(false)
    const [check, setCheck] = useState({certificate:true,utility:true,identification:true})
    const {certificate,utility,identification}= check
    function onChange(e:any) {
        const {name,checked}=e.target
        setCheck((prevState:any) => ({
            ...prevState,
            [name]: checked,
          }))
    }

    function toggleBusinessReg() {
      setbusinessReg(!businessReg)
    }
    function toggleUpdateUtility() {
      setUpdateUtility(!updateUtility)
    }
    function toggleUpdateIdentification() {
      setUpdateIdentification(!updateIdentification)
    }

    function DisplayingModal (val:number){
      if(val===0) toggleBusinessReg()
      if(val===1) toggleUpdateIdentification()
      if(val===2) toggleUpdateUtility()
    }

    const array=[{val:'Certificate of Business Name',name:'certificate',checked:certificate},{val:'Means of Identification',name:'identification',checked:identification} ,{val:'Utility Document',name:'utility',checked:utility},]
  return (
    <div className='mt-10 grid gap-[30px]'>
        {array.map((value,index)=>(
            <div className=" relative text-[20px] text-[#656C75]">
                <p className="text-base flex items-center gap-2  hover:cursor-pointer" key={index} onClick={()=>DisplayingModal(index)}><input type="checkbox" className="w-4 h-4 rounded-full border-[1px] appearance-none checked:bg-primary checked:border-transparent hover:cursor-pointer "  name={value.name}
                  checked={value.checked} onChange={(e)=>onChange(e)}/>{value.checked && <TiTick className='absolute top-[3.5px] left-0 text-white hover:cursor-pointer' onClick={()=>{setCheck((prevState:any) => ({
                    ...prevState,
                    [value.name]: !value.checked,
                  }))}}/>} {value.val}</p>
            </div>

        ))}
        <UpdateBusinessReg toggleDropdown={toggleBusinessReg} isOpen={businessReg}/>
        <UpdateIdentification toggleDropdown={toggleUpdateIdentification} isOpen={updateIdentification}/>
        <UpdateUtility toggleDropdown={toggleUpdateUtility} isOpen={updateUtility}/>
    </div>
  )
}

export default KYC