import { Box, Button, Card, CardContent, CardHeader, Typography } from "@mui/material"
import { Flight } from "../../../pages/flights/types"
import { useNavigate } from "react-router-dom"
import { formatDate } from "../../../../utils/date-format"

type FlightsCardProps = { 
    flight: Flight,
    toggleRemoveModal: (id: number|undefined) => void,
    removingFlight: number,
}
const FlightCard = ({flight, toggleRemoveModal, removingFlight}: FlightsCardProps) => {
    const navigate = useNavigate()
    return <Card>
        <CardHeader 
            title={`Code: ${flight.code}`} 
            action={<Box>
                    <Button
                      variant='outlined'
                      color='primary'
                      size='small'
                      sx={{mx:2}}
                      onClick={() => navigate(`/flights/${flight.id}/edit`)}
                    >
                        EDIT
                    </Button>
                    <Button
                      variant='outlined'
                      color='error'
                      size='small'
                      disabled={removingFlight === flight.id}
                      onClick={() => toggleRemoveModal(flight.id)}
                    >
                        REMOVE
                    </Button>
        </Box>}/>
        <CardContent>
            <Typography><strong>Date: </strong>{formatDate(flight.date)}</Typography>
            <Typography><strong>Capacity: </strong>{flight.capacity}</Typography>
        </CardContent>
    </Card>
}
export default FlightCard