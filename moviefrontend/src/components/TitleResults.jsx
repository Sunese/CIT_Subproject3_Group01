import React from 'react';
import TitleResultItem from './TitleResultItem';
import PropTypes from 'prop-types';
import ResultsData from '../data/resultsData';

const TitleResults = ({page}) =>
    <div>
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
        {page.items.map((item) =>
            <TitleResultItem key={item.url} titleResultItemData={item} />
        )}
    </div>
TitleResults.propTypes = {
    page: PropTypes.instanceOf(ResultsData).isRequired
};

export default TitleResults;