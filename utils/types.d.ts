export type _TableHeader = {
    name: string,
    key?: string,
    modifier?: (val: string | boolean | null) => string,
    selected?: boolean
}[]