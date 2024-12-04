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
        accNo: '',
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
    // const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    //     setState({
    //       ...state,
    //       [e.target.name]: e.target.value,
    //     });
    //   };

    // async function handleSubmit() {
        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault(); 
            toggleDropdown();
            setState((state: any) => ({
                ...state,
                isSubmitting: true
            }));
            // console.log("Form Data Submitted:", {
            //     name: state?.name,
            //     merchantId: userId,
            //     amount: state?.amount,
            //     description: state?.description,
            //     branchId: state?.branchId,
            //     expiryDate: state?.expiryDate,
            //     linkType: state?.linkType,
            //     invoiceId: state?.invoiceId,
            // });
        
            // const newDocument: DocumentData = {
            //     name: state.name || "Untitled",
            //     date: new Date().toLocaleString(),
            //   };
            // let formData = new FormData();
            // state && formData.append("name", state?.name || "");
            // state && formData.append("merchantId", userId || "");
            // state && formData.append('amount', state?.amount || "");
            // state && formData.append('description', state?.description || "");
            // state && formData.append('branchId', state?.branchId || "");
            // state && formData.append('expiryDate', state?.expiryDate || "");
            // state && formData.append('linkType', state?.linkType || "");
            // state && formData.append('invoiceId', state?.invoiceId || "");
            // onAddDocument(formData);
            const newDocument = {
                ...formData,
                date: new Date().toLocaleString(),
              };
              onAddDocument(newDocument);
            
            // try {
            //     const response = await apiCall({
            //         name: "createPaymentLink",
            //         data: formData,
            //         action: (): any => {
            //             setState({
            //                 ...state,
            //                 isSubmitting: false,
            //                 submittingError: false,
            //                 errorMssg: ""
            //             });
            //             setTimeout(() => {
            //                 showModalFunc();
            //             }, 3000);
            //             window.location.reload();
            //             console.log("paymentLinkdata", state);
            //             return [];
            //         },
            //         successDetails: {
            //             title: "Documents Submitted",
            //             text: `Your Business Registration documents have been submitted for review`,
            //             icon: ""
            //         },
            //         errorAction: (err?: any) => {
            //             if (err && err?.response?.data) {
            //                 setState({
            //                     ...state,
            //                     submittingError: true,
            //                     isSubmitting: false,
            //                     errorMssg: err?.response?.data?.errorMssg || err?.response?.errorMssg || err?.response?.data?.respDescription || err?.response?.respDescription || "Action failed, please try again"
            //                 });
            //                 return ["skip"];
            //             } else {
            //                 setState({
            //                     ...state,
            //                     submittingError: true,
            //                     isSubmitting: false,
            //                     errorMssg: "Action failed, please try again"
            //                 });
            //             }
            //         }
            //     }).then(async (res: any) => {
            //         setState({
            //             submittingError: false,
            //             isSubmitting: false,
            //             errorMssg: ""
            //         });
            //     });
            // } catch (e) {
            //     console.error(e + " 'Caught Error.'");
            // }
        };
        
    //}



    return (
        <Overlay toggleDropdown={toggleDropdown} isOpen={isOpen}>
            <div className="grid gap-[20px] w-[70vw] md:w-[30vw] ">
                <div className="grid">
                    <p className="text-[#5C5F61] text-[20px] font-bold">Add Beneficiary to List</p>
                    <p className="text-[#07222D] text-[14px]">Complete and enter the following form below  </p>
                </div>




              
       
        {/* <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        /> */}
        {/* <textarea
          name="content"
          placeholder="Content (JSON format)"
          value={formData.content}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        /> */}
       
   

        <DefaultInput label="Full Name" name="fullName" value={formData.fullName} handleChange={handleChange} />
        <DefaultInput label="Bank Name" name="bankName" value={formData.bankName} handleChange={handleChange} />
        <DefaultInput label="Account No" name="accNo" value={formData.accNo} handleChange={handleChange} />
        <DefaultInput label="Amount" name="amount" value={formData.amount} handleChange={handleChange} />
        {/* <DateInput
          label="Select Date"
            name="date"
          startDate={formData.startDate}
          endDate={formData.endDate}
          onChange={handleChange}
        /> */}
        <Button title='Add Beneficiary' onClick={handleSubmit} />

                {/* <DefaultInput label='name' placeHolder='name' value={name} name='name' handleChange={handleChange} />
                <DefaultInput label='alais' placeHolder='name' value={name} name='name' handleChange={handleChange} />
             
                <DateInput
            label="Select Date"
            name="date"
            startname="startDate"
            endname="endDate"
            onChange={handleChange}
            startDate={startDate}
            endDate={endDate}
          />
     

               
                <div className="m-auto w-full">
                    <Button title='Add Beneficiary' onClick={handleSubmit} />
                </div> */}
            </div>
        </Overlay>
    )
}

export default PaymentLinkModal2





// const UserInputForm = ({ onAddDocument }: { onAddDocument: (newDocument: DocumentData) => void }) => {
//     const [formData, setFormData] = useState({ name: "", date: ""});
  
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
//       const { name, value } = e.target;
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: value,
//       }));
//     };
  
//     const handleSubmit = (e: React.FormEvent) => {
//       e.preventDefault();
  
//       const newDocument: DocumentData = {
//         name: formData.name,
//         date: formData.date,
//        // content: JSON.parse(formData.content), 
//       };
  
//       onAddDocument(newDocument);
//       setFormData({ name: "", date: "" }); // Reset form after submission
//     };