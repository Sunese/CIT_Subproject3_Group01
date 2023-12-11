import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/esm/Col";
import { Link } from "react-router-dom";

const SearchNameCard = ({ item }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <Link to={"/name/" + item.nameID}>
            <h2 style={{ fontSize: "1rem" }}>{item.primaryName}</h2>
          </Link>
        </Card.Title>
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
  );
};

SearchNameCard.propTypes = {
  item: PropTypes.object.isRequired,
};

export default SearchNameCard;
