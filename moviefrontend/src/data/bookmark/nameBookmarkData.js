import NameData from "../name/nameData.js";

class NameBookmarkData {
  constructor(nameID, name, notes) {
    this.nameID = nameID;
    this.name = name;
    this.notes = notes;
  }

  static fromJson(json) {
    return new NameBookmarkData(
      json.nameID,
      NameData.fromJson(json.name),
      json.notes
    );
  }
}
export default NameBookmarkData;
