import { useEffect, useState } from 'react'
import { Button } from '../../../components/reusables/DefaultButton'
import DefaultInput from '../../../components/reusables/DefaultInput'
import CustomDropDown from '../../../components/reusables/dropdowns/CustomDropDown'
import Overlay from '../../../components/reusables/Overlay/Overlay'
import { fetchBranchData } from '../../../containers/branchesApis'
import { fetchRequestTerminal } from '../../../containers/terminalApis'
import { ErrorCard } from '../../../Utils/HttpResponseHandlers/error'
import successAlert from '../../../Utils/HttpResponseHandlers/success'
import { Storage } from '../../../Utils/Stores/inAppStorage'
import  { Toaster } from "react-hot-toast";
import Loading from '../../../components/Loading'

const TerminalRequest = ({toggleDropdown,isOpen}:any) => {
  const [branchList, setBranchList] = useState([])
  const [branch, setbranch] = useState('Choose the branch')
  const [branchId, setBranchId] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const [disableBtn, setdisableBtn] = useState<any>(true);
  const [loading, setLoading] = useState<any>(false);
  const [state, setState] = useState<any>({
    amount: "",
    description: "",
    giveMoreDetails: true,
    submittingError: false,
    isSubmitting: false,
    errorMssg: ""
})

const { amount, description, giveMoreDetails, submittingError, errorMssg, isSubmitting } = state
function displayBranchList() {
  fetchBranchData(0,1000).then((res)=>{
    //console.log(branchId,'from branches')
    setBranchList(res.content)
  }).catch((err)=>{
    console.error(err)
  })
}
useEffect(() => {
  if(branch!=='Choose the branch')
  fetchBranchData(0,1000).then((res)=>{
    if (res.content.some((item: any) => item?.name === branch)) {
      const matchingItem = res.content.find((item: any) => item?.name === branch);
      setBranchId(matchingItem.id);
    }
   // console.log(branchId,'from branches')
  })
}, [branch])
//console.log(branchList,'the branch list')


useEffect(() => {
  displayBranchList()
}, [])

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setState({
      ...state,
      [e.target.name]: e.target.value,
      submittingError: false
  });
  setdisableBtn(false);
}

const handleSubmit =async(e: React.FormEvent)=>{
  setLoading(true);
  e.preventDefault();
  //setisLoading(true)
  setState((state: any) => ({
      ...state,
      isSubmitting: true
  }))

  try {
    const response=await fetchRequestTerminal(branchId,amount,description,giveMoreDetails)
    //console.log(response)
    const successDetails={ title: "Request successful", text: "It is pending approval", icon: "" }
    successAlert(successDetails, {data:'',statusCode:'',message:'',errs:''});
    setLoading(false);
    setTimeout(() => window.location.reload(), 2000);
  } catch (err:any) {
    setLoading(false);
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
  setbranch('Choose the branch')
  setState({
    ...state,
    amount: "",
    description: "",
  })
}
}
//console.log(state,'the terminal state')
  return (
    <Overlay toggleDropdown={toggleDropdown} isOpen={isOpen}>
    <Toaster/>
        <p className="text-[20px]">Terminal Request</p>
        {isLoading?<Loading/>:
        <div className="grid gap-[20px] md:w-[342px]">
            <CustomDropDown label='Select Branch' options={branchList}
          value={branch}
          setValue={setbranch} />
            <DefaultInput label='No of Terminals Needed' placeHolder='No of Terminals Needed' name='amount' value={amount} handleChange={handleChange}/>
            <DefaultInput label='Describe Terminal Request' placeHolder='Description' name='description' value={description} handleChange={handleChange}/>
            <div className="">
            {/* <Button title='Request Terminal' onClick={handleSubmit}/> */}
            <button disabled={disableBtn} onClick={handleSubmit} className={`w-full rounded-lg bg-primary text-white py-[10px] px-[10px] mt-[20px] flex gap-2 items-center justify-center transition-all duration-500 hover:brightness-110 ${disableBtn && 'bg-blue-400 cursor-not-allowed'}`}>
                            <span>Request Terminal</span>
                            {
                                loading &&
                                <div role="status" className="ml-2">
                                    <svg aria-hidden="true"
                                        className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
                                        viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="currentColor" />
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentFill" />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            }
                        </button>
            </div>
        </div>
        
        }
    </Overlay>
  )
}

export default TerminalRequest