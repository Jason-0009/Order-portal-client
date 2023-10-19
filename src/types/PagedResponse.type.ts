type PagedResponse<T> = {
    content: T[]
    totalElements: number
    totalPages: number
    number: number
}
