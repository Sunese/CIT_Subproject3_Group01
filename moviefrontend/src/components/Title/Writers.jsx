import React, { useEffect, useState } from "react";
import TitleClient from "../../api/titleClient";
import PagedData from "../../data/pagedData";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Writers = ({ titleID }) => {
  const [resultsData, setResultsData] = useState(new PagedData());

  let handleResponse = (response) => {
    if (!response.ok) {
      throw new Error("Error getting Directors");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await TitleClient.getWriters(titleID);
        handleResponse(response);
        setResultsData(await response.json());
      } catch (error) {
        throw error;
      }
    };
    fetchData();
  }, [titleID]);

  let renderResults = () => {
    if (Object.keys(resultsData).length === 0 || resultsData[0] === undefined) {
      return <p>No Writers found</p>;
    }
    return resultsData.map((item) => {
      return (
        <Link
          style={{ color: "#0000EE" }}
          key={item.url}
          to={`/name/${item.nameID}`}
        >
          <Card>
            <Card.Body>
              <Card.Title style={{ color: "#0000EE" }}>
                {item.primaryName}
              </Card.Title>
            </Card.Body>
          </Card>
        </Link>
      );
    });
  };

  return (
    <div>
      <h2>Writers</h2>
      {renderResults()}
    </div>
  );
};

export default Writers;
