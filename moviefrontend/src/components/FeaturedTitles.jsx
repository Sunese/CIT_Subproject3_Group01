import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import TitleData from '../data/title/titleData';
import TitleResultsItemData from '../data/title/titleResultsItemData';
import TitleResultItem from './TitleResultItem';


const FeaturedTitles = ({ titles }) => {
    return titles.map((title) =>
        <TitleResultItem data={title} key={title.url} />
    );
}
FeaturedTitles.propTypes = {
        titles: PropTypes.arrayOf(
            PropTypes.instanceOf(TitleResultsItemData).isRequired
        )
    };

export default FeaturedTitles;