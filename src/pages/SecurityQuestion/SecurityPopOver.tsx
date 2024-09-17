import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/reusables/DefaultButton'
import Overlay from '../../components/reusables/Overlay/Overlay'

const SecurityPopOver = ({toggleDropdown,isOpen}:any) => {
    const navigate=useNavigate()
  return (
    <Overlay toggleDropdown={toggleDropdown} isOpen={isOpen}>
    <p className="text-[20px] font-bold text-red-500 text-center">Notice</p>
        <p className="text-[15px] text-center">Kindly Fill in your security Question to enhance account's security</p>
<div className="grid md:grid-cols-2 items-center gap-[20px]">

        <Button title='Cancel' onClick={toggleDropdown}/>
        <Button title='Set Questions' onClick={()=>{toggleDropdown();
            navigate('/securityQuestion'); }}/>
</div>
    </Overlay>
  )
}

export default SecurityPopOver