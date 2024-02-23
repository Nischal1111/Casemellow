// import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";


export default function Layout(){
    return (
        <>
            <Navbar></Navbar>
            <Sidebar/>
            <div>
                <Outlet/>
            </div>
        </>
    )
}