import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isCheckedValue } from '../../pages/Registrations/mocks';


function RegistrationSideBar() {
    const [checked, setChecked] = useState<any>(true);
    const [checkCreatePin, setCheckedCreatePin] = useState<any>(true);
    const [checkSecurityQuestion, setCheckedSecurityQuestion] = useState<any>(true);
    const [checkBVNValidation, setCheckedBVNValidation] = useState<any>(true);
    const [checkBusinessType, setCheckedBusinessType] = useState<any>(true);
    const [checkBusinessInfo, setCheckedBusinessInfo] = useState<any>(true);
    const [checkContactVerification, setCheckedContactVerification] = useState<any>(true);
    const [checkAddress, setCheckedAddress] = useState<any>(true);
    const [checkDirectorProfile, setCheckedDirectorProfile] = useState<any>(true);
    const [checkDocumentUpload, setCheckedDocumentUpload] = useState<any>(true);
    const [checkSettlementAccount, setCheckedSettlementAccount] = useState<any>(true);
    const [showElapsed, setShowElapsed] = useState<any>(true);
    const [showElapsed1, setShowElapsed1] = useState<any>(true);
    const [showElapsed2, setShowElapsed2] = useState<any>(true);
    const [showElapsed3, setShowElapsed3] = useState<any>(true);
    const [onboardingStage, setOnboardingStage] = useState<any>("");
    const navigate = useNavigate();
    let onboardingStageKey: any = localStorage.getItem("onboardingStageKey");
    const [createPinRoute, setCreatePinRoute] = useState<any>(null);
    const [securityQuestionRoute, setsecurityQuestionRoute] = useState<any>(null);
    const [bvnValidationRoute, setBvnValidationRoute] = useState<any>(null);
    const [businessTypeRoute, setBusinessTypeRoute] = useState<any>(null);
    const [businessInfoRoute, setBusinessInfoRoute] = useState<any>(null);
    const [contactVerificationRoute, setContactVerificationRoute] = useState<any>(null);
    const [addressRoute, setAddressRoute] = useState<any>(null);
    const [directorProfileRoute, setDirectorProfileRoute] = useState<any>(null);
    const [documentUploadRoute, setDocumentUploadRoute] = useState<any>(null);
    const [settlementAccounRoute, setSettlementAccounRoute] = useState<any>(null);

    useEffect(() => {
        const getOnboardingStage: any = localStorage.getItem('onboardingStage');
        const parseOnboardingStage = JSON.parse(getOnboardingStage);
        setOnboardingStage(parseOnboardingStage?.onboardingStage);

        if (onboardingStage === "" || localStorage.getItem("onboardingStageKey") === "") {   //settlement is for a completed reg lifecycle, while "" is for onboarding just starting 
            setCheckedCreatePin(null);
            setCheckedSecurityQuestion(null)
            setCheckedBVNValidation(null);
            setCheckedBusinessType(null);
            setCheckedBusinessInfo(null);
            setCheckedContactVerification(null);
            setCheckedAddress(null);
            setCheckedDirectorProfile(null);
            setCheckedDocumentUpload(null);
            setCheckedSettlementAccount(null);
            //routes
            setCreatePinRoute(null);
            setsecurityQuestionRoute(null);
            setBvnValidationRoute(null);
            setBusinessTypeRoute(null);
            setBusinessInfoRoute(null);
            setContactVerificationRoute(null);
            setAddressRoute(null);
            setDirectorProfileRoute(null);
            setDocumentUploadRoute(null);
            setSettlementAccounRoute(null);
        } else if (onboardingStage === "create_merchant" || localStorage.getItem("onboardingStageKey") === "create_merchant") {
           setCheckedCreatePin(null);
           setCheckedSecurityQuestion(null)
            setCheckedBVNValidation(null);
            setCheckedBusinessType(null);
            setCheckedBusinessInfo(null);
            setCheckedContactVerification(null);
            setCheckedAddress(null);
            setCheckedDirectorProfile(null);
            setCheckedDocumentUpload(null);
            setCheckedSettlementAccount(null);

              //routes
              setCreatePinRoute(null);
              setsecurityQuestionRoute(null);
              setBvnValidationRoute(null);
              setBusinessTypeRoute(null);
              setBusinessInfoRoute(null);
              setContactVerificationRoute(null);
              setAddressRoute(null);
              setDirectorProfileRoute(null);
              setDocumentUploadRoute(null);
              setSettlementAccounRoute(null);
        } else if (onboardingStage === "secure_account" || localStorage.getItem("onboardingStageKey") === "secure_account") {
          //  console.log("onboardingStage ==> secure_account")
            setCheckedCreatePin(true);
            setCheckedBVNValidation(null);
            setCheckedBusinessType(null);
            setCheckedBusinessInfo(null);
            setCheckedContactVerification(null);
            setCheckedAddress(null);
            setCheckedDirectorProfile(null);
            setCheckedDocumentUpload(null);
            setCheckedSettlementAccount(null);

              //routes
              setCreatePinRoute("/registrations/create-pin");
              setsecurityQuestionRoute(null);
              setBvnValidationRoute(null);
              setBusinessTypeRoute(null);
              setBusinessInfoRoute(null);
              setContactVerificationRoute(null);
              setAddressRoute(null);
              setDirectorProfileRoute(null);
              setDocumentUploadRoute(null);
              setSettlementAccounRoute(null);
        }if (onboardingStage === "securityQuestions" || localStorage.getItem("onboardingStageKey") === "securityQuestions") {
//  console.log("onboardingStage ==> secure_account")
setCheckedCreatePin(true);
setCheckedSecurityQuestion(true)
setCheckedBVNValidation(null);
setCheckedBusinessType(null);
setCheckedBusinessInfo(null);
setCheckedContactVerification(null);
setCheckedAddress(null);
setCheckedDirectorProfile(null);
setCheckedDocumentUpload(null);
setCheckedSettlementAccount(null);

  //routes
  setCreatePinRoute(null);
  setsecurityQuestionRoute('/registrations/security-questions');
  setBvnValidationRoute(null);
  setBusinessTypeRoute(null);
  setBusinessInfoRoute(null);
  setContactVerificationRoute(null);
  setAddressRoute(null);
  setDirectorProfileRoute(null);
  setDocumentUploadRoute(null);
  setSettlementAccounRoute(null);
        } else if (onboardingStage === "bvn"  || localStorage.getItem("onboardingStageKey") === "bvn") {
         //   console.log("onboardingStage ==> bvn")
            setCheckedCreatePin(true);
            setCheckedSecurityQuestion(true)
            setCheckedBVNValidation(true);
            setCheckedBusinessType(null);
            setCheckedBusinessInfo(null);
            setCheckedContactVerification(null);
            setCheckedAddress(null);
            setCheckedDirectorProfile(null);
            setCheckedDocumentUpload(null);
            setCheckedSettlementAccount(null);

              //routes
              setCreatePinRoute(null);
              setsecurityQuestionRoute(null)
              setBvnValidationRoute("/registrations/bvn"); 
              setBusinessTypeRoute(null);
              setBusinessInfoRoute(null);
              setContactVerificationRoute(null);
              setAddressRoute(null);
              setDirectorProfileRoute(null);
              setDocumentUploadRoute(null);
              setSettlementAccounRoute(null);
        } else if (onboardingStage === "business_profile" || localStorage.getItem("onboardingStageKey") === "business_profile") {
          //  console.log("onboardingStage ==> business_profile")
            setCheckedCreatePin(true);
            setCheckedSecurityQuestion(true)
            setCheckedBVNValidation(true);
            setCheckedBusinessType(true);
            setCheckedBusinessInfo(null);
            setCheckedContactVerification(null);
            setCheckedAddress(null);
            setCheckedDirectorProfile(null);
            setCheckedDocumentUpload(null);
            setCheckedSettlementAccount(null);

              //routes
              setCreatePinRoute(null);
              setsecurityQuestionRoute(null)
              setBvnValidationRoute(null);
              setBusinessTypeRoute("/registrations/business-type");
              setBusinessInfoRoute(null);
              setContactVerificationRoute(null);
              setAddressRoute(null);
              setDirectorProfileRoute(null);
              setDocumentUploadRoute(null);
              setSettlementAccounRoute(null);
        } else if (onboardingStage === "verify_business_email" || localStorage.getItem("onboardingStageKey") === "verify_business_email") {
           // console.log("onboardingStage ==> verify_business_email")
            setCheckedCreatePin(true);
            setCheckedSecurityQuestion(true)
            setCheckedBVNValidation(true);
            setCheckedBusinessType(true);
            setCheckedBusinessInfo(true);
            setCheckedContactVerification(null);
            setCheckedAddress(null);
            setCheckedDirectorProfile(null);
            setCheckedDocumentUpload(null);
            setCheckedSettlementAccount(null);

              //routes
              setCreatePinRoute(null);
              setsecurityQuestionRoute(null)
              setBvnValidationRoute(null);
              setBusinessTypeRoute(null);
              setBusinessInfoRoute("/registrations/business-information");
              setContactVerificationRoute(null);
              setAddressRoute(null);
              setDirectorProfileRoute(null);
              setDocumentUploadRoute(null);
              setSettlementAccounRoute(null);
        } else if (onboardingStage === "verify_phone" || localStorage.getItem("onboardingStageKey") === "verify_phone") {
          //  console.log("onboardingStage ==> verify_phone")
            setCheckedCreatePin(true);
            setCheckedBVNValidation(true);
            setCheckedBusinessType(true);
            setCheckedSecurityQuestion(true)
            setCheckedBusinessInfo(true);
            setCheckedContactVerification(true);
            setCheckedAddress(null);
            setCheckedDirectorProfile(null);
            setCheckedDocumentUpload(null);
            setCheckedSettlementAccount(null);

              //routes
              setCreatePinRoute(null);
              setsecurityQuestionRoute(null)
              setBvnValidationRoute(null);
              setBusinessTypeRoute(null);
              setBusinessInfoRoute(null);
              setContactVerificationRoute("/registrations/verify-email-address");
              setAddressRoute(null);
              setDirectorProfileRoute(null);
              setDocumentUploadRoute(null);
              setSettlementAccounRoute(null);
        } else if (onboardingStage === "set_up_location" || localStorage.getItem("onboardingStageKey") === "set_up_location") {
           // console.log("onboardingStage ==> set_up_location")
            setCheckedCreatePin(true);
            setCheckedSecurityQuestion(true)
            setCheckedBVNValidation(true);
            setCheckedBusinessType(true);
            setCheckedBusinessInfo(true);
            setCheckedContactVerification(true);
            setCheckedAddress(true);
            setCheckedDirectorProfile(null);
            setCheckedDocumentUpload(null);
            setCheckedSettlementAccount(null);

              //routes
              setCreatePinRoute(null);
              setsecurityQuestionRoute(null)
              setBvnValidationRoute(null);
              setBusinessTypeRoute(null);
              setBusinessInfoRoute(null);
              setContactVerificationRoute(null);
              setAddressRoute("/registrations/verify-phone-number");
              setDirectorProfileRoute(null);
              setDocumentUploadRoute(null);
              setSettlementAccounRoute(null);
        } else if (onboardingStage === "directors_details" || localStorage.getItem("onboardingStageKey") === "directors_details") {
          //  console.log("onboardingStage ==> directors_details")
            setCheckedCreatePin(true);
            setCheckedBVNValidation(true);
            setCheckedSecurityQuestion(true)
            setCheckedBusinessType(true);
            setCheckedBusinessInfo(true);
            setCheckedContactVerification(true);
            setCheckedAddress(true);
            setCheckedDirectorProfile(true);
            setCheckedDocumentUpload(null);
            setCheckedSettlementAccount(null);

              //routes
              setCreatePinRoute(null);
              setsecurityQuestionRoute(null)
              setBvnValidationRoute(null);
              setBusinessTypeRoute(null);
              setBusinessInfoRoute(null);
              setContactVerificationRoute(null);
              setAddressRoute(null);
              setDirectorProfileRoute("/registrations/director-profile");
              setDocumentUploadRoute(null);
              setSettlementAccounRoute(null);
        } else if (onboardingStage === "uploadId" || localStorage.getItem("onboardingStageKey") === "uploadId") {
          //  console.log("onboardingStage ==> uploadId")
            setCheckedCreatePin(true);
            setCheckedBVNValidation(true);
            setCheckedBusinessType(true);
            setCheckedBusinessInfo(true);
            setCheckedSecurityQuestion(true)
            setCheckedContactVerification(true);
            setCheckedAddress(true);
            setCheckedDirectorProfile(true);
            setCheckedDocumentUpload(true);
            setCheckedSettlementAccount(null);

              //routes
              setCreatePinRoute(null);
              setsecurityQuestionRoute(null)
              setBvnValidationRoute(null);
              setBusinessTypeRoute(null);
              setBusinessInfoRoute(null);
              setContactVerificationRoute(null);
              setAddressRoute(null);
              setDirectorProfileRoute(null);
              setDocumentUploadRoute("/registrations/document-upload");
              setSettlementAccounRoute(null);
        } else if (onboardingStage === "uploadDoc" || localStorage.getItem("onboardingStageKey") === "uploadDoc") {
          //  console.log("onboardingStage ==> uploadDoc")
            setCheckedCreatePin(true);
            setCheckedBVNValidation(true);
            setCheckedBusinessType(true);
            setCheckedSecurityQuestion(true)
            setCheckedBusinessInfo(true);
            setCheckedContactVerification(true);
            setCheckedAddress(true);
            setCheckedDirectorProfile(true);
            setCheckedDocumentUpload(true);
            setCheckedSettlementAccount(null);

              //routes
              setCreatePinRoute(null);
              setsecurityQuestionRoute(null)
              setBvnValidationRoute(null);
              setBusinessTypeRoute(null);
              setBusinessInfoRoute(null);
              setContactVerificationRoute(null);
              setAddressRoute(null);
              setDirectorProfileRoute(null);
              setDocumentUploadRoute("/registrations/document-upload");
              setSettlementAccounRoute(null);
        } else if (onboardingStage === "settlement"  || localStorage.getItem("onboardingStageKey") === "settlement") {
           // console.log("onboardingStage ==> settlement")
            setCheckedCreatePin(true);
            setCheckedSecurityQuestion(true)
            setCheckedBVNValidation(true);
            setCheckedBusinessType(true);
            setCheckedBusinessInfo(true);
            setCheckedContactVerification(true);
            setCheckedAddress(true);
            setCheckedDirectorProfile(true);
            setCheckedDocumentUpload(true);
            setCheckedSettlementAccount(true);

              //routes
              setCreatePinRoute(null);
              setsecurityQuestionRoute(null)
              setBvnValidationRoute(null);
              setBusinessTypeRoute(null);
              setBusinessInfoRoute(null);
              setContactVerificationRoute(null);
              setAddressRoute(null);
              setDirectorProfileRoute(null);
              setDocumentUploadRoute(null);
              setSettlementAccounRoute("/registrations/settlement-information");
        } else {
           console.log('')
        }
    }, [onboardingStageKey, onboardingStage])

 


    return (
        <div className="md:flex mx-[20px]">
            <div className="md:w-1/4 p-4">
                <div className="mb-4 w-max cursor-pointer" onClick={() => setShowElapsed(!showElapsed)}>Secure your account</div>
                {
                    showElapsed &&
                    (
                        <div className='ml-5'>

                            <div className="mb-4 grid gap-4">
                                <div className="flex items-center">

                                    <label className="inline-flex items-center space-x-2 cursor-pointer">
                                        <input type="checkbox" className="hidden" checked={!checked} />
                                        <div className="w-4 h-4 rounded-full border border-gray-300 bg-blue-500 flex items-center justify-center">
                                            {checkCreatePin === true ?
                                                <svg className="w-4 h-4 text-white pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.667 12l2.666 2.666L16 9.332"></path>
                                                </svg>
                                                :
                                                <div className="w-4 h-4 rounded-full border border-gray-400 bg-white flex items-center justify-center"></div>
                                            }
                                        </div>
                                        <span className="text-gray-400 w-max" onClick={() => navigate(createPinRoute)}>Create Pin</span>
                                    </label>

                                </div>
                                <div className="flex items-center">

                                    <label className="inline-flex items-center space-x-2 cursor-pointer">
                                        <input type="checkbox" className="hidden" checked={!checked} />
                                        <div className="w-4 h-4 rounded-full border border-gray-300 bg-blue-500 flex items-center justify-center">
                                            {checkSecurityQuestion === true ?
                                                <svg className="w-4 h-4 text-white pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.667 12l2.666 2.666L16 9.332"></path>
                                                </svg>
                                                :
                                                <div className="w-4 h-4 rounded-full border border-gray-400 bg-white flex items-center justify-center"></div>
                                            }
                                        </div>
                                        <span className="text-gray-400 w-max" onClick={() => navigate(securityQuestionRoute)}>Security Questions</span>
                                    </label>

                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="flex items-center">

                                    <label className="inline-flex items-center space-x-2 cursor-pointer">
                                        <input type="checkbox" className="hidden" checked={!checked} />
                                        <div className="w-4 h-4 rounded-full border border-gray-300 bg-blue-500 flex items-center justify-center">
                                            {
                                                checkBVNValidation === true ?
                                                    <svg className="w-4 h-4 text-white pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.667 12l2.666 2.666L16 9.332"></path>
                                                    </svg>
                                                    :
                                                    <div className="w-4 h-4 rounded-full border border-gray-400 bg-white flex items-center justify-center"></div>
                                            }
                                        </div>
                                        <span className="text-gray-400 w-max" onClick={() => navigate(bvnValidationRoute)}>BVN Validation</span>
                                    </label>

                                </div>
                            </div>
                        </div>
                    )
                }

                <div className="mb-4 w-max cursor-pointer" onClick={() => setShowElapsed1(!showElapsed1)}>Business Type</div>
                {
                    showElapsed1 &&
                    (
                        <div className='ml-5' >
                            <div className="mb-4">
                                <div className='flex items-center'>
                                    <label className="inline-flex items-center space-x-2 cursor-pointer">
                                        <input type="checkbox" className="hidden" checked={!checked} />
                                        <div className="w-4 h-4 rounded-full border border-gray-300 bg-blue-500 flex items-center justify-center">
                                            {
                                                checkBusinessType === true ?
                                                    <svg className="w-4 h-4 text-white pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.667 12l2.666 2.666L16 9.332"></path>
                                                    </svg>
                                                    :
                                                    <div className="w-4 h-4 rounded-full border border-gray-400 bg-white flex items-center justify-center"></div>
                                            }
                                        </div>
                                        <span className="text-gray-400 w-max" onClick={() => navigate(businessTypeRoute)}>Business Type</span>
                                    </label>
                                </div>
                            </div>
                            <div className="mb-4">
                                <div className='flex items-center'>
                                    <label className="inline-flex items-center space-x-2 cursor-pointer">
                                        <input type="checkbox" className="hidden" checked={!checked} />
                                        <div className="w-4 h-4 rounded-full border border-gray-300 bg-blue-500 flex items-center justify-center">
                                            {
                                                checkBusinessInfo === true ?
                                                    <svg className="w-4 h-4 text-white pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.667 12l2.666 2.666L16 9.332"></path>
                                                    </svg>
                                                    :
                                                    <div className="w-4 h-4 rounded-full border border-gray-400 bg-white flex items-center justify-center"></div>
                                            }
                                        </div>
                                        <span className="text-gray-400 w-max" onClick={() => navigate(businessInfoRoute)}>Business Information</span>
                                    </label>
                                </div>
                            </div>
                            <div className="mb-4">
                                <div className='flex items-center'>
                                    <label className="inline-flex items-center space-x-2 cursor-pointer">
                                        <input type="checkbox" className="hidden" checked={!checked} />
                                        <div className="w-4 h-4 rounded-full border border-gray-300 bg-blue-500 flex items-center justify-center">
                                            {
                                                checkContactVerification === true ?
                                                    <svg className="w-4 h-4 text-white pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.667 12l2.666 2.666L16 9.332"></path>
                                                    </svg>
                                                    :
                                                    <div className="w-4 h-4 rounded-full border border-gray-400 bg-white flex items-center justify-center"></div>
                                            }
                                        </div>
                                        <span className="text-gray-400 w-max" onClick={() => navigate(contactVerificationRoute)}>Address </span>
                                    </label>
                                </div>
                            </div>
                            <div className="mb-4">
                                <div className='flex items-center'>
                                    <label className="inline-flex items-center space-x-2 cursor-pointer">
                                        <input type="checkbox" className="hidden" checked={!checked} />
                                        <div className="w-4 h-4 rounded-full border border-gray-300 bg-blue-500 flex items-center justify-center">
                                            {
                                                checkAddress === true ?
                                                    <svg className="w-4 h-4 text-white pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.667 12l2.666 2.666L16 9.332"></path>
                                                    </svg>
                                                    :
                                                    <div className="w-4 h-4 rounded-full border border-gray-400 bg-white flex items-center justify-center"></div>
                                            }
                                        </div>
                                        <span className="text-gray-400 w-max" onClick={() => navigate(addressRoute)}>Contact Verification</span>
                                    </label>
                                </div>
                            </div>
                            <div className="mb-4">
                                <div className='flex items-center'>
                                    <label className="inline-flex items-center space-x-2 cursor-pointer">
                                        <input type="checkbox" className="hidden" checked={!checked} />
                                        <div className="w-4 h-4 rounded-full border border-gray-300 bg-blue-500 flex items-center justify-center">
                                            {
                                                checkDirectorProfile === true ?
                                                    <svg className="w-4 h-4 text-white pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.667 12l2.666 2.666L16 9.332"></path>
                                                    </svg>
                                                    :
                                                    <div className="w-4 h-4 rounded-full border border-gray-400 bg-white flex items-center justify-center"></div>
                                            }
                                        </div>
                                        <span className="text-gray-400 w-max" onClick={() => navigate(directorProfileRoute)}>Director Profile</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )
                }

                <div className="mb-4 w-max cursor-pointer" onClick={() => setShowElapsed2(!showElapsed2)}>
                    Document Upload
                </div>
                {
                    showElapsed2 &&
                    (
                        <div className='ml-5'>
                            <div className="mb-4">
                                <div className='flex items-center'>
                                    <label className="inline-flex items-center space-x-2 cursor-pointer">
                                        <input type="checkbox" className="hidden" checked={!checked} />
                                        <div className="w-4 h-4 rounded-full border border-gray-300 bg-blue-500 flex items-center justify-center">
                                            {
                                                checkDocumentUpload === true ?
                                                    <svg className="w-4 h-4 text-white pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.667 12l2.666 2.666L16 9.332"></path>
                                                    </svg>
                                                    :
                                                    <div className="w-4 h-4 rounded-full border border-gray-400 bg-white flex items-center justify-center"></div>
                                            }
                                        </div>
                                        <span className="text-gray-400 w-max" onClick={() => navigate(documentUploadRoute)}>Document Upload</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )
                }

                <div className="mb-4  w-max cursor-pointer" onClick={() => setShowElapsed3(!showElapsed3)}>Settlements</div>
                {
                    showElapsed3 &&
                    (
                        <div className='ml-5'>
                            <div className="mb-4">
                                <div className='flex items-center'>
                                    <label className="inline-flex items-center space-x-2 cursor-pointer">
                                        <input type="checkbox" className="hidden" checked={!checked} />
                                        <div className="w-4 h-4 rounded-full border border-gray-300 bg-blue-500 flex items-center justify-center">
                                            {
                                                checkSettlementAccount === true ?
                                                    <svg className="w-4 h-4 text-white pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.667 12l2.666 2.666L16 9.332"></path>
                                                    </svg>
                                                    :
                                                    <div className="w-4 h-4 rounded-full border border-gray-400 bg-white flex items-center justify-center"></div>
                                            }
                                        </div>
                                        <span className="text-gray-400 w-max" onClick={() => navigate(settlementAccounRoute)}>Settlement Account</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )
                }

            </div>

        </div>

    )
}

export default RegistrationSideBar