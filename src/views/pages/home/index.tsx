import { Container } from "@mui/material"
import LoginPage from "../auth/Login"
import { useAuth } from "../../../hooks/useAuth"
import FlightsPage from "../flights/List"

const HomePage = () => {
    const auth = useAuth()
    return <Container>
        {auth.user ? (
            <FlightsPage />
        ) : (
            <LoginPage /> 
        )}
    </Container>
}
export default HomePage