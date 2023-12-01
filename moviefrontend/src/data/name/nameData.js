class NameData {
  constructor(nameId, primaryName, birthYear, deathYear) {
    this.nameid = nameId;
    this.primaryName = primaryName;
    this.birthYear = birthYear;
    this.deathYear = deathYear;
  }

  static fromJson(json) {
    return new NameData(
      json.nameID,
      json.primaryName,
      json.birthYear,
      json.deathYear
    );
  }
}

export default NameData;
