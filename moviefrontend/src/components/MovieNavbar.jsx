import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn from "../pages/SignIn";
import Button from "react-bootstrap/esm/Button";
import { useAuth } from "../utils/AuthContext";
import SignOut from "./SignOut";
import SearchBar from "./SearchBar";

const MovieNavbar = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Brand>
          <Link to="/">CIT Group 1</Link>
        </Navbar.Brand>

        <SearchBar />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isAuthenticated ? (
              <>
                <SignOut />
              </>
            ) : (
              <>
                <NavDropdown title="Sign In" id="basic-nav-dropdown">
                  <SignIn />
                </NavDropdown>
                <Button variant="primary">
                  <Link style={{ color: "white" }} to="/signup">
                    Sign up
                  </Link>
                </Button>
              </>
            )}
            <NavDropdown title="Testing">
              <Link style={{ color: "white" }} to="/name/nm0243462">
                Go to Paula DuPré Pesmene
              </Link>
              <div>
                <Link to="/title/tt4912910">Go to Mission Impossible</Link>
              </div>
              <div>
                <Link to="/bookmarks">Go to signed in user bookmarks</Link>
              </div>
              <div>
                <Link to="/test"> Go to test page</Link>
              </div>
              <Link to="/account"> Go to account page</Link>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default MovieNavbar;
