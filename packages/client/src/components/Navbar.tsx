import React from "react"
import { IoMdMenu } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC<{toggleAction: () => void}> = ({ toggleAction }) => {
    const navigate = useNavigate()

    const _handleLogout = (): void => {
        window.sessionStorage.clear()
        navigate("/")
        window.location.reload()
    }

    return (
        <>
        <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <div>
                    <div 
                        style={{ cursor: 'pointer' }}
                        className="navbar-brand d-block d-md-none"
                        onClick={toggleAction}
                    >
                        <IoMdMenu className="text-white" />
                    </div>
                </div>
                <form className="d-flex text-white">
                   <h6 
                        onClick={_handleLogout}
                        style={{ cursor: "pointer" }}
                        className="m-1 text-uppercase"
                    >
                        Logout
                    </h6>
                </form>
            </div>
        </nav>
        </>
    )
}

export default Navbar   