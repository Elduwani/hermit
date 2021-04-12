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

            <main className={"w-full flex flex-1 flex-col justify-center items-center space-y-8"}>
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