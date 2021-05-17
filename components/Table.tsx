import { useRef } from "react";

interface Props {
    headers: {
        name: string,
        key?: string | undefined,
        modifier?: (val: string | boolean | null) => string
    }[],
    data: object[],
    isLoading?: boolean,
    setOffset?: Function
}

export default function Table({ headers, data = [] }: Props) {
    const containerRef = useRef<HTMLTableElement>(null)

    return (
        <div className={`bg-gray-100 border border-gray-600 overflow-y-auto scrollbar`}>
            <table className="border-collapse min-w-full" ref={containerRef}>
                <thead>
                    <tr className="divide-x">
                        {
                            headers.map((elem, i) => {
                                const { name, key } = elem
                                const label = (key ?? name).replace(/_/gi, " ")

                                return (
                                    <th key={i} scope="col"
                                        className={`h-12 px-6 py-3 sticky top-0 left-0 text-left text-xs font-bold text-gray-800 bg-white uppercase tracking-wider whitespace-nowrap `}
                                    >
                                        <div className={`flex items-center space-x-2`}>
                                            <span>{label}</span>
                                        </div>
                                    </th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-400">
                    {
                        data.map((entry: object, index) =>
                            <TableRow
                                key={index}
                                data={entry}
                                headers={headers}
                            />
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

function TableRow({ data, headers }: { data: { [char: string]: any }, headers: Props["headers"] }) {

    return (
        <tr className="py-2 px-4 h-12 divide-x divide-gray-400">
            {
                headers.map((elem, index) => {
                    const { key, name, modifier } = elem
                    const value = data[key ?? name]
                    const modifiedValue = modifier?.(value) ?? value

                    return (
                        <td key={name + index} className={`px-6 py-2 ${name.length < 15 && "whitespace-nowrap"}`}>
                            <p className={`capitalize text-sm text-gray-600`}>
                                {modifiedValue}
                            </p>
                        </td>
                    )
                })
            }
        </tr>
    )
}