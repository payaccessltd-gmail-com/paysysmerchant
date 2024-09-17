import React, { useEffect, useState } from 'react'
import { DefaultInputType, textInputType } from '../types'

const DefaultTextArea = ({
    type,
    name,
    label,
    handleChange = () => null,
    value,
    error,
    placeHolder,
    required,
    isDisabled = false,
    rows,
    cols,
    readOnly
  }: textInputType) => {
    // const [min, setMin] = useState(false);
    // const [cap, setCap] = useState(false);
    // const [low, setLow] = useState(false);
    // const [num, setNum] = useState(false);

    // useEffect(() => {
    //     if (value?.length >= 8) {
    //       setMin(true);
    //     } else if (value?.length < 8) {
    //       setMin(false);
    //       validationFunc();
    //     }
    //     if (/\d/.test(value)) {
    //       setNum(true);
    //     } else if (!/\d/.test(value)) {
    //       setNum(false);
    //     }
    //     if (/[a-z]/.test(value)) {
    //       setLow(true);
    //     } else if (!/[a-z]/.test(value)) {
    //       setLow(false);
    //     }
    //     if (/[A-Z]/.test(value)) {
    //       setCap(true);
    //     } else if (!/[A-Z]/.test(value)) {
    //       setCap(false);
    //     }
    //     if (min && cap && low && num) {
    //       validationFunc();
    //     }
    //   }, [value]);

      const onChange=(e:any)=>{
        handleChange(e)
      }
  return (
    <div className="grid gap-1 text-[#344054]">
        {label && <label htmlFor={name}>{label}</label>}
        <textarea
          onChange={onChange}
          value={value}
          placeholder={placeHolder}
          disabled={isDisabled}
          required={required || false}
          readOnly={readOnly || false}
          className="placeholder:text-[#D0D5DD] border-[#D0D5DD] border-[1px] rounded-md py-[10px] px-[14px] focus:border-primary"
          name={name}
          rows={5||rows}
          cols={cols}
        />
         {
                error && error != "" && (
                    <p className="text-red-500 font-[Inter-Regular] text-xs h-auto py-1">{error}</p>
                )
            }
    </div>
  )
}

export default DefaultTextArea