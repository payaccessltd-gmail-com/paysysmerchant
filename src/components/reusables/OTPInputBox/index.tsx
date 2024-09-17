

import React, { useMemo } from 'react'
import { RE_DIGIT } from '../../../Utils/Stores/isHelper';


export type Props = {
    value: string;
    valueLength: number;
    onChange: (value: string) => void;
};

export function OtpInputs({ value, valueLength, onChange }: Props) {

    const valueItems = useMemo(() => {
        const valueArray = value.split('');
        const items: Array<string> = [];

        for (let i = 0; i < valueLength; i++) {
            const char = valueArray[i];

            if (RE_DIGIT.test(char)) {
                items.push(char);
            } else {
                items.push('');
            }
        }

        return items;
    }, [value, valueLength]);

    const focusToNextInput = (target: HTMLElement) => {

        let nextParent = target?.closest(".terk")?.nextElementSibling?.childNodes[0] as HTMLInputElement | null;

        if (nextParent) {
            nextParent?.focus();
        }
    };

    const focusToPrevInput = (target: HTMLElement) => {
        
        let previousParent = target?.closest(".terk")?.previousElementSibling?.childNodes[0] as HTMLInputElement | null;

        if (previousParent) {
            previousParent?.focus();
        }
        
    };

    const inputOnChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        idx: number
    ) => {
        const target = e.target;
        let targetValue = target.value.trim();
        const isTargetValueDigit = RE_DIGIT.test(targetValue);

        if (!isTargetValueDigit && targetValue !== '') {
            return;
        }

        targetValue = isTargetValueDigit ? targetValue : ' ';

        const targetValueLength = targetValue.length;

        if (targetValueLength === 1) {
            const newValue =
                value.substring(0, idx) + targetValue + value.substring(idx + 1);

            onChange(newValue);

            if (!isTargetValueDigit) {
                return;
            }
            let nextParent = target?.closest(".terk")?.nextElementSibling?.childNodes[0] as HTMLInputElement | null;


            if (nextParent) {
                nextParent?.focus();
            }
            focusToNextInput(target);
        } else if (targetValueLength === valueLength) {
            onChange(targetValue);

            target.blur();
        }
    };


    const inputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const { key } = e;
        const target = e.target as HTMLInputElement;

        if (key === 'ArrowRight' || key === 'ArrowDown') {
            e.preventDefault();
            return focusToNextInput(target);
        }

        if (key === 'ArrowLeft' || key === 'ArrowUp') {
            e.preventDefault();
            return focusToPrevInput(target);
        }

        const targetValue = target.value;
        target.setSelectionRange(0, targetValue.length);

        if (e.key !== 'Backspace' || targetValue !== '') {
            return;
        }
        focusToPrevInput(target);
        let previousParent = target?.closest(".terk")?.previousElementSibling?.childNodes[0] as HTMLInputElement | null;

        if (previousParent) {
            previousParent?.focus();
        }
        
    };
    const inputOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        const { target } = e;

        target.setSelectionRange(0, target.value.length);
    };
    return (
        <div className="flex flex-row items-start justify-between w-full max-w-md gap-1">
            {valueItems.map((digit, idx) => (
                <div className="h-10 terk" key={idx} >
                    <input className="px-3 sm:px-5 w-full sm:w-20 h-full flex flex-col items-center justify-center text-center text-3xl text-black outline-none rounded-lg border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-aqua"
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        pattern="\d{1}"
                        onChange={(e) => inputOnChange(e, idx)}
                        onKeyDown={inputOnKeyDown}
                        onFocus={inputOnFocus}
                        maxLength={valueLength}
                        value={digit}
                    />
                </div>
                
            ))}
        </div>
    );
}





