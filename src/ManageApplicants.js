import { Spin } from "antd";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "./api";
import "./ManageApplicants.css";

export default function ManageApplicants(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    api.listCustomers().then((res) => {
      setCustomers(res);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <h1>All Applicants</h1>
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <table className="manage-applicants">
          <thead>
            <tr>
              <th>Applicant Name</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, id) => (
              <tr key={id}>
                <td>
                  <a href={`/applicants/${customer.id}`}>{customer.name}</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 100,
          flexDirection: "column",
        }}
      >
        <Link to="/applicants/add">Add Applicant</Link>
      </div>
    </>
  );
}
