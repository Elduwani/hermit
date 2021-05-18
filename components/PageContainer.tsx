import styles from "styles/Home.module.scss"
import HTMLHead from "./Head"
import Sidebar from "./Sidebar"

interface Props {
    children: React.ReactNode,
    title?: string
}
export default function PageContainer({ title = "Hermit", children }: Props) {
    return (
        <>
            {title && <HTMLHead title={title} />}
            <div className={styles.container + " overflow-hidden"}>
                <Sidebar />
                <main className={"w-full flex flex-col space-y-8 p-6 overflow-y-auto border-red-500"}>
                    {children}
                </main>
            </div>
        </>
    )
}