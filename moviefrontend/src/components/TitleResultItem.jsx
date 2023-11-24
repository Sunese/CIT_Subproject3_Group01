import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React from 'react';
import PropTypes from 'prop-types';
import TitleResultItemData from '../data/title/titleResultsItemData';

const TitleResultItem = ({titleResultItemData}) =>
    <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={titleResultItemData.poster} />
        <Card.Body>
            <Card.Title>{titleResultItemData.name}</Card.Title>
            <Card.Text>{titleResultItemData.released}</Card.Text>
            {/* <Button variant="primary">Go somewhere</Button> */}
        </Card.Body>
    </Card>
TitleResultItem.propTypes = {
    titleResultItemData: PropTypes.instanceOf(TitleResultItemData).isRequired
};

export default TitleResultItem;