import React, { createContext, useContext } from 'react'

interface ContextInterface {
    isValid: boolean
}

export const StoreContext = createContext({} as ContextInterface)
export const useStore = () => useContext(StoreContext)

export function StoreProvider(props: { children: React.ReactNode }) {
    // const [sidebarIsOpen, setsidebarIsOpen] = useState(true);
    return (
        <StoreContext.Provider value={{ isValid: true }}>
            { props.children}
        </StoreContext.Provider>
    )
}