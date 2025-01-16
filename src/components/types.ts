import { MouseEventHandler } from "react"


export type DefaultInputType = {
    type?: string,
    name?: string,
    className?: any,
    label?: React.ReactNode,
    topLabel?: string;
    placeholder?: string;
    // handleChange: React.ChangeEventHandler<HTMLInputElement> | undefined,
    // handleBlur: React.FocusEventHandler<HTMLInputElement> | undefined,
    handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur?: (event: React.FocusEvent<HTMLInputElement>) => void; 
    value: string,
    error?: string,
    placeHolder?: string,
    variant?: string,
    inputVariant?: string,
    labelVariant?: string,
    containerVariant?: string,
    icon?: any,
    required?: boolean,
    validate?: boolean,
    validationFunc?: (value: string) => boolean;
    readOnly?: boolean,
    isDisabled?: boolean,
    currCheck?: boolean,
    currency?: string,
    confirmPassword?: boolean,
    compare?: string,
    maxLength?: number,
    minLength?: number,
    noLabel?: (value: string) => boolean;
    confirm?: boolean,
    checkNum?: boolean,
    id?: string
    
}

export type textInputType={
    rows?:number,
    cols?:number,
    type?: string
    name: string,
    label?: React.ReactNode,
    placeHolder?: string,
    isDisabled?: boolean,
    error?: string,
    value: string,
    required?: boolean,
    handleChange: React.ChangeEventHandler<HTMLInputElement> | undefined,
    readOnly?: boolean,
    id: string

}