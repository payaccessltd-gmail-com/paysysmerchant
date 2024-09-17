import { useEffect, useState } from 'react'
import { Button } from '../../../components/reusables/DefaultButton'
import DefaultInput from '../../../components/reusables/DefaultInput'
import Overlay from '../../../components/reusables/Overlay/Overlay'
import { Storage } from '../../../Utils/Stores/inAppStorage'
import { apiCall } from '../../../Utils/URLs/axios.index'
import { Toaster } from "react-hot-toast";
import { ErrorCard } from '../../../Utils/HttpResponseHandlers/error'

const NewBranch = ({ toggleDropdown, isOpen, setRefresh }: any) => {
  const { merchantDetails } = Storage.getItem("userDetails") || {}
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const [state, setState] = useState<any>({
    email: "",
    branchName: "",
    description: "",
    phone: "",
    address: "",
    submittingError: false,
    isSubmitting: false,
    errorMssg: ""
  })
  const [allowSubmit, setSubmit] = useState(true);
  const [disableBtn, setDisableBtn] = useState<any>(true);
  const [loading, setLoading] = useState<any>(false);

  const { email, branchName, description, phone, address, submittingError, errorMssg, isSubmitting } = state

  useEffect(() => {
    setState({
      ...state,
      email: merchantDetails.email,
      phone: merchantDetails.phone
    });
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
      submittingError: false
    });
    setDisableBtn(false);
  }
  const errormessage = branchName === '' ? 'Please provide branch name' : 'Please provide email '

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    setState((state: any) => ({
      ...state,
      isSubmitting: true
    }))
    if (branchName === '') {
      setState((state: any) => ({
        ...state,
        isSubmitting: false,
        errorMssg: errormessage,
        submittingError: true
      }));
    } else if (email === '') {
      setState((state: any) => ({
        ...state,
        isSubmitting: false,
        errorMssg: errormessage,
        submittingError: true
      }));
    } else if (email?.match(mailformat) === null) {
      setState((state: any) => ({
        ...state,
        isSubmitting: false,
        errorMssg: 'Please input a valid email',
        submittingError: true
      }));
    } else {
      try {
        const response = await apiCall({
          name: "createBranch",
          data: {
            name: branchName?.replace(/\s+/g, ' ').trim(),
            description: description?.replace(/\s+/g, ' ').trim(),
            address,
            email: email?.replace(/\s+/g, ' ').trim(),
            phone,
            username: email?.replace(/\s+/g, ' ').trim(),
          },
          action: (): any => {
            setState({
              ...state,
              isSubmitting: false,
              submittingError: false,
            })
            return []
          },
          successDetails: { title: "New Branch Created", text: "Congratulations, Your new branch has been created.", icon: "" },
          errorAction: (err?: any) => {
            setLoading(false);
            if (err && err?.response?.data) {
              setState({
                ...state,
                submittingError: true,
                isSubmitting: false,
                errorMssg: err.response?.data?.respDescription || "Action failed, please try again"
              })
              return ["skip"]
            } else {
              setState({
                ...state,
                submittingError: true,
                isSubmitting: false,
                errorMssg: "Action failed, please try again"
              })
            }
          }
        })
          .then(async (res: any) => {
            setLoading(false);
            // showModal();
            setRefresh(true)
            setState({
              email: "",
              password: "",
              branchName: "",
              description: "",
              phone: "",
              address: "",
              submittingError: false,
              isSubmitting: false,
              errorMssg: ""
            });
            setTimeout(() => {
              // Your code to close the dropdown
              toggleDropdown();
              window.location.reload();
            }, 2000);
            // window.location.reload();
          })
      } catch (e) {
        console.error(e + " 'Caught Error.'");
      };

    }
  }

  return (
    <Overlay toggleDropdown={toggleDropdown} isOpen={isOpen}>
      <Toaster />
      <p className="text-[20px]">Add Branch</p>
      <ErrorCard handleClear={() => setState({ ...state, submittingError: false })} error={errorMssg} containerVariant={!submittingError ? "hidden" : "mb-2"} />

      <div className="grid gap-[20px] md:w-[342px] max-h-[400px] overflow-auto">
        <DefaultInput label='Branch Name' placeHolder='Branch Name' name='branchName' value={branchName} handleChange={handleChange} />
        <DefaultInput label='Description' placeHolder='Description' name='description' value={description} handleChange={handleChange} />
        <DefaultInput label='Branch Address' placeHolder='Branch Address' name='address' value={address} handleChange={handleChange} />
        <DefaultInput label='Contact Email Address' placeHolder=' Email Address' name='email' value={email} handleChange={handleChange} />
        <DefaultInput label='Contact Phone Number' placeHolder=' Phone Number' name='phone' value={phone} handleChange={handleChange} />
        {/* <Button title='Create Branch' onClick={handleSubmit}/> */}
        {/* <button onClick={handleSubmit} disabled={disableBtn} className={`w-full rounded-lg bg-primary text-white py-[10px] px-[10px] mt-[20px] flex gap-2 items-center justify-center transition-all duration-500 hover:brightness-110 ${disableBtn && 'bg-blue-400 cursor-not-allowed'}`}  >
          Submit
        </button> */}
           <button disabled={disableBtn} onClick={handleSubmit} className={`w-full rounded-lg bg-primary text-white py-[10px] px-[10px] mt-[20px] flex gap-2 items-center justify-center transition-all duration-500 hover:brightness-110 ${disableBtn && 'bg-blue-400 cursor-not-allowed'}`}>
                            <span>Submit</span>
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
    </Overlay>
  )
}

export default NewBranch