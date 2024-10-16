import React, { useState, useEffect } from 'react';
import NavBarItems from '../../components/reusables/NavBarItems';
import RegistrationSideBar from '../../components/reusables/RegistrationSideBar';
import { useNavigate } from 'react-router-dom';
import DefaultInput from '../../components/reusables/DefaultInput';
import { apiCall } from '../../Utils/URLs/axios.index';
import { ErrorCard } from '../../Utils/HttpResponseHandlers/error';
import axios from 'axios';

function DocumentUpload() {
    const navigate = useNavigate();
    const [userIds, setUserIds] = useState<any>(0);
    const [fileName, setFileName] = useState('');
    const [uploadedUrl, setUploadedUrl] = useState<any>('');

    useEffect(() => {
        const getUserDetails: any = localStorage.getItem('userDetails');
        const parseDetails = JSON.parse(getUserDetails);
        setUserIds(parseDetails?.userId)
    })
    function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
        setState({
            ...state,
            [e.target.name]: e.target.value,
            submittingError: false
        });
    }
    const { userId }: any = localStorage.getItem("userDetails") || { onboardingStage: "", userId: 0, firstName: "", lastName: "" }

    const [state, setState] = useState<any>({
        selectedFile: null,
        uploadPreset: 'unsigned_upload',
        rcNumber: "",
        check: false,
        submittingError: false,
        isSubmitting: false,
        isDisabled: false,
        inputTypeError: false,
        errorMssg: ""
    })
    const [errorMsg, setErrorMssg] = useState<any>(null);

    const { selectedFile,  uploadPreset, rcNumber, check, submittingError, isDisabled, isSubmitting, errorMssg } = state;

    const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement> | any) => {
        const file = e?.target?.files[0] || null;
        setFileName(file?.name);
        let fileLabel: Element | null = document.querySelector("p.name");
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        fileLabel ? fileLabel.innerHTML = file?.name : null
        setState({
            ...state,
            selectedFile: file,
            inputTypeError: false
        })
    }

    useEffect(() => {
        const handleBackButton = (event: any) => {
            event.preventDefault();
        };
        window.history.pushState({ page: 'myComponent' }, '', '');
        window.addEventListener('popstate', handleBackButton);
        return () => {
            window.removeEventListener('popstate', handleBackButton);
        };
    }, []);

    const handelSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState((state: any) => ({
            ...state,
            isSubmitting: true
        }))

        let formData = new FormData();
        state?.selectedFile && formData.append(
            'merchantId',
            userIds || ""
        )
        state?.selectedFile && formData.append(
            'rcNumber',  rcNumber || "1"
        )
        state?.selectedFile && formData.append(
            'cacDoc',
            state?.selectedFile,
            state?.selectedFile?.name
        )

      
        state?.selectedFile && formData.append(
            'file',
            selectedFile || ""
        )
         state?.selectedFile && formData.append(
             'uploadedUrl',
             uploadedUrl || ""
         )

        state?.selectedFile && formData.append(
            'upload_preset',
            uploadPreset || "unsigned_upload"
        )
        

        try {
            const response = await axios.post(
              `https://api.cloudinary.com/v1_1/dc2zavmxp/upload`, 
              formData
            );
            setUploadedUrl(response.data.secure_url);
            console.log('File uploaded successfully');
          }  catch (e) {
            console.error(e + " 'Caught Error.'");
        };
    }

    return (
        <div>
            <NavBarItems />
            <div className="md:flex">
                <aside className="md:w-1/4 p-4 hidden sm:block">
                    <RegistrationSideBar />
                </aside>
                <main className="md:flex-1 p-4 my-2">
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4">
                        <div className="p-4">
                            <p className="text-xl">Document Upload</p>
                            {/* <p className="text-sm text-gray-400">Create a PIN to authenticate your transactions</p> */}
                        </div>
                        <div className="p-4  mt-[-25px]">
                            <p className="text-sm text-gray-400 lg:w-1/3 w-72">
                                <DefaultInput
                                    type="text"
                                    label="RC Number"
                                    required={true}
                                    placeHolder="Enter RC Number"
                                    name="rcNumber"
                                    value={rcNumber}
                                    handleChange={handleChange}
                                />
                            </p>
                        </div>
                        <div className="p-4  mt-[-25px]">
                            <p className="text-base text-sm">Document Upload</p>
                            <p className='text-sm text-gray-400'>
                                <div className="flex">
                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-50 h-10 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-100 hover:bg-gray-100 dark:border-gray-300">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6 min-w-[280px] sm:min-w-[320px]">
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 ">
                                                <span className="font-semibold">📰</span>  {fileName?.length < 2 ? "Drop your file here or choose a file" : `${fileName} has been selected!`}
                                            </p>
                                        </div>
                                        <input id="dropzone-file" type="file" className="hidden" onChange={handleChangeFile} />
                                    </label>
                                </div>

                            </p>
                        </div>

                        <div className="p-4 ">
                            <p className='lg:w-1/3'>
                                <ErrorCard handleClear={() => setState({ ...state, submittingError: false })} error={errorMsg} containerVariant={!submittingError ? "hidden" : ""} />
                            </p>
                            <br />
                            <button onClick={handelSubmit} className="lg:w-1/3 w-72 h-12  rounded-md bg-primary text-white transition-all duration-500 hover:scale-105 hover:brightness-110">Continue</button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default DocumentUpload