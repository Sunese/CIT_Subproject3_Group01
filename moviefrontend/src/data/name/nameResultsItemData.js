class NameResultsItemData {
  constructor(nameid, url, name, birthYear, deathYear) {
    this.nameid = nameid;
    this.url = url;
    this.name = name;
    this.birthYear = birthYear;
    this.deathYear = deathYear;
  }

  static fromJson(json) {
    return new NameResultsItemData(
      json.nameID,
      json.url,
      json.name,
      json.birthYear,
      json.deathYear
    );
  }
}

export default NameResultsItemData;
