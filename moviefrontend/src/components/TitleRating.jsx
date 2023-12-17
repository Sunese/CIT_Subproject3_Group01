import { Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import React from "react";
import TitleClient from "../api/titleClient";
import TitleRatingData from "../data/title/titleRatingData";
import GlobalRatingStar from "./Rating/GlobalRatingStar";
import { useNotification } from "../utils/NotificationContext";

const TitleRating = ({ showUpdateRating, showRate, titleID }) => {
  const [rating, setRating] = useState(null);
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await TitleClient.getTitleRatings(titleID);
        if (response.status === 200) {
          const titleRating = TitleRatingData.fromJson(await response.json());
          setRating(titleRating);
        } else {
          showNotification("Could not retreive rating", "danger");
        }
      } catch (error) {
        showNotification("Could not retreive rating", "danger");
      }
    }

    setLoading(true);
    fetchData();
    setLoading(false);
  }, [titleID, showUpdateRating, showRate]);

  if (loading) return <Spinner />;

  if (!rating) return <div>No rating for this title</div>;

  return <GlobalRatingStar rating={rating.averageRating}></GlobalRatingStar>;
};

export default TitleRating;
