import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SignIn from './SignIn';
import Button from 'react-bootstrap/esm/Button';
import { useAuth } from "../utils/AuthContext";
import SignOut from './SignOut';

const MovieNavbar = () => {
	const { isAuthenticated } = useAuth();
	const [searchParameters, setsearchParameters] = useSearchParams({ SearchResults: "" });
	const [searchTitleType, setSearchTitleType] = useState("");
	const [SearchButton, setSearchButton] = useState("All");
	const [searchSection, setSearchSection] = useState("All");
	const navigate = useNavigate();

	let handleSearch = (event) => {
		if (event.key === 'Enter') {
			if (searchSection === "All") {
				setsearchParameters({ SearchResults: "?query=" + event.target.value });
				console.log({ SearchResults: event.target.value });
			}
			else if (searchSection === "Title") {
				setsearchParameters({ SearchResults: "Title?query=" + event.target.value });
				console.log({ SearchResults: "Title?query=" + event.target.value });
			}
			else if (searchSection === "Name") {
				setsearchParameters({ SearchResults: "Name?query=" + event.target.value });
				console.log({ SearchResults: "Name?query=" + event.target.value });
			}
			if (searchTitleType !== "") {
				setsearchParameters({ SearchResults: "Title?query=" + event.target.value + "&titletype=" + searchTitleType });
				console.log({ SearchResults: "Title?query=" + event.target.value + "&titletype=" + searchTitleType });
			}
			console.log(searchParameters.get("SearchResults"));
			navigate("/SearchResult/" + searchParameters.get("SearchResults"));
		}
	}

	let handleSearchSection = (event) => {
		setSearchButton(event.target.getAttribute('id'));
		setSearchSection(event.target.getAttribute('id'));
		setSearchTitleType("");
		console.log(event.target.getAttribute('id'));
	}

	let handleSearchTitleType = (event) => {
		setSearchButton(event.target.getAttribute('id'));
		setSearchSection("Title");
		setSearchTitleType(event.target.getAttribute('id'));
		console.log(searchSection);
		console.log(event.target.getAttribute('id'));
	}

	return (
		<Navbar expand="lg" bg="dark" data-bs-theme="dark">
			<Container>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Brand>
					<Link to="/">CIT Group 1</Link>
				</Navbar.Brand>
				<InputGroup>
					<Form.Control
						aria-label="Search input with dropdown button for search options"
						placeholder="Search"
						type='text'
						onKeyDown={handleSearch} />
					<DropdownButton
						variant="outline-secondary"
						title={SearchButton}
						id="input-group-dropdown-2"
						align="end"
					>
						<Dropdown.Item onClick={handleSearchSection} id='All' aria-label='All'> All </Dropdown.Item>
						<Dropdown.Item onClick={handleSearchSection} id='Title' aria-label='Title Search'>Title Search</Dropdown.Item>
						<Dropdown.Item onClick={handleSearchSection} id='Name' aria-label='Name Search'>Name Search</Dropdown.Item>
						<Dropdown.Divider />
						<DropdownButton
							variant="outline-secondary"
							title="Advanced Search"
							id="input-group-dropdown-2"
							align="end">
							<Dropdown.Item onClick={handleSearchTitleType} id='Tv Short' aria-label='Tv Short'>Tv Short</Dropdown.Item>
							<Dropdown.Item onClick={handleSearchTitleType} id='Short' aria-label='Short'>Short</Dropdown.Item>
							<Dropdown.Item onClick={handleSearchTitleType} id='Tv Movie' aria-label='Tv Movie'>Tv Movie</Dropdown.Item>
							<Dropdown.Item onClick={handleSearchTitleType} id='Tv Mini Series' aria-label='Tv Mini Series'>Tv Mini Series</Dropdown.Item>
							<Dropdown.Item onClick={handleSearchTitleType} id='Video Game' aria-label='Video Game'>Video Game</Dropdown.Item>
							<Dropdown.Item onClick={handleSearchTitleType} id='Tv Episode' aria-label='Tv Episode'>Tv Episode</Dropdown.Item>
							<Dropdown.Item onClick={handleSearchTitleType} id='Video' aria-label='Video'>Video</Dropdown.Item>
							<Dropdown.Item onClick={handleSearchTitleType} id='Tv Special' aria-label='Tv Special'>Tv Special</Dropdown.Item>
							<Dropdown.Item onClick={handleSearchTitleType} id='Tv Series' aria-label='Tv Series'>Tv Series</Dropdown.Item>
						</DropdownButton>
					</DropdownButton>
				</InputGroup>

				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						{isAuthenticated
							? <>
								<SignOut />
							</>
							: <>
								<NavDropdown title="Sign In" id="basic-nav-dropdown">
									<SignIn />
								</NavDropdown>
								<Button variant="primary">
									<Link style={{ color: 'white' }} to="/signup">Sign up</Link>
								</Button>
							</>
						}
						<Button variant="primary">
							<Link style={{ color: 'white' }} to="/name/nm0243462">Go to Paula DuPré Pesmene</Link>
						</Button>
						<Link to="/title/tt4912910">Go to Mission Impossible</Link>
						<Link to="/bookmarks">Go to signed in user bookmarks</Link>
						<Link to="/test"> Go to test page</Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
export default MovieNavbar;