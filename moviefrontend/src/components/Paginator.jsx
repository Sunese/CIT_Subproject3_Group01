import React from "react";
import Pagination from "react-bootstrap/Pagination";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/esm/Col";

const Paginator = ({
  pageCount,
  setPageCount,
  maxPageCount,
  itemCount,
  setItemCount,
}) => {
  const handleNumberOfItems = (event) => {
    setItemCount(parseInt(event.target.getAttribute("id")));
    setPageCount(0);
  };

  return (
    <div>
      <Container>
        <Row md="auto" className="d-flex justify-content-center">
          <Col md="auto" className="d-flex justify-content-center">
            <Pagination>
              {pageCount === 0 ? (
                <Pagination.Prev disabled></Pagination.Prev>
              ) : (
                <Pagination.Prev
                  onClick={() => {
                    setPageCount(pageCount - 1);
                  }}
                ></Pagination.Prev>
              )}
              <Pagination.Item active>{pageCount}</Pagination.Item>
              {pageCount < maxPageCount - 1 ? (
                <Pagination.Next
                  onClick={() => {
                    setPageCount(pageCount + 1);
                  }}
                ></Pagination.Next>
              ) : (
                <Pagination.Next disabled></Pagination.Next>
              )}
            </Pagination>
          </Col>
          <Col md="auto" className="d-flex justify-content-center">
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic">
                Items: {itemCount}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={handleNumberOfItems}
                  id="5"
                  active={itemCount === "5"}
                >
                  5
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={handleNumberOfItems}
                  id="10"
                  active={itemCount === "10"}
                >
                  10
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={handleNumberOfItems}
                  id="25"
                  active={itemCount === "25"}
                >
                  25
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={handleNumberOfItems}
                  id="50"
                  active={itemCount === "50"}
                >
                  50
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={handleNumberOfItems}
                  id="100"
                  active={itemCount === "100"}
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

export default Paginator;
