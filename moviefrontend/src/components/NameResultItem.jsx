import Card from "react-bootstrap/Card";
import React from "react";

const NameResultItem = ({ nameResultItemData }) => (
  <Card style={{ width: "18rem" }}>
    {/* <Card.Img variant="top" src={nameResultItemData.poster} /> */}
    <Card.Body>
      <Card.Title>{nameResultItemData.name}</Card.Title>
      {/* <Card.Text>{nameResultItemData.released}</Card.Text> */}
      {/* <Button variant="primary">Go somewhere</Button> */}
    </Card.Body>
  </Card>
);

export default NameResultItem;
