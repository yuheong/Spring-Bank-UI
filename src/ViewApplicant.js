import React, { useState, useEffect } from "react";
import {
  Button,
  Divider,
  Row,
  Col,
  Carousel,
  PageHeader,
  Modal,
  Descriptions,
  message,
} from "antd";
import { Link, useParams, useHistory } from "react-router-dom";
import "./App.css";
import api from "./api";

export default function ViewApplicant(props) {
  let { user_id } = useParams();
  let history = useHistory();
  let [applicant, setApplicant] = useState({});

  useEffect(() => {
    api.getCustomer(user_id).then((res) => {
      setApplicant(res);
    });
  }, []);

  const handleEdit = () => {
    history.push(`/jobs/${user_id}/edit`);
  };

  return (
    <>
      <Row justify="center">
        <Col span={10}>
          <Descriptions title="Applicant Info" column={1}>
            <Descriptions.Item label="Name">
              {applicant.name}
            </Descriptions.Item>
          </Descriptions>
        </Col>
        <Col span={12}>
          
        </Col>
      </Row>
    </>
  );
}
