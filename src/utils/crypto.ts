import { AES, enc, lib } from 'crypto-js'

const secretKey: string = lib.WordArray.random(256 / 8).toString()

export const encrypt = (text: string): string => AES.encrypt(text, secretKey).toString()

export const decrypt = (ciphertext: string): string => {
    const bytes = AES.decrypt(ciphertext, secretKey)

    return bytes.toString(enc.Utf8)
}
