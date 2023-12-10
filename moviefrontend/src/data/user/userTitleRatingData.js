// Url = GetUrl("GetTitle", new { id = rating.TitleId }),
// PrimaryTitle = rating.Title.PrimaryTitle,
// Rating = rating.Rating,
// TimeStamp = rating.TimeStamp

class UserTitleRatingData {
  constructor(titleID, title, rating, timeStamp) {
    this.titleID = titleID;
    this.title = title;
    this.rating = rating;
    this.timeStamp = timeStamp;
  }

  static fromJson(json) {
    return new UserTitleRatingData(
      json.titleID,
      json.title,
      json.rating,
      json.timeStamp
    );
  }
}

export default UserTitleRatingData;
