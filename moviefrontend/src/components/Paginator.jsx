import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PaginationUrlBuilder, GetUrlParamRegex } from "../utils/urlBuilder";

import UpdatePageClient from "../api/updatePageClient";
import { useAuth } from "../utils/AuthContext";
import PropTypes from "prop-types";
import PagedData from "../data/pagedData";
import Pagination from "react-bootstrap/Pagination";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/esm/Col";
import SearchTitleCard from "./SearchTitleCard";
import SearchNameCard from "./SearchNameCard";
import TitleData from "../data/title/titleData";
import NameData from "../data/name/nameData";

const Paginator = ({ page, isTitles }) => {
  const { token } = useAuth();
  const [pageState, setPageState] = useState(page);
  const [pageCountState, setPageCountState] = useState(
    GetUrlParamRegex(pageState.current, "page")
  );
  const [pageItemsState, setPageItemsState] = useState(10);
  const [isTitlesState, setIsTitlesState] = useState(isTitles);
  const [searchParams, setSearchParams] = useSearchParams();

  //console.log('pageState: ', pageState);

  const handleNumberOfItems = (event) => {
    setPageItemsState(event.target.getAttribute("id"));
  };

  let handleResponse = (response) => {
    console.log("HandleResponse: ", response);
    if (!response.ok) {
      throw new Error("Error getting response");
    }
  };
  const updatePage = async () => {
    try {
      console.log("updatePage");
      if (isTitlesState) {
        console.log("isTitlesState");
        // page=1&pageSize=10&query=mike"
        const response = UpdatePageClient.updateTitles(
          token,
          "page=" +
            5 +
            "&pageSize=" +
            20 +
            "&query=" +
            searchParams.get("query")
        );
        console.log("response: ", response);
        handleResponse(response);
        const responseData = await response.json();
        setPageState(PagedData.fromJson(responseData, TitleData.fromJson));
      } else {
        console.log("is Not Titles State");
        const response = UpdatePageClient.updateNames(
          token,
          "page=" +
            pageCountState +
            "&pageSize=" +
            pageItemsState +
            "&query=" +
            searchParams.get("query")
        );
        handleResponse(response);
        const responseData = await response.json();
        console.log("response data", responseData);
        setPageState(PagedData.fromJson(responseData, NameData.fromJson));
      }
    } catch (error) {
      console.error("error: ", error);
    }
  };

  function MapCards() {
    if (!Array.isArray(pageState.items)) {
      return;
    }
    if (isTitlesState) {
      return (
        <div>
          {pageState.items.map((item) => (
            <SearchTitleCard key={item.titleid} item={item} />
          ))}
        </div>
      );
    } else {
      return (
        <div>
          {pageState.items.map((item) => (
            <SearchNameCard key={item.url} item={item} />
          ))}
        </div>
      );
    }
  }

  return (
    <div>
      <MapCards items={pageState.items} />
      current params: {searchParams.toString()}
      <br />
      Total: {pageState.total}
      <br />
      Number of Pages: {pageState.numberOfPages}
      <br />
      Next: {pageState.next}
      <br />
      Prev: {pageState.prev}
      <br />
      Current: {pageState.current}
      <br />
      <br />
      <Container>
        <Row>
          <Col>
            <Pagination>
              <Pagination.Prev></Pagination.Prev>
              <Pagination.Item active>{pageCountState}</Pagination.Item>
              <Pagination.Next
                onClick={() => {
                  setPageCountState(pageCountState + 1);
                  updatePage();
                }}
              ></Pagination.Next>
            </Pagination>
          </Col>
          <Col>
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic">
                Items: {pageItemsState}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={handleNumberOfItems}
                  id="5"
                  active={pageItemsState === "5"}
                >
                  5
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={handleNumberOfItems}
                  id="10"
                  active={pageItemsState === "10"}
                >
                  10
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={handleNumberOfItems}
                  id="25"
                  active={pageItemsState === "25"}
                >
                  25
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={handleNumberOfItems}
                  id="50"
                  active={pageItemsState === "50"}
                >
                  50
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={handleNumberOfItems}
                  id="100"
                  active={pageItemsState === "100"}
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
  page: PropTypes.instanceOf(PagedData).isRequired,
  items: PropTypes.array.isRequired,
  isTitles: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired,
};

export default Paginator;
