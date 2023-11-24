import NameData from './nameData.js';

class NameProcessor {
    processName(rawData) {
        return new NameData(
            rawData.primaryName,
            rawData.birthYear,
            rawData.deathYear
        );
    }
}

export default NameProcessor;