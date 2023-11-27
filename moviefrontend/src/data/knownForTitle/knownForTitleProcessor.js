import KnownForTitleData from "./knownForTitleData";

class KnownForTitleProcessor {
    processKnownForTitle(rawData) {
        return new KnownForTitleData(
            rawData.titleID,
            rawData.poster,
            rawData.url,
            rawData.primaryTitle,
            rawData.titleType,
            rawData.genres
        );
    }
}

export default KnownForTitleProcessor;