const toCamelCase = (string: string): string =>
    string.toLowerCase().replace(/(_\w)/g, match => match[1].toUpperCase())

export default toCamelCase