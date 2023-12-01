import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { searchParamsBuilder } from '../utils/urlBuilder';



const SearchBar = () => {
	const [SearchButton, setSearchButton] = useState("All");
	const [SearchSection, setSearchSection] = useState("All");
	const [SearchType, setSearchType] = useState("");
	const navigate = useNavigate();
	

	let handleSearch = (event) => {
		if (event.key === 'Enter') {
			let Query = event.target.value;
			navigate(`/SearchResult/${searchParamsBuilder(SearchSection, Query, SearchType)}`);
		}
	}

	let handleTypeChange = (event) => {
		setSearchButton(event.target.id);
		setSearchType(event.target.id);
	}

	let handleSectionChange = (event) => {
		setSearchButton(event.target.id);
		if (event.target.id === 'All' || event.target.id === 'Title' || event.target.id === 'Name') {
			setSearchType("");
		}
		setSearchSection(event.target.id);
	}

	return (
		<InputGroup>
			<Form.Control
				id="searchInput"
				role='search'
				name='query'
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
				<Dropdown.Item onClick={handleSectionChange} id='All' aria-label='All'> All </Dropdown.Item>
				<Dropdown.Item onClick={handleSectionChange} id='Title' aria-label='Title Search'>Title Search</Dropdown.Item>
				<Dropdown.Item onClick={handleSectionChange} id='Name' aria-label='Name Search'>Name Search</Dropdown.Item>
				<Dropdown.Divider />
				<DropdownButton
					variant="outline-secondary"
					title="Advanced Search"
					id="input-group-dropdown-2"
					align="end">
					<Dropdown.Item onClick={handleTypeChange} id='Movie' aria-label='Movie'>Movie</Dropdown.Item>
					<Dropdown.Item onClick={handleTypeChange} id='Tv Short' aria-label='Tv Short'>Tv Short</Dropdown.Item>
					<Dropdown.Item onClick={handleTypeChange} id='Short' aria-label='Short'>Short</Dropdown.Item>
					<Dropdown.Item onClick={handleTypeChange} id='Tv Movie' aria-label='Tv Movie'>Tv Movie</Dropdown.Item>
					<Dropdown.Item onClick={handleTypeChange} id='Tv Mini Series' aria-label='Tv Mini Series'>Tv Mini Series</Dropdown.Item>
					<Dropdown.Item onClick={handleTypeChange} id='Video Game' aria-label='Video Game'>Video Game</Dropdown.Item>
					<Dropdown.Item onClick={handleTypeChange} id='Tv Episode' aria-label='Tv Episode'>Tv Episode</Dropdown.Item>
					<Dropdown.Item onClick={handleTypeChange} id='Video' aria-label='Video'>Video</Dropdown.Item>
					<Dropdown.Item onClick={handleTypeChange} id='Tv Special' aria-label='Tv Special'>Tv Special</Dropdown.Item>
					<Dropdown.Item onClick={handleTypeChange} id='Tv Series' aria-label='Tv Series'>Tv Series</Dropdown.Item>
				</DropdownButton>
			</DropdownButton>
		</InputGroup>
	);
}

export default SearchBar;