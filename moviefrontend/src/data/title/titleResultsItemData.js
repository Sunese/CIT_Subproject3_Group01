class TitleResultsItemData {
  constructor(titleid, url, name, released, poster) {
    this.titleid = titleid;
    this.url = url;
    this.name = name;
    this.released = released;
    this.poster = poster;
  }

  static fromJson(json) {
    return new TitleResultsItemData(
      json.titleID,
      json.url,
      json.name,
      json.released,
      json.poster
    );
  }
}

export default TitleResultsItemData;
