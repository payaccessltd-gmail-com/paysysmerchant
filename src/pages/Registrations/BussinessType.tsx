import React from 'react';
import NavBarItems from '../../components/reusables/NavBarItems';
import RegistrationSideBar from '../../components/reusables/RegistrationSideBar';
import { Image } from '../../assets';
import { useNavigate } from 'react-router-dom';

const BussinessType: React.FC = () => {
    const navigate = useNavigate();

    const handleBusinessTypeSelect = (type: string) => { // Specify type as string
        localStorage.setItem('businessType', type); // Save the selected business type
        finishReg();
    };

    const finishReg = () => {
        localStorage.setItem('onboardingStageKey', "business_profile");
        localStorage.setItem('onboardingStage', JSON.stringify({ onboardingStage: "business_profile" }));
        navigate("/registrations/business-information"); 
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
                            <p className="text-xl">Business Type</p>
                            <p className="text-sm text-gray-400">Select a business type that best suits you</p>
                        </div>
                        <div className="p-4">
                            <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-200 cursor-pointer" onClick={() => handleBusinessTypeSelect("CORPORATE")}>
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2">
                                        <div className="flex items-center">
                                            <img src={Image.briefcase} alt="Corporate" className="w-7 h-7 rounded-full mr-4" />
                                            <p className="text-lg">Corporate Business</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 text-base ml-11 text-sm">
                                        Choose this plan if you are a registered business. You will have access to more features as a registered business.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-200 cursor-pointer" onClick={() => handleBusinessTypeSelect("INDIVIDUAL")}>
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2">
                                        <div className="flex items-center">
                                            <img src={Image.profile} alt="Individual" className="w-7 h-7 rounded-full mr-4" />
                                            <p className="text-lg">Individual Business</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 text-base ml-11 text-sm">
                                        Choose this plan if you are a sole proprietor. You will have access to more features as a registered business.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                            <button onClick={finishReg} className="lg:w-2/5 w-72 h-12 rounded-md bg-primary text-white transition-all duration-500 hover:scale-105 hover:brightness-110">Continue</button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default BussinessType;
