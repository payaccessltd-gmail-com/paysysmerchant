import { useEffect, useState } from 'react'
import { Button } from '../../../components/reusables/DefaultButton'
import DefaultInput from '../../../components/reusables/DefaultInput'
import CustomDropDown from '../../../components/reusables/dropdowns/CustomDropDown'
import Overlay from '../../../components/reusables/Overlay/Overlay'
import { repairTerminalRequest } from '../../../containers/terminalApis'
import successAlert from '../../../Utils/HttpResponseHandlers/success'
import  { Toaster } from "react-hot-toast";
import Loading from '../../../components/Loading'

const RepairRequest = ({toggleDropdown,isOpen,data}:any) => {
  const [name, setname] = useState('')
  const [terminalId, setterminalId] = useState('')
  const [isLoading, setisLoading] = useState(false)
  const [state, setState] = useState<any>({
    submittingError: false,
    isSubmitting: false,
    errorMssg: ""
})
const { submittingError, errorMssg, isSubmitting } = state

 // console.log(data,'the data from terminal')
  useEffect(() => {
    if (typeof data ==="object" && data!==null) {
      const {name, terminalId} =data
      setterminalId(terminalId)
      setname(name)
    }
  }, [data])
  
    const [description, setDescription] = useState('')
   // console.log(description,'the description')

    const handleSubmit =async(e: React.FormEvent)=>{
      e.preventDefault();
      setisLoading(true)
      setState((state: any) => ({
          ...state,
          isSubmitting: true
      }))
    
      try {
        const response=await repairTerminalRequest(name,terminalId,description)
      //  console.log(response)
        const successDetails={ title: "Repair successful", text: "It is pending approval", icon: "" }
        successAlert(successDetails, {data:'',statusCode:'',message:'',errs:''});
      } catch (err:any) {
      if (err && err?.response?.data) {
        setState({
            ...state,
            submittingError: true,
            isSubmitting: false,
            errorMssg: err?.response?.data?.errorMssg || err?.response?.errorMssg || err?.response?.data?.respDescription || err?.response?.respDescription || "Action failed, please try again"
        })}
    }
    finally{
      setisLoading(false)
      setDescription('')
    }
    }
    return (
    <Overlay toggleDropdown={toggleDropdown} isOpen={isOpen}>
<Toaster/>
<p className="text-[20px]">
Repair Request
</p>
{isLoading?<Loading/>:
<div className="grid gap-[20px] md:w-[342px]">
          <div className="grid gap-1">
            <p className='mt-5'>Terminal</p>
            <div className="p-[20px] rounded-md bg-slate-200 grid ">
              <p className="font-semibold text-[30px]">{name}</p>
              <p className="">Terminal ID: {terminalId} </p>
            </div>
          </div>
            {/* <CustomDropDown label='Branch Name' options={options} value={branch} setValue={setbranch} /> */}
            
            <DefaultInput label='Describe Issue' placeHolder='Description' value={description} name='description' handleChange={(e:any)=>{
              setDescription(e.target.value)
            }}/>
            <div className="">
            <Button title='Request Terminal' onClick={handleSubmit}/>

            </div>
        </div>

}
    </Overlay>
  )
}

export default RepairRequest