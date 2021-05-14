import React, { useState } from 'react'
import { Switch } from '@headlessui/react'

export const validatePattern: { [char: string]: object } = {
    "numeric": {
        // value: /^[0-9]+$/,
        value: /^[0-9]+(\.[0-9]{1,2})?$/, //allow a decimal point and two numbers after
        message: "Please enter numbers only"
    },
    "email": {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: "Invalid Email Address"
    },
    "phone": {
        value: /^[-+]?[0-9]+$/,
        message: "Invalid phone number format"
    },
} as const

interface InputWithLabelProps {
    name: string,
    label?: string,
    type?: string,
    register?: Function,
    errors?: {
        [char: string]: { [char: string]: string }
    } | undefined,
    required?: boolean,
    pattern?: string,
    defaultValue?: string,
    placeholder?: string
}
export function InputWithLabel({ name, label, type, register, errors, required, pattern, defaultValue, placeholder }: InputWithLabelProps) {
    return (
        <label className="text-sm text-gray-500 space-y-2 flex flex-col">
            <p className="capitalize flex justify-between">
                <span>{label ?? name}</span>
                {
                    errors?.[name] && <span className="text-red-600 normal-case">{errors[name].message}</span>
                }
            </p>
            <input
                type={type ?? "text"}
                name={name}
                defaultValue={defaultValue}
                placeholder={placeholder}
                className={errors?.[name] && "error"}
                {...register?.(name, {
                    pattern: pattern ? validatePattern[pattern] : {},
                    required: required ? "This field is required" : false
                })}
            />
        </label>
    )
}

export default function SwitchElement({ name, enabled, onChange }: { name: string, enabled: boolean, onChange(e: any): void }) {
    return (
        <div className="py-16">
            <Switch
                checked={enabled}
                onChange={() => onChange([name, enabled])}
                className={`${enabled ? 'bg-teal-900' : 'bg-teal-700'}
                    relative inline-flex flex-shrink-0 h-[38px] w-[74px] border-2 border-transparent 
                    rounded-full cursor-pointer transition-colors ease-in-out duration-200 
                    focus:outline-none focus-visible:ring-2  focus-visible:ring-white 
                    focus-visible:ring-opacity-75`
                }
            >
                <span className="sr-only">Use setting</span>
                <span
                    aria-hidden="true"
                    className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
                        pointer-events-none inline-block h-[34px] w-[34px] rounded-full bg-white 
                        shadow-lg transform ring-0 transition ease-in-out duration-200`
                    }
                />
            </Switch>
        </div>
    )
}
