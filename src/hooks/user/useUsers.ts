import { useState, useEffect, ChangeEvent } from 'react'
import { useQuery } from 'react-query'
import useWebSocket from 'react-use-websocket'

import fetchUsers from '@/api/user/fetchUsers'

import PagedResponse from '@/types/PagedResponse.type'
import User from '@/types/user/User.type'

const SOCKET_URL = `${process.env.NEXT_PUBLIC_WS_URL}/users`

const useUsers = () => {
    const [currentPage, setCurrentPage] = useState(1)

    const { data: fetchedUsers } = useQuery(
        ['users', currentPage], () => fetchUsers(currentPage - 1),
        { keepPreviousData: true }
    )

    const [currentUsers, setCurrentUsers] = useState<PagedResponse<User> | null>(null)
    const { lastMessage } = useWebSocket(SOCKET_URL)

    useEffect(() => {
        if (lastMessage) {
            try {
                const updatedUser: User = JSON.parse(lastMessage.data)

                setCurrentUsers(previousUsers => {
                    if (!previousUsers) return null

                    const index = previousUsers.content.findIndex(user =>
                        user.id === updatedUser.id)

                    if (index === -1) return previousUsers

                    const newUsers = [...previousUsers.content]

                    newUsers[index] = updatedUser

                    return { ...previousUsers, content: newUsers }
                })
            } catch (error) {
                console.error('Error parsing WebSocket message:', error)
            }

            return
        }

        if (!fetchedUsers) return

        setCurrentUsers(fetchedUsers)
    }, [fetchedUsers, lastMessage])

    const handlePageChange = (_: ChangeEvent<unknown>, page: number) => setCurrentPage(page)

    return {
        currentUsers,
        currentPage,
        handlePageChange
    }
}

export default useUsers
