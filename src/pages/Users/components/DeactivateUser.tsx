import React, { useState } from 'react'
import { Button } from '../../../components/reusables/DefaultButton'
import Overlay from '../../../components/reusables/Overlay/Overlay'
import { ErrorCard } from '../../../Utils/HttpResponseHandlers/error'
import { apiCall } from '../../../Utils/URLs/axios.index'
import  { Toaster } from "react-hot-toast";

const DeactivateUser = ({toggleDropdown ,isOpen,merchantId,setRefresh}:any) => {
    const [state, setState] = useState<any>({
        description: "",
        password: "",
        submittingError: false,
        isSubmitting: false,
        errorMssg: ""
    })
    const { description, password, submittingError, errorMssg, isSubmitting } = state
//console.log(merchantId,'the merchant Id')
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState((state: any) => ({
            ...state,
            isSubmitting: true
        }))
        try {
            const response = await apiCall({
                name: "deactivateUser",
                urlExtra: `/${merchantId}`,
                data: {
                    description,
                    password
                },
                action: (): any => {
                    setState({
                        ...state,
                        isSubmitting: false,
                        submittingError: false,
                    })
                    return []
                },
                successDetails: { title: "Successful!", text: "User deactivated successfully", icon: "" },
                errorAction: (err?: any) => {
                    if (err && err?.response?.data) {
                        setState({
                            ...state,
                            submittingError: true,
                            isSubmitting: false,
                            errorMssg: err?.response?.data?.respDescription || "Action failed, please try again"
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
                    setRefresh(true)
                    // showModal();
                    setState({
                        description: "",
                        password: "",
                        submittingError: false,
                        isSubmitting: false,
                        errorMssg: ""
                    })

                    setTimeout(() => {
                        toggleDropdown()
                    }, 5000);
                })
        } catch (e) {
            console.error(e + " 'Caught Error.'");
        };
    }

  return (
    <Overlay toggleDropdown={toggleDropdown} isOpen={isOpen}><div className='w-fit'>
        <Toaster/>
    <p className=' w-fit text-xl font-700 '>Deactivate User</p>
    <p className='text-gray-400 w-fit text-base font-300 leading-7 mt-3'>
        {`Are you sure you want to deactivate this user?`}
    </p>
</div>
<div className='flex flex-row gap-8 justify-around items-start w-full '>
                <div className=' w-full'>
                    <div className=" flex flex-col my-5 w-full justify-center items-center ">
                        <div className=" flex  mb-2 w-full justify-between gap-x-2 items-center">
                            <Button
                                title="Deactivate"
                                className={"!bg-red-500"}
                                isLoading={isSubmitting}
                                onClick={handleSubmit}
                            />
                            <Button
                                title="Cancel"
                                className={"!bg-primary-blue"}
                                onClick={toggleDropdown}
                            />
                        </div>
                    </div>
                    <ErrorCard handleClear={() => setState({ ...state, submittingError: false })} error={errorMssg} containerVariant={!submittingError ? "hidden" : ""} />
                </div>
            </div>
</Overlay>
  )
}

export default DeactivateUser