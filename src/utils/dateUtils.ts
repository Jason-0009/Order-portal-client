export const formatDate = (dateInput: string): string => {
    const date = new Date(dateInput)

    const day = date.toLocaleDateString('it-IT', { day: 'numeric' })
    const month = date.toLocaleDateString('it-IT', { month: 'short' })
        .replace(/^\w/, char => char.toUpperCase()).concat('.')
    const year = date.toLocaleDateString('it-IT', { year: 'numeric' })

    return `${day} ${month} ${year}`
}
