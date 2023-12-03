import FeaturedTitles from "../components/FeaturedTitles";
import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HighestRated from "../components/HighestRated";

const Index = () => {
  return (
    <>
      <Row>
        <Col>
          <h3>Featured Titles</h3>
          <FeaturedTitles />
        </Col>
        <Col>
          <h3>Top rated bookmarks</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Highest Rated All Time</h3>
          <HighestRated />
        </Col>
        <Col>
          <h3>Highest Rated Newly Released</h3>
          <HighestRated days={30} />
        </Col>
      </Row>
    </>
  );
};
export default Index;
