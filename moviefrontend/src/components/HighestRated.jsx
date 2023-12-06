import React, { useEffect, useState } from "react";
import TitleClient from "../api/titleClient";
import Spinner from "react-bootstrap/esm/Spinner";
import PagedData from "../data/pagedData";
import TitleRatingPageItemData from "../data/title/titleRatingPageItemData";
import TitleRatingPageItem from "./TitleRatingPageItem";

const HighestRated = ({ days }) => {
  const [titles, setTitles] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = PagedData.fromJson(
          await TitleClient.getHighestRated(days, 0, 2),
          TitleRatingPageItemData.fromJson
        );
        setTitles(result);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
        setError("Error loading highest rated titles");
      }
    };

    fetchData();
  }, [days]);

  if (loading) {
    return <Spinner animation="border" role="status" />;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <>
      <ul>
        {titles.items.map((titleRating) => (
          <li key={titleRating.titleid}>
            <TitleRatingPageItem data={titleRating} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default HighestRated;
