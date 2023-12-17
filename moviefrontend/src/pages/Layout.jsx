import { Outlet } from "react-router-dom";
import MovieNavbar from "../components/MovieNavbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import React from "react";
import NotificationBox from "../components/NotificationBox";

const Layout = () => {
  return (
    <>
      <MovieNavbar></MovieNavbar>
      <Container>
        <Row>
          <NotificationBox />
        </Row>
        <Outlet />
      </Container>
    </>
  );
};
export default Layout;
