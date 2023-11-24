import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


const FeaturedTitle = ({ title, plot, poster }) =>
    <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={poster} />
        <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{plot}</Card.Text>
            <Button variant="primary">Go somewhere</Button>
        </Card.Body>
    </Card>


FeaturedTitle.propTypes = {
        title: PropTypes.string.isRequired,
        plot: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
    };

export default FeaturedTitle;