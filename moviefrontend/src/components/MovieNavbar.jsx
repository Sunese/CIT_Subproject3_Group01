import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/esm/Button";
import { useAuth } from "../utils/AuthContext";
import SignOutButton from "./SignOutButton";
import SearchBar from "./SearchBar";
import { MdAccountCircle } from "react-icons/md";
import { Dropdown } from "react-bootstrap";

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
                <Dropdown>
                  {/* <Link to="/account"> */}
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <MdAccountCircle size={40} />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Link to="/account">Account settings</Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link to="/bookmarks">Bookmarks</Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link to="/searchhistory">Search History</Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link to="/ratings">Ratings</Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <SignOutButton></SignOutButton>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                  {/* </Link> */}
                </Dropdown>
              </>
            ) : (
              <>
                <Button variant="primary">
                  <Link style={{ color: "white" }} to="/signin">
                    Sign in
                  </Link>
                </Button>
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
              <Link to="/searchhistory"> Go to search history page</Link>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default MovieNavbar;
