import { QueryCache } from "react-query";

export const queryClientConfig = {
    queryCache: new QueryCache({
        onError: (error) => {
            console.log(error)
        },
    }),
    defaultOptions: {
        queries: {
            // retry: false,
            // throwOnError?: false,
            useErrorBoundary: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
        }
    }
}