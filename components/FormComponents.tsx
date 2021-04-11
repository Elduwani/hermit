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