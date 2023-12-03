class TitleSearchResultItemData {
  constructor(titleID, url, primaryTitle, poster, plot) {
    this.titleID = titleID;
    this.url = url;
    this.primaryTitle = primaryTitle;
    this.poster = poster;
    this.plot = plot;
  }

  static fromJson(json) {
    return new TitleSearchResultItemData(
      json.titleID,
      json.url,
      json.primaryTitle,
      json.poster,
      json.plot
    );
  }
}
