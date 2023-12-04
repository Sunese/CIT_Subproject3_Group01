import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import React from "react";
import Rate from "./Rating/Rate";
import YourRating from "./YourRating";
import TitleClient from "../api/titleClient";
import TitleRatingData from "../data/title/titleRatingData";

const TitleRating = ({ titleId }) => {
  const [rating, setRating] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await TitleClient.getTitleRatings(titleId);
        if (response.status === 200) {
          const titleRating = TitleRatingData.fromJson(await response.json());
          setRating(titleRating);
        } else {
          setError("Could not retreive rating");
        }
      } catch (error) {
        setError("Could not retreive rating");
      }
    }

    setLoading(true);
    fetchData();
    setLoading(false);
  }, [titleId]);

  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <>
      <Row>
        <Col xs="auto">
          <div style={{ fontSize: 20, fontWeight: "bold" }}>Global rating</div>
          <FaStar className="title-rating-star" />
        </Col>
        <Col xs={1}>
          {loading ? (
            <Spinner animation="border" />
          ) : (
            <>
              {rating ? (
                <div className="global-rating-text">
                  {rating.averageRating}/10
                  <br />
                  {rating.numVotes}
                </div>
              ) : (
                <div style={{ marginTop: 30, color: "red" }}>
                  Title has no ratings!
                </div>
              )}
            </>
          )}
        </Col>
        <Col xs={2}></Col>
        <Col xs="auto">
          <YourRating titleid={titleId} />
        </Col>
      </Row>
    </>
  );
};

export default TitleRating;
