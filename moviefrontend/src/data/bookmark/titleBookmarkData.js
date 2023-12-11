import TitleData from "../title/titleData";

class TitleBookmarkData {
  constructor(titleID, timestamp, notes, title) {
    this.titleID = titleID;
    this.timestamp = timestamp;
    this.notes = notes;
    this.title = title;
  }

  static fromJson(json) {
    return new TitleBookmarkData(
      json.titleID,
      json.timestamp,
      json.notes,
      TitleData.fromJson(json.title)
    );
  }
}

export default TitleBookmarkData;
