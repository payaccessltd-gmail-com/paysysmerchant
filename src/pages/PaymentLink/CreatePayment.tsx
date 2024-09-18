import { useEffect, useState } from "react"
import { Button } from "../../components/reusables/DefaultButton"
import DefaultInput from "../../components/reusables/DefaultInput"
import DefaultTextArea from "../../components/reusables/DefaultTextArea"
import Overlay from "../../components/reusables/Overlay/Overlay"
//import { createPayment } from "../../containers/paymentLinkAPI"


const CreatePayment = ({ clicked, show }: any) => {
  const businessId:any=localStorage.getItem('businessID')

  const [state, setstate] = useState({
    amount:'',
    description:'',
    branchId:'',
    businessId:'',
    invoiceId:'',
    expiryDate:'',
    linkType:'',
    bankName:'',
    accountName:'',
    accountNo:'',
    spitRation:'',
    option:'',
    submittingError:false
  })

  const {amount,description,branchId,invoiceId,expiryDate,linkType}=state

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>| React.ChangeEvent<HTMLSelectElement>) => {
    setstate({
        ...state,
        [e.target.name]: e.target.value,
        submittingError: false
    });
}

async function handleSubmit() {
  // try {
  //   const res=await createPayment(amount,description,branchId,expiryDate,linkType,invoiceId,businessId)
  //   console.log(res)
  //   clicked()
  // } catch (error:any) {
  //   console.log(error)
  // }
}

const linkOptions=['RECURRENT','ONETIME','TIMED']

  return (
    <Overlay isOpen={show} toggleDropdown={clicked} >
      <div className="grid gap-[20px] w-[90vw] md:w-[50vw] ">
        <div className="grid">
          <p className="text-[#5C5F61] text-[30px] font-bold">Create Payment Link</p>
          <p className="text-[#07222D] text-[14px]">Complete and enter the following form below  </p>
        </div>

        <DefaultInput label='Amount' placeHolder='Input Amount' value={amount} name='amount' handleChange={handleChange} />
        <DefaultTextArea label='Desciption' placeHolder='oluchi chukwu' value={description} name='description' handleChange={handleChange} id={""} />
        <DefaultInput label='Branch ID' placeHolder='09' value={branchId} name='branchId' handleChange={handleChange} />
        <DefaultInput label='Invoice ID' placeHolder='20.0%' value={invoiceId} name='invoiceId' handleChange={handleChange} />
        {/* gshdghdssgghsgdsg */}
        <div className="form-group mb-4 cursor-pointer">
          <label className="block text-gray-600 text-sm mb-2" htmlFor="dropdown">Select Link Type</label>
          <select className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="dropdown" value={linkType} name='linkType' onChange={handleChange} >
          <option value="">--select payment link--</option>
            {linkOptions.map((val,index)=>(
                <option key={index} value={val}>{val}</option>
            ))}
           
          </select>
        </div>

{linkType==='TIMED'&&
<DefaultInput label='Expiry Date' placeHolder='20.0%' type='date' value={expiryDate} name='expiryDate' handleChange={handleChange} />
}

        


        {/* ghghghgh */}
        <div className="m-auto w-3/4">
          <Button title='Continue' onClick={handleSubmit} />
        </div>
      </div>
    </Overlay>
  )
}

export default CreatePayment