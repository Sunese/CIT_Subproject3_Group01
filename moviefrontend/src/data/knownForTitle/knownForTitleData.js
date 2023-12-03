class KnownForTitleData {
  constructor(titleID, poster, url, primaryTitle, titleType, genres) {
    this.titleID = titleID;
    this.poster = poster;
    this.url = url;
    this.primaryTitle = primaryTitle;
    this.titleType = titleType;
    this.genres = genres;
  }

  static fromJson(json) {
    return new KnownForTitleData(
      json.titleID,
      json.poster,
      json.url,
      json.primaryTitle,
      json.titleType,
      json.genres
    );
  }
}

export default KnownForTitleData;
