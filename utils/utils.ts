import { _TableHeader, _StringKeys } from "./types"

export function getUniqueEntries(
    headers: _TableHeader[],
    records: _StringKeys[],
    conditional: string
): { [char: string]: string[] } {
    const filterKeys = headers.reduce((acc: string[], curr: _StringKeys) => {
        if (curr[conditional]) acc.push(curr.key ?? curr.name)
        return acc
    }, [])

    const filterOptions = records.reduce((acc, curr) => {
        filterKeys.forEach((key: string) => {
            if (acc[key]) acc[key].push(curr[key])
            else acc[key] = []
        })
        return acc
    }, {})

    for (const key in filterOptions) {
        filterOptions[key] = [...new Set(filterOptions[key])]
    }

    return filterOptions
}