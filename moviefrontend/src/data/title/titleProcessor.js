import TitleData from './titleData';

class TitleProcessor {
    processTitle(rawData) {
        return new TitleData(
            rawData.titleID,
            rawData.primaryTitle,
            rawData.originalTitle,
            rawData.titleType,
            rawData.isAdult,
            rawData.released,
            rawData.runtimeMinutes,
            rawData.poster,
            rawData.plot,
            rawData.startYear,
            rawData.endYear,
            rawData.genres,
            rawData.titleRating
        );
    }
}

export default TitleProcessor;