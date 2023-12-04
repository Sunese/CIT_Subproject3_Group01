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
                    <Link style={{textDecoration:'none black', color:'black'}} to={"/title/" + item.titleid}>
                        <Row>
                            <Col md="auto">
                                <img style={{width:'10rem', minWidth:'10rem'}} src={item.poster} alt={item.titleid} /> 
                            </Col>
                            <Col>
                                <h2 >{item.primaryTitle}</h2>
                                 {(item.plot != null) ? (
                                    <p >{item.plot.substring(0, 200)}...</p>
                                    ) : (
                                    <p >No plot available</p>
                                    )}
                                <Button className="flex-end" variant="primary">Read more...</Button>
                            </Col>
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