import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieNavbar from './components/MovieNavbar';
import FeaturedTitle from './components/FeaturedTitle';
import { useEffect, useState } from 'react';
import SignUp from './components/SignUp';
import Bookmark from './components/Bookmark';
import Rate from './components/Rate';
import TitleClient from './api/titleClient';
import React from 'react';
import TitleResultsProcessor from './data/title/titleResultsProcessor';
import TitleResults from './components/TitleResults';
import Title from './components/Title';
import TitleProcessor from './data/title/titleProcessor';
import NameResultsProcessor from './data/name/nameResultsProcessor';
import NameResults from './components/NameResults';
import NameProcessor from './data/name/nameProcessor';
import NameClient from './api/nameClient';
import Name from './components/Name';

const App = () => {
    const [titleResultsData, setTitleResultsData] = useState(null);
    const [titleData, setTitleData] = useState(null);
    const [nameResultsData, setNameResultsData] = useState(null);
    const [nameData, setNameData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Fetching data...');
                const titleClient = new TitleClient();
                const rawResultPage = await titleClient.getTitles(1,0);

                const titleResultsProcessor = new TitleResultsProcessor();
                const result = titleResultsProcessor.processPage(rawResultPage);
                console.log('Result:', result);
                setTitleResultsData(result);

                const rawTitle = await titleClient.getTitle('tt14760596');
                const titleProcessor = new TitleProcessor();
                const title = titleProcessor.processTitle(rawTitle);
                console.log('Title:', title);
                setTitleData(title);

                const nameClient = new NameClient();
                const rawNameResultPage = await nameClient.getNames(5,0);
                const nameResultsProcessor = new NameResultsProcessor();
                const nameResult = nameResultsProcessor.processPage(rawNameResultPage);
                console.log('Name Result:', nameResult);
                setNameResultsData(nameResult);

                const rawName = await nameClient.getName('nm0000002');
                const nameProcessor = new NameProcessor();
                const name = nameProcessor.processName(rawName);
                console.log('Name:', name);
                setNameData(name);


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <MovieNavbar></MovieNavbar>
            <FeaturedTitle title={data.items[0].name}
                plot={data.items[0].released}
                poster={data.items[0].poster}>
            </FeaturedTitle>
            <SignUp></SignUp>
            <Bookmark isAddBookmark={false}></Bookmark>
            <Rate isAddRating={true}></Rate>
        </div>
    );
};

export default App;
