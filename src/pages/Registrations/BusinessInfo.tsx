import React, { useEffect, useState } from 'react';
import NavBarItems from '../../components/reusables/NavBarItems';
import RegistrationSideBar from '../../components/reusables/RegistrationSideBar';
import { useNavigate } from 'react-router-dom';
import DefaultInput from '../../components/reusables/DefaultInput';
import CustomDropDown from '../../components/reusables/dropdowns/CustomDropDown';
import { apiCall } from '../../Utils/URLs/axios.index';
import DefaultTextArea from '../../components/reusables/DefaultTextArea';
import { Button } from '../../components/reusables/DefaultButton';
import { MerchantTypeEnum } from '../../Utils/URLs/types'; // Update with the correct path

const BusinessInfo: React.FC = () => {
    const navigate = useNavigate();

    const [state, setState] = useState<any>({
        businessName: "",
        businessDescription: "",
        businessCategory: "",
        businessEmail: "",
        phoneNumber: "",
        businessType: localStorage.getItem('businessType') || "", // Retrieve from localStorage
        submittingError: false,
        isSubmitting: false,
        errorMssg: ""
    });

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
    ];

    function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
        setState({
            ...state,
            [e.target.name]: e.target.value,
            submittingError: false
        });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState((prevState: any) => ({
            ...prevState,
            isSubmitting: true
        }));

        try {
            const response = await apiCall({
                name: "selfOnboarding",
                data: {
                    businessName: state.businessName,
                    businessDescription: state.businessDescription,
                    businessCategory: state.businessCategory,
                    businessEmail: state.businessEmail,
                    phoneNumber: state.phoneNumber,
                    institutionId: "1",
                    type: state.businessType, // Include the business type here
                    stage: "business_profile"
                },
                action: (): any => {
                    setState({
                        ...state,
                        isSubmitting: false,
                        submittingError: false,
                    });
                    return [];
                },
                errorAction: (err?: any): string[] | undefined => {
                    if (err && err?.response?.data) {
                        setState({
                            ...state,
                            submittingError: true,
                            isSubmitting: false,
                            errorMssg: err?.response?.data?.respDescription || "Action failed, please try again"
                        });
                        return [];
                    } else {
                        setState({
                            ...state,
                            submittingError: true,
                            isSubmitting: false,
                            errorMssg: "Action failed, please try again"
                        });
                        return [];
                    }
                }
            });

            navigate("/registrations/verify-email-address");
        } catch (e) {
            console.error(e + " 'Caught Error.'");
        }
    };

    return (
        <div>
            <NavBarItems />
            <div className="md:flex">
                <aside className="md:w-1/4 p-4 hidden sm:block">
                    <RegistrationSideBar />
                </aside>
                <main className="md:flex-1 p-4 my-2">
                    <div className="grid grid-cols-1 gap-4 p-4 w-full md:w-1/2">
                        <div className="p-4">
                            <p className="text-xl">Business Name Registrations</p><br />
                            <DefaultInput
                                type="text"
                                label="Business Name"
                                required={true}
                                placeHolder="Enter Business Name"
                                name="businessName"
                                value={state.businessName}
                                handleChange={handleChange}
                            />
                        </div>
                        <div className="p-4">
                            <DefaultTextArea
                                name='businessDescription'
                                handleChange={handleChange}
                                value={state.businessDescription}
                                label='Business Description'
                                placeHolder="Give us a little info about what your business is all about"
                                id="businessDescription"
                            />
                        </div>
                        <div className="p-4">
                            <CustomDropDown
                                label='Business Category'
                                options={options}
                                value={state.businessCategory}
                                setValue={(value: string) => setState({ ...state, businessCategory: value })} 
                            />
                        </div>
                        <div className="p-4">
                            <DefaultInput
                                type="text"
                                label="Business Email"
                                required={true}
                                placeHolder="Enter Business Email"
                                name="businessEmail"
                                value={state.businessEmail}
                                handleChange={handleChange}
                            />
                        </div>
                        <div className="p-4">
                            <DefaultInput
                                type="text"
                                label="Business Phone Number"
                                required={true}
                                placeHolder="Enter Phone Number"
                                name="phoneNumber"
                                value={state.phoneNumber}
                                handleChange={handleChange}
                            />
                        </div>
                        <div className="p-4">
                            <div className="w-full" onClick={handleSubmit}>
                                <Button title='Continue' />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default BusinessInfo;
