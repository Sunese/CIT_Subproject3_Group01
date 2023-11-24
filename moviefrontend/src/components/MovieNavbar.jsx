import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const MovieNavbar = () => 
    <Navbar expand="lg" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Brand href="#home">CIT group 1</Navbar.Brand>
        
        <InputGroup>
        <Form.Control aria-label="Search input with dropdown button for search options" placeholder="Search"/>
        
        <DropdownButton
          variant="outline-secondary"
          title="All"
          id="input-group-dropdown-2"
          align="end"
        >
          <Container>
          <Row>
          <Form.Check aria-label="Title Search" label="Title Search"/>
          </Row>
          <Row>
            <Col>
            <Form.Check aria-label="Movie" label="Movie"/>
            <Form.Check aria-label="Tv Short" label="Tv Short"/>
            <Form.Check aria-label="Short" label="Short"/>
            <Form.Check aria-label="Tv Movie" label="Tv Movie"/>
            <Form.Check aria-label="Tv Mini Series" label="Tv Mini Series"/>
            <Form.Check aria-label="Video Game" label="Video Game"/>
            <Form.Check aria-label="Tv Episode" label="Tv Episode"/>
            <Form.Check aria-label="Video" label="Video"/>
            <Form.Check aria-label="Tv Special" label="Tv Special"/>
            <Form.Check aria-label="Tv Series" label="Tv Series"/>
            </Col>
          </Row>
          <Row>
            <Form.Check aria-label="Name Search" label="Name Search"/>
          </Row>
          </Container>
        </DropdownButton>
      </InputGroup>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Sign In" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

export default MovieNavbar;