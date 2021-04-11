import { useForm } from "react-hook-form"
import { InputWithLabel } from "components/FormComponents";

export default function Login() {
    const { handleSubmit, formState: { errors, isValid }, register } = useForm()

    return (
        <form>
            <InputWithLabel
                name="username"
                register={register}
                errors={errors}
                placeholder="Enter username"
            />
            <input type="text" name="username" />
            <input type="password" name="password" />
        </form>
    )
}
