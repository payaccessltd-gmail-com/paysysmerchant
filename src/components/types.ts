import { MouseEventHandler } from "react"


export type DefaultInputType = {
    type?: string
    name: string,
    className?:string,
    label?: React.ReactNode,
    topLabel?: "",
    handleChange: React.ChangeEventHandler<HTMLInputElement> | undefined,
    handleBlur: React.FocusEventHandler<HTMLInputElement> | undefined,
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
    validationFunc: () => any,
    readOnly?: boolean,
    isDisabled?: boolean,
    currCheck?: boolean,
    currency?: string,
    confirmPassword: boolean,
    compare?: string,
    maxLength: number,
    minLength: number,
    noLabel: boolean,
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