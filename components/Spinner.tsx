import { ImSpinner3 } from 'react-icons/im'

interface Props {
    color?: string
}

export default function Spinner({ color }: Props) {
    return (
        <span className="animate-spin grid place-items-center">
            <ImSpinner3 className={`text-3xl ${color ?? "text-gray-600"}`} />
        </span>
    )
}