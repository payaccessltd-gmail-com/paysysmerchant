import React, { useEffect, useState } from 'react';
import { Button } from '../../components/reusables/DefaultButton';
import DefaultInput from '../../components/reusables/DefaultInput';
import Overlay from '../../components/reusables/Overlay/Overlay';
import { apiCall } from '../../Utils/URLs/axios.index';
import { fetchbulkPay, getAllbeneficiaryLists } from '../../containers/dashboardApis'; 
import CustomDropDown from '../../components/reusables/dropdowns/CustomDropDown';     

const PaymentLinkModal2: React.FC<{ 
    id: number | null; 
    isOpen: boolean; 
    toggleDropdown: () => void; 
    onAddDocument: (doc: any) => void; 
}> = ({ id, isOpen, toggleDropdown, onAddDocument }) => {
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMssg, setErrorMssg] = useState('');
    const [bankList, setBankList] = useState<{ id: string, bankName: string, bankCode: string }[]>([]);
    
    const [formData, setFormData] = useState({
        beneficiaryName: "",
        merchantId: id,
        charge: "",
        bankName: "",
        bankCode: "",
        merchantName: "",
        amount: "",
        accountNumber: "",
    });

    // Update `merchantId` when `id` changes 
    useEffect(() => {
        if (id !== null) {
            setFormData(prev => ({ ...prev, merchantId: id }));
        }
    }, [id]);

    // Handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Fetch bank list from API
    const fetchBankList = async () => {
        try {
            const res = await getAllbeneficiaryLists();
            if (res && Array.isArray(res)) {
                const formattedBanks = res.map(item => ({
                    id: item.id,
                    bankName: item.bankName || "N/A",
                    bankCode: item.bankCode || "N/A",
                }));
                setBankList(formattedBanks);
            }
        } catch (error) {
            console.error("Error fetching beneficiary list:", error);
        }
    };

    const validateAcct = async () => {
        setIsSubmitting(true);
        setErrorMssg('');

        if (!formData.bankCode || !formData.accountNumber) {
            setErrorMssg("Please select a bank and enter an account number.");
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await apiCall({
                name: "validateAcct",
                data: { 
                    bankCode: formData.bankCode, 
                    accountNumber: formData.accountNumber 
                },
            }) as { accountName?: string; bankCode?: string };

            if (response.accountName) {
                setFormData(prev => ({
                    ...prev,
                    beneficiaryName: response.accountName || "", // Ensure it's always a string
                }));
                console.log("Validated Account:", response);
            } else {
                setErrorMssg("Account validation failed: No account name found.");
            }
        } catch (err) {
            console.error("Error validating account:", err);
            setErrorMssg("Account validation failed. Please check details.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Fetch bank list when modal opens
    useEffect(() => {
        fetchBankList();
    }, [id]);


    useEffect(() => {
        if (formData.bankCode && formData.accountNumber) {
            validateAcct();
        }
    }, [formData.bankCode, formData.accountNumber]);

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMssg('');

        const payload = {
            ...formData,
            beneficiaryId: id,
        };

        try {
            const response = await apiCall({
                name: "CreateBeneficiaryItem",
                data: payload,
            });

            if (response) {
                onAddDocument({ ...payload, date: new Date().toLocaleString() });
                toggleDropdown();
            }
        } catch (err) {
            setErrorMssg('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

   

   
    //console.log("banklist....", bankList);
    const data = bankList.map(item => ({ label: item.bankName, value: item.bankName }))
   // console.log("dataaaa", data);
    return (
        
        <Overlay toggleDropdown={toggleDropdown} isOpen={isOpen}>
            <div className="grid gap-5 w-[70vw] md:w-[30vw]">
                <p className="text-gray-700 text-xl font-bold">Add Beneficiary to List</p>
                <p className="text-gray-900 text-sm">Complete and enter the form below</p>

                {/* Bank selection dropdown */}
                <CustomDropDown
    title="Select Beneficiary"
    label="Select Beneficiary"
    value={formData.bankName} // Ensure the value reflects the selected bank
    setValue={(selectedBankName: string) => {
        const selectedBank = bankList.find(bank => bank.bankName === selectedBankName);
        if (selectedBank) {
            setFormData(prev => ({
                ...prev,
                bankName: selectedBank.bankName,
                bankCode: selectedBank.bankCode, 
            }));
        }
    }}
    options={bankList.map(item => ({ name: item.bankName, value: item.bankName }))} // Ensure this correctly maps the values
    className="text-black bg-white border-gray-300 min-w-[200px] max-h-[200px] overflow-y-auto"
/>



                {/* Account input fields */}
                <DefaultInput label="Account No" name="accountNumber" value={formData.accountNumber} handleChange={handleChange} />
                <DefaultInput label="Beneficiary Name" name="beneficiaryName" value={formData.beneficiaryName} isDisabled />
                <DefaultInput label="Amount" name="amount" value={formData.amount} handleChange={handleChange} />

                {errorMssg && <p className="text-red-500 text-sm">{errorMssg}</p>}
                <Button title='Add Beneficiary' onClick={handleSubmit} disabled={isSubmitting} />
            </div>
        </Overlay>
    );
};

export default PaymentLinkModal2;
