import { Box, Button, Card, CardContent, CardHeader, Container } from "@mui/material"
import * as yup from 'yup'
import {Controller, useForm} from 'react-hook-form'
import TextField from '@mui/material/TextField'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from "react"
import { Flight } from "../../../pages/flights/types"
import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import FallBackSpinner from "../../FallBackSpinner"
import { formatDate } from "../../../../utils/date-format"
import { addFlight, getFlight, updateFlight } from "../../../../service/flights"
import toast from "react-hot-toast"



const defaultValues: Flight = {
    code: '',
    capacity: 0,
    date: new Date(new Date().getTime() + 86400000)
  }

const validationSchema = yup.object().shape({
    code: yup.string().required(),
    capacity: yup.number().required(),
    date: yup.date().default(new Date()).min(new Date(new Date().getTime() + 86400000), "Date must be in the future")
    .required()
})

type FlightFormMode = 'add' | 'edit'
  
type FlightFormProps = {
    mode:FlightFormMode;
    id?: number|undefined
}
const FlightForm = ({mode, id}: FlightFormProps) => {
    // ** State
    const [loading, setLoading] = useState<boolean>(false)

    // ** Hooks
    const {flightId} = useParams()
    const navigate = useNavigate()

    const {
        control,
        // watch,
        handleSubmit,
        setValue,
        formState: { errors, isValid }
    } = useForm({
        defaultValues: { ...defaultValues },
        mode: 'onBlur',
        resolver: yupResolver(validationSchema)
    })
    const flightIdNumber = flightId || 0

    const {isLoading,  isError, error, refetch} = useQuery({ queryKey: ['flights'], queryFn: () => getFlight(flightIdNumber)
    .then((res) => {
        if (res.data) {
            setValue('date', new Date(res.data['date']))
            setValue('code', res.data['code'])
            setValue('capacity', res.data['capacity'])
        }
        return res.data
    })
, enabled: false, })

    useEffect(() => {
        if (mode === 'edit') {
            if (flightIdNumber) {
                refetch()
            }
        } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [flightId, id, mode])
    const submit = (data: Flight) => {
        const Request = flightId ? updateFlight(flightIdNumber, data)  : addFlight(data) 
        setLoading(true)
        Request.then(() => {
            setLoading(false)
            toast.success(mode  === 'edit' ? "Flight Updated!" : "Flight Added!")
            navigate('/flights')
        })
        .catch(error => {
            setLoading(false)
            console.log(error)
        })
    }
    return <Container>
        <Card>
            <CardHeader title={mode === 'add' ? 'Add New Flight' : 'Edit Flight'} />
            <CardContent>
                {isLoading ? <FallBackSpinner /> : isError ? error.message  : (

                <form onSubmit={handleSubmit(submit)}>
                <Controller
                        control={control}
                        name="code"
                        render={({ field: { value, onChange, onBlur } }) => (
                            <TextField
                            fullWidth
                            autoFocus
                            label='Flight Code'
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            placeholder='Enter Flight Code'
                            error={Boolean(errors.code)}
                            sx={{ marginBottom: 5 }}
                            {...(errors.code && { helperText: errors.code.message })}
                            />
                          )}
                    />
                    <Controller
                        control={control}
                        name="capacity"
                        render={({ field: { value, onChange, onBlur } }) => (
                            <TextField
                            type='number'
                            fullWidth
                            label='Flight Capacity'
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            placeholder='Enter Flight Capacity'
                            error={Boolean(errors.capacity)}
                            sx={{ marginBottom: 5 }}
                            {...(errors.capacity && { helperText: errors.capacity.message })}
                            />
                          )}
                    />
                    <Controller
                        control={control}
                        name="date"
                        render={({ field: { value, onChange, onBlur } }) => (
                            <TextField
                                type="date"  
                                fullWidth
                                label='Flight Date'
                                value={formatDate(value)}
                                onBlur={onBlur}
                                onChange={onChange}
                                placeholder='Enter Flight Date'
                                error={Boolean(errors.date)}
                                sx={{ marginBottom: 5 }}
                                {...(errors.date && { helperText: errors.date.message })}
                            />
                          )}
                    />
                    <Box width={'100%'} display={'flex'} justifyContent={'end'} gap={4}>
                        <Button variant='outlined' onClick={() => navigate('/')}>
                            Cancel
                        </Button>
                        <Button variant='contained' type='submit' disabled={loading || !isValid}>
                            Save
                        </Button>
                    </Box>
                </form>
                )}

            </CardContent>
        </Card>
    </Container>

}
export default FlightForm