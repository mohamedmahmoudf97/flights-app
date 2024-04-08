
import { Box, Button,  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import {Flight} from '../../../pages/flights/types'
import { formatDate } from '../../../../utils/date-format'
import { useNavigate } from 'react-router-dom'

type FlightsTableProps = { 
    data: Flight[],
    toggleRemoveModal: (id: number|undefined) => void,
    removingFlight: number,
}
const FlightsTable = ({
  data,
  toggleRemoveModal
}: FlightsTableProps) => {
    const navigate = useNavigate()
  return (
    <TableContainer component={Paper}>
      <Table aria-label='Objectives of Supply Chain Risk Management(Edit):'>
        <TableHead>
          <TableRow
            sx={{
              'td, th': {
                border: `1px solid #dcdcdc`
              }
            }}
          >
            <TableCell>Date</TableCell>
            <TableCell>Code</TableCell>
            <TableCell>Capacity</TableCell>
             <TableCell>Actions</TableCell> 
          </TableRow>
        </TableHead>
        {data?.length ? (
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  'td, th': {
                    border: `1px solid #dcdcdc`
                  }
                }}
              >
                <TableCell>{formatDate(row.date)}</TableCell>
                <TableCell>{row.code}</TableCell>
                <TableCell>{row.capacity}</TableCell>
                  <TableCell>
                    <Button
                      variant='outlined'
                      color='primary'
                      size='small'
                      sx={{mx:2}}
                      onClick={() => navigate(`/flights/${row.id}/edit`)}
                    >
                        EDIT
                    </Button>
                    <Button
                      variant='outlined'
                      color='error'
                      size='small'
                      onClick={() => toggleRemoveModal(row.id)}
                    >
                        REMOVE
                    </Button>
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : null}
      </Table>
      {data?.length ? null : (
        <Box sx={{ width: '100%', display: 'block', textAlign: 'center' }}>No Data Provided</Box>
      )}
    </TableContainer>
  )
}
export default FlightsTable
