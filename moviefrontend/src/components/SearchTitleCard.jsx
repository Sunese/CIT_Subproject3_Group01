import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/esm/Col";
import { Link } from "react-router-dom";

const SearchTitleCard = ({ item }) => {
  return (
    <Card className="searchTitleCard">
      <Card.Body>
        <Card.Title>
          <Link
            style={{ textDecoration: "none black", color: "black" }}
            to={"/title/" + item.titleID}
          >
            <Row>
              <Col md="auto">
                <img
                  style={{ width: "5rem", minWidth: "5rem", maxWidth: "5rem" }}
                  src={item.poster}
                  alt={item.titleID}
                />
              </Col>
              <Col>
                <h2 style={{ fontSize: "1rem" }}>{item.primaryTitle}</h2>
                {item.plot != null ? (
                  <p style={{ fontSize: "1rem", fontWeight: "normal" }}>
                    {item.plot.substring(0, 200)}...
                  </p>
                ) : (
                  <p style={{ fontSize: "1rem" }}>No plot available</p>
                )}
                <Button className="flex-end" variant="primary">
                  Read more...
                </Button>
              </Col>
            </Row>
          </Link>
        </Card.Title>
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
  );
};

SearchTitleCard.propTypes = {
  item: PropTypes.object.isRequired,
};

export default SearchTitleCard;
