import React, {useState, useEffect} from 'react';
import NavBarItems from '../../components/reusables/NavBarItems'
import RegistrationSideBar from '../../components/reusables/RegistrationSideBar';
import { Image } from '../../assets';
import { useNavigate } from 'react-router-dom';
import { isCheckedValue } from './mocks';

function BussinessType() {
    const navigate = useNavigate();
    const finishReg = () => {
        localStorage.setItem('onboardingStageKey', "business_profile");
        localStorage.setItem('onboardingStage', JSON.stringify({onboardingStage:"business_profile"}));  //to be removed later
        navigate("/registrations/business-information"); 
     
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
                            <p className="text-xl">
                                Business Type
                            </p>
                            <p className="text-sm text-gray-400">Select a business type that best suites you</p>
                        </div>
                        <div className="p-4">
                            <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-200 cursor-pointer">
                                <div className="px-6 py-4" onClick={() => navigate("/registrations/business-information")}>
                                    <div className="font-bold text-xl mb-2">
                                        <div className="flex items-center">
                                            <img src={Image.briefcase} alt="Your Image" className="w-7 h-7 rounded-full mr-4" />
                                            <p className="text-lg">   Corporate Business</p>
                                        </div>

                                    </div>
                                    <p className="text-gray-700 text-base ml-11 text-sm">
                                        Choose this plan if you are a registered business. As part
                                        of our obectives to help you build it, you have access to more
                                        we can offer as a registered business
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-200 cursor-pointer">
                                <div className="px-6 py-4" onClick={() => navigate("/registrations/business-information")}>
                                    <div className="font-bold text-xl mb-2">
                                        <div className="flex items-center">
                                            <img src={Image.profile} alt="Your Image" className="w-7 h-7 rounded-full mr-4" />
                                            <p className="text-lg">   Individual Business</p>
                                        </div>

                                    </div>
                                    <p className="text-gray-700 text-base ml-11 text-sm">
                                        Choose this plan if you are a registered business. As part
                                        of our obectives to help you build it, you have access to more
                                        we can offer as a registered business
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-4" onClick={finishReg} >
                            <button className="lg:w-2/5 w-72 h-12 rounded-md bg-blue-500 text-white transition-all duration-500 hover:scale-105 hover:brightness-110">Continue</button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default BussinessType