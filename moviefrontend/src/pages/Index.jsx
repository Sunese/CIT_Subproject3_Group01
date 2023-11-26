import FeaturedTitles from "../components/FeaturedTitles";
import React from "react";
import { useState, useEffect } from "react";
import TitleClient from "../api/titleClient";
import TitleResultsProcessor from "../data/title/titleResultsProcessor";
import Spinner from 'react-bootstrap/Spinner';

const Index = () => {
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

    return <FeaturedTitles titles={featuredTitles.items}></FeaturedTitles>
}

export default Index;