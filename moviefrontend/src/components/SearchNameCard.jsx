import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';
import { Link } from 'react-router-dom';

const SearchTitleCard = ( {item} ) => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    <Link to={"/name/" + item.nameID}>
                        <Row>
                            <h2 >{item.primaryName}</h2>
                        </Row>
                    </Link>
                </Card.Title>
                {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
        </Card>
        )
}

SearchTitleCard.propTypes = {
    item: PropTypes.object.isRequired
};

export default SearchTitleCard;