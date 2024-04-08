import { Box, Button, Card, CardContent, CardHeader, Container } from "@mui/material"
import * as yup from 'yup'
import {Controller, useForm} from 'react-hook-form'
import TextField from '@mui/material/TextField'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from "react"
import { useAuth } from "../../../hooks/useAuth"
import { UserLoginData } from "./types"


const defaultValues: UserLoginData = {
    email: '',
    password: ''
  }

const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required()
})
  
  
const LoginPage = () => {
    // ** State
    const [loading, setLoading] = useState<boolean>(false)

    // ** Hooks
    const auth = useAuth()
    
    const {
        control,
        // watch,
        handleSubmit,
        setError,
        formState: { errors, isValid }
    } = useForm({
        defaultValues: { ...defaultValues },
        mode: 'onBlur',
        resolver: yupResolver(validationSchema)
    })
    const submit = (data: UserLoginData) => {
        setLoading(true)
        auth.login({...data}, () => {
            setError('email', {
                type: 'manual',
                message: 'Email or Password is not correct'
            })
            setLoading(false)
        }) 
    }
    return <Container>
        <Card>
            <CardHeader title={'Login page'} />
            <CardContent>
                <form onSubmit={handleSubmit(submit)}>
                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { value, onChange, onBlur } }) => (
                            <TextField
                            type='email'
                            fullWidth
                            autoFocus
                            label='Email Address'
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            placeholder='Enter your email'
                            error={Boolean(errors.email)}
                            sx={{ marginBottom: 5 }}
                            {...(errors.email && { helperText: errors.email.message })}
                            />
                          )}
                    />
                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { value, onChange, onBlur } }) => (
                            <TextField
                                type="password"  
                                fullWidth
                                autoFocus
                                label='Password'
                                value={value}
                                onBlur={onBlur}
                                onChange={onChange}
                                placeholder='Enter password'
                                error={Boolean(errors.password)}
                                sx={{ marginBottom: 5 }}
                                {...(errors.password && { helperText: errors.password.message })}
                            />
                          )}
                    />
                    <Box width={'100%'} display={'flex'} justifyContent={'end'} >
                        <Button type='submit' disabled={loading || !isValid}>
                            Sign in
                        </Button>
                    </Box>
                </form>
            </CardContent>
        </Card>
    </Container>
}
export default LoginPage