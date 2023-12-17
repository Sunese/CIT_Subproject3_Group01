import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Spinner from "react-bootstrap/Spinner";
import TitleClient from "../api/titleClient";
import PagedData from "../data/pagedData";
import TitleResultsItemData from "../data/title/titleResultsItemData";
import TitleResultItem from "./TitleResultItem";
import { useNotification } from "../utils/NotificationContext";

const FeaturedTitles = () => {
  const [error, setError] = useState(null);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const { showNotification } = useNotification();
  const [featuredTitles, setFeaturedTitles] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = PagedData.fromJson(
          await TitleClient.getFeatured(10, 0),
          TitleResultsItemData.fromJson
        );
        setFeaturedTitles(result);
        setLoadingFeatured(false);
      } catch (error) {
        setLoadingFeatured(false);
        showNotification("Error loading featured titles", "danger");
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (loadingFeatured) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <Carousel variant="dark" className="featured-titles-carousel">
      {featuredTitles.items.map((title) => (
        <Carousel.Item key={title.titleid}>
          <TitleResultItem
            data={title}
            className="featured-title-carousel-card"
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default FeaturedTitles;
