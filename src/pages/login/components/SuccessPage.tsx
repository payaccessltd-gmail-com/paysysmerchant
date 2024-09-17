import { useNavigate } from 'react-router-dom'
import { Image } from '../../../assets'
import { Button } from '../../../components/reusables/DefaultButton'
import Overlay from '../../../components/reusables/Overlay/Overlay'

const SuccessPage = ({email,isOpen,toggleDropdown}:any) => {
    const navigate=useNavigate()
  return (
    <Overlay isOpen={isOpen} toggleDropdown={toggleDropdown} >
    <img src={Image.logo} alt=""  className='m-auto' onClick={()=>navigate('/')}/>

    <div className="text-center grid gap-[20px] lg:w-3/4  m-auto">
        <p>Please, kindly verify your email address. We sent an email with a verification link to <span className='text-primary m-0'>{email}</span>

</p>
<p>If you did not receive the email, kindly check your spam folder</p>
{/* <Button title='Resend Email'/> */}
<Button title='redirect to login' onClick={()=>navigate('/')}/>
    </div>

    </Overlay>
  )
}

export default SuccessPage