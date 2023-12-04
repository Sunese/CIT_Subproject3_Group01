// public string TitleID { get; set; }
// public string PrimaryTitle { get; set; }
// public double AverageRating { get; set; }
// public int NumVotes { get; set; }

class TitleRatingData {
  constructor(titleID, primaryTitle, averageRating, numVotes) {
    this.titleID = titleID;
    this.primaryTitle = primaryTitle;
    this.averageRating = averageRating;
    this.numVotes = numVotes;
  }

  static fromJson(json) {
    return new TitleRatingData(
      json.titleID,
      json.primaryTitle,
      json.averageRating,
      json.numVotes
    );
  }
}

export default TitleRatingData;
