import { Container, Stack } from "@mui/material"
import { ReactNode } from "react"
import AppNav from "./components/AppNav"


type Props = {
    children: ReactNode
  }
const AppLayout = ({ children }: Props) => {
    return <Container>
        <AppNav />
        <Stack mt={2}>
            {children}
        </Stack>
    </Container>
}
export default AppLayout