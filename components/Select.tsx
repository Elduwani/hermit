export default function Select({
    name, label, width, required, initialOptions, initialValue,
    onChange, acronym, register, errors, noLabel
}) {
    const options = initialOptions ?? { value: "null", label: "no data provided" }
    const displayLabel = label ?? name.replace(/_/gi, " ")

    return (
        <div>
            {
                noLabel ? null :
                    <label htmlFor={name} className={`flex mb-2 items-center justify-between text-sm`}>
                        <span className={`text-gray-500 ${acronym ? "uppercase" : "capitalize"}`}>{displayLabel}</span>
                        {errors?.[name] ? <span className="inline-block text-red-600 text-xs text-right">{errors[name].message}</span> : null}
                    </label>
            }
            <select
                name={name}
                className={`${width ?? "w-full"} ${errors?.[name] && "error"}`}
                defaultValue={initialValue ?? ""}
                onChange={onChange}
                ref={register?.({ required: required ? "This field is required" : false })}
            >
                <option value="">{`-- Select a ${displayLabel} --`}</option>
                {
                    options.map?.((option) =>
                        <option key={option.value} value={option.value} className="capitalize">
                            {option.label ?? option.value}
                        </option>
                    )
                }
            </select>
        </div>
    )
}
