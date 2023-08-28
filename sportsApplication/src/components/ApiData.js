import React, { useEffect, useState } from "react";
import axios from "axios";
// import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import { App } from "./Home.js";
import "../App.css";
import "../AppHamburger.css";

export function useAppData() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log(1);
        const response = await axios.get(
          `http://localhost:4000/WSCandidates/${id}`
        );
        console.log(2);
        if (response.status != 200) {
          throw new Error("API request failed");
        }
        const data = await response.data;
        setData(data);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);
  return { data, error, isLoading };
}
