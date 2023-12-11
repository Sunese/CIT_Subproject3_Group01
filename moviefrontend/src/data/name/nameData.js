class NameData {
  constructor(nameID, primaryName, birthYear, deathYear) {
    this.nameID = nameID;
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
