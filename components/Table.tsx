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

export default function Table({ headers, data = [], isLoading, setOffset }: Props) {
    const containerRef = useRef<HTMLTableElement>(null)

    return (
        <div className={`h-full bg-white border rounded-lg overflow-y-auto scrollbar shadow-lg`}>
            <table className="bg-white border-collapse min-w-full" ref={containerRef}>
                <thead>
                    <tr className="divide-x">
                        {
                            headers.map((elem, i) => {
                                const { name, key } = elem
                                const label = (key ?? name).replace(/_/gi, " ")

                                return (
                                    <th
                                        key={i}
                                        scope="col"
                                        className={`h-12 px-6 py-3 text-left text-xs font-bold text-gray-500 bg-gray-50 uppercase tracking-wider whitespace-nowrap `}
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
                <tbody className="bg-white divide-y divide-gray-200">
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
        <tr className="py-2 px-4 h-12 divide-x">
            {
                headers.map((elem, index) => {
                    const { key, name, modifier } = elem
                    const value = data[key ?? name]
                    const modifiedValue = modifier?.(value) ?? value

                    return (
                        <td key={name + index} className={`bg-white px-6 py-2 ${name.length < 15 && "whitespace-nowrap"}`}>
                            <p className={`capitalize text-sm bg-white text-gray-600`}>
                                {modifiedValue}
                            </p>
                        </td>
                    )
                })
            }
        </tr>
    )
}