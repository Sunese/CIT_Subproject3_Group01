import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import TitleRatingPageItemData from "../data/title/titleRatingPageItemData";

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
TitleRatingPageItem.propTypes = {
  data: PropTypes.instanceOf(TitleRatingPageItemData).isRequired,
  className: PropTypes.string,
};

export default TitleRatingPageItem;
