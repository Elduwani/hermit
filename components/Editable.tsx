import { useState, useEffect } from "react";
import { FiArrowUp } from "react-icons/fi"
import { useMutate } from "utils/fetch";
import Button from "./Button";
import Select from "./Select";
import Spinner from "./Spinner"
import { _StringKeys, _TableHeader } from "types";

interface Props {
    headers: _TableHeader[],
    data: _StringKeys[],
    mutationUrl: string,
    method: "put" | "post",
    refetchKey: string,
    buttonText: string,
}

export default function Editable({ headers, data, mutationUrl, method, refetchKey, buttonText }: Props) {
    return (
        <div className={`h-full bg-white border rounded-lg overflow-y-auto scrollbar shadow-lg`}>
            <table className="bg-white border-collapse min-w-full">
                <thead>
                    <tr>
                        {/* selected indicator and spacer ---> ghost */}
                        <th className="bg-gray-50 h-full sticky top-0 left-0 z-20">
                            <div className="w-2 h-full opacity-0"></div>
                        </th>

                        {
                            headers.map((elem, i) => {
                                let { key, name } = elem
                                const label = (name ?? key).replace(/_/gi, " ").toLowerCase()

                                return (
                                    <th
                                        key={i}
                                        scope="col"
                                        className={`h-14 px-4 py-3 text-left text-xs font-bold text-gray-500 bg-gray-50 uppercase 
                                            tracking-wider whitespace-nowrap sticky top-0
                                        `}
                                    >
                                        <div className={`flex items-center space-x-2`}>
                                            <span>{label}</span>
                                        </div>
                                    </th>
                                )
                            })
                        }
                        {/* Extra table head to accomodate the extra buttons columns*/}
                        <th className="bg-gray-50 h-full sticky top-0 left-0 z-20"></th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {
                        data?.map((entry, index) =>
                            <TableRow
                                key={entry.id ?? index}
                                data={entry}
                                headers={headers}
                                buttonText={buttonText}
                                mutationUrl={mutationUrl}
                                method={method}
                                refetchKey={refetchKey}
                            />
                        )
                    }
                </tbody>
            </table>
            {
                data?.length ?
                    <div className="py-2 px-4 h-20 grid grid-cols-5 items-center border-t">
                        <span className="col-span-2 px-2 text-xs uppercase tracking-wider text-gray-500"><b>{data?.length}</b> records</span>
                    </div>
                    : null
            }
        </div>
    )
}

interface SingleProps extends Omit<Props, "data"> {
    data: _StringKeys
}

function TableRow({ data, headers, buttonText, mutationUrl, method, refetchKey }: SingleProps) {
    const [editable, setEditable] = useState(false)
    const [hasEdited, setHasEdited] = useState(false)
    const [values, setValues] = useState<_StringKeys>({})

    const { isLoading, mutate } = useMutate({
        method,
        url: mutationUrl,
        refetchKey,
        successMessage: "Request processed succesfully",
        onSuccess: () => setEditable(false)
    })

    function handleChange(event, modifier) {
        let { name, value } = event.target
        value = modifier?.(value) ?? value
        setValues(prev => ({ ...prev, [name]: value }))
        !hasEdited && setHasEdited(true)
    }

    function handlePost() {
        if (hasEdited) {
            let postData = { ...data };
            // At the point of posting [values] has already been set by useEffect as [editable] is already true
            for (const key in values) {
                if (typeof values[key] === "number" || values[key]?.length) {
                    postData[key] = values[key]
                } else postData[key] = null
            }
            if (!isLoading && mutationUrl) mutate(postData)
        }
    }

    useEffect(() => {
        if (editable) {
            // Convert all the keys into state object with default values from props, ready for editing
            const map = {}
            headers.forEach(elem => {
                const { type, key, empty } = elem
                if (type !== 'static') {
                    map[key] = empty ? "" : data[key]
                }
            })
            setValues(map)
        } else {
            setValues({})
            setHasEdited(false)
        }
    }, [editable, headers, data])

    return (
        <tr className="py-2 px-4 h-20">
            <td className={`spacer ${editable ? "bg-red-500" : ""}`}></td>
            {
                headers.map((elem, index) => {
                    const { key, type, placeholder, inputType, modifier, capitalize = true, sticky = false, empty = false, initialOptions } = elem
                    const label = elem.label ?? key
                    const value = empty ? "" : data[key]

                    return (
                        <td
                            key={label + index}
                            style={{ minWidth: 120 }}
                            onClick={() => !editable && setEditable(true)}
                            className={`bg-white px-2 py-2 text-sm cursor-pointer
                                ${index === 0 && "pl-4"} 
                                ${sticky && "sticky left-0 z-10"} 
                                ${value?.length <= 15 && "whitespace-nowrap"}
                            `}>
                            {
                                editable ? (
                                    type === "static" ?
                                        <div className={`text-gray-600 text-sm ${capitalize && "capitalize"}`}>{value}</div>
                                        : type === "select" ?
                                            <Select
                                                name={key}
                                                selectType={label}
                                                initialValue={value}
                                                initialOptions={initialOptions}
                                                onChange={handleChange}
                                                fontSize="text-sm"
                                                noLabel
                                            />
                                            :
                                            <input
                                                name={key}
                                                type={inputType ?? 'text'}
                                                // defaultValue={value}
                                                placeholder={placeholder}
                                                value={values?.[key] ?? ''}
                                                onChange={(e) => handleChange(e, modifier)}
                                                fontSize="text-sm"
                                            />
                                )
                                    :
                                    <div className={`text-gray-600 text-sm ${capitalize && "capitalize"} ${value?.length < 20 && "whitespace-nowrap"}`}>
                                        {value}
                                    </div>
                            }
                        </td>
                    )
                })
            }
            <td className={`px-8`}>
                <div className="flex justify-end space-x-2 items-center">
                    {
                        editable ?
                            <span className="">
                                <Button
                                    variant={!editable && "light-blue"}
                                    disabled={!editable}
                                    onClick={() => editable && handlePost()}
                                >
                                    {isLoading ? <Spinner color="text-white" /> : (buttonText ?? "Update")}
                                </Button>
                            </span>
                            : null
                    }
                    <div className={`px-4 py-2 ${!editable ? "text-blue-600" : "text-red-600"} text-sm cursor-pointer select-none`}
                        onClick={() => setEditable(v => !v)}
                    >{editable ? "Cancel" : "Edit"}</div>
                </div>
            </td>
        </tr>
    )
}