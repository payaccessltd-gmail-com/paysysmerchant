import { useState } from 'react'
import { Button } from '../../../components/reusables/DefaultButton'
import DefaultInput from '../../../components/reusables/DefaultInput'
import Overlay from '../../../components/reusables/Overlay/Overlay'
import { Storage } from '../../../Utils/Stores/inAppStorage'
import { apiCall } from '../../../Utils/URLs/axios.index'
import { FaArrowLeft } from 'react-icons/fa'
import { Image } from '../../../assets'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import useCloudinaryUpload from '../../../components/reusables/UploadFile/useCloudinaryUpload'

const UpdateBusinessReg = ({toggleDropdown,isOpen}:any) => {
    const [file, setFile] = useState<any>(null);
    const [uploadedUrl, setUploadedUrl] = useState<string>('');

    const { uploadFile, isLoading, error } = useCloudinaryUpload();
    const handleUpload = async () => {
        if (!file) return;
        console.log("file")
        const response = await uploadFile(file);
        if (response) {
            setUploadedUrl(response.secure_url);
        }

        };
        useEffect(() => {
            handleUpload()
        })
    const { onboardingStage, userId, lastName } = Storage.getItem("userDetails") || { onboardingStage: "", userId: 0, firstName: "", lastName: "" }
    const [state, setState] = useState<any>({
        selectedFile: null, 
        rcNumber: "",
        check: false,
        submittingError: false,
        isSubmitting: false,
        isDisabled: false,
        inputTypeError: false,
        errorMssg: ""
    })

    const showModalFunc = () => {
        setState({
            selectedFile: null,
            rcNumber: "",
            check: false,
            submittingError: false,
            isSubmitting: false,
            isDisabled: false,
            inputTypeError: false,
            errorMssg: ""
        })
        toggleDropdown()
        // showModal();
    }

    const { selectedFile, rcNumber, check, submittingError, isDisabled, isSubmitting, errorMssg } = state

    //Handle assertions functions
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
            submittingError: false
        });
    }

    const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement> | any) => {
        const file = e?.target?.files[0] || null;
        setFile(file)
        let fileLabel: Element | null = document.querySelector("p.name");
        if(fileLabel){
            fileLabel.innerHTML = file?.name
        } else return null
        // fileLabel ? fileLabel.innerHTML = file?.name : null
        setState({
            ...state,
            selectedFile: file,
            inputTypeError: false
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState((state: any) => ({
            ...state,
            isSubmitting: true
        }))

        let formData = new FormData();
        state?.selectedFile && formData.append(
            'merchantId',
            userId || ""
        )
        state?.selectedFile && formData.append(
            'rcNumber',
            rcNumber || "1"
        )
        state?.selectedFile && formData.append(
            'cacDoc',
            state?.selectedFile,
            state?.selectedFile?.name
        )
        state?.selectedFile && formData.append(
            'UploadUrl', uploadedUrl || ""
        )
        try {
            const response = await apiCall({
                name: "uploadRegDoc",
                data: formData,
                action: (): any => {
                    setState({
                        ...state,
                        isSubmitting: false,
                        submittingError: false,
                    });
                    // router.push(`/create-business/${busType}?stage=addBank`)
                    setTimeout(() => {
                        showModalFunc()
                        
                    }, 3000);
                    return []
                },
                successDetails: {
                    title: "Documents Submitted",
                    text: `Your Business Registration documents have been submitted for review`,
                    icon: ""
                },
                errorAction: (err?: any) => {
                    if (err && err?.response?.data) {
                        setState({
                            ...state,
                            submittingError: true,
                            isSubmitting: false,
                            errorMssg: err?.response?.data?.errorMssg || err?.response?.errorMssg || err?.response?.data?.respDescription || err?.response?.respDescription || "Action failed, please try again"
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
                    setState({
                        submittingError: false,
                        isSubmitting: false,
                        errorMssg: ""
                    })
                })
        } catch (e) {
            console.error(e + " 'Caught Error.'");
        };
    }
  return (
    <Overlay toggleDropdown={showModalFunc} isOpen={isOpen}>
      <Toaster/>

                    <div className="w-full  max-w-[700px] flex flex-col items-center justify-center overflow-y-flow ">

                        {/* <div className="flex flex-row justify-start w-full h-full bg-primary-white rounded-xl backdrop-blur-sm "> */}
                            
                            <div className=" w-full h-full flex flex-col justify-between gap-4">
                                <div>
                                    <p className=' w-fit text-xl font-600 '>Business Registration Document</p>
                                    <p className='text-gray-400  w-fit text-base font-400 leading-7 mt-3'>Please, upload required Business documents below</p>
                                </div>
                                <div className="flex flex-row gap-5 w-full mb-5">
                                    <div className="flex flex-col gap-2 w-full" >
                                        <DefaultInput
                                            type="text"
                                            name="rcNumber"
                                            value={rcNumber}
                                            label={"RC Number"}
                                            // topLabel={"RC Number"}
                                            handleChange={handleChange}
                                            placeholder="Enter your Registration Number"
                                            containerVariant="mt-5"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col  w-full ">
                                        <div className="flex items-center justify-center w-full">
                                            <label htmlFor="dropzone-file2" className="flex flex-col items-center justify-center w-full h-fit rounded-lg cursor-pointer ">
                                                <div className='h-5/6 p-6 pb-8 rounded-lg shadow-[0px_2px_80px_rgba(100,108,156,0.125)] flex flex-col justify-between dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'>
                                                <img src={Image.UploadFile} alt="" className='w-full h-full' />
                                                </div>
                                                <input id="dropzone-file2" type="file" className="hidden" onChange={handleChangeFile} />
                                            </label>
                                        </div>
                                        {!selectedFile ? null :
                                            <div className='h-fit p-3 rounded-lg flex-row justify-between bg-[#FDfAFA] border border-gray-200 '>
                                                <p className='text-gray-800  w-fit text-base font-400 '>File uploaded</p>
                                                <p className='text-gray-400  w-fit text-base font-400 mt-2 name max-w-fit'>{selectedFile?.name || "File"}</p>
                                            </div>
                                        }
                                    </div>
                                    {/* <LoginErrorCard handleClear={() => setState({ ...state, submittingError: false })} error={errorMssg} containerVariant={!submittingError ? "hidden" : ""} /> */}
                                    {/* <div className="flex flex-row items-center justify-center gap-8"> */}
                                        <Button
                                            title="Submit Document"
                                            isLoading={isSubmitting}
                                            onClick={handleSubmit}
                                        />
                                    {/* </div> */}

                            </div>
                        {/* </div> */}
                    </div>
    </Overlay>
  )
}

export default UpdateBusinessReg