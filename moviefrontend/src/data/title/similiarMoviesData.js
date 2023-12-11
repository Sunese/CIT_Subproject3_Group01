class SimiliarMoviesData {
  constructor(titleID, title, url) {
    this.titleID = titleID;
    this.title = title;
    this.url = url;
  }

  static fromJson(json) {
    return new SimiliarMoviesData(json.titleID, json.title, json.url);
  }
}

export default SimiliarMoviesData;
