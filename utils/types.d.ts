export interface _TableHeader {
    name: string,
    key?: string,
    modifier?: (val: string | boolean | null) => string,
    selected?: boolean,
    filterBy?: boolean
}

export interface _StringKeys {
    [char: string]: any
}