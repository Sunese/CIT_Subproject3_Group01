import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React from 'react';
import PropTypes from 'prop-types';
import TitleResultItemData from '../data/title/titleResultsItemData';
import { Link } from 'react-router-dom';

const TitleResultItem = ({data}) =>
    <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={data.poster} />
        <Card.Body>
            <Card.Title>
                <Link to={"/title/" + data.titleid}>
                    {data.name}
                </Link>
            </Card.Title>
            <Card.Text>{data.released}</Card.Text>
            {/* <Button variant="primary">Go somewhere</Button> */}
        </Card.Body>
    </Card>
TitleResultItem.propTypes = {
    data: PropTypes.instanceOf(TitleResultItemData).isRequired
};

export default TitleResultItem;