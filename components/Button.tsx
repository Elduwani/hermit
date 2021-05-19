import Router from 'next/router';

interface Props {
    children: React.ReactNode,
    className?: string,
    onClick?: Function,
    goto?: string,
    type?: 'button' | 'submit' | 'reset',
    disabled?: boolean,
    variant?: 'outline' | 'light-gray' | 'solid-gray' | 'solid-blue' | 'light-blue' | 'solid-red' |
    'light-red' | 'dark-red' | 'darker-red' | 'transparent-text' | 'outline-white' | 'white',
    border?: string
}

export default function Button({ children, className, onClick, goto, type, disabled = false, variant, border }: Props) {

    function handleClick() {
        onClick?.()
        if (goto && typeof goto === "string") Router.push(goto)
    }

    return (
        <button
            type={type ?? "button"}
            style={{ minWidth: 80 }}
            className={`${className ?? ""} ${getClasses(variant, disabled, border)}`}
            onClick={handleClick}
            disabled={disabled}
        >{children}</button>
    )
}

function getClasses(variant: string | undefined, disabled: boolean, border?: string): string {
    const defaultClass = `w-full px-6 max-w-lg outline-none py-0 h-12 flex items-center justify-center hover:opacity-90 space-x-2 whitespace-nowrap 
        focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400 disabled:opacity-50 animated font-medium
        ${!disabled ? "cursor-pointer" : "cursor-default"}
    `
    const checkDisabled = (styles: string) => `${disabled ? styles + " opacity-50" : styles}`

    switch (variant) {
        case "outline":
            return `${defaultClass} border ${border ?? "border-gray-300"} bg-white text-gray-600`
        case "light-gray":
            return `${defaultClass} bg-gray-100 border border-gray-800 text-gray-700`
        case "solid-gray":
            return `${defaultClass} ${checkDisabled("bg-gray-600 text-white")}`
        case "solid-blue":
            return `${defaultClass} ${checkDisabled("bg-blue-600 text-white")}`
        case "light-blue":
            return `${defaultClass} ${checkDisabled("bg-blue-50 border border-blue-200 text-blue-900")}`
        case "light-red":
            return `${defaultClass} ${checkDisabled("bg-red-50 border border-red-200 text-red-700")}`
        case "dark-red":
            return `${defaultClass} ${checkDisabled("bg-red-500 text-white")}`
        case "darker-red":
            return `${defaultClass} ${checkDisabled("bg-red-800 text-red-100")}`
        case "transparent-text":
            return `${defaultClass} bg-transparent text-red-500`
        case "outline-white":
            return `${defaultClass} bg-transparent text-white border`
        case "white":
            return `${defaultClass} bg-white text-gray-700`
        default:
            return `${defaultClass} ${checkDisabled("bg-blue-700 text-white")}`
    }
}