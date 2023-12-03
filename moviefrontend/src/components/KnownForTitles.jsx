import React from "react";
import TitleResultItem from "./TitleResultItem";
import Carousel from "react-bootstrap/Carousel";
import PropTypes from "prop-types";
import PagedData from "../data/pagedData";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

const groupTitles = (acc, cur, index) => {
  const groupIndex = Math.floor(index / 3);
  if (!acc[groupIndex]) acc[groupIndex] = [];
  acc[groupIndex].push(cur);
  console.log(acc);
  return acc;
};

const KnownForTitles = ({ knownForTitlesData }) =>
  console.log(knownForTitlesData) || (
    <>
      <h1>Known For Titles</h1>
      <Carousel>
        {knownForTitlesData.items.reduce(groupTitles, []).map((group) => (
          <Carousel.Item key={group[0].id}>
            <Container>
              <Row>
                {group.map((item) => (
                  <Col key={item}>
                    <Card>
                      <Link
                        style={{ color: "white", textDecoration: "none" }}
                        to={"/title/" + item.titleID}
                      >
                        <Card.Img variant="top" src={item.poster} />
                        <Card.Body>
                          <Card.Title>{item.primaryTitle}</Card.Title>
                          <Card.Subtitle>{item.titleType}</Card.Subtitle>
                        </Card.Body>
                      </Link>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );

KnownForTitles.propTypes = {
  knownForTitlesData: PropTypes.instanceOf(PagedData).isRequired,
};

export default KnownForTitles;
