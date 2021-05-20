import { useState, useRef, useEffect } from 'react'
import { v4 as uuid } from "uuid"
import { VscAdd, VscArrowUp, VscChromeClose } from 'react-icons/vsc'
import { _StringKeys, _TableHeader } from 'types'
import { removeUnderscore } from 'utils/utils'
import Button from './Button'
import { motion } from 'framer-motion'

interface Props {
    headers: _TableHeader[],
    mutationUrl: string,
    requiredFields: _StringKeys,
    close(): void,
    identifier?: string
}

export default function TabularForm({ headers, mutationUrl, requiredFields, close, identifier = "__uid" }: Props) {
    const formEntries = headers.filter(header => !!header.useForm)
    const initialState = () => formEntries.reduce((acc: _StringKeys, current) => {
        acc[current.key ?? current.name] = undefined
        return { ...acc, ...requiredFields, [identifier]: uuid() }
    }, {})

    const [rows, setRows] = useState<_StringKeys[]>([])
    const values = useRef(rows) //Don't have to trigger rerenders on handleUpdate

    function addRow() {
        const newRow = initialState() //has to be the same for both to sync
        setRows(r => [...r, newRow])
        values.current = [...values.current, newRow]
    }

    function removeRow(index: string) {
        const newList = rows.filter(row => index !== row[identifier])
        values.current = values.current.filter(row => index !== row[identifier])
        setRows(newList)
    }

    function handleUpdate(e: React.ChangeEvent<HTMLFormElement>) {
        let { name, value, dataset: { uid } } = e.target
        const current = formEntries.find(e => (e.key ?? e.name) === name) //formEntries only contains entries with useForm
        const index = rows.findIndex(r => r[identifier] === uid)

        if (typeof current?.useForm === "object") {
            value = current.useForm.modifier?.(value) ?? value
        }

        const newState = [...values.current]
        newState[index][name] = value
        values.current = newState
    }

    function handleSubmit() {
        console.log(values.current)
    }

    useEffect(() => {
        if (!rows.length) addRow()
    }, [])

    return (
        <motion.div
            className="border border-gray-600 space-y-6 p-6"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {
                rows.map((row) =>
                    <Form
                        key={row[identifier]}
                        uid={row[identifier]}
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
    uid: string,
    removeRow(id: string): void,
    formEntries: _TableHeader[],
    handleUpdate(e: React.ChangeEvent): void,
}

function Form({ uid, removeRow, formEntries, handleUpdate }: FormProps) {
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
                                data-uid={uid}
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
                            data-uid={uid}
                        />
                    )
                })
            }
            <span>
                <Button className="w-[20px]" variant="outline" onClick={() => removeRow(uid)}>
                    <VscChromeClose className="text-xl" />
                </Button>
            </span>
        </form>
    )
}
