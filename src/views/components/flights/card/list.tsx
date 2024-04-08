import { Flight } from "../../../pages/flights/types"
import FlightCard from "."
import { Box, Grid } from "@mui/material"

type FlightsListProps = { 
    data: Flight[],
    toggleRemoveModal: (id: number|undefined) => void,
    removingFlight: number,
}
const   FlightCardList = ({data, toggleRemoveModal, removingFlight}: FlightsListProps) => {

    return <Grid container columns={12} spacing={4}>
        {data.length ? data.map((flight, index) => <Grid item key={index}  md={6} sm={12}>
            <FlightCard  flight={flight} toggleRemoveModal={toggleRemoveModal} removingFlight={removingFlight} />
        </Grid>) : <Grid  md={6} sm={12}>
            <Box sx={{ width: '100%', display: 'block', textAlign: 'center' }}>No Data Provided</Box>
            </Grid>
            }
    </Grid>
}
export default FlightCardList