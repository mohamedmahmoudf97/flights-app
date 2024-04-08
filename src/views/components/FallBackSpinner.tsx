import { Box, CircularProgress } from "@mui/material"

const FallBackSpinner = () => {
    return <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
    }}
  >
    <CircularProgress disableShrink sx={{ mt: 6 }} />
  </Box>
}
export default FallBackSpinner