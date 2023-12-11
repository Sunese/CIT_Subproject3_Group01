import TitleData from "../title/titleData";

class Rating {
  constructor(username, titleID, rating, timeStamp, title) {
    this.username = username;
    this.titleID = titleID;
    this.rating = rating;
    this.timeStamp = timeStamp;
    this.title = title;
  }

  static fromJson(json) {
    return new Rating(
      json.username,
      json.titleID,
      json.rating,
      json.timeStamp,
      new TitleData(json.title)
    );
  }
}

export default Rating;
