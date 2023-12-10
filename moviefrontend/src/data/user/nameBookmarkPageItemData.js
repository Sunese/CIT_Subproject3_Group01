import NameData from "../name/nameData";

class NameBookmarkPageItemData {
  constructor(nameID, url, name, notes) {
    this.nameID = nameID;
    this.url = url;
    this.name = name;
    this.notes = notes;
  }

  static fromJson(json) {
    return new NameBookmarkPageItemData(
      json.nameID,
      json.url,
      NameData.fromJson(json.name),
      json.notes
    );
  }
}

export default NameBookmarkPageItemData;
