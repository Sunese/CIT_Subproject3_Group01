import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import TitleData from '../data/title/titleData';

const Title = ({ titleData }) =>
    <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={titleData.poster} />
        <Card.Body>
            <Card.Title>{titleData.primaryTitle}</Card.Title>
            <Card.Text>{titleData.plot}</Card.Text>
        </Card.Body>
    </Card>
Title.propTypes = {
    titleData: PropTypes.instanceOf(TitleData).isRequired
};
export default Title;