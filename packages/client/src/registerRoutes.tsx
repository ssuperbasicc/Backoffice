import React from "react"

import Dashboard from "./pages/Dashboard"
import Employee from "./pages/Employee"
import Position from "./pages/Position"
import WorkUnit from "./pages/WorkUnit"
import CreatePosition from "./pages/Position/create"
import EditPosition from "./pages/Position/edit"
import CreateWorkUnit from "./pages/WorkUnit/create"
import EditWorkUnit from "./pages/WorkUnit/edit"
import DetailEmployee from "./pages/Employee/detail"
import CreateEmployee from "./pages/Employee/create"
import EditEmployee from "./pages/Employee/edit"

type Route = {
    path: string,
    element: React.ReactElement
}

const listRoutes: Route[] = [
    {
        path: "/",
        element: <Dashboard />
    },
    {
        path: "/employee",
        element: <Employee />
    },
    {
        path: "/detail-employee/:id",
        element: <DetailEmployee />
    },
    {
        path: "/create-employee",
        element: <CreateEmployee />
    },
    {
        path: "/edit-employee/:id",
        element: <EditEmployee />
    },
    {
        path: "/position",
        element: <Position />
    },
    {
        path: "/create-position",
        element: <CreatePosition />
    },
    {
        path: "/edit-position/:id",
        element: <EditPosition />
    },
    {
        path: "/work-unit",
        element: <WorkUnit />
    },
    {
        path: "/create-work-unit",
        element: <CreateWorkUnit />
    },
    {
        path: "/edit-work-unit/:id",
        element: <EditWorkUnit />
    },

]

export default listRoutes