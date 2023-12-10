import React from "react";
import { useAuth } from "../utils/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../utils/NotificationContext";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { searchParamsBuilder } from "../utils/urlBuilder";

const SearchBar = () => {
  const { isAuthenticated } = useAuth();
  const [SearchButton, setSearchButton] = useState("All");
  const [SearchSection, setSearchSection] = useState("All");
  const [SearchType, setSearchType] = useState("");
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  let handleSearch = (event) => {
    if (event.key === "Enter") {
      if (!isAuthenticated) {
        showNotification("Please sign in to search", "danger");
        navigate("/signin/");
      } else {
        let Query = event.target.value;
        var regex = new RegExp("^[a-zA-Z0-9 ']*$");
        if (!regex.test(Query)) {
          showNotification(
            "Please enter a valid search query, make sure your input does not contain symbols",
            "danger"
          );
          return;
        }
        navigate(
          `/SearchResult/${searchParamsBuilder(
            SearchSection,
            Query,
            SearchType
          )}`
        );
      }
    }
  };

  let handleTypeChange = (event, typeName) => {
    setSearchButton(typeName);
    setSearchType(event.target.id);
  };

  let handleSectionChange = (event, searchName) => {
    setSearchButton(searchName);
    setSearchType("");
    setSearchSection(event.target.id);
  };

  return (
    <InputGroup>
      <Form.Control
        id="searchInput"
        role="search"
        name="query"
        placeholder="Search"
        type="text"
        onKeyDown={handleSearch}
      />
      <DropdownButton
        variant="outline-secondary"
        title={SearchButton}
        id="input-group-dropdown-2"
        align="end"
      >
        <Dropdown.Item onClick={(e) => handleSectionChange(e, "All")} id="all">
          {" "}
          All{" "}
        </Dropdown.Item>
        <Dropdown.Item
          onClick={(e) => handleSectionChange(e, "Titles")}
          id="title"
        >
          Title Search
        </Dropdown.Item>
        <Dropdown.Item
          onClick={(e) => handleSectionChange(e, "Names")}
          id="name"
        >
          Name Search
        </Dropdown.Item>
        <Dropdown.Divider />
        <DropdownButton
          variant="outline-secondary"
          title="Advanced Search"
          id="input-group-dropdown-2"
          align="end"
        >
          <Dropdown.Item
            onClick={(e) => handleTypeChange(e, "Movie")}
            id="movie"
          >
            Movie
          </Dropdown.Item>
          <Dropdown.Item
            onClick={(e) => handleTypeChange(e, "Tv Short")}
            id="tvShort"
          >
            Tv Short
          </Dropdown.Item>
          <Dropdown.Item
            onClick={(e) => handleTypeChange(e, "Short")}
            id="_short"
          >
            Short
          </Dropdown.Item>
          <Dropdown.Item
            onClick={(e) => handleTypeChange(e, "Tv Movie")}
            id="tvMovie"
          >
            Tv Movie
          </Dropdown.Item>
          <Dropdown.Item
            onClick={(e) => handleTypeChange(e, "Tv Mini Series")}
            id="tvMiniSeries"
          >
            Tv Mini Series
          </Dropdown.Item>
          <Dropdown.Item
            onClick={(e) => handleTypeChange(e, "Video Game")}
            id="videoGame"
          >
            Video Game
          </Dropdown.Item>
          <Dropdown.Item
            onClick={(e) => handleTypeChange(e, "Tv Episode")}
            id="tvEpisode"
          >
            Tv Episode
          </Dropdown.Item>
          <Dropdown.Item
            onClick={(e) => handleTypeChange(e, "Video")}
            id="video"
          >
            Video
          </Dropdown.Item>
          <Dropdown.Item
            onClick={(e) => handleTypeChange(e, "Tv Special")}
            id="tvSpecial"
          >
            Tv Special
          </Dropdown.Item>
          <Dropdown.Item
            onClick={(e) => handleTypeChange(e, "Tv Series")}
            id="tvSeries"
          >
            Tv Series
          </Dropdown.Item>
        </DropdownButton>
      </DropdownButton>
    </InputGroup>
  );
};

export default SearchBar;
