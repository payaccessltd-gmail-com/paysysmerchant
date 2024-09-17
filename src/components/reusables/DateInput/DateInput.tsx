import React from 'react'

const DateInput = ({label,name,onChange,startDate,endDate,startname,endname}:any) => {
  return (
    <div className="grid gap-1 text-[#344054] ">
        {label && <label htmlFor={name}>{label}</label>}
        <div className="grid-cols-2 grid">
        <input type="date" name={startname} id="" className="border-[#D0D5DD] border-[1px] rounded-l-md py-[10px] px-[14px] " value={startDate} onChange={onChange}/>
        <input type="date" name={endname} id="" className="border-[#D0D5DD] border-[1px] rounded-r-md py-[10px] px-[14px] ml-[-3%]" value={endDate} min={startDate} onChange={onChange}/>
        </div>
        </div>
  )
}

export default DateInput