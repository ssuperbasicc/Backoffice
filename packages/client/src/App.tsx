import React, { useState } from "react"

import './App.css'
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-quartz.css";

import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom"

import listRoutes from "./registerRoutes"

import Sidebar from "./components/Sidebar"
import Navbar from "./components/Navbar"
import Login from "./pages/Login";

const Root: React.FC = () => {
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false)

  const toggleAction = function (): void {
    setToggleSidebar(!toggleSidebar)
  }

  React.useEffect(() => {
      const handleResize = function () {
        if (window.innerWidth > 768) {
          setToggleSidebar(false)
        } else {
          setToggleSidebar(true)
        }
      } 

      window.addEventListener("resize", handleResize)

      return () => {
        window.removeEventListener("resize", handleResize)
      }
  }, [])

  return (
    <>
      <div className="d-flex">
        <div className={toggleSidebar ? 'd-none' : 'w-auto position-fixed'}>
          <Sidebar />
        </div>
        <div className={toggleSidebar ? 'd-none' : 'invisible'}>
          <Sidebar />
        </div>
        <div className="col">
          <Navbar toggleAction={toggleAction}/>
          <Outlet />
        </div>
      </div>
      
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: window.sessionStorage.getItem("token") ? <Root /> : <Login />,
    children: listRoutes
  }
])


function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
