import { useState } from "react"
import { _TableHeader } from "utils/types"
import Button from "./Button"
import PopOver from "./PopOver"

const styles = {
    main: "bg-gray-500 hover:bg-gray-700 flex text-sm font-medium rounded overflow-hidden cursor-pointer",
    left: "bg-gray-300 bg-opacity-70 px-2 py-1 text-gray-900",
    right: "bg-white bg-opacity-90 px-2 py-1 text-gray-400",
}

export function Fields({ options, setOptions }: { options: _TableHeader, setOptions: Function }) {
    const Trigger = () => (
        <div className={styles.main}>
            <div className={styles.left}>Fields</div>
            <div className={styles.right}>All</div>
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
    const Trigger = () => (
        <div className="relative">
            <div className={styles.main}>
                <div className={styles.left}>Filters</div>
                <div className={styles.right}>None</div>
            </div>
        </div>
    )

    return (

        <PopOver button={Trigger}>
            <div className="p-6 bg-white">
                <h3>Rows</h3>
                <input type="text" name="text" />
                <h3>Skip</h3>
                <input type="text" name="text" />
                <Button>Got it, thanks</Button>
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
