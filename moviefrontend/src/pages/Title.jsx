import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import TitleData from '../data/title/titleData';
import { useParams } from 'react-router-dom';
import TitleClient from '../api/titleClient';
import TitleProcessor from '../data/title/titleProcessor';
import { useState } from 'react';
import Spinner from 'react-bootstrap/esm/Spinner';

const Title = () => {
    let { id } = useParams();
    const [error, setError] = useState(null);
    const [loadingTitle, setLoadingTitle] = useState(true);
    const [titleData, setTitleData] = useState(new TitleData());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const titleClient = new TitleClient();
                const titleProcessor = new TitleProcessor();
                const titleResult = titleProcessor.processTitle(await titleClient.getTitle(id));
                setTitleData(titleResult);
                setLoadingTitle(false);
            } catch (error) {
                setLoadingTitle(false);
                setError(error.message);
                console.error('error: ', error);
            }
        }
        fetchData();
    }, [id]);

    if (loadingTitle) {
        return <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    }

    if (error) {
        return <p style={{color: 'red'}}>{error}</p>
    }

    return <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={titleData.poster} />
        <Card.Body>
            <Card.Title>{titleData.primaryTitle}</Card.Title>
            <Card.Text>{titleData.plot}</Card.Text>
        </Card.Body>
    </Card>
}
export default Title;