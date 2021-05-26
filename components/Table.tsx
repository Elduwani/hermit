import Link from "next/link";
import { useRef } from "react";
import { _StringKeys } from "types";

interface Props {
    headers: {
        name: string,
        key?: string | undefined,
        modifier?: (val: string | boolean | null) => string,
        capitalize?: boolean
    }[],
    data: object[],
    isLoading?: boolean,
    setOffset?: Function,
    goto?: [string, string]
}

export default function Table({ headers, data = [], goto }: Props) {
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
                                goto={goto}
                            />
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

function TableRow(
    { data, headers, goto }:
        {
            data: _StringKeys,
            headers: Props["headers"],
            goto: Props["goto"]
        }
) {

    return (
        <tr className="py-2 px-4 h-12 divide-x divide-gray-400">
            {
                headers.map((elem, index) => {
                    const { key, name, modifier, capitalize = true } = elem
                    const value = data[key ?? name]
                    const modifiedValue = modifier?.(value) ?? value
                    const [route, id] = goto ?? []

                    return (
                        <td key={name + index} className={`px-6 py-2 ${name.length < 15 && "whitespace-nowrap"}`}>
                            {
                                route && id ?
                                    <Link href={route + data[id]}>
                                        <a className={`text-sm w-full border text-gray-600 ${capitalize && "capitalize"}`}>
                                            {modifiedValue}
                                        </a>
                                    </Link>
                                    :
                                    <p className={`text-sm text-gray-600 ${capitalize && "capitalize"}`}>
                                        {modifiedValue}
                                    </p>
                            }
                        </td>
                    )
                })
            }
        </tr>
    )
}