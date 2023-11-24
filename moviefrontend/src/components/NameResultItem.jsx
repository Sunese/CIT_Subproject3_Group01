import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React from 'react';
import PropTypes from 'prop-types';
import NameResultItemData from '../data/name/nameResultsItemData';

const NameResultItem = ({nameResultItemData}) =>
    <Card style={{ width: '18rem' }}>
        {/* <Card.Img variant="top" src={nameResultItemData.poster} /> */}
        <Card.Body>
            <Card.Title>{nameResultItemData.name}</Card.Title>
            {/* <Card.Text>{nameResultItemData.released}</Card.Text> */}
            {/* <Button variant="primary">Go somewhere</Button> */}
        </Card.Body>
    </Card>
NameResultItem.propTypes = {
    nameResultItemData: PropTypes.instanceOf(NameResultItemData).isRequired
};

export default NameResultItem;

