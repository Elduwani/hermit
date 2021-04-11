import { useForm } from "react-hook-form"
import { InputWithLabel } from "components/FormComponents";
import Button from "components/Button";

export default function Login() {
    const { handleSubmit, formState: { errors, isValid }, register } = useForm()

    function onSubmit(values: {}) {
        console.log(values);
        console.log(isValid);
    }

    return (
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
            <Button type="submit" variant="solid-blue">Submit</Button>
        </form>
    )
}
