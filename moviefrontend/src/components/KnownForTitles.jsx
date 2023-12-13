import React from "react";
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
  return acc;
};

const KnownForTitles = ({ knownForTitlesData }) =>
  knownForTitlesData.items ? (
    <>
      <h1>Known For Titles</h1>
      <Carousel data-bs-theme="dark" className="carousel-styling">
        {knownForTitlesData.items.reduce(groupTitles, []).map((group) => (
          <Carousel.Item key={group[0].id}>
            <Container>
              <Row style={{ justifyContent: "center" }}>
                {group.map((item) => (
                  <Col md="auto" key={item.primaryTitle}>
                    <Card className="carousel-card">
                      <Link
                        style={{ color: "white", textDecoration: "none" }}
                        to={"/title/" + item.titleID}
                      >
                        <Card.Img
                          variant="top"
                          src={item.poster}
                          className="carousel-card-image"
                        />
                        <Card.Body>
                          <Card.Title className="carousel-title-text">
                            {item.primaryTitle}
                          </Card.Title>
                          <Card.Subtitle className="carousel-subtitle-text">
                            {item.titleType}
                          </Card.Subtitle>
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
  ) : (
    <h1>Not Known For any Titles... veery sad</h1>
  );

KnownForTitles.propTypes = {
  knownForTitlesData: PropTypes.instanceOf(PagedData).isRequired,
};

export default KnownForTitles;
