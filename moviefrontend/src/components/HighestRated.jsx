import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

// HighestRated component
// returns a card list of the highest rated movies in the last n days
const HighestRated = ({ titles, days }) => 
    <>
    <h1>Highest Rated Movies in the Last {days} Days</h1>
        {titles.items.map((title) =>
        <Card key={title.titleid}>
            <Card.Body>
                <Card.Title>
                    <Link to={"/title/" + title.titleid}>
                        {title.name}
                    </Link>
                </Card.Title>
                <Card.Text>{title.released}</Card.Text>
                <Card.Text>{title.rating}</Card.Text>
            </Card.Body>
        </Card>
        )}
    </>

HighestRated.propTypes = {
    titles: PropTypes.array.isRequired,
    days: PropTypes.number.isRequired
};

export default HighestRated;