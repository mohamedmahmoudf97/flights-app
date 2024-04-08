import React from 'react'
import NotAuthorized from '../views/components/no-authorized'
import { isLoggedIn } from '../utils/auth'

type AuthGuardType = {
    children: React.ReactNode
}

const AuthGuard = ({children}: AuthGuardType)=> {
    return isLoggedIn() ? children : <NotAuthorized />
}

export default AuthGuard