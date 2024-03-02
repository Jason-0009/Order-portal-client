import { ChangeEvent, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import useWebSocket from 'react-use-websocket'

import fetchUsers from '@/api/user/fetchUsers'

import PagedResponse from '@/types/PagedResponse.type'
import User from '@/types/user/User.type'

const SOCKET_URL = `${process.env.NEXT_PUBLIC_WS_URL}/users`

const useUsers = (searchTerm: string) => {
    const [currentPage, setCurrentPage] = useState(1)

    const { data: fetchedUsers, isLoading, error, refetch } = useQuery(
        ['users', currentPage, searchTerm], () => fetchUsers(currentPage - 1, searchTerm),
        { keepPreviousData: true, refetchOnWindowFocus: false, retry: 0 }
    )

    const [currentUsers, setCurrentUsers] = useState<PagedResponse<User> | null>(null)
    const { lastMessage } = useWebSocket(SOCKET_URL)

    useEffect(() => {
        if (!fetchedUsers) return

        setCurrentUsers(fetchedUsers)

        if (!lastMessage) return

        const { id }: User = JSON.parse(lastMessage.data)
        const existingUser = currentUsers?.content.find(user => user.id === id)

        if (existingUser) refetch()
    }, [fetchedUsers, lastMessage, currentPage, currentUsers?.content, refetch])

    const handlePageChange = (_: ChangeEvent<unknown>, page: number) => setCurrentPage(page)

    return {
        currentUsers,
        isLoading,
        error,
        currentPage,
        handlePageChange
    }
}

export default useUsers
