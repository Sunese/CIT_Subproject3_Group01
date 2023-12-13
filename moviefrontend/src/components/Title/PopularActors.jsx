import React, { useEffect, useState } from "react";
import TitleClient from "../../api/titleClient";
import PagedData from "../../data/pagedData";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const PopularActors = ({ titleID }) => {
  const [resultsData, setResultsData] = useState(new PagedData());

  let handleResponse = (response) => {
    if (!response.ok) {
      throw new Error("Error getting Directors");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await TitleClient.getPopularActors(titleID);
        handleResponse(response);
        setResultsData(await response.json());
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [titleID]);

  let renderResults = () => {
    if (resultsData.total === 0 || !Array.isArray(resultsData.items)) {
      return <p>No Popular Actors found</p>;
    }
    return resultsData.items.slice(0, 3).map((item) => {
      return (
        <Link
          style={{ color: "#0000EE" }}
          key={item.url}
          to={`/name/${item.nameID}`}
        >
          <Card>
            <Card.Body>
              <Card.Title style={{ color: "#0000EE" }}>{item.name}</Card.Title>
            </Card.Body>
          </Card>
        </Link>
      );
    });
  };

  return (
    <div>
      <h2>Popular Actors</h2>
      {renderResults()}
    </div>
  );
};

export default PopularActors;
