import React, { useState } from 'react'
import { Storage } from "../../Utils/Stores/inAppStorage";
import { Image } from '../../assets'
import { Button } from '../../components/reusables/DefaultButton'
import DefaultInput from '../../components/reusables/DefaultInput'
import Overlay from '../../components/reusables/Overlay/Overlay'
import { apiCall } from '../../Utils/URLs/axios.index'
import DateInput from '../../components/reusables/DateInput/DateInput';

const PaymentLinkModal2: React.FC<{
    isOpen: boolean;
    toggleDropdown: () => void;
    onAddDocument: (doc: any) => void;
}> = ({ isOpen, toggleDropdown, onAddDocument }) => {
    const businessId: any = localStorage.getItem('businessID')
    const { onboardingStage, userId, lastName } = Storage.getItem(
        "userDetails"
    ) || { onboardingStage: "", userId: 0, firstName: "", lastName: "" };
    const [state, setState] = useState<any>({
        name: '',
        amount: '',
        description: '',
        branchId: '',
        expiryDate: '',
        startDate: null,
        endDate: null,
        isSubmitting: false,
        errorMssg: '',
    })
    const [formData, setFormData] = useState({
        fullName: '',
        bankName: '',
        accNumber: '',
        amount: '',
        startDate: null,
        endDate: null,
    });
    const { name, amount, description, branchId, expiryDate, startDate, endDate, isSubmitting } = state;
    const showModalFunc = () => {
        setState({

            amount: '',
            name: '',
            description: '',
            branchId: '',
            merchantId: '',
            expiryDate: '',
            linkType: '',
            invoiceId: '',
            submittingError: false,
            isSubmitting: false,
            errorMssg: ""
        })
        toggleDropdown()
        // showModal();
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
            isSubmitting: false,
            submittingError: false,
            errorMssg: ""
        });
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }
    // async function handleSubmit() {
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState((prevState: any) => ({ ...prevState, isSubmitting: true, errorMssg: '' }));

        const payload = {
            beneficiaryListName: state.name,
            alias: state.alias,
        };

        try {
            const response = await apiCall({
                name: "CreateBeneficiaryItem",
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
            setState((prevState: any) => ({
                ...prevState,
                isSubmitting: false,
                errorMssg: err?.response?.data?.errorMssg || 'An error occurred. Please try again.',
            }));
        }
    };
    //}
    return (
        <Overlay toggleDropdown={toggleDropdown} isOpen={isOpen}>
            <div className="grid gap-[20px] w-[70vw] md:w-[30vw] ">
                <div className="grid">
                    <p className="text-[#5C5F61] text-[20px] font-bold">Add Beneficiary to List</p>
                    <p className="text-[#07222D] text-[14px]">Complete and enter the following form below  </p>
                </div>
                <DefaultInput label="Full Name" name="fullName" value={formData.fullName} handleChange={handleChange} />
                <DefaultInput label="Bank Name" name="bankName" value={formData.bankName} handleChange={handleChange} />
                <DefaultInput label="Account No" name="accNumber" value={formData.accNumber} handleChange={handleChange} />
                <DefaultInput label="Amount" name="amount" value={formData.amount} handleChange={handleChange} />
                <Button title='Add Beneficiary' onClick={handleSubmit} />
            </div>
        </Overlay>
    )
}
export default PaymentLinkModal2