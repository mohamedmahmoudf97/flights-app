import {  Button, Card, CardContent, CardHeader, Container, IconButton } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import FallBackSpinner from "../../components/FallBackSpinner"
import { Link } from "react-router-dom"
import { deleteFlight, listFlights } from "../../../service/flights"
import FlightsTable from "../../components/flights/table"
import { useState } from "react"
import RemoveAlert from "../../components/flights/remove-modal"
import {Icon} from '@iconify/react'
import FlightCardList from "../../components/flights/card/list"

const FlightsPage = () => {
    const [viewMode, setViewMode] = useState<'grid'|'table'>('grid')
    const {isLoading, data, isError, error, refetch} = useQuery({ queryKey: ['flights'], queryFn: listFlights})
    const [openRemoveModal, setOpenRemoveModal] = useState<boolean>(false)
    const [selectedId, setSelectedId] = useState<number>(0)
    const toggle = (id?: number) => {
        setOpenRemoveModal(!openRemoveModal)
        setSelectedId(id ? id : 0)
    }
    const removeFlight = () => {
        deleteFlight(selectedId)
        .then(() => {
            toggle()
            refetch()
        })
        .catch(() => console.log('Error'))
    }
    
    return <Container>
        <Card>
            <RemoveAlert isOpen={openRemoveModal} toggle={toggle} callBack={removeFlight} />
            <CardHeader 
                title={'Flights page'} 
                action={(
    
                        <Button variant="contained">
                            <Link style={{color: '#fff'}} to='/flights/create'>Add New Flight</Link>
                        </Button>
                     )} />
                    <CardContent>
                    <IconButton color={viewMode === 'grid' ? 'primary' : 'default'}  onClick={() => setViewMode('grid')}>
                        <Icon  icon='mdi:grid' />
                    </IconButton>
                    <IconButton sx={{ mr:4 }} color={viewMode === 'table' ? 'primary' : 'default'} onClick={() => setViewMode('table')}>
                        <Icon  icon='material-symbols:table' />
                    </IconButton>
                    </CardContent>
                        {isLoading ? (
                            <FallBackSpinner />
                        ) : isError ? error.message : viewMode === 'table' ?(
                            <FlightsTable removingFlight={selectedId} toggleRemoveModal={toggle} data={data?.data || []}  />
                        ) : viewMode === 'grid' ? (
                            <FlightCardList removingFlight={selectedId} toggleRemoveModal={toggle} data={data?.data || []} />
                        ) : null}
        </Card>

    </Container>
}
export default FlightsPage