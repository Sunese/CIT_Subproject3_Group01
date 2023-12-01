import React, { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { PaginationUrlBuilder } from "../utils/urlBuilder";
import PropTypes from "prop-types";
import ResultsData from "../data/resultsData";
import Pagination from "react-bootstrap/Pagination";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/esm/Col";
import SearchTitleCard from "./SearchTitleCard";
import SearchNameCard from "./SearchNameCard";

const Paginator = ({ page, isTitles }) => {
  const [NumberOfitems, setNumberOfitems] = useState("10");
  const [searchParams, setSearchParams] = useSearchParams();
  const apiUrlParameters = new URLSearchParams(page.current);

  const handleNumberOfItems = (event) => {
    setNumberOfitems(event.target.getAttribute("id"));
  };
  console.log("Curernt Frontend page: ", searchParams.toString());
  console.log("Current API Page", apiUrlParameters.toString());

  function MapCards(props) {
    if (!Array.isArray(props.items)) {
      return;
    }
    if (props.isTitles) {
      return (
        <div>
          {props.items.map((item) => (
            <SearchTitleCard key={item.titleid} item={item} />
          ))}
        </div>
      );
    } else if (!props.isTitles) {
      return (
        <div>
          {props.items.map((item) => (
            <SearchNameCard key={item.url} item={item} />
          ))}
        </div>
      );
    } else {
      return;
    }
  }

  return (
    <div>
      <MapCards items={page.items} isTitles={isTitles} />
      current params: {searchParams.toString()}
      <br />
      Total: {page.total}
      <br />
      Number of Pages: {page.numberOfPages}
      <br />
      Next: {page.next}
      <br />
      Prev: {page.prev}
      <br />
      Current: {page.current}
      <br />
      <br />
      <Container className="justify-content-center">
        <Row>
          <Col>
            <Pagination>
              <Pagination.Prev></Pagination.Prev>
              <Pagination.Item active>{page.current}</Pagination.Item>
              <Pagination.Next></Pagination.Next>
            </Pagination>
          </Col>
          <Col>
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic">
                Items: {NumberOfitems}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={handleNumberOfItems}
                  id="5"
                  active={NumberOfitems === "5"}
                >
                  5
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={handleNumberOfItems}
                  id="10"
                  active={NumberOfitems === "10"}
                >
                  10
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={handleNumberOfItems}
                  id="25"
                  active={NumberOfitems === "25"}
                >
                  25
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={handleNumberOfItems}
                  id="50"
                  active={NumberOfitems === "50"}
                >
                  50
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={handleNumberOfItems}
                  id="100"
                  active={NumberOfitems === "100    "}
                >
                  100
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

Paginator.propTypes = {
  page: PropTypes.instanceOf(ResultsData).isRequired,
  items: PropTypes.array.isRequired,
  isTitles: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired,
};

export default Paginator;
