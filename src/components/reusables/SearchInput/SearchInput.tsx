import {AiOutlineSearch} from 'react-icons/ai'

const SearchInput = ({placeholder,value,className,onChange,name}:any) => {
  return (
    <div className="relative">
        <div className="absolute text-[20px] top-[10px] left-[14px] text-[#7B7B7B]">
        <AiOutlineSearch/>

        </div>
        <input type="text" className={`placeholder:text-[#7B7B7B] border-[#D0D5DD] border-[1px] rounded-md py-[7px] pl-[44px] w-[calc(100%-20px)] md:w-full bg-[#F7F8FA] focus:border-primary ${className}`} placeholder={placeholder} value={value} onChange={onChange} name={name}/>
      </div>
  )
}

export default SearchInput