import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";
import TitleData from "../data/title/titleData";
import { useParams } from "react-router-dom";
import TitleClient from "../api/titleClient";
import { useState } from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import TitleRating from "../components/TitleRating";
import { Button } from "react-bootstrap";
import BookmarkButton from "../components/Bookmark/BookmarkButton";
import YourRating from "../components/Rating/YourRating";
import Similarmovies from "../components/Title/Similarmovies";
import Directors from "../components/Title/Directors";
import Writers from "../components/Title/Writers";
import PopularActors from "../components/Title/PopularActors";

const Title = () => {
  let { id } = useParams();
  const [error, setError] = useState(null);
  const [loadingTitle, setLoadingTitle] = useState(true);
  const [titleData, setTitleData] = useState(new TitleData());
  const [showRate, setShowRate] = useState(false);
  const [showUpdateRating, setShowUpdateRating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonTitleResult = await TitleClient.getTitle(id);
        const titleResult = TitleData.fromJson(jsonTitleResult);
        setTitleData(titleResult);
        setLoadingTitle(false);
      } catch (error) {
        setLoadingTitle(false);
        setError(error.message);
      }
    };
    fetchData();
  }, [id]);

  if (loadingTitle) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <>
      <Row className="title-first-row">
        <Col>
          <img src={titleData.poster} className="custom-card-image" />
        </Col>
        <Col>
          <div className="star-top-text">Global rating</div>
          <TitleRating
            showRate={showRate}
            showUpdateRating={showUpdateRating}
            titleID={titleData.titleID}
          ></TitleRating>
        </Col>
        <Col>
          <div className="star-top-text">Your rating</div>
          <YourRating
            showRate={showRate}
            setShowRate={setShowRate}
            titleid={titleData.titleID}
            showUpdateRating={showUpdateRating}
            setShowUpdateRating={setShowUpdateRating}
          ></YourRating>
        </Col>
        <Col>
          <div className="star-top-text">Bookmark</div>
          <BookmarkButton bookmarkType={"title"} id={titleData.titleID} />
        </Col>
        <h1>{titleData.primaryTitle}</h1>
        {titleData.isAdult ? (
          <Card.Text>
            <div className="isadult">18+</div>{" "}
          </Card.Text>
        ) : (
          <div></div>
        )}
        <p className="genres">
          {titleData.genres.map((genre, index) => (
            <span key={index} className="genre-bubble">
              {genre.genreName}
            </span>
          ))}
        </p>
        <Card.Text>Runtime (minutes): {titleData.runtimeMinutes}</Card.Text>
        <Card.Text>Released: {titleData.released}</Card.Text>
        <Card.Text>{titleData.plot}</Card.Text>
      </Row>
      <Row>
        <Col>
          <Similarmovies titleID={titleData.titleID} />
        </Col>
        <Col>
          <PopularActors titleID={titleData.titleID} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Directors titleID={titleData.titleID} />
        </Col>
        <Col>
          <Writers titleID={titleData.titleID} />
        </Col>
      </Row>
    </>
  );
};
export default Title;
