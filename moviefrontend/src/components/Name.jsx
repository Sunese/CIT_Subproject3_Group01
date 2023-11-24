import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import NameData from '../data/name/nameData';

const Name = ({ nameData }) =>
    <Card style={{ width: '18rem' }}>
        <Card.Body>
            <Card.Title>{nameData.primaryName}</Card.Title>
        </Card.Body>
    </Card>
Name.propTypes = {
    nameData: PropTypes.instanceOf(NameData).isRequired
};
export default Name;