// ** Config
import authConfig from '../configs/auth'


export const isLoggedIn = (): boolean => {
    const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
    const expiresIn = window.localStorage.getItem(authConfig.storageTokenExpirationKeyName)!
    const expiresInDate = new Date(expiresIn)
    const now = new Date()
    return storedToken !== null && expiresInDate > now 
}