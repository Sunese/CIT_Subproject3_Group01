import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/esm/Spinner';
import KnownForTitles from '../components/KnownForTitles';

import NameData from '../data/name/nameData';
import NameClient from '../api/nameClient';
import NameProcessor from '../data/name/nameProcessor';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

import KnownForTitlesData from '../data/knownForTitle/knownForTitleData';
import KnownForTitleClient from '../api/knownForTitlesClient';
import KnownForTitleResultsProcessor from '../data/knownForTitle/knownForTitleResultsProcessor';


const Name = () => {
    const { id } = useParams();
    const [error, setError] = useState(null);
    const [loadingName, setLoadingName] = useState(true);
    const [nameData, setNameData] = useState(new NameData());
    const [knownForTitlesData, setKnownForTitles] = useState(new KnownForTitlesData());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const nameClient = new NameClient();
                const nameProcessor = new NameProcessor();
                const nameResult = nameProcessor.processName(await nameClient.getName(id));
                setNameData(nameResult);
                
                const knownForTitlesClient = new KnownForTitleClient();
                const knownForTitleResultsProcessor = new KnownForTitleResultsProcessor();
                const knownForTitlesResult = knownForTitleResultsProcessor.processPage(await knownForTitlesClient.getKnownForTitles(id));
                console.log(knownForTitlesResult);
                setKnownForTitles(knownForTitlesResult);

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
        <Row>
            <Col>
                <KnownForTitles knownForTitlesData={knownForTitlesData} />
            </Col>
        </Row>
        </>
    );
}
export default Name;