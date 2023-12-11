import React, { useEffect, useState } from "react";
import TitleClient from "../../api/titleClient";
import PagedData from "../../data/pagedData";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { array } from "prop-types";
import SimiliarMoviesData from "../../data/title/similiarMoviesData";

const Similarmovies = ({ titleID }) => {
  const [resultsData, setResultsData] = useState(new PagedData());

  let handleResponse = (response) => {
    if (!response.ok) {
      throw new Error("Error getting Similiar Moives");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await TitleClient.getSimiliarMovies(titleID);
        handleResponse(response);
        const responseData = await response.json();
        console.log(responseData);
        setResultsData(
          PagedData.fromJson(responseData, SimiliarMoviesData.fromJson)
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [titleID]);

  let renderResults = () => {
    console.log("resultsData: ", resultsData);
    if (resultsData.total === 0 || !Array.isArray(resultsData.items)) {
      return <p>No Similiar Movies</p>;
    }
    return resultsData.items.slice(0, 3).map((item) => {
      return (
        <Link
          key={item.titleID}
          to={`/title/${item.titleID}`}
          style={{ color: "#0000EE" }}
        >
          <Card>
            <Card.Body>
              <Card.Title style={{ color: "#0000EE" }}>{item.title}</Card.Title>
            </Card.Body>
          </Card>
        </Link>
      );
    });
  };

  return (
    <div>
      <h2>Similiar Movies</h2>
      {renderResults()}
    </div>
  );
};

export default Similarmovies;
