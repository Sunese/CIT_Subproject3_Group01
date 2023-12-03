class TitleBookmarkPageItemData {
  constructor(titleID, url, primaryTitle, notes) {
    this.titleID = titleID;
    this.url = url;
    this.primaryTitle = primaryTitle;
    this.notes = notes;
  }

  static fromJson(json) {
    return new TitleBookmarkPageItemData(
      json.titleID,
      json.url,
      json.primaryTitle,
      json.notes
    );
  }
}

export default TitleBookmarkPageItemData;
