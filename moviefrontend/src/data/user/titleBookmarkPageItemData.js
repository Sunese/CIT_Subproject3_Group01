import TitleData from "../title/titleData";

class TitleBookmarkPageItemData {
  constructor(titleID, url, notes, title) {
    this.titleID = titleID;
    this.url = url;
    this.notes = notes;
    this.title = title;
  }

  static fromJson(json) {
    return new TitleBookmarkPageItemData(
      json.titleID,
      json.url,
      json.notes,
      TitleData.fromJson(json.title)
    );
  }

  static fromJsonWithoutRating(json) {
    return new TitleBookmarkPageItemData(
      json.titleID,
      json.url,
      json.notes,
      TitleData.fromJsonWithoutRating(json.title)
    );
  }
}

export default TitleBookmarkPageItemData;
