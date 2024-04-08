import {
    // createBrowserRouter,
    // RouterProvider,
    useRoutes,
    
} from "react-router-dom";
import { routes } from "./routes/index";
// const router = createBrowserRouter(routes);
const AppRouter = () => {
    const appRoutes = useRoutes(routes) 
    return appRoutes

}

export default AppRouter