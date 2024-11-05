import { Outlet, useLocation, Navigate } from "react-router-dom";
import SideBatProfile from "./SideBarProfile";
import "../../assert/styles/profile/SideBarProfile.scss";
import { useState } from "react";

const MyAccount = () => {
    const [title, setTitle] = useState("Profile");
    const locationPage = useLocation();
    if (locationPage.pathname === '/myaccount') {
        return <Navigate to="/404" />
    }
    const handlePageChange = (name: string) => {
        setTitle(name);
    }
    return (
        <div className="container">
            <div className="row">
                <div className="m-4">
                    <h1 className="title-page"><strong>{title}</strong></h1>
                </div>
            </div>
            <div className="row boxes">
                <div className="m-4 col-2 side-bar-profile boxes-red">        
                    <SideBatProfile onPageChange={handlePageChange} />
                </div>
                <div className="m-3 col-5 content boxes-blue">
                    <Outlet />
                </div>
                <div className="pt-4 m-3 ms-5 col-3 boxes-red">
                    <p>En caso de que no sea PRO</p>
                </div>
            </div>
        </div>
    );
}
export default MyAccount;