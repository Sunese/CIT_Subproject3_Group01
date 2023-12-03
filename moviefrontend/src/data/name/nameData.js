class NameData {
  constructor(primaryName, birthYear, deathYear) {
    this.primaryName = primaryName;
    this.birthYear = birthYear;
    this.deathYear = deathYear;
  }

  static fromJson(json) {
    return new NameData(json.primaryName, json.birthYear, json.deathYear);
  }
}

export default NameData;
