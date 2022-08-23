import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./App.css";
import api from "./api";

export default function Home(props) {
  const [customers, setCustomers] = useState([]);
  let history = useHistory();

  useEffect(() => {
    api.listCustomers().then((res) => {
      setCustomers(res);
    });
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 100,
          flexDirection: "column",
        }}
      >
        <h1>Welcome to Spring Bank!</h1>
        <br />
        <Link to="/applicants">Manage Applicants</Link>
        <br />
        <Link to="/applicants/add">Add Applicant</Link>
      </div>
    </>
  );
}
