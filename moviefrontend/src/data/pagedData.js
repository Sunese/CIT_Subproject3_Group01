class PagedData {
  constructor(total, numberOfPages, next, prev, current, items) {
    this.total = total;
    this.numberOfPages = numberOfPages;
    this.next = next;
    this.prev = prev;
    this.current = current;
    this.items = items;
  }

  static fromJson(json, itemProcessor) {
    return new PagedData(
      json.total,
      json.numberOfPages,
      json.next,
      json.prev,
      json.current,
      json.items.map((item) => itemProcessor(item))
    );
  }
}

export default PagedData;
