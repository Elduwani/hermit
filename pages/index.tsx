import HTMLHead from 'components/Head'
import styles from 'styles/Home.module.scss'
import Login from './login'

export default function Home() {
  return (
    <div className={styles.container}>
      <HTMLHead title="Welcome to Hermit" />

      <main className={"w-full py-6 flex flex-1 border flex-col justify-center items-center space-y-8"}>
        <h1 className="text-4xl font-bold text-center space-y-2">
          Welcome to <span className="text-blue-600">Hermit!</span>
          <span className="block text-2xl text-gray-500 font-normal">Sign in to your account</span>
        </h1>
        <Login />
      </main>

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
    </div>
  )
}
