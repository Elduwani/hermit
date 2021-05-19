import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { VscAdd, VscArrowUp, VscChromeClose } from 'react-icons/vsc'
import { _StringKeys, _TableHeader } from 'utils/types'
import { removeUnderscore } from 'utils/utils'
import Button from './Button'
import { motion } from 'framer-motion'

interface Props {
    headers: _TableHeader[],
    mutationUrl: string,
    close(): void
}

export default function TabularForm({ headers, mutationUrl, close }: Props) {
    const [rows, setRows] = useState<{ [char: string]: _StringKeys }>({})
    const formEntries = headers.filter(header => !!header.useForm)

    function addRow() {
        const uid: string = uuid()
        setRows(r => ({ ...r, [uid]: {} }))
    }

    function removeRow(id: string) {
        const newList = { ...rows }
        delete newList[id]
        setRows(newList)
    }

    function handleUpdate(e: React.ChangeEvent<HTMLFormElement>) {
        let { name, value, dataset: { id, index } } = e.target
        const current = formEntries[+index! as number].useForm //formEntries only contains entries with useForm

        if (typeof current === "object") {
            value = current.modifier?.(value) ?? value
        }

        setRows(r => ({
            ...r, [id!]: {
                ...r[id!],
                [name]: typeof value === "string" ? value.trim() : value
            }
        }))
    }

    function handleSubmit() {
        Object.values(rows).forEach(e => console.log(e))
    }

    useEffect(() => {
        if (!Object.keys(rows).length) addRow()
    }, [])

    return (
        <motion.div
            className="border border-gray-600 space-y-6 p-6"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {
                Object.keys(rows).map((id) =>
                    <Form
                        key={id}
                        id={id}
                        removeRow={removeRow}
                        formEntries={formEntries}
                        handleUpdate={handleUpdate}
                    />
                )
            }
            <div className="flex justify-between space-x-4">
                <span>
                    <Button variant="light-gray" onClick={addRow}>
                        <VscAdd />
                        <span>New row</span>
                    </Button>
                </span>
                <div className="flex items-center space-x-4">
                    <span>
                        <Button variant="solid-gray" onClick={handleSubmit}>
                            <VscArrowUp />
                            <span>Save records</span>
                        </Button>
                    </span>
                    <span>
                        <Button variant="light-gray" onClick={close}>Close</Button>
                    </span>
                </div>
            </div>
        </motion.div>
    )
}

interface FormProps {
    id: string,
    removeRow(id: string): void,
    formEntries: _TableHeader[],
    handleUpdate(e: React.ChangeEvent): void,
}

function Form({ id, removeRow, formEntries, handleUpdate }: FormProps) {
    return (
        <form className="flex w-full space-x-4">
            {
                formEntries.map((header, i) => {
                    const { key, name, useForm } = header
                    const label = removeUnderscore(name)

                    if (useForm?.inputType === "select") {
                        return (
                            <select
                                key={i}
                                name={key ?? name}
                                onChange={handleUpdate}
                                data-id={id}
                                data-index={i}
                                required={useForm.required}
                            >
                                <option value="">{`--Select a ${label}--`}</option>
                                {
                                    useForm.options?.map(o => <option key={o} value={o}>{o}</option>)
                                }
                            </select>
                        )
                    }

                    return (
                        <input
                            key={i}
                            type={useForm?.type ?? "text"}
                            name={key ?? name}
                            placeholder={label}
                            onChange={handleUpdate}
                            required={useForm?.required}
                            data-id={id}
                            data-index={i}
                        />
                    )
                })
            }
            <span>
                <Button className="w-[20px]" variant="outline" onClick={() => removeRow(id)}>
                    <VscChromeClose className="text-xl" />
                </Button>
            </span>
        </form>
    )
}
