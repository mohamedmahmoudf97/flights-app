import { IndexRouteObject, Navigate, RouteObject } from "react-router-dom";
import AuthGuard from "../../guard/AuthGard";
import HomePage from "../../views/pages/home";
import LoginPage from "../../views/pages/auth/Login";
import RegisterPage from "../../views/pages/auth/Register";
import EditFlightPage from "../../views/pages/flights/Edit";
import CreateFlightPage from "../../views/pages/flights/Insert";
import FlightPage from "../../views/pages/flights/Show";
import FlightsPage from "../../views/pages/flights/List";
import { isLoggedIn } from "../../utils/auth";
import AppLayout from "../../layout";

/**
 * Define the types of metadata that can be associated with routes.
 * - 'authRoute': for register & login routes to avoid the user to navigate to them
 * - 'publicRoute': both authenticated user & guests can see this route
 * - 'restricted': only the Authenticated users can visit the routes
 */

type RouteMetaData = {
    meta?: {
        accessType: 'authRoute' | 'publicRoute' | 'restricted'
    }
}

// Define the possible types for a route
type RouteType = RouteObject | IndexRouteObject

// Define a type for a route with children
type RouteWithChildren = RouteType & RouteMetaData & { children?: RouteObjectType[] };

// Define the type for a route object, which can be either a simple route or a route with children
type RouteObjectType = (RouteType & RouteMetaData) | RouteWithChildren;

/**
 * Function to map routes and apply necessary guards based on access type.
 * @param route - Route object to be mapped
 * @returns {RouteObjectType} Mapped route object with applied guards
 */
const mapRoutes = (route: RouteObjectType): RouteObjectType => {
    route.element = <AppLayout>{route.element}</AppLayout>
    // For public routes, no guard needed
    if (route.meta && route.meta.accessType === 'publicRoute') {
        return route
    }
    // For authentication routes, redirect to home if user is not authenticated
    if (route.meta && route.meta.accessType === 'authRoute') {
        //** navigate to home route if the user is authenticated  
        if (!isLoggedIn()) {
            return route
        }
        return {...route, element: <Navigate to={`/`} />}
    }
    // For restricted routes, apply AuthGuard
    const component = route.element
    route.element = <AuthGuard children={component} />
    // if (route.children) {
    //     route.children = route.children.map(mapRoutes);
    // }
    return route
}

// Define the routes with their respective metadata
const pageRoutes: RouteObjectType[] = [
    {
        path: '/',
        element: <HomePage />,
        meta: {
            accessType: 'publicRoute'
        }
    },
    {
        path: '/login',
        element: <LoginPage />,
        meta: {
            accessType: 'authRoute'
        }
    },
    {
        path: '/register',
        element: <RegisterPage />,
        meta: {
            accessType: 'authRoute'
        }
    },
    {
        path: '/flights',
        element: <FlightsPage />,
        meta: {
            accessType: 'restricted'
        }
    },
    {
        path: '/flights/create',
        element: <CreateFlightPage />,
        meta: {
            accessType: 'restricted'
        }
    },
    {
        path: '/flights/:flightId',
        element: <FlightPage />,
        meta: {
            accessType: 'restricted'
        },
    },
    {
        path: '/flights/:flightId/edit',
        element: <EditFlightPage />,
        meta: {
            accessType: 'restricted'
        },
    }
]

// Map the routes and apply guards
export const routes = pageRoutes.map(mapRoutes)