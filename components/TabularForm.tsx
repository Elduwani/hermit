import React, { useEffect, useState } from 'react'
import { VscChromeClose } from 'react-icons/vsc'
import { _TableHeader } from 'utils/types'
import { removeUnderscore } from 'utils/utils'
import Button from './Button'

interface Props {
    headers: _TableHeader[],
    mutationUrl: string
}

export default function TabularForm({ headers, mutationUrl }: Props) {
    // const [count, setCount] = useState(0)
    const [rows, setRows] = useState<{ [char: number]: {} }>({ 0: {} })
    const inputHeaders = headers.filter(header => !!header.useForm)

    function addRow() {

    }

    function removeRow(id: number) {
        const newList = { ...rows }
        delete newList[id]
        console.log(newList);
    }

    return (
        <div className="border border-gray-600 space-y-6 p-6">
            {
                Object.keys(rows).map((index) =>
                    <Form
                        index={+index}
                        removeRow={removeRow}
                        inputHeaders={inputHeaders}
                    />
                )
            }
            <div className="flex justify-between space-x-4">
                <span>
                    <Button variant="light-gray">Add Record</Button>
                </span>
                <div className="flex items-center space-x-4">
                    <span>
                        <Button variant="solid-gray">Submit</Button>
                    </span>
                    <span>
                        <Button variant="light-gray">Close</Button>
                    </span>
                </div>
            </div>
        </div>
    )
}

interface FormProps {
    index: number,
    removeRow(id: number): void,
    inputHeaders: _TableHeader[],
}

function Form({ index, removeRow, inputHeaders }: FormProps) {
    return (
        <form className="flex w-full space-x-4">
            {
                inputHeaders.map((header, i) => {
                    const { key, name, useForm } = header
                    const label = removeUnderscore(name)

                    if (typeof useForm === "object") {
                        if (useForm.type === "select") {
                            return (
                                <select name={key ?? name} key={i}>
                                    <option value="">{`--Select a ${label}--`}</option>
                                    {
                                        useForm.options?.map(o => <option key={o} value={o}>{o}</option>)
                                    }
                                </select>
                            )
                        }
                    }

                    return (
                        <input
                            key={i}
                            type={"text"}
                            name={key ?? name}
                            placeholder={label}
                            className="capitalize"
                        />
                    )
                })
            }
            <span>
                <Button className="w-[20px]" variant="outline">
                    <VscChromeClose className="text-xl" />
                </Button>
            </span>
        </form>
    )
}
