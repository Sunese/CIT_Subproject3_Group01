// TitleID = result.TitleID,
// Url = GetUrl("GetTitle", new { id = result.TitleID }),
// PrimaryTitle = result.PrimaryTitle,
// Poster = result.Title.Poster,
// Plot = result.Title.Plot

class TitleSearchData {
  constructor(titleID, url, primaryTitle, poster, plot) {
    this.titleID = titleID;
    this.url = url;
    this.primaryTitle = primaryTitle;
    this.poster = poster;
    this.plot = plot;
  }

  static fromJson(json) {
    return new TitleSearchData(
      json.titleID,
      json.url,
      json.primaryTitle,
      json.poster,
      json.plot
    );
  }
}

export default TitleSearchData;
