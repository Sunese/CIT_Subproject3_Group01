import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import NameData from '../data/name/nameData';
import { useParams } from 'react-router-dom';
import NameClient from '../api/nameClient';
import NameProcessor from '../data/name/nameProcessor';
import Spinner from 'react-bootstrap/esm/Spinner';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

const Name = () => {
    const { id } = useParams();
    const [error, setError] = useState(null);
    const [loadingName, setLoadingName] = useState(true);
    const [nameData, setNameData] = useState(new NameData());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const nameClient = new NameClient();
                const nameProcessor = new NameProcessor();
                const nameResult = nameProcessor.processName(await nameClient.getName(id));
                setNameData(nameResult);
                setLoadingName(false);
            } catch (error) {
                setLoadingName(false);
                setError(error.message);
                console.error('error: ', error);
            }
        }
        fetchData();
    }, [id]);

    if (loadingName) {
        return <Spinner animation="border" role="status"> 
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    }

    if (error) {
        return <p style={{color: 'red'}}>{error}</p>
    }

    return (
        <>
        <Row>
            <Col>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{nameData.primaryName}</Card.Title>
                        <Card.Text>{nameData.birthYear}</Card.Text>
                        <Card.Text>{nameData.deathYear}</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        </>
    );
}
export default Name;