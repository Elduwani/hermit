import React, { useState } from "react"
import { _TableHeader, _StringKeys } from "types"
import { VscCheck, VscClose } from "react-icons/vsc"
import Button from "./Button"
import PopOver from "./PopOver"
import { removeUnderscore } from "utils/utils"

const styles = {
    main: "flex text-sm overflow-hidden cursor-pointer select-none",
    left: "bg-gray-600 hover:bg-gray-700 px-3 py-1.5 text-white font-medium",
    right: "bg-white bg-opacity-90 px-3 py-1.5 text-gray-600 border border-gray-900",
    rightActive: "border border-gray-900 px-3 py-1.5 text-blue-600 font-medium",
}

export function Fields({ options, setOptions }: { options: _TableHeader[], setOptions: Function }) {
    const deselected = options.reduce((acc, curr) => {
        if (!curr.selected) acc++
        return acc
    }, 0)

    const Trigger = () => (
        <p className={styles.main}>
            <span className={styles.left}>Fields</span>
            <span className={deselected > 0 ? styles.rightActive : styles.right}>{deselected > 0 ? options.length - deselected : "All"}</span>
        </p>
    )

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id } = e.target.dataset
        const newState = options.map((opt, i) => {
            if (i === +id!) opt.selected = !opt.selected
            return opt
        })
        setOptions(newState)
    }

    return (
        <PopOver button={Trigger}>
            {
                options.map((opt, index) => {
                    const label = opt.key ?? opt.name
                    const checked = options[index].selected
                    const name = removeUnderscore(opt.name)

                    return (
                        <label
                            key={label}
                            htmlFor={label}
                            className="bg-white px-4 border-b py-3 flex items-center space-x-4 capitalize hover:bg-gray-100"
                        >
                            <input
                                name={label}
                                type="checkbox"
                                onChange={handleChange}
                                checked={checked}
                                data-id={index}
                            />
                            <span>{name}</span>
                        </label>
                    )
                })
            }
        </PopOver>
    )
}

export function Filters(
    { records, options, setOptions, clearOptions }:
        {
            records: _StringKeys[],
            options: { [key: string]: any[] },
            setOptions: Function,
            clearOptions: Function
        }
) {
    const defaultState = Object.entries(options).reduce((acc: _StringKeys, curr) => {
        acc[curr[0]] = undefined
        return acc
    }, {})

    const [state, setState] = useState(defaultState)
    const activeFilters = Object.values(state).filter(e => e !== undefined).length

    const components = () => {
        const array = []
        for (const key in options) {
            array.push(
                <div key={key} className="space-y-2 block capitalize">
                    <p className="text-gray-600 text-sm">{key}</p>
                    <div className="flex bg-gray-100">
                        {
                            options[key].sort().map((option, i) => {
                                const isSelected = option === state[key]
                                const value = typeof option === "boolean" ? String(option) : option
                                return (
                                    <a key={i} href="#"
                                        className={`inline-flex flex-1 justify-center px-4 py-2 text-sm font-medium cursor-pointer
                                            ${isSelected ? "bg-white text-gray-800 border border-gray-800" : "text-gray-500"} 
                                            focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-600 
                                            focus-visible:z-10`
                                        }
                                        onClick={() => setState(prev => ({ ...prev, [key]: isSelected ? undefined : option }))}
                                    >{value}</a>
                                )
                            })
                        }
                    </div>
                </div>
            )
        }
        return array
    }

    const Trigger = () => (
        <div className="relative">
            <p className={styles.main}>
                <span className={styles.left}>Filters</span>
                <span className={activeFilters ? styles.rightActive : styles.right}>
                    {activeFilters ? activeFilters : "None"}
                </span>
            </p>
        </div>
    )

    function applyFilters() {
        const entries = Object.entries(state)
        const validEntries = entries.filter(([, v]) => v !== undefined)

        if (!validEntries.length) { // all are undefined
            setOptions([])
        } else {
            const res = records.filter((record: _StringKeys) => validEntries.every(([k, v]) => record[k] === v))
            res.length && setOptions(res)
        }
    }

    function clearFilters() {
        setState(defaultState)
        clearOptions()
    }

    return (

        <PopOver button={Trigger}>
            <div className="p-6 bg-white space-y-4">
                <p className="text-gray-500 text-sm text-center">Click an option to select or deselect</p>
                {
                    components()
                }
                <div className="buttons space-y-3 pt-4">
                    <Button onClick={applyFilters}>
                        <VscCheck className="text-xl" />
                        <span>Apply</span>
                    </Button>
                    {
                        activeFilters > 0 &&
                        <Button variant="light-gray" onClick={clearFilters}>
                            <VscClose className="text-xl" />
                            <span>Clear Selection</span>
                        </Button>
                    }
                </div>
            </div>
        </PopOver>
    )
}

export function Showing({ showing, total }: { showing: number, total: number }) {
    return (
        <div className="relative">
            <p className={styles.main}>
                <span className={styles.left}>Showing</span>
                <span className={styles.right}>{showing} of {total.toLocaleString("en-GB")}</span>
            </p>
        </div>
    )
}

export function FilterOptions({ options }: { options: React.ReactNode[] }) {
    return (
        <div className="flex space-x-4">
            {
                options.map((Option) => Option)
            }
        </div>
    )
}
