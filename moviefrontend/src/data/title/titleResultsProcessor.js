import TitleResultItemData from './titleResultsItemData';
import ResultsData from '../resultsData';

class TitleResultsProcessor {
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
        return new TitleResultItemData(
            rawData.titleID,
            rawData.url,
            rawData.name,
            rawData.released,
            rawData.poster
        );
    }
}

export default TitleResultsProcessor;