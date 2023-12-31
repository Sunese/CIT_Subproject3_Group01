import React, { useState } from "react";
import { useEffect } from "react";
import Paginator from "../components/Paginator";
import TitleClient from "../api/titleClient";

const Test = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [titlepageData, setTitlepageData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const titleClient = new TitleClient();
        const titlepageData = await titleClient.getTitles();
        setTitlepageData(titlepageData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <>
      <Paginator page={titlepageData}></Paginator>
    </>
  );
};

export default Test;
