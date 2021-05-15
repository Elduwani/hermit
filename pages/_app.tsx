import { StoreProvider } from "contexts/Store.context"
import { AppProps } from "next/app"
import { useRef } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { queryClientConfig } from "utils/config"
import '../styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps) {
  const queryClientRef = useRef<QueryClient>()
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient(queryClientConfig)
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </QueryClientProvider>
  )
}

export default MyApp
