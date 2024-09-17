import React, {useEffect, useState} from 'react';
import NavBarItems from '../../components/reusables/NavBarItems';
import RegistrationSideBar from '../../components/reusables/RegistrationSideBar';
import { useNavigate } from 'react-router-dom';
import CustomDropDown from '../../components/reusables/dropdowns/CustomDropDown';
import { NigerianStates , localGovt} from './mocks';
import DefaultInput from '../../components/reusables/DefaultInput';
import { apiCall } from '../../Utils/URLs/axios.index';
import { ErrorCard } from '../../Utils/HttpResponseHandlers/error';



function BusinessLocation() {
    const navigate = useNavigate();
   
    const [errMsg, setErrorMsg] = useState<any>("");
    const [nigerianState, setNigerianState] = useState('Select a state');
    const [LGA, setLGA] = useState<any>('Select an LGA');
    const [LGAOptions, setLGAOptions] = useState<any>([]);
    const [addressValue, setAddress] = useState<any>("");
    const [landmarkValue, setLandmarkValue] = useState<any>('')

    const [state, setState] = useState<any>({
        address: "",
        landmark: "",
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


    const { address, landmark, check, submittingError, isDisabled, isSubmitting, errorMssg } = state;

    function handleChange(e:  React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
        //  console.log("eee>>>", e?.target?.value);
        setAddress(e?.target?.value);
      }

      function handleChange2(e:  React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
        //  console.log("eee>>>", e?.target?.value);
        setLandmarkValue(e?.target?.value);
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
      


    useEffect(() => {
        const filterLocalGovt = localGovt?.filter((item:any) => item.state === nigerianState);
        if(filterLocalGovt[0]?.localGovt !== undefined){
            setLGAOptions(filterLocalGovt[0]?.localGovt);
        }
    },[nigerianState]);


    const handelSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState((state: any) => ({
            ...state,
            isSubmitting: true
        }))
 
        try {
            // localStorage.setItem('onboardingStageKey', "directors_details");
            // await localStorage.setItem('onboardingStage', JSON.stringify({onboardingStage:"directors_details"}));  //to be removed later
            // navigate("/registrations/director-profile") //to be removed later
            const response = await apiCall({
                name: "selfOnboarding",
                data: {
                    address: addressValue,
                    landmark: landmarkValue,
                    state: nigerianState,
                    lga: LGA,
                    stage: "set_up_location"
                },
                action: (): any => {
                    setState({
                        ...state,
                        isSubmitting: false,
                        submittingError: false,
                    });
                  //  router.push(`/create-business/${busType}?stage=type`)
                    return []
                },
                successDetails: {
                    title: "Location Submitted",
                    text: `Location details added to your profile`,
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
                        setTimeout(() => setErrorMsg(null), 4000);
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
                    localStorage.setItem('onboardingStageKey', "directors_details");
                    await localStorage.setItem('onboardingStage', JSON.stringify({onboardingStage:"directors_details"}));
                    navigate("/registrations/director-profile") 
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
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 grid-rows-6 gap-4 p-4">
                        <div className="p-4">
                            <p className="text-xl font-bold">Business Location</p>
                          
                        </div>
                        <div className=" p-4 mt-[-45px] ">
                            <p className="text-sm text-gray-400 w-72  lg:w-1/3" >
                            <CustomDropDown
                             label='State' 
                             options={NigerianStates}
                             value={nigerianState} 
                            setValue={setNigerianState}
                              />
                            </p>
                        </div>
                        <div className=" p-4 mt-[-45px] ">
                            <p className="text-sm text-gray-400 w-72  lg:w-1/3">
                            <CustomDropDown
                             label='LGA' 
                             options={LGAOptions}
                              value={LGA} 
                              setValue={setLGA} 
                              />
                            </p>
                        </div>
                        <div className="p-4  mt-[-45px]">
                        <p className="text-sm text-gray-400 lg:w-1/3 w-72">
                               <DefaultInput
                               type="text"
                               label="address"
                               required={true}
                               placeHolder="Enter Business Address"
                               name="addressValue"
                               value={addressValue}
                               handleChange={handleChange}
                           />
                       </p>
                        </div>
                        <div className="p-4 mt-[-25px]">
                        <p className="text-sm text-gray-400 lg:w-1/3 w-72">
                               <DefaultInput
                               type="text"
                               label="Address Landmark"
                               required={true}
                               placeHolder="Landmark"
                               name="landmarkValue"
                               value={landmarkValue}
                               handleChange={handleChange2}
                           />
                       </p>
                        </div>
                        <p className='lg:w-1/3 ml-4'>
                <ErrorCard handleClear={() => setState({ ...state, submittingError: false })} error={errMsg} containerVariant={!submittingError ? "hidden" : ""} /></p>
                        <div className="p-4  mt-[-20px]" onClick={handelSubmit}>
                            <button className="lg:w-1/3 w-72 h-12 rounded-md bg-primary text-white transition-all duration-500 hover:scale-105 hover:brightness-110">Continue</button>
                        </div>
                    </div>
                </main>
            </div>
        </div>



    )
}

export default BusinessLocation