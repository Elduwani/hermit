import { useForm } from "react-hook-form"
import { VscArrowUp } from 'react-icons/vsc'
import { ImSpinner3 } from 'react-icons/im'
import { _StringKeys, _TableHeader } from 'types'
import { removeUnderscore } from 'utils/utils'
import Button from './Button'
import { motion } from 'framer-motion'
import { useMutate } from "utils/fetch"

interface Props {
    headers: _TableHeader[],
    mutationUrl: string,
    requiredFields: _StringKeys,
    close(): void,
    refetch?(): void
}

export default function TabularForm({ headers, mutationUrl, requiredFields, refetch, close }: Props) {
    const formEntries = headers.filter(header => !!header.useForm)
    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    const { isLoading, mutate } = useMutate({
        url: mutationUrl,
        onSuccess: () => {
            reset()
            refetch?.()
            console.log("Success");
        }
    })

    const onSubmit = handleSubmit((values) => {
        for (const key in values) {
            const current = formEntries.find((c) => (c.key ?? c.name) === key)
            values[key] = current?.useForm?.modifier?.(values[key]) ?? values[key]
        }
        values = { ...values, ...requiredFields }
        if (!isLoading && mutationUrl) mutate(values)
    })

    return (
        <motion.div
            className="border border-gray-600 space-y-6 p-6"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <form onSubmit={onSubmit} className="space-y-4">
                <div className="flex w-full space-x-4">
                    {
                        formEntries.map((header, i) => {
                            const { key, name, useForm } = header
                            const label = removeUnderscore(name)
                            const _key = key ?? name

                            if (useForm?.inputType === "select") {
                                return (
                                    <select
                                        key={i}
                                        className={errors[_key] ? "error" : ""}
                                        {...register(_key, {
                                            required: useForm.required ? "This field is required" : false,
                                        })}
                                    >
                                        <option value="">{`--Select ${label}--`}</option>
                                        {
                                            useForm.options?.map(o => <option key={o} value={o}>{o}</option>)
                                        }
                                    </select>
                                )
                            }

                            return (
                                <input
                                    key={i}
                                    className={errors[_key] ? "error" : ""}
                                    type={useForm?.type ?? "text"}
                                    placeholder={label}
                                    {...register(_key, {
                                        required: useForm?.required ? "This field is required" : false,
                                    })}
                                />
                            )
                        })
                    }
                </div>
                <div className="flex justify-end space-x-4">
                    {
                        isLoading &&
                        <span className="animate-spin grid place-items-center">
                            <ImSpinner3 className="text-3xl" />
                        </span>
                    }
                    <span>
                        <Button variant="solid-gray" type="submit">
                            <VscArrowUp />
                            <span>Save records</span>
                        </Button>
                    </span>
                    <span>
                        <Button variant="light-gray" onClick={close}>Close</Button>
                    </span>
                </div>
            </form>
        </motion.div>
    )
}