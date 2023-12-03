class NameBookmarkPageItemData {
  constructor(nameID, url, primaryName, notes) {
    this.nameID = nameID;
    this.url = url;
    this.primaryName = primaryName;
    this.notes = notes;
  }

  static fromJson(json) {
    return new NameBookmarkPageItemData(
      json.nameID,
      json.url,
      json.primaryName,
      json.notes
    );
  }
}

export default NameBookmarkPageItemData;
