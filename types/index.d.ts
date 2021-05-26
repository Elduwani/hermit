export interface _TableHeader {
    name: string,
    key?: string,
    modifier?: (val: string | boolean | null) => string,
    selected?: boolean,
    filterBy?: boolean,
    capitalize?: boolean,
    useForm?: {
        type?: string,
        inputType?: string,
        options?: any[],
        required?: boolean,
        modifier?(v): string | number | boolean
    },
    input?: {
        type: string,
        placeholder: string,
        empty: boolean,
        initialOptions: _StringKeys[]
        modifier?(v): string | number | boolean
    }
}

export interface _StringKeys {
    [char: string]: any
}