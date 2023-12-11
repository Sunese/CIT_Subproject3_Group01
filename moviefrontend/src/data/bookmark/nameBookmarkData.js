import NameData from "../name/nameData.js";

class NameBookmarkData {
  constructor(nameId, name, notes) {
    this.nameId = nameId;
    this.name = name;
    this.notes = notes;
  }

  static fromJson(json) {
    return new NameBookmarkData(
      json.nameId,
      NameData.fromJson(json.name),
      json.notes
    );
  }
}
export default NameBookmarkData;
