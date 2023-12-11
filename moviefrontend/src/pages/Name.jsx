import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/esm/Spinner";
import KnownForTitles from "../components/KnownForTitles";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import NameClient from "../api/nameClient";
import NameData from "../data/name/nameData";
import NameRatingData from "../data/name/nameRatingData";
import KnownForTitleClient from "../api/knownForTitlesClient";
import KnownForTitlesData from "../data/knownForTitle/knownForTitleData";
import PagedData from "../data/pagedData";
import BookmarkButton from "../components/Bookmark/BookmarkButton";

const Name = () => {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [loadingName, setLoadingName] = useState(true);
  const [nameData, setNameData] = useState(new NameData());
  const [nameRating, setNameRating] = useState(new NameRatingData());
  const [nameProfessions, setNameProfessions] = useState([]);
  const [knownForTitlesData, setKnownForTitles] = useState(
    new KnownForTitlesData()
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingName(true);
        // Getting name data
        const nameResponse = await NameClient.getName(id);
        if (!nameResponse.ok) {
          throw new Error("Error getting response: ", nameResponse.status);
        }
        const json = await nameResponse.json();
        const nameResult = NameData.fromJson(json);
        setNameData(nameResult);

        // getting name rating
        const nameRatingResponse = await NameClient.getNameRating(id);
        if (nameRatingResponse.ok) {
          const nameRatingJson = await nameRatingResponse.json();
          setNameRating(NameRatingData.fromJson(nameRatingJson));
        }

        //// getting professions
        const professionsResponse = await NameClient.getPrimaryProfessions(id);
        if (professionsResponse.ok) {
          const professionsJson = await professionsResponse.json();
          setNameProfessions(professionsJson);
        }

        // getting known for titles
        const knownForTitleresponse =
          await KnownForTitleClient.getKnownForTitles(id);
        if (knownForTitleresponse.ok) {
          const pagedKnownForTitles = await knownForTitleresponse.json();
          const pagedKnownForTitlesData = PagedData.fromJson(
            pagedKnownForTitles,
            KnownForTitlesData.fromJson
          );
          setKnownForTitles(pagedKnownForTitlesData);
        }
        setLoadingName(false);
      } catch (error) {
        setLoadingName(false);
        setError(error.message);
        console.error("error: ", error);
      }
    };
    fetchData();
  }, [id]);

  if (loadingName) {
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
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Card>
            <Card.Body>
              <Card.Title>{nameData.primaryName}</Card.Title>
              {nameData.birthYear === "    " ? (
                <></>
              ) : (
                <Card.Text>Birth Year: {nameData.birthYear}</Card.Text>
              )}
              {nameData.deathYear === "    " ? (
                <></>
              ) : (
                <Card.Text>Death Year: {nameData.deathYear}</Card.Text>
              )}
              {Array.isArray(nameProfessions) ? (
                <Card.Text>
                  Professions:{" "}
                  {nameProfessions.map((p) => p.professionName + ", ")}
                </Card.Text>
              ) : (
                <></>
              )}
              {nameRating.rating === undefined ? (
                <></>
              ) : (
                <Card.Text>Rating: {nameRating.rating}</Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md="auto">
          <BookmarkButton bookmarkType={"name"} id={nameData.nameID} />
        </Col>
      </Row>
      <Row>
        <Col>
          <KnownForTitles knownForTitlesData={knownForTitlesData} />
        </Col>
      </Row>
    </>
  );
};

export default Name;
