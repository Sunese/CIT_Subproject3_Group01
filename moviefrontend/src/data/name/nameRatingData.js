class NameRatingData {
  constructor(nameID, rating) {
    this.nameID = nameID;
    this.rating = rating;
  }

  static fromJson(json) {
    return new NameRatingData(json.nameID, json.rating);
  }
}

export default NameRatingData;
