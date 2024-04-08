// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Router Import
import { useNavigate, useLocation, useSearchParams  } from "react-router-dom"

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from '../configs/auth'

// ** Types
import { AuthValuesType, RegisterParams, LoginParams, ErrCallbackType, UserDataType } from './types'

// ** moment

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
      const expiresIn = window.localStorage.getItem(authConfig.storageTokenExpirationKeyName)!
      const expiresInDate = new Date(expiresIn)
      const now = new Date()
      if (storedToken && expiresInDate > now) {
        const userData = JSON.parse(window.localStorage.getItem('userData')!)
        setUser(userData)
      } else {
        localStorage.removeItem('userData')
        localStorage.removeItem(authConfig.storageTokenKeyName)
        localStorage.removeItem(authConfig.storageTokenExpirationKeyName)
        setUser(null)
        if (authConfig.onTokenExpiration === 'logout' && !location.pathname.includes('login')) {
          navigate('/login')
        }
      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    axios
      .post(authConfig.loginEndpoint, params)
      .then(async response => {

        const returnUrl = searchParams.get('returnUrl')

        setUser({ ...response.data.user})
        window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken)
        const now = new Date()
        now.setHours(now.getHours() + 1)
        window.localStorage.setItem(authConfig.storageTokenExpirationKeyName, now.toString())
        window.localStorage.setItem('userData', JSON.stringify(response.data.user))
        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
        navigate(redirectURL as string)
      })

      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    window.localStorage.removeItem(authConfig.storageTokenExpirationKeyName)
    navigate('/login')
  }

  const handleRegister = (params: RegisterParams, errorCallback?: ErrCallbackType) => {
    axios
      .post(authConfig.registerEndpoint, params)
      .then(res => {
        if (res.data.error) {
          if (errorCallback) errorCallback(res.data.error)
        } else {
          handleLogin({ email: params.email, password: params.password })
        }
      })
      .catch((err: { [key: string]: string }) => (errorCallback ? errorCallback(err) : null))
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
