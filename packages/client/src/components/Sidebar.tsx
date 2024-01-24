import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { MdBarChart } from "react-icons/md"
import { IoPeopleSharp } from "react-icons/io5"
import { BiSolidCategoryAlt } from "react-icons/bi"
import { FaNetworkWired } from "react-icons/fa"

import "../assets/css/components.sidebar.styles.css"

const Sidebar: React.FC = () => {
    const navigate = useNavigate()

    type SidebarLink = {
        name: string,
        uri: string,
        activeId: number,
        icon: React.ReactElement
    }

    const sidebarList: SidebarLink[] = [
        {
            name: "Dashboard",
            uri: "/",
            activeId: 1,
            icon: <MdBarChart className="fs-4 m-1" />
        },
        {
            name: "Employee",
            uri: "/employee",
            activeId: 2,
            icon: <IoPeopleSharp className="fs-4 m-1" />
        },
        {
            name: "Position",
            uri: "/position",
            activeId: 3,
            icon: <FaNetworkWired className="fs-4 m-1" />
        },
        {
            name: "Work Unit",
            uri: "/work-unit",
            activeId: 4,
            icon: <BiSolidCategoryAlt className="fs-4 m-1" />
        }
    ]

    const [active, setActive] = useState<number>(1)

    return (
        <>
            <div className="d-flex justify-content-between flex-column bg-dark text-white py-3 ps-3 pe-5 vh-100">
                <div className="x-sidebar">
                    <span className="m-3 fs-3">Backoffice</span>
                    <hr className="text-white mt-2" />
                    <ul className="nav nav-pills flex-column">
                        {
                            sidebarList.map((d, i) => (
                                <li
                                    key={i}
                                    className={`${active === d.activeId ? 'x-active' : ''} nav-item p-3`}
                                    onClick={() => {
                                        setActive(d.activeId)
                                        navigate(d.uri)
                                    }}
                                >
                                    {d.icon}
                                    <span className="fs-5">{d.name}</span>
                                </li>
                            ))
                        } 
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Sidebar