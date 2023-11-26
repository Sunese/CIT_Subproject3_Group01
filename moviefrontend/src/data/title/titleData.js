/*
{
    "titleID": "tt14760596",
    "primaryTitle": "Game Changer - Pralayankar",
    "originalTitle": "Game Changer - Pralayankar",
    "titleType": "tvEpisode",
    "isAdult": false,
    "released": null,
    "runtimeMinutes": null,
    "poster": "https://m.media-amazon.com/images/M/MV5BOGE0M2RkZjItYzU1Yi00MGFmLWI1OGQtODcyN2JjM2EwODhhXkEyXkFqcGdeQXVyNzM4MjU3NzY@._V1_SX300.jpg",
    "plot": "N/A",
    "startYear": 2020,
    "endYear": null,
    "genres": [],
    "titleRating": null
}
*/

class TitleData {
    constructor(titleID, primaryTitle, originalTitle, titleType, isAdult, released, runtimeMinutes, poster, plot, startYear, endYear, genres, titleRating) {
        this.titleID = titleID;
        this.primaryTitle = primaryTitle;
        this.originalTitle = originalTitle;
        this.titleType = titleType;
        this.isAdult = isAdult;
        this.released = released;
        this.runtimeMinutes = runtimeMinutes;
        this.poster = poster;
        this.plot = plot;
        this.startYear = startYear;
        this.endYear = endYear;
        this.genres = genres;
        this.titleRating = titleRating;
    }
}

export default TitleData;