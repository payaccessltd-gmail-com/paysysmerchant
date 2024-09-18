

import {useNavigate} from 'react-router-dom'
import DefaultTextArea from '../../../components/reusables/DefaultTextArea'
import DefaultInput from '../../../components/reusables/DefaultInput'
import { Button } from '../../../components/reusables/DefaultButton'
import CustomDocument from '../../../components/reusables/CustomDocument'

const OpenInvoice = () => {
    const navigate= useNavigate()
    return (
      <div className="py-[30px] px-[5%] md:px-[15%] grid gap-[20px] bg-[#f7fdff]">
          <DefaultInput label='Customer Name' placeHolder='Enter customer name'/>
          <DefaultInput label='Customer Email' placeHolder='Enter customer Email address'/>
          <DefaultInput label='Due Date' placeHolder='27th may 2023'/>
          <DefaultInput label='Amount (optional)' placeHolder='0.00'/>
          <DefaultTextArea label='Invoice note (optional)' placeHolder='Say something about the invoice' name={''} value={''} handleChange={undefined} id={''}/>
          <CustomDocument label='Business Logo (optional)'/>
  
          <div className="m-auto w-3/4">
              <Button title='Preview ' onClick={()=>navigate('preview')}/>
              <Button title='Save as Draft'/>
          </div>
      </div>
    )
}

export default OpenInvoice