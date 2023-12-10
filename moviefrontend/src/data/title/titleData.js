import TitleRatingData from "./titleRatingData";

class TitleData {
  constructor(
    titleID,
    primaryTitle,
    originalTitle,
    titleType,
    isAdult,
    released,
    runtimeMinutes,
    poster,
    plot,
    startYear,
    endYear,
    genres,
    titleRating
  ) {
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

  static fromJson(json) {
    return new TitleData(
      json.titleID,
      json.primaryTitle,
      json.originalTitle,
      json.titleType,
      json.isAdult,
      json.released,
      json.runtimeMinutes,
      json.poster,
      json.plot,
      json.startYear,
      json.endYear,
      json.genres,
      TitleRatingData.fromJson(json.titleRating)
    );
  }

  static fromJsonWithoutRating(json) {
    return new TitleData(
      json.titleID,
      json.primaryTitle,
      json.originalTitle,
      json.titleType,
      json.isAdult,
      json.released,
      json.runtimeMinutes,
      json.poster,
      json.plot,
      json.startYear,
      json.endYear,
      json.genres,
      null
    );
  }
}

export default TitleData;
