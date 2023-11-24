import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieNavbar from './components/MovieNavbar';
import FeaturedTitle from './components/FeaturedTitle';
import { useEffect, useState } from 'react';
import Signup from './components/SignUp';

function App() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch('https://localhost:7293/api/v1/title/featured')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(apiData => {
                // Set the data using the setData function
                setData(apiData);
                setError(null);
            })
            .catch(apiError => {
                // Set the error using the setError function
                setData(null);
                setError(apiError);
            });
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <MovieNavbar></MovieNavbar>
            <FeaturedTitle title={data.items[0].name}
                plot={data.items[0].released}
                poster={data.items[0].poster}>
            </FeaturedTitle>
            <Signup></Signup>
        </div>
    );
}

export default App;
