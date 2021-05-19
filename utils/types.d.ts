export interface _TableHeader {
    name: string,
    key?: string,
    modifier?: (val: string | boolean | null) => string,
    selected?: boolean,
    filterBy?: boolean,
    useForm?: boolean | { type?: string, options?: any[] }
}

export interface _StringKeys {
    [char: string]: any
}