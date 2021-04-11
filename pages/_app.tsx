import { AppProps } from "next/app"
import { QueryClientProvider } from "react-query"
import { queryClientConfig } from "utils/config"
import '../styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClientConfig}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default MyApp
