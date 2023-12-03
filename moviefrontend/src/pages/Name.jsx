import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/esm/Spinner";
import KnownForTitles from "../components/KnownForTitles";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import NameClient from "../api/nameClient";
import NameData from "../data/name/nameData";
import KnownForTitleClient from "../api/knownForTitlesClient";
import KnownForTitlesData from "../data/knownForTitle/knownForTitleData";

const Name = () => {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [loadingName, setLoadingName] = useState(true);
  const [nameData, setNameData] = useState(new NameData());
  const [knownForTitlesData, setKnownForTitles] = useState(
    new KnownForTitlesData()
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonNameResult = await NameClient.getName(id);
        const nameResult = NameData.fromJson(jsonNameResult);
        setNameData(nameResult);

        const jsonKnownForTitlesResult =
          await KnownForTitleClient.getKnownForTitles(id);
        const knownForTitlesResult = KnownForTitlesData.fromJson(
          jsonKnownForTitlesResult
        );
        setKnownForTitles(knownForTitlesResult);
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
      <Row>
        <Col>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>{nameData.primaryName}</Card.Title>
              <Card.Text>{nameData.birthYear}</Card.Text>
              <Card.Text>{nameData.deathYear}</Card.Text>
            </Card.Body>
          </Card>
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
