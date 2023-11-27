import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import TitleData from '../data/title/titleData';
import TitleResultsItemData from '../data/title/titleResultsItemData';
import TitleResultItem from './TitleResultItem';
import TitleClient from '../api/titleClient';
import TitleResultsProcessor from '../data/title/titleResultsProcessor';
import { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';


const FeaturedTitles = () => {
    const [error, setError] = useState(null); 
    const [loadingFeatured, setLoadingFeatured] = useState(true);
    const [featuredTitles, setFeaturedTitles] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const titleClient = new TitleClient();
                const titleResultsProcessor = new TitleResultsProcessor();
                const result = titleResultsProcessor.processPage(await titleClient.getFeatured(10, 0));
                setFeaturedTitles(result);
                setLoadingFeatured(false);
            } catch (error) {
                console.error(error);
                setLoadingFeatured(false);
                setError(error.message);
            }
        }
        fetchData();
    }, []);

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (loadingFeatured) {
        return <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    }

    return (
        <Carousel variant="dark" className='featured-titles-carousel'>
                {featuredTitles.items.map((title) =>
                    <Carousel.Item key={title.titleid}>
                        <TitleResultItem data={title} className='featured-title-carousel-card'/>
                    </Carousel.Item>
                )}
        </Carousel>
    );
}

export default FeaturedTitles;