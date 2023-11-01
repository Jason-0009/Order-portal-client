import { v4 as uuidv4 } from 'uuid'
import { encrypt, decrypt } from '@/utils/crypto'

const getCustomerId = (): string => {
    const storedCustomerId: string | null = localStorage.getItem('customerId')

    if (storedCustomerId) return decrypt(storedCustomerId)

    const newCustomerId: string = uuidv4()
    const encryptedCustomerId: string = encrypt(newCustomerId)

    localStorage.setItem('customerId', encryptedCustomerId)

    return newCustomerId
}

export default getCustomerId
