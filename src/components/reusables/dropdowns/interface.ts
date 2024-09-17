import React, { ChangeEvent, MouseEvent, ReactNode } from "react";

export interface SelectDropDownProps {
  label: string;
  name?: string;
  placeHolder: string;
  onHandleShowOption?: (status: boolean) => void;
  onHandleChange: (
    e: any,
    payload: string
  ) => void;
  value: string | any;
  error?: string | false | undefined;
  options: any;
  placeholderTitle?: any;
  variant: string;
  valueVariant?: string;
  labelVariant?: string;
  containerVariant: string;
  optionsVariant?: string;
  optionHeight?: string;
  hasCalender?: boolean;
  hasDropSearch?: {
    action: boolean;
    isLoading?: React.ReactNode | null;
    onHandleSelectSearch?: any;
  } | null;
  addBtn?: any;
  btnvariant?: string;
  innerVariant?: string;
  required?: boolean;
  isDisabled?: boolean;
}

export interface ItemDropDownProps {
  label: string;
  name?: string;
  placeHolder: string;
  hasOptions?: boolean;
  onHandleShowOption?: (status: boolean) => void;
  func?: (item?: any) => void;
  list?: boolean;
  checker?: boolean;
  onHandleChange: (
    e: any,
    payload: string
  ) => void;
  value: string;
  error?: string | false | undefined;
  options: any;
  placeholderTitle?: any;
  variant: string;
  valueVariant?: string;
  containerVariant: string;
  optionContainerVariant?: string,
  outerContainerVariant?: string,
  optionHeight?: string;
  hasCalender?: boolean;
  hasDropSearch?: {
    action: boolean;
    isLoading?: React.ReactNode | null;
    onHandleSelectSearch?: any;
  } | null;
  addBtn?: any;
  btnvariant?: string;
  innerVariant?: string;
  optionVariant?: string,
  buttonVariant?: string,
  required?: boolean;
  preIcon?: any;
  postIcon?: any;
  children?: ReactNode;
  buttonContent?: any;
  optionValues?: any;
  isDisabled?: boolean;
}

export interface IDateDropdown {
  id?: string | number;
  format?: string;
  value?: string | number;
  isSelected?: boolean;
}

export interface DDateDropdown {
  inputVariant?: string;
  containerVariant?: string;
  toggleVariant?: string;
  readOnly?: boolean;
  asSingle?: boolean;
  useRange?: boolean;
  minDate?: any;
  maxDate?: any;
  date?: any;
  handleChange: (
    payload: string
  ) => void;
}