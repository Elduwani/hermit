import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'

type Props = {
    open?: boolean,
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>,
    button: React.FC,
    children: React.ReactNode
}

export default function PopOver({ button, children }: Props) {
    return (
        <Popover>
            <Popover.Button>{button}</Popover.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <Popover.Panel className="absolute z-10 w-full max-w-sm px-4 mt-3 sm:px-0">
                    <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        {children}
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}
