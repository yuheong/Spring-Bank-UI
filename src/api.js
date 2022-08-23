import axios from "axios";

const DEV_URL = "http://localhost:8080";
const PRODUCTION_URL = "https://desolate-bayou-75780.herokuapp.com/";

const instance = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? PRODUCTION_URL : DEV_URL,
});

const listCustomers = () => {
  return instance.get("customers").then((res) => {
    return res.data;
  });
};

const getCustomer = (cust_id) => {
  return instance.get(`customers/${cust_id}`).then((res) => {
    return res.data;
  });
};

const createCustomer = (body) => {
  return instance
    .post("customers", body, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return res.data;
    });
};

const getCreditFacility = (cust_id) => {
  return instance.get(`customers/${cust_id}/credit_facility`).then((res) => {
    return res.data;
  });
};

const openCreditFacility = (cust_id) => {
  return instance.post(`customers/${cust_id}/credit_facility`).then((res) => {
    return res.data;
  });
};

const createLoan = (loan_body) => {
  return instance.post("loans", loan_body).then((res) => {
    return res.data;
  });
};

const payoffLoan = (loan_id) => {
  return instance.post(`loans/${loan_id}`).then((res) => {
    return res.data;
  });
};

const getLoans = (customer_id) => {
  return instance.get(`loans?customer_id=${customer_id}`).then((res) => {
    return res.data;
  });
};

export default {
  listCustomers,
  getCustomer,
  createCustomer,
  getCreditFacility,
  openCreditFacility,
  createLoan,
  payoffLoan,
  getLoans,
};
