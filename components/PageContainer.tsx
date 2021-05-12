import Link from "next/link"
import styles from "styles/Home.module.scss"
import HTMLHead from "./Head"

interface Props {
    children: React.ReactNode,
    hasFooter?: boolean,
    title?: string
}
export default function PageContainer({ title, hasFooter, children }: Props) {
    return (
        <div className={styles.container}>
            {title && <HTMLHead title={title} />}

            <main className={"w-full flex flex-1 flex-col space-y-6 p-6"}>
                <h1 className="text-4xl font-bold">
                    <Link href="/">
                        <a>Home <span className="text-blue-600">Page!</span></a>
                    </Link>
                </h1>
                {children}
            </main>
            {
                hasFooter && (
                    <footer className={styles.footer}>
                        <a
                            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Powered by{' '}
                            <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
                        </a>
                    </footer>
                )
            }
        </div>
    )
}