import TitleData from "../title/titleData";

class TitleBookmarkData {
  constructor(titleId, timestamp, notes, title) {
    this.titleId = titleId;
    this.timestamp = timestamp;
    this.notes = notes;
    this.title = title;
  }

  static fromJson(json) {
    return new TitleBookmarkData(
      json.titleId,
      json.timestamp,
      json.notes,
      TitleData.fromJson(json.title)
    );
  }
}

export default TitleBookmarkData;
