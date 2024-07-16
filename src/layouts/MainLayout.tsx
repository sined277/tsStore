import { Outlet } from "react-router-dom";
import { Header } from "../components";
import React from "react";
const MainLayout = () => {
    return (
        <div className="wrapper">
            <Header />
            <Outlet />
        </div>
    );
};

export default MainLayout;
