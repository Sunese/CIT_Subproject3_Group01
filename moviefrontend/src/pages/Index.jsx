import FeaturedTitles from "../components/FeaturedTitles";
import React from "react";
import { useState, useEffect } from "react";
import TitleClient from "../api/titleClient";
import TitleResultsProcessor from "../data/title/titleResultsProcessor";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Index = () => {
  return (
    <>
      <Row>
        <Col>
          <h3>Featured Titles</h3>
          <FeaturedTitles />
        </Col>
        <Col>
          <h2>Top rated bookmarks</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Row 1, Col 0</h2>
        </Col>
        <Col>
          <h2>Row 1, Col 1</h2>
        </Col>
        <Col>
          <h2>Row 1, Col 2</h2>
        </Col>
      </Row>
    </>
  );
};
export default Index;
