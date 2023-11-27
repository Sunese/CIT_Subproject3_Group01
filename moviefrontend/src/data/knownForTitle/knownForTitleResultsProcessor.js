import ResultsData from '../resultsData';
import KnownForTitleResultsItemData from './knownForTitleResultsItemData';

class KnownForTitleResultsProcessor {
    processPage(rawData) {
        return new ResultsData(
            rawData.total,
            rawData.numberOfPages,
            rawData.next,
            rawData.prev,
            rawData.current,
            rawData.items.map((item) => this.processItem(item))
        );
    }

    processItem(rawData) {
        return new KnownForTitleResultsItemData(
            rawData.titleID,
            rawData.poster,
            rawData.url,
            rawData.primaryTitle,
            rawData.titleType,
            rawData.genres
        );
    }
}

export default KnownForTitleResultsProcessor;