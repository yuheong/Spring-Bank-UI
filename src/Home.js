import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

export default function Home(props) {
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
