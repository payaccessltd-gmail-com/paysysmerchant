import React, { useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { Storage } from "../../Utils/Stores/inAppStorage";
import { Image } from '../../assets'
import { Button } from '../../components/reusables/DefaultButton'
import DefaultInput from '../../components/reusables/DefaultInput'
import DefaultTextArea from '../../components/reusables/DefaultTextArea'
import Overlay from '../../components/reusables/Overlay/Overlay'
import { apiCall } from '../../Utils/URLs/axios.index'

const PaymentLinkModal = ({ toggleDropdown, isOpen }: any) => {
    const businessId: any = localStorage.getItem('businessID')
    const { onboardingStage, userId, lastName } = Storage.getItem(
        "userDetails"
    ) || { onboardingStage: "", userId: 0, firstName: "", lastName: "" };
    const [state, setState] = useState<any>({
        amount: '',
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

    const { amount, description, branchId, invoiceId, merchantId, expiryDate, linkType, isSubmitting, errorMssg } = state

    const showModalFunc = () => {
        setState({
         
            amount: '',
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
            isSubmitting: false,
            submittingError: false,
            errorMssg: ""
        });
    }

    // async function handleSubmit() {
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState((state: any) => ({
            ...state,
            isSubmitting: true
        }))

        let formData = new FormData();
        state && formData.append("merchantId", userId || "");
        state && formData.append('amount', state?.amount || "")
        state && formData.append('description', state?.description || "")
        state && formData.append('branchId', state?.branchId || "")
        state && formData.append('expiryDate', state?.expiryDate || "")
        state && formData.append('linkType', state?.linkType || "")
        state && formData.append('invoiceId', state?.invoiceId || "")
 

        try {
            const response = await apiCall({
                name: "createPaymentLink",
                data: formData,
                action: (): any => {
                    setState({
                        ...state,
                        isSubmitting: false,
                        submittingError: false,
                        errorMssg: ""
                    });
                    // router.push(`/create-business/${busType}?stage=addBank`)
                    setTimeout(() => {
                        showModalFunc()

                    }, 3000);
                    window.location.reload();
                    console.log("paymentLinkdata", state)
                    return []

                },
                successDetails: {
                    title: "Documents Submitted",
                    text: `Your Business Registration documents have been submitted for review`,
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
    //}

    const linkOptions = ['RECURRENT', 'ONETIME', 'TIMED']

    return (
        <Overlay toggleDropdown={toggleDropdown} isOpen={isOpen}>
            <div className="grid gap-[20px] w-[70vw] md:w-[40vw] ">
                <div className="grid">
                    <p className="text-[#5C5F61] text-[20px] font-bold">Create Payment Link</p>
                    <p className="text-[#07222D] text-[14px]">Complete and enter the following form below  </p>
                </div>

                <DefaultInput label='Amount' placeHolder='Input Amount' value={amount} name='amount' handleChange={handleChange} />
                <DefaultTextArea label='Desciption' placeHolder='oluchi chukwu' value={description} name='description' rows={2} id={''} handleChange={handleChange} />
                <DefaultInput label='Branch ID' placeHolder='09' value={branchId} name='branchId' handleChange={handleChange} />
                <DefaultInput label='Invoice ID' placeHolder='20.0%' value={invoiceId} name='invoiceId' handleChange={handleChange} />

                <div className="form-group mb-4 cursor-pointer">
                    <label className="block text-gray-600 text-sm mb-2" htmlFor="dropdown">Select Link Type</label>
                    <select className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="dropdown" value={linkType} name='linkType' onChange={handleChange} >
                        <option value="">--select payment link--</option>
                        {linkOptions.map((val, index) => (
                            <option key={index} value={val}>{val}</option>
                        ))}

                    </select>
                </div>

                {linkType === 'TIMED' &&
                    <DefaultInput label='Expiry Date' placeHolder='20.0%' type='date' value={expiryDate} name='expiryDate' handleChange={handleChange} />
                }




                {/* ghghghgh */}
                <div className="m-auto w-3/4">
                    <Button title='Continue' onClick={handleSubmit} />
                </div>
            </div>
        </Overlay>
    )
}

export default PaymentLinkModal