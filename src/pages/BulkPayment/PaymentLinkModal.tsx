import React, { useState } from 'react';
import { Storage } from "../../Utils/Stores/inAppStorage";
import { Button } from '../../components/reusables/DefaultButton';
import DefaultInput from '../../components/reusables/DefaultInput';
import Overlay from '../../components/reusables/Overlay/Overlay';
import { apiCall } from '../../Utils/URLs/axios.index';

const PaymentLinkModal: React.FC<{
    isOpen: boolean;
    toggleDropdown: () => void;
    onAddDocument: (doc: any) => void;
}> = ({ isOpen, toggleDropdown, onAddDocument }) => {
    const { onboardingStage, userId, lastName } = Storage.getItem(
        "userDetails"
    ) || { onboardingStage: "", userId: 0, firstName: "", lastName: "" };

    const [state, setState] = useState({
        name: '',
        alias: '',
        isSubmitting: false,
        errorMssg: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState((prevState) => ({ ...prevState, isSubmitting: true, errorMssg: '' }));

        const payload = {
            beneficiaryListName: state.name,
            alias: state.alias,
        };

        try {
            const response = await apiCall({
                name: "CreateBeneficiary",
                data: payload,
            });

            if (response) {
                const newDocument = {
                    ...payload,
                    date: new Date().toLocaleString(),
                };
                onAddDocument(newDocument);
                toggleDropdown();
            }
        } catch (err: any) {
            setState((prevState) => ({
                ...prevState,
                isSubmitting: false,
                errorMssg: err?.response?.data?.errorMssg || 'An error occurred. Please try again.',
            }));
        }
    };

    return (
        <Overlay toggleDropdown={toggleDropdown} isOpen={isOpen}>
            <div className="grid gap-[20px] w-[70vw] md:w-[30vw]">
                <div className="grid">
                    <p className="text-[#5C5F61] text-[20px] font-bold">Create Beneficiary List</p>
                    <p className="text-[#07222D] text-[14px]">Complete and enter the following form below</p>
                </div>
                <DefaultInput
                    label="Name"
                    name="name"
                    value={state.name}
                    handleChange={handleChange}
                />
                <DefaultInput
                    label="Alias"
                    name="alias"
                    value={state.alias}
                    handleChange={handleChange}
                />
                {state.errorMssg && <p className="text-red-500 text-sm">{state.errorMssg}</p>}
                <Button
                    title={state.isSubmitting ? 'Submitting...' : 'Add Beneficiary List'}
                    onClick={handleSubmit}
                    disabled={state.isSubmitting}
                />
            </div>
        </Overlay>
    );
};

export default PaymentLinkModal;
