import React, { useState, useEffect } from 'react';
import NavBarItems from '../../components/reusables/NavBarItems';
import RegistrationSideBar from '../../components/reusables/RegistrationSideBar';
import { useNavigate } from 'react-router-dom';
import DefaultInput from '../../components/reusables/DefaultInput';
import CustomDropDown from '../../components/reusables/dropdowns/CustomDropDown';
import { apiCall } from '../../Utils/URLs/axios.index';
import { ErrorCard } from '../../Utils/HttpResponseHandlers/error';
import { confirmBVN } from '../../containers/merchantOnboardingApis';

function DirectorProfile() {
    const navigate = useNavigate();
    const [userIds, setUserIds] = useState<any>(0);

    useEffect(() => {
        const getUserDetails: any = localStorage.getItem('userDetails');
        const parseDetails = JSON.parse(getUserDetails);
        setUserIds(parseDetails?.userId)
    })

  
    const [showUplaod, setShowUplaod] = useState<any>(false);
    const [errMsg, setErrorMsg] = useState<any>("");
    const [showError, setShowError] = useState<any>(false);
    const [showError2, setShowError2] = useState<any>(false);
    const [errorMsg, setErrorMssg] = useState<any>(null);
    const [bvnName, setBvname] = useState<any>("");
    const [fileName, setFileName] = useState('');
    const [state, setState] = useState<any>({
        selectedFile: null,
        identityType: "",
        name: "",
        phone: "",
        nin: "",
        stage: "",
        bvn: "",
        phoneNumber: "",
        check: false,
        submittingError: false,
        isSubmitting: false,
        isDisabled: false,
        errorMssg: ""
    })
    const { name, phone, nin, stage, bvn, check, submittingError, isDisabled, isSubmitting, errorMssg } = state;
    const { userId }: any = localStorage.getItem("userDetails") || { onboardingStage: "", userId: 0, firstName: "", lastName: "" }

    const { selectedFile } = state;
    const [identityType, setIdentityType] = useState('Select Type ID');

    const options = [
        "NIN",
        "PASSPORT",
        "VOTERS_CARD",
        "DRIVERS_LISCENCE"
    ]

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
        const handleBackButton = (event:any) => {
          event.preventDefault(); 
        };
        window.history.pushState({ page: 'myComponent' }, '', '');
        window.addEventListener('popstate', handleBackButton);
        return () => {
          window.removeEventListener('popstate', handleBackButton);
        };
      }, []); 

    function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
        setState({
            ...state,
            [e.target.name]: e.target.value,
            submittingError: false
        });
        const inputBVN= (document.getElementById('bvn') as HTMLInputElement)?.value;
        if(inputBVN?.length === 11){
            confirmBVN(inputBVN).then((res: any) => {
                setBvname(`${res?.firstNameField} ${res?.lastNameField} ${res?.middleNameField}` || "N/A");
                setTimeout(() => setBvname(null), 7000);
            }).catch((err: any) => {
                console.error("API err>>", err);
            })
           }
    }



    const handelSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState((state: any) => ({
            ...state,
            isSubmitting: true
        }))
        try {
            setShowUplaod(true);
            const response = await apiCall({
                name: "selfOnboarding",
                data: {
                    name,
                    phone,
                    bvn,
                    nin,
                    stage: "directors_details"
                },
                action: (): any => {
                    setState({
                        ...state,
                        isSubmitting: false,
                        submittingError: false,
                    });

                    // router.push(`/create-business/${busType}?stage=uploadId`)
                    return []
                },
                successDetails: {
                    title: "Details Submitted",
                    text: `Directors details added to your profile`,
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
                        setErrorMsg(err?.message);
                       // setTimeout(() =>  setErrorMssg(err?.message), 4000)
                        setShowError2(true)
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
                  //  console.log("res>>", res);
                    // setShowUplaod(true)
                    await localStorage.setItem('onboardingStage', JSON.stringify({ onboardingStage: "uploadId" }))
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

    const handleUploads = async (e: React.FormEvent) => {
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
            'identityType',
            sessionStorage.getItem('options') || "1"
        )
        state?.selectedFile && formData.append(
            'doc',
            state?.selectedFile,
            state?.selectedFile?.name || ""
        )
        state?.selectedFile && formData.append(
            'documentType',
            state?.selectedFile?.type || ""
        )

        state?.selectedFile && formData.append(
            'utility', sessionStorage.getItem('options') || ""
        )
        state?.selectedFile && formData.append(
            'rcNumber', sessionStorage.getItem('options') || ""
        )
        try {
            // localStorage.setItem('onboardingStageKey', "uploadId");
            // await localStorage.setItem('onboardingStage', JSON.stringify({onboardingStage:"uploadId"}));  //to be removed later
            // navigate("/registrations/document-upload")  //to be removed later
            const response = await apiCall({
                name: "uploadMOI",
                data: formData,
                action: (): any => {
                    setState({
                        ...state,
                        isSubmitting: false,
                        submittingError: false,
                    });
                    // router.push(`/create-business/${busType}?stage=${typeCheck == "rbn" ? "addBank" : "uploadDoc"}`)

                    return []
                },
                successDetails: {
                    title: "Documents Submitted",
                    text: `Your Identification documents have been submitted for review`,
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
                       setTimeout(() =>  setErrorMssg(err?.message), 4000)
                        setShowError(true)
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
                   // console.log("res>>>", res);
                    localStorage.setItem('onboardingStageKey', "uploadId"); 
                    await localStorage.setItem('onboardingStage', JSON.stringify({ onboardingStage: "uploadId" }));
                    navigate("/registrations/document-upload");
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
        <div>
            <NavBarItems />
            <div className="md:flex">
                <aside className="md:w-1/4 p-4 hidden sm:block">
                    <RegistrationSideBar />
                </aside>
                <main className="md:flex-1 p-4 my-2">
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4">
                        <div className="p-4">
                            <p className="text-xl">Director Profile</p>
                            {/* <p className="text-sm text-gray-400">Create a PIN to authenticate your transactions</p> */}
                        </div>
                        <div className="p-4">
                            <p className="text-sm text-gray-400 lg:w-1/3 w-72">
                                <DefaultInput
                                    type="text"
                                    label="Full Name"
                                    required={true}
                                    placeHolder="Enter Full Name"
                                    name="name"
                                    value={name}
                                    handleChange={handleChange}
                                />
                            </p>
                        </div>
                        <div className="p-4  mt-[-25px]">
                            <p className="text-sm text-gray-400 lg:w-1/3 w-72">
                                <DefaultInput
                                    type="text"
                                    label="Phone Number"
                                    required={true}
                                    placeHolder="Enter Phone Number"
                                    name="phone"
                                    value={phone}
                                    handleChange={handleChange}
                                />
                            </p>
                        </div>
                        <div className="p-4  mt-[-25px]">
                            <p className="text-sm text-gray-400 lg:w-1/3 w-72">
                                <DefaultInput
                                    type="text"
                                    label="BVN"
                                    required={true}
                                    placeHolder="Enter BVN"
                                    name="bvn"
                                    value={bvn}
                                    handleChange={handleChange}
                                    id="bvn"
                                />
                            </p>
                            <small className='text-sm italic text-blue-600'>{bvnName}</small>
                        </div>
                        <div className="p-4  mt-[-25px]">
                            <p className="text-sm text-gray-400 lg:w-1/3 w-72">
                                <DefaultInput
                                    type="text"
                                    label="NIN"
                                    required={true}
                                    placeHolder="Enter NIN"
                                    name="nin"
                                    value={nin}
                                    handleChange={handleChange}
                                />
                            </p>
                            {
                                !showUplaod &&
                                <div className="mt-10">

                                    <button onClick={handelSubmit} className="lg:w-1/3 w-72 h-12 rounded-md bg-primary text-white transition-all duration-500 hover:scale-105 hover:brightness-110">Continue</button>
                                </div>
                            }

                        </div>
                        {
                            showUplaod &&
                            <div>
                                <div className="p-4  mt-[-25px]">
                                  {
                                    showError2 &&
                                    <>
                                      <p className='lg:w-1/3'>
                                        <ErrorCard handleClear={() => setState({ ...state, submittingError: false })} error={errMsg} containerVariant={!submittingError ? "hidden" : ""} /></p><br />
                                    </>
                                  }
                                    <p className="text-xl">Director ID Upload</p>
                                </div>

                                <div className="p-4  mt-[-25px]">

                                    <p className="text-sm text-gray-400 w-72  lg:w-1/3">
                                        <CustomDropDown
                                            label='Select ID Type(Government Issued)'
                                            options={options}
                                            value={identityType}
                                          setValue={setIdentityType} 
                                        />
                                    </p>
                                </div>
                                <div className="p-4 mt-[-25px]">
                                    <p className="text-base text-sm">Document Uploads</p>
                                    <p className='text-sm text-gray-400'>
                                        <div className="flex">
                                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-50 h-10 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-100 hover:bg-gray-100 dark:border-gray-300">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6 min-w-[280px] sm:min-w-[320px]">
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 ">
                                                        <span className="font-semibold">📰</span>  {fileName?.length < 2 ? "Drop your file here or choose a file":`${fileName} has been selected!`}
                                                    </p>
                                                </div>
                                                <input id="dropzone-file" type="file" className="hidden" onChange={handleChangeFile} />
                                            </label>
                                        </div>

                                    </p>
                                </div>

                                <div className="p-4">
                                 {
                                    showError &&
                                  <>
                                    <p className='lg:w-1/3'>
                                    <ErrorCard handleClear={() => setState({ ...state, submittingError: false })} error={errorMsg} containerVariant={!submittingError ? "hidden" : ""} />
                                    </p>
                                    <br />
                                  </>
                                 }
                                    <button onClick={handleUploads} className="lg:w-1/3 w-72 h-12 rounded-md bg-primary text-white transition-all duration-500 hover:scale-105 hover:brightness-110">Continue</button>
                                    {/* navigate("/registrations/document-upload") */}
                                </div>
                            </div>
                        }
                    </div>
                </main>
            </div>
        </div>
    )
}

export default DirectorProfile