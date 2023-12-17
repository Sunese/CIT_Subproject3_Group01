import Card from "react-bootstrap/Card";
import React from "react";
import { Link } from "react-router-dom";

const TitleRatingPageItem = ({ data, className }) => (
  <Card className={className}>
    {/* <Card.Img variant="bottom" src={data.poster} className="title-card-image" /> */}
    <Card.Body>
      <Card.Title>
        <Link to={"/title/" + data.titleid}>{data.primaryTitle}</Link>
      </Card.Title>
      <Card.Text>Average Rating: {data.averageRating}</Card.Text>
      <Card.Text>Number of Ratings: {data.numVotes}</Card.Text>
      {/* <Button variant="primary">Go somewhere</Button> */}
    </Card.Body>
  </Card>
);

export default TitleRatingPageItem;
