import axios from "axios";

const DEV_URL = "http://localhost:8080";
const PRODUCTION_URL = "https://adhoccer.et.r.appspot.com";

const instance = axios.create({
  baseURL:
    (process.env.NODE_ENV === "production" ? PRODUCTION_URL : DEV_URL),
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

// const updateJob = (job_id, body) => {
//   return instance
//     .put(`jobs/${job_id}`, body, {
//       headers: {
//         // Overwrite Axios's automatically set Content-Type
//         "Content-Type": "application/json",
//       },
//     })
//     .then((res) => {
//       return res.data;
//     });
// };

const deleteCustomer = (cust_id) => {
  return instance.delete(`customers/${cust_id}`).then((res) => {
    return res.data;
  });
};

export default {
  listCustomers,
  getCustomer,
  createCustomer,
  deleteCustomer,
};
