import { Outlet, Link } from "react-router-dom";
import MovieNavbar from "../components/MovieNavbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React from "react";


const Layout = () =>
    <>
    <MovieNavbar></MovieNavbar>
    <Container>
        <Outlet/>
    </Container>
    </>

export default Layout;