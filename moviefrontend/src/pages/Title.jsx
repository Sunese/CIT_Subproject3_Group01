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
import Bookmark from "../components/Bookmark";

const Title = () => {
  let { id } = useParams();
  const [error, setError] = useState(null);
  const [loadingTitle, setLoadingTitle] = useState(true);
  const [titleData, setTitleData] = useState(new TitleData());

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
      <Row>
        <Col>
          <Card className="custom-card">
            <div style={{ display: "flex" }}>
              <Card.Img
                src={titleData.poster}
                className="custom-card-image"
              ></Card.Img>
              <Card.Text as={"span"}>
                <TitleRating titleId={titleData.titleID}></TitleRating>
                <Bookmark titleid={titleData.titleID} />
              </Card.Text>
            </div>
            <Card.Body>
              <Card.Title>
                <h1>{titleData.primaryTitle}</h1>
              </Card.Title>
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
              <Card.Text>
                Runtime (minutes): {titleData.runtimeMinutes}
              </Card.Text>
              <Card.Text>Released: {titleData.released}</Card.Text>
              <Card.Text>Plot: {titleData.plot}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default Title;
