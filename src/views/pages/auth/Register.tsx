import { Box, Button, Card, CardContent, CardHeader, Container } from "@mui/material"
import * as yup from 'yup'
import {Controller, useForm} from 'react-hook-form'
import TextField from '@mui/material/TextField'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from "react"
import { useAuth } from "../../../hooks/useAuth"
import { UserRegisterData } from "./types"


const defaultValues: UserRegisterData = {
    email: '',
    username: '',
    password: ''
  }

const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    username: yup.string().required(),
    password: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required()
})
  
  
const RegisterPage = () => {
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
    const submit = (data: UserRegisterData) => {
        setLoading(true)
        auth.register({...data}, () => {
            setError('email', {
                type: 'manual',
                message: 'Email or Password is not correct'
            })
            setLoading(false)
        }) 
    }
    return <Container>
        <Card>
            <CardHeader title={'Register page'} />
            <CardContent>
                <form onSubmit={handleSubmit(submit)}>
                <Controller
                        control={control}
                        name="username"
                        render={({ field: { value, onChange, onBlur } }) => (
                            <TextField
                            fullWidth
                            autoFocus
                            label='Full Name'
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            placeholder='Enter your Name'
                            error={Boolean(errors.username)}
                            sx={{ marginBottom: 5 }}
                            {...(errors.username && { helperText: errors.username.message })}
                            />
                          )}
                    />
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
                                error={Boolean(errors.email)}
                                sx={{ marginBottom: 5 }}
                                {...(errors.password && { helperText: errors.password.message })}
                            />
                          )}
                    />
                    <Box width={'100%'} display={'flex'} justifyContent={'end'}>
                        <Button type='submit' disabled={loading || !isValid}>
                            Register
                        </Button>
                    </Box>
                </form>
            </CardContent>
        </Card>
    </Container>

}
export default RegisterPage