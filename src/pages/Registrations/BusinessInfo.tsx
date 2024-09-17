import React, { useEffect, useState } from 'react';
import NavBarItems from '../../components/reusables/NavBarItems';
import RegistrationSideBar from '../../components/reusables/RegistrationSideBar';
import { useNavigate } from 'react-router-dom';
import DefaultInput from '../../components/reusables/DefaultInput';
import CustomDropDown from '../../components/reusables/dropdowns/CustomDropDown';
import { apiCall } from '../../Utils/URLs/axios.index';
import { ErrorCard } from '../../Utils/HttpResponseHandlers/error';
import DefaultTextArea from '../../components/reusables/DefaultTextArea';
import { Button } from '../../components/reusables/DefaultButton';

function BusinessInfo() {
    const navigate = useNavigate();
    // const [state, setState] = useState<any>({
    //     businessName: "",description: "", category: "", email: "", phoneNumber: ""
    // });
    const [business, setbusiness] = useState('Choose the business Category');

    const [state, setState] = useState<any>({
        businessName: "",
        businessDescription: "",
        businessCategory: "",
        businessEmail: "",
        phone: "",
        stage: "",
        bvn: "",
        phoneNumber: "",
        check: false,
        submittingError: false,
        isSubmitting: false,
        isDisabled: false,
        errorMssg: ""
    })
    const [errMsg, setErrorMsg] = useState<any>("");

    const { businessName, businessDescription, businessCategory, businessEmail, phone, bvn, phoneNumber, check, submittingError, isDisabled, isSubmitting, errorMssg } = state

    const options = [
        "Technology",
        "Super Market",
        "Fuel Station",
        "Fashion & Clothing",
        "Food",
        "Hospitality",
        "School",
        "Electronics",
        "Eatery / Restaurant",
        "Health",
        "Beauty Artistry",
        "Food Stuffs",
        "Frozen Food",
        "Other",
    ]

    function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
        setState({
            ...state,
            [e.target.name]: e.target.value,
            submittingError: false
        });

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

    const handelSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState((state: any) => ({
            ...state,
            isSubmitting: true
        }))

        // console.log("state console()>>", state);
        // console.log("selected state>>",  {
        //     businessName: businessName,
        //     businessDescription: businessDescription,
        //     businessCategory: business,
        //     businessEmail: businessEmail,
        //     phoneNumber: phoneNumber
        // })
        try {
            sessionStorage.setItem('businessEmail', businessEmail);
            sessionStorage.setItem('phoneNumber', phoneNumber);
            // localStorage.setItem('onboardingStageKey', "verify_business_email");
            // localStorage.setItem('onboardingStage', JSON.stringify({ onboardingStage: "verify_business_email" })) //to be removed later
            // navigate("/registrations/verify-email-address")
            const response = await apiCall({
                name: "selfOnboarding",
                data: {
                    businessName: businessName,
                    businessDescription: businessDescription,
                    businessCategory: business,
                    businessEmail: businessEmail,
                    phoneNumber: phoneNumber,
                    institutionId: "1",
                    // type: busType ? busType.toUpperCase() : "",
                    stage: "business_profile"
                },
                action: (): any => {
                    setState({
                        ...state,
                        isSubmitting: false,
                        submittingError: false,
                    });

                    return []
                },
                successDetails: {
                    title: "Details Submitted",
                    text: `Now you will continue your registration as a corporate business.`,
                    icon: ""
                },
                errorAction: (err?: any) => {
                    if (err && err?.response?.data) {
                        setState({
                            ...state,
                            submittingError: true,
                            isSubmitting: false,
                            errorMssg: err?.response?.data?.respDescription || err?.response?.respDescription || err?.response?.data?.errorMssg || err?.response?.errorMssg || "Action failed, please try again"
                        })
                        setErrorMsg(err?.message);
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
                  //  console.log("res>>>", res);
                    navigate("/registrations/verify-email-address");
                    localStorage.setItem('onboardingStageKey', "verify_business_email");
                    await localStorage.setItem('onboardingStage', JSON.stringify({ onboardingStage: "verify_business_email" }))
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
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 grid-rows-6 gap-4 p-4 w-full md:w-1/2">
                        <div className="p-4">
                            <p className="text-xl">Business Name Registrations</p> <br />
                            <p className="text-sm text-gray-400 ">

                                <DefaultInput
                                    type="text"
                                    label="Business Name"
                                    required={true}
                                    placeHolder="Enter Business Name"
                                    name="businessName"
                                    value={businessName}
                                    handleChange={handleChange}
                                />
                            </p>
                        </div>
                        <div className="p-4 mt-[-25px]">
                            <p className="text-sm text-gray-400">

                                <DefaultTextArea name='businessDescription' handleChange={handleChange} value={businessDescription} label='Business Description' placeHolder="Give us a little info about what your business is all about" id="" />
                            </p>
                        </div>
                        <div className="p-4 mt-[-45px]">
                            <p className="text-sm text-gray-400">
                                <CustomDropDown
                                    label='Business Category'
                                    options={options}
                                    value={business}
                                    setValue={setbusiness}
                                />


                            </p>
                        </div>
                        <div className="p-4  mt-[-125px]">
                            <p className="text-sm text-gray-400 ">

                                <DefaultInput
                                    type="text"
                                    label="Business Email"
                                    required={true}
                                    placeHolder="Enter Business Email"
                                    name="businessEmail"
                                    value={businessEmail}
                                    handleChange={handleChange}
                                />
                            </p>
                        </div>
                        <div className="p-4 mt-[-200px]">
                            <p className="text-sm text-gray-400 ">
                                <DefaultInput
                                    type="text"
                                    label="Business Phone Number"
                                    required={true}
                                    placeHolder="Enter Phone Number"
                                    name="phoneNumber"
                                    value={phoneNumber}
                                    handleChange={handleChange}
                                />
                            </p>
                        </div>
                        <div className="p-4  mt-[-260px]">
                            <p style={{width: '400px'}}>
                                <ErrorCard handleClear={() => setState({ ...state, submittingError: false })} error={errMsg} containerVariant={!submittingError ? "hidden" : ""} />
                                </p><br />
                            <div className="w-full"  onClick={handelSubmit}>
                                <Button title='Continue' />

                            </div>
                            {/* <button className=" h-12 rounded-md bg-primary text-white transition-all duration-500 hover:scale-105 hover:brightness-110">Continue</button> */}
                        </div>
                    </div>
                </main>
            </div>
        </div>



    )
}

export default BusinessInfo