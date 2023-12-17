import Card from "react-bootstrap/Card";
import React from "react";
import { Link } from "react-router-dom";

const TitleResultItem = ({ data, className }) => (
  <Card className={className}>
    <Card.Img variant="bottom" src={data.poster} className="title-card-image" />
    <Card.Body>
      <Card.Title>
        <Link to={"/title/" + data.titleid}>{data.name}</Link>
      </Card.Title>
      <Card.Text>{data.released}</Card.Text>
      {/* <Button variant="primary">Go somewhere</Button> */}
    </Card.Body>
  </Card>
);

export default TitleResultItem;
