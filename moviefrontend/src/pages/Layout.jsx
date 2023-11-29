import { Outlet, Link } from "react-router-dom";
import MovieNavbar from "../components/MovieNavbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React from "react";
import { useState, useEffect } from "react";
import { useNotification } from "../utils/NotificationContext";
import NotificationBox from "../components/NotificationBox";

const Layout = () => {
  return (
    <>
      <MovieNavbar></MovieNavbar>
      <Container>
        <NotificationBox />
        <Outlet />
      </Container>
    </>
  );
};
export default Layout;
