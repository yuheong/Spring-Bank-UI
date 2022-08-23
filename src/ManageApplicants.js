import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import api from "./api";
import "./ManageApplicants.css";

export default function ManageApplicants(props) {
  const [customers, setCustomers] = useState([]);
  let history = useHistory();

  useEffect(() => {
    api.listCustomers().then((res) => {
      setCustomers(res);
    });
  }, []);

  return (
    <>
      <h1>All Applicants</h1>
      <table>
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
