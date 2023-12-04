class NameResultsItemData {
  constructor(nameID, url, primaryName, birthYear, deathYear) {
    this.primaryName = primaryName;
    this.url = url;
    this.nameID = nameID;
    this.birthYear = birthYear;
    this.deathYear = deathYear;
  }

  static fromJson(json) {
    return new NameResultsItemData(
      json.nameID,
      json.url,
      json.primaryName,
      json.birthYear,
      json.deathYear
    );
  }
}

export default NameResultsItemData;
