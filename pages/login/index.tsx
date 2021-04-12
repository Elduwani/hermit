// import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import Router from "next/router";
import { useForm } from "react-hook-form"
import { InputWithLabel } from "components/FormComponents";
import Button from "components/Button";
import { useMutate } from "utils/fetch";
import styles from "styles/"
import PageContainer from "components/PageContainer";

export default function Login() {
    const { handleSubmit, formState: { errors }, register } = useForm()

    const { isLoading, mutate } = useMutate({
        url: "api/login",
        onSuccess: () => Router.push("/")
    })

    async function onSubmit(values: { [char: string]: string }) {
        // console.log(values);
        if (!isLoading) mutate(values)
    }

    return (
        <PageContainer hasFooter title="Hermit | Login">
            <h1 className="text-4xl font-bold text-center space-y-2">
                Welcome to <span className="text-blue-600">Hermit!</span>
                <span className="block text-2xl text-gray-500 font-normal">Sign in to your account</span>
            </h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-8 shadow-xl rounded-lg border bg-white space-y-6 w-full max-w-xl"
            >
                <InputWithLabel
                    name="username"
                    errors={errors}
                    register={register}
                    placeholder="Enter username"
                    required
                />
                <InputWithLabel
                    name="password"
                    type="password"
                    errors={errors}
                    register={register}
                    placeholder="Enter your password"
                    required
                />
                <Button type="submit" variant="solid-blue" disabled={isLoading}>Submit</Button>
            </form>
        </PageContainer>
    )
}