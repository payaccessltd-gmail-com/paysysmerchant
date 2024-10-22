/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/no-array-index-key */
import React, { memo, useState, useCallback, CSSProperties, useEffect } from 'react';
import SingleInput from './SingleInput';

export interface OTPInputProps {
  length: number;
  onChangeOTP: (otp: string) => any;
id?: string;
  autoFocus?: boolean;
  clearInputs?: boolean;
  isNumberInput?: boolean;
  disabled?: boolean;

  style?: CSSProperties;
  className?: string;

  inputStyle?: CSSProperties;
  inputClassName?: string;
}

export function OTPInputComponent(props: OTPInputProps) {
  const {
    id,
    length,
    isNumberInput,
    autoFocus,
    disabled,
    onChangeOTP,
    inputClassName,
    inputStyle,
    clearInputs,
    ...rest
  } = props;

  const [activeInput, setActiveInput] = useState(0);
  const [otpValues, setOTPValues] = useState(Array<string>(length).fill(''));

  // Helper to return OTP from inputs
  const handleOtpChange = useCallback(
    (otp: string[]) => {
      const otpValue = otp.join('');
      onChangeOTP(otpValue);
    },
    [onChangeOTP]
  );


  // Function to clear OTP inputs
  const clearOTPInputs = () => {
    setOTPValues(Array<string>(length).fill(''));
    setActiveInput(0);
  };

  useEffect(() => {
    if(clearInputs) clearOTPInputs()
  }, [clearInputs])
  

  // Helper to return value with the right type: 'text' or 'number'
  const getRightValue = useCallback(
    (str: string) => {
      let changedValue = str;
      if (!isNumberInput) {
        return changedValue;
      }
      return !changedValue || /\d/.test(changedValue) ? changedValue : '';
    },
    [isNumberInput]
  );

  // Change OTP value at focussing input
  const changeCodeAtFocus = useCallback(
    (str: string) => {
      const updatedOTPValues = [...otpValues];
      updatedOTPValues[activeInput] = str[0] || '';
      setOTPValues(updatedOTPValues);
      handleOtpChange(updatedOTPValues);
    },
    [activeInput, handleOtpChange, otpValues]
  );

  // Focus `inputIndex` input
  const focusInput = useCallback(
    (inputIndex: number) => {
      const selectedIndex = Math.max(Math.min(length - 1, inputIndex), 0);
      setActiveInput(selectedIndex);
    },
    [length]
  );

  const focusPrevInput = useCallback(() => {
    focusInput(activeInput - 1);
  }, [activeInput, focusInput]);

  const focusNextInput = useCallback(() => {
    focusInput(activeInput + 1);
  }, [activeInput, focusInput]);

  // Handle onFocus input
  const handleOnFocus = useCallback(
    (index: number) => () => {
      focusInput(index);
    },
    [focusInput]
  );

  // Handle onChange value for each input
  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = getRightValue(e.currentTarget.value);
      if (!val) {
        e.preventDefault();
        return;
      }
      changeCodeAtFocus(val);
      focusNextInput();
    },
    [changeCodeAtFocus, focusNextInput, getRightValue]
  );

  // Hanlde onBlur input
  const onBlur = useCallback(() => {
    setActiveInput(-1);
  }, []);

  // Handle onKeyDown input
  const handleOnKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case 'Backspace':
        case 'Delete': {
          e.preventDefault();
          if (otpValues[activeInput]) {
            changeCodeAtFocus('');
          } else {
            focusPrevInput();
          }
          break;
        }
        case 'ArrowLeft': {
          e.preventDefault();
          focusPrevInput();
          break;
        }
        case 'ArrowRight': {
          e.preventDefault();
          focusNextInput();
          break;
        }
        case ' ': {
          e.preventDefault();
          break;
        }
        default:
          break;
      }
    },
    [activeInput, changeCodeAtFocus, focusNextInput, focusPrevInput, otpValues]
  );


  const handleOnPaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData('text/plain').trim();
      const pastedDataArray=pastedData.split('')
      // console.log(pastedData,'the pasted data')
      if (pastedData) {
        const updatedOTPValues = [...otpValues];
        let nextFocusIndex = activeInput;
  
        for (let i = 0; i < pastedData.length; i++) {
          if (nextFocusIndex < length) {
            const changedValue = getRightValue(pastedData[i]);
            if (changedValue) {
              updatedOTPValues[nextFocusIndex] = changedValue;
              nextFocusIndex += 1;
            }
          }
        }
        setOTPValues(pastedDataArray);
        // onChangeOTP(pastedData)
        handleOtpChange([...otpValues, ...pastedDataArray]);
        setActiveInput(Math.min(nextFocusIndex, length - 1));
      }

    },
    [activeInput, getRightValue, length, otpValues]
  );
  // console.log(otpValues,'the otppp')
  
  return (
    <div {...rest}>
      {Array(length)
        .fill('')
        .map((_, index) => (
          <SingleInput
            key={`SingleInput-${index}`}
            id={id}
            focus={activeInput === index}
            autoFocus={autoFocus}
            value={otpValues && otpValues[index]}
            onFocus={handleOnFocus(index)}
            onChange={handleOnChange}
            onKeyDown={handleOnKeyDown}
            onBlur={onBlur}
            onPaste={handleOnPaste}
            style={inputStyle}
            className={inputClassName}
            disabled={disabled}
          />
        ))}
    </div>
  );
}

const OTPInput = memo(OTPInputComponent);
export default OTPInput;
