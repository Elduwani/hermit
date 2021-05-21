import React, { useState } from 'react'
import Select from './Select'
import { _StringKeys } from 'types'

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

interface FormDataProps {
    data: _StringKeys[],
    register({ }): void,
    errors: _StringKeys,
    defaultValues: _StringKeys
}

export function FormData({ data, register, errors, defaultValues }: FormDataProps) {
    return data.map((formElement, i) => {
        const { label, name, type, options, required } = formElement

        if (type === "radio") return (
            <div key={i} className={`space-y-1 border rounded-lg p-3 bg-gray-50`}>
                <p className="text-gray-500 text-sm capitalize">{name}</p>
                <div className="flex flex-wrap -m-2">
                    {options?.map((checkbox: _StringKeys) => {
                        const { label: checkboxName, value, checked } = checkbox
                        const label = checkboxName.replace(/_/gi, " ")
                        const defaultChecked = defaultValues[name] === String(value) || checked

                        return (
                            <div className="space-x-2 m-2" key={checkboxName}>
                                <input
                                    type="radio"
                                    name={name}
                                    value={value ?? checkboxName}
                                    defaultChecked={defaultChecked}
                                    ref={register({
                                        required: required ? "Please select one of these fields" : false,
                                    })} />
                                <label htmlFor={checkboxName} className="text-gray-600 text-sm capitalize">{label}</label>
                            </div>
                        )
                    })}
                </div>
                {errors[name] && <span className="block text-red-600 text-sm">{errors[name].message}</span>}
            </div>
        )

        if (type === "select") {
            const { initialOptions } = formElement
            return (
                <Select
                    key={i}
                    name={name}
                    label={label}
                    required={required}
                    initialOptions={initialOptions}
                    register={register}
                    errors={errors}
                />
            )
        }

        return (
            <InputWithLabel
                key={i}
                type={type}
                name={name}
                label={label}
                register={register}
                errors={errors}
                defaultValue={defaultValues?.current[name]}
                required={required}
            />
        )
    })
}
