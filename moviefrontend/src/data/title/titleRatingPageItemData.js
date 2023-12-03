class TitleRatingPageItemData {
  constructor() {
    this.titleid = "";
    this.url = "";
    this.primaryTitle = "";
    this.averageRating = 0;
    this.numVotes = 0;
  }
  static fromJson(json) {
    const titleRatingPageItem = new TitleRatingPageItemData();
    titleRatingPageItem.titleid = json.titleID;
    titleRatingPageItem.url = json.url;
    titleRatingPageItem.primaryTitle = json.primaryTitle;
    titleRatingPageItem.averageRating = json.averageRating;
    titleRatingPageItem.numVotes = json.numVotes;
    return titleRatingPageItem;
  }
}

export default TitleRatingPageItemData;
