import { useState } from "react"
import Modal from "./Modal"

const styles = {
    main: "bg-gray-500 hover:bg-gray-700 flex text-sm font-medium rounded overflow-hidden cursor-pointer",
    left: "bg-gray-300 bg-opacity-70 px-2 py-1 text-gray-900",
    right: "bg-white bg-opacity-90 px-2 py-1 text-gray-400",
}

export function Fields({ options }: { options: object[] }) {
    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <div className="relative">
            <div className={styles.main} onClick={handleOpen}>
                <div className={styles.left}>Fields</div>
                <div className={styles.right}>All</div>
            </div>
            <Modal isOpen={open} setIsOpen={setOpen}>
                <div className="p-6 bg-white">
                    Payment successfull
                </div>
            </Modal>
        </div>
    )
}

export function Filters() {
    return (
        <div className="relative">
            <div className={styles.main}>
                <div className={styles.left}>Filters</div>
                <div className={styles.right}>None</div>
            </div>
        </div>
    )
}

export function Showing() {
    return (
        <div className="relative">
            <div className={styles.main}>
                <div className={styles.left}>Showing</div>
                <div className={styles.right}>3 of 3</div>
            </div>
        </div>
    )
}
