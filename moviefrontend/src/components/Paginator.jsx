import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ResultsData from '../data/resultsData';
import Pagination from 'react-bootstrap/Pagination';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';



const Paginator = ({page}) => {
    const [NumberOfitems, setNumberOfitems] = useState("10");

    const handleNumberOfItems = (event) => {
        setNumberOfitems(event.target.getAttribute('id'));
    }

    return (
    <div>
        <h1>Paginator</h1>
        Total: {page.total}
        <br />
        Number of Pages: {page.numberOfPages}
        <br />
        Next: {page.next}
        <br />
        Prev: {page.prev}
        <br />
        Current: {page.current}
        <br />
        <br />
    <Container>
    <Row>
    <Col>
    <Pagination>
        <Pagination.Prev>
        </Pagination.Prev>
        <Pagination.Item active>
            {page.current}
        </Pagination.Item>
        <Pagination.Next>
        </Pagination.Next>
    </Pagination>
    </Col>
    <Col>
        <Dropdown>
        <Dropdown.Toggle id="dropdown-basic">
                Items: {NumberOfitems}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={handleNumberOfItems} id='5' active={NumberOfitems === '5'}>5</Dropdown.Item>
                <Dropdown.Item onClick={handleNumberOfItems} id='10' active={NumberOfitems === '10'}>10</Dropdown.Item>
                <Dropdown.Item onClick={handleNumberOfItems} id='25' active={NumberOfitems === '25'}>25</Dropdown.Item>
                <Dropdown.Item onClick={handleNumberOfItems} id='50' active={NumberOfitems === '50'}>50</Dropdown.Item>
                <Dropdown.Item onClick={handleNumberOfItems} id='100' active={NumberOfitems === '100    '}>100</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    </Col>
    </Row>
    </Container>    
    </div>
    );
}

Paginator.propTypes = {
    page: PropTypes.instanceOf(ResultsData).isRequired,
    inputurl: PropTypes.string.isRequired
};


export default Paginator;