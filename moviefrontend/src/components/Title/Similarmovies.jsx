import React, { useEffect, useState } from "react";
import TitleClient from "../../api/titleClient";
import PagedData from "../../data/pagedData";
import { Card } from "react-bootstrap";
import TitleSearchData from "../../data/search/titleSearchData";
import { Link } from "react-router-dom";
import { array } from "prop-types";

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
        setResultsData(
          PagedData.fromJson(responseData, TitleSearchData.fromJson)
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [titleID]);

  let renderResults = () => {
    if (resultsData.total === 0 || !Array.isArray(resultsData.items)) {
      return <p>No Similiar Movies</p>;
    }
    return resultsData.items.slice(0, 3).map((item) => {
      return (
        <Link key={item.titleID} to={`/title/${item.titleID}`}>
          <Card>
            <Card.Body>
              <Card.Title>{item.primaryTitle}</Card.Title>
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
