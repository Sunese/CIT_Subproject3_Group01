class ResultsData {
    constructor(total, numberOfPages, next, prev, current, items) {
        this.total = total;
        this.numberOfPages = numberOfPages;
        this.next = next;
        this.prev = prev;
        this.current = current;
        this.items = items;
    }
}

export default ResultsData;