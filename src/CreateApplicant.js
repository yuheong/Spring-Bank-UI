import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Row,
  Col,
} from "antd";
import { useHistory } from "react-router-dom";
import api from "./api";

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 8 },
};

export default function CreateApplicant(props) {
  const [form] = Form.useForm();
  let history = useHistory();

  const onFinish = (values) => {
    const applicantObject = JSON.stringify(values);
    api
      .createCustomer(applicantObject)
      .then((res) => {
        history.push("/applicants", [values]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
    >
      <Col span={24}>
        <h2 style={{ textAlign: "center", margin: "30px" }}>
          Please fill up the form below to create a new applicant
        </h2>
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
