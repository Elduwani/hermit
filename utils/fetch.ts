import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query"

const baseURL = process.env['NODE_ENV'] === "development" ? `http://localhost:3000/` : `https://hermit.netlifyapp.com`

interface FetchProps {
    url: string,
    key: string,
    enabled?: boolean,
    keepPreviousData?: boolean
}
export function useFetch({ url, key, enabled = true, keepPreviousData = false }: FetchProps) {
    const address = url ?? key

    const handleFetch = async () => {
        console.log("fetching " + address)
        if (key || url) {
            const response = await axios.get(address)
            return response.data
        }
    }

    const { data, status, isLoading, isSuccess, isError, error, refetch, isFetching } = useQuery({
        enabled,
        retry: false,
        queryKey: key ?? url,
        queryFn: handleFetch,
        keepPreviousData,
        onError: (error: Error) => {
            console.log("Error:", error.message)
        }
    })

    return { status, isLoading, isSuccess, isError, data, error, refetch, isFetching }
}

interface MutateProps {
    url: string,
    refetchKey?: string,
    onSuccess?: Function,
    successMessage?: string,
    errorMessage?: string,
    method?: 'put' | 'post' | undefined
}
export function useMutate({ url, refetchKey, onSuccess, method }: MutateProps) {
    const queryClient = useQueryClient()

    const { data: response, isLoading, isSuccess, isError, mutate } = useMutation(data =>
        axios[method ?? 'post'](baseURL + url, data),
        {
            onSuccess: () => {
                onSuccess?.()
                if (refetchKey) queryClient.invalidateQueries(refetchKey)
            },
            onError: (error: Error) => {
                console.log("error!--->", error.message)
            }
        }
    )

    return { response, data: response?.data, isLoading, isSuccess, isError, mutate }
}