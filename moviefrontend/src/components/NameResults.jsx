import React from "react";
import NameResultItem from "./NameResultItem";

const NameResults = ({ page }) => (
  <div>
    Total: {page.total}
    <br />
    Number of Pages: {page.numberOfPages}
    <br />
    Next: {page.next}
    <br />
    Prev: {page.prev}
    <br />
    Current: {page.current}
    <br />
    <br />
    {page.items.map((item) => (
      <NameResultItem key={item.url} nameResultItemData={item} />
    ))}
  </div>
);
export default NameResults;
