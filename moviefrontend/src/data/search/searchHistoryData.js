class SearchHistoryData {
  constructor(query, timestamp, searchType) {
    this.query = query;
    this.timestamp = timestamp;
    this.searchType = searchType;
  }

  static fromJson(json) {
    return new SearchHistoryData(
      json.query,
      json.timestamp,
      json.searchType
    );
  }
}

export default SearchHistoryData;