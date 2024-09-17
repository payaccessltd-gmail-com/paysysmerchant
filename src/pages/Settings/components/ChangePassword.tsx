import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Button } from '../../../components/reusables/DefaultButton'
import DefaultInput from '../../../components/reusables/DefaultInput'
import { ErrorCard } from '../../../Utils/HttpResponseHandlers/error'
import { apiCall } from '../../../Utils/URLs/axios.index'

const ChangePassword = () => {
  const [validatePassword, setvalidatePassword] = useState(false)
  const [state, setState] = useState<any>({
    currentPassword: "",
    password: "",
    confirmPassword: "",
    submittingError: false,
    isSubmitting: false,
    isDisabled: false,
    errorMssg: ""
})

const { submittingError, isDisabled, isSubmitting, errorMssg, currentPassword, password, confirmPassword } = state

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setState({
      ...state,
      [e.target.name]: e.target.value,
      loginError: false
  });
}

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setState((state: any) => ({
      ...state,
      isSubmitting: true
  }))

  if(password!==confirmPassword){
    setState({
      ...state,
      isSubmitting: false,
      submittingError: true,
      check: true,
      errorMssg: "New password and confirm password are not the same!"
  });
  }else{
    try {
      setvalidatePassword(false)
      try {
        await apiCall({
          name:'validatePassword',
          data:{
            password:currentPassword
          }
        })
        setvalidatePassword(true)
      } catch (error) {
        setState({
          ...state,
          isSubmitting: false,
          submittingError: true,
          check: true,
          errorMssg: "Wrong Password"
      });
      }
      if(validatePassword){
        await apiCall({
            name: "changePassword",
            data: {
                oldPassword: currentPassword,
                newPassword: password,
            },
            successDetails: {
                title: "Password Reset Successful",
                text: `Your Password has changed, please continue to login`,
                icon: ""
            },
            action: (): any => {
                setState({
                    ...state,
                    isSubmitting: false,
                    submittingError: false,
                });
                return [""]
            },
            errorAction: (err?: any) => {
                setState({
                    ...state,
                    submittingError: true,
                    isSubmitting: false,
                    errorMssg:err?.response?.data?.respDescription|| "Action failed, please try again"
                })
                return [];
            }
        })
            .then(async (res: any) => {
                if (res) {
                    // showModal();
                    setState({
                        ...state,
                        isSubmitting: false,
                        submittingError: false,
                        check: true,
                        errorMssg: ""
                    });
                }
            })

      }
    } catch (e) {
        console.error(e + " 'Caught Error.'");
    } finally{
      setState((prevState:any) => ({
        ...prevState,
        password:'',
        confirmPassword:'',
        currentPassword:''
      }))
    }

  }
 
}
//console.log(errorMssg,validatePassword,'the checking')
  return (
    <div className='my-10 grid gap-[20px] md:w-3/4 lg:w-1/2'>
      <Toaster/>
        <DefaultInput label='Current Password' type='password' name='currentPassword' value={currentPassword} handleChange={handleChange} />
        <DefaultInput label='New Password' type='password' handleChange={handleChange} name='password' value={password}/>
        <DefaultInput label='Confirm Password' type='password' handleChange={handleChange} name='confirmPassword' value={confirmPassword}/>
      <ErrorCard handleClear={() => setState({ ...state, submittingError: false })} error={errorMssg} containerVariant={!submittingError ? "hidden" : ""} />

        <Button title='Change Password' onClick={handleSubmit}/>
    </div>
  )
}

export default ChangePassword