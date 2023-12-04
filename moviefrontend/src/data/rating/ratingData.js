import TitleData from "../title/titleData";

class Rating {
  constructor(username, titleId, rating, timeStamp, title) {
    this.username = username;
    this.titleId = titleId;
    this.rating = rating;
    this.timeStamp = timeStamp;
    this.title = title;
  }

  static fromJson(json) {
    return new Rating(
      json.username,
      json.titleId,
      json.rating,
      json.timeStamp,
      new TitleData(json.title)
    );
  }
}

export default Rating;
