import { Outlet, Link } from "react-router-dom";
import MovieNavbar from "../components/MovieNavbar";
import React from "react";

const Layout = () =>
    <>
        <MovieNavbar></MovieNavbar>
        <Outlet></Outlet>
    </>

export default Layout;