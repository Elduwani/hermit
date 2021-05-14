import React, { ChangeEvent, useState } from "react"
import { _TableHeader } from "utils/types"
import Button from "./Button"
import SwitchElement from "./FormComponents"
import PopOver from "./PopOver"

const styles = {
    main: "bg-gray-500 hover:bg-gray-700 flex text-sm rounded overflow-hidden cursor-pointer",
    left: "bg-gray-300 bg-opacity-70 px-2 py-1 text-gray-900 font-medium",
    right: "bg-white bg-opacity-90 px-2 py-1 text-gray-400",
    rightActive: "bg-yellow-200 bg-opacity-90 px-2 py-1 text-gray-800 font-medium",
}

export function Fields({ options, setOptions }: { options: _TableHeader, setOptions: Function }) {
    const deselected = options.reduce((acc, curr) => {
        if (!curr.selected) acc++
        return acc
    }, 0)

    const Trigger = () => (
        <div className={styles.main}>
            <div className={styles.left}>Fields</div>
            <div className={deselected > 0 ? styles.rightActive : styles.right}>{deselected > 0 ? options.length - deselected : "All"}</div>
        </div>
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

                    return (
                        <label
                            key={label}
                            htmlFor={label}
                            className="bg-white px-4 border-b py-2 flex items-center space-x-4 capitalize hover:bg-gray-100"
                        >
                            <input
                                name={label}
                                type="checkbox"
                                onChange={handleChange}
                                checked={checked}
                                data-id={index}
                            />
                            <span>{label}</span>
                        </label>
                    )
                })
            }
        </PopOver>
    )
}

export function Filters() {
    const [state, setState] = useState({ rows: 100, skip: 0, elective: "all" })

    const Trigger = () => (
        <div className="relative">
            <div className={styles.main}>
                <div className={styles.left}>Filters</div>
                <div className={styles.right}>None</div>
            </div>
        </div>
    )

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        if (Array.isArray(e)) {
            let [name, value] = e
            setState(prevState => ({ ...prevState, [name]: value }))
        } else {
            setState(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
        }
    }

    return (

        <PopOver button={Trigger}>
            <div className="p-6 bg-white space-y-4">
                <div className="flex space-x-4">
                    <label htmlFor="rows" className="space-y-2 block">
                        <span>Rows</span>
                        <input type="text" name="rows" value={state.rows} onChange={handleChange} />
                    </label>
                    <label htmlFor="skip" className="space-y-2 block">
                        <span>Skip</span>
                        <input type="text" name="skip" value={state.skip} onChange={handleChange} />
                    </label>
                </div>
                <label htmlFor="credit" className="space-y-2 block">
                    <span>Credit</span>
                    <input type="text" name="credit" value={state.rows} onChange={handleChange} />
                </label>
                <label htmlFor="semester" className="space-y-2 block">
                    <span>Semester</span>
                    <input type="text" name="semester" value={state.rows} onChange={handleChange} />
                </label>
                <label htmlFor="elective" className="space-y-2 block">
                    <span>Semester</span>
                    <SwitchElement name="elective" enabled={state.elective} onChange={handleChange} />
                </label>
                <Button>Add Filter</Button>
            </div>
        </PopOver>
    )
}

export function Showing({ showing, total }: { showing: number, total: number }) {
    return (
        <div className="relative">
            <div className={styles.main}>
                <div className={styles.left}>Showing</div>
                <div className={styles.right}>{showing} of {total.toLocaleString("en-GB")}</div>
            </div>
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
