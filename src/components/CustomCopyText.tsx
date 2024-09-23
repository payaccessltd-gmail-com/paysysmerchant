import {BsCrop} from 'react-icons/bs'

const CustomCopyText = ({label,text}:any) => {
  return (
    <div className="grid gap-1">
            <p className="text-[#666666] text-[14px] ">{label}</p>
            <div className="border-[1px] border-[#D3EEF9] rounded-md p-[13px] flex justify-between">
                <p className="text-grey text-[14px]">{text} </p>
                <BsCrop className='text-black'/>
            </div>
        </div>
  )
}

export default CustomCopyText