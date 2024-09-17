import React, { useEffect, useState } from 'react'
import { Button } from '../../../components/reusables/DefaultButton'
import DefaultInput from '../../../components/reusables/DefaultInput'
import Overlay from '../../../components/reusables/Overlay/Overlay'
import { apiCall } from '../../../Utils/URLs/axios.index'
import  { Toaster } from "react-hot-toast";

const ManageUser = ({toggleDropdown,isOpen,value}:any) => {
//    const {firstName,lastName,email,id}=value
    const [state, setState] = useState({
        updatedFirstName:'',
        updatedLastName:'',
        updatedEmail:'',
        submittingError:false,
        description:'',
        isSubmitting:false,
        errorMssg:'',
        updatedPhone:''
    })
    const {updatedEmail,updatedFirstName,updatedLastName,updatedPhone}=state
   // console.log(value,'the value from the users table')

    useEffect(() => {
      setState({
        ...state,
        updatedEmail:value?.email,
        updatedFirstName:value?.firstName,
        updatedLastName:value?.lastName
      })
    }, [value])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
            submittingError: false
        });
    }

    const handelSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState((state: any) => ({
            ...state,
            isSubmitting: true
        }))
        try {
            const payload = {
                name: updatedFirstName + " " + updatedLastName,
                phone: updatedPhone,
                email: updatedEmail,
                description: "null",
                category: "null",
                address: "null",
                state: "null",
                lga: "null",
                landmark: "null"
            }
            const response = await apiCall({
                name: "editUser",
                urlExtra: `/${value?.id}`,
                data: payload,
                action: (): any => {
                    setState({
                        ...state,
                        description: "",
                        submittingError: false,
                        isSubmitting: false,
                        errorMssg: ""
                    })

                    setTimeout(() => {
                        // Your code to close the dropdown
                      toggleDropdown()
                      }, 3000);
                    // toggleDropdown();
                //  location.reload();
                    return ["success"]
                },
                successDetails: { title: "User Updated", text: "User details have been updated successfully", icon: "" },
                errorAction: (err?: any) => {
                    if (err && err?.response?.data) {
                        setState({
                            ...state,
                            submittingError: true,
                            isSubmitting: false,
                            errorMssg: err?.response?.data?.respDescription || "Action failed, please try again"
                        })
                        return [""]
                    } else {
                        setState({
                            ...state,
                            submittingError: true,
                            isSubmitting: false,
                            errorMssg: err?.response?.respDescription || "Action failed, please try again"
                        })
                    }
                }
            })
           // console.log(response,'the api response')
        } catch (e) {
            console.error(e + " 'Caught Error.'");
        }
    }
    
  return (
    <Overlay toggleDropdown={toggleDropdown} isOpen={isOpen}>
        <Toaster/>
        <p className="font-semibold text-[20px] text-center">Manage User</p>

<div className="grid gap-[20px] mt-[20px] md:w-[400px] max-h-[450px] overflow-auto">
        <DefaultInput label='First Name' name='updatedFirstName' value={updatedFirstName} handleChange={handleChange}/>
        <DefaultInput label='Last Name' name='updatedLastName' value={updatedLastName} handleChange={handleChange} />
        <DefaultInput label='Email' name='updatedEmail' value={updatedEmail} handleChange={handleChange} />
        <DefaultInput label='Phone Number' name='updatedPhone' value={updatedPhone} handleChange={handleChange} />
<Button title='Update User' onClick={handelSubmit} />
</div>
    </Overlay>
  )
}

export default ManageUser