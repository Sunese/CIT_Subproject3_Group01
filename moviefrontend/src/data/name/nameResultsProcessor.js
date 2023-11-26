import ResultsData from '../resultsData';
import NameResultItemData from './nameResultsItemData';

class NameResultsProcessor {
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
        return new NameResultItemData(
            rawData.nameid,
            rawData.url,
            rawData.name,
            rawData.released,
            rawData.poster
        );
    }
}

export default NameResultsProcessor;