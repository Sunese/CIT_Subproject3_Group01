import React from "react";
import Card from "react-bootstrap/Card";
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
export default SearchNameCard;
