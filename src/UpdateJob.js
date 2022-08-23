import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Row, Col, InputNumber } from "antd";
import { useHistory, useParams } from "react-router-dom";
import "./App.css";
import api from "./api";

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 8 },
};

export default function UpdateJob(props) {
  let { job_id } = useParams();
  const [form] = Form.useForm();
  let history = useHistory();
  let [job, setJob] = useState([]);
  let initialFormValues;

  useEffect(() => {
    // api
    //   .getJob(job_id)
    //   .then((res) => {
    //     setJob(res.data);

    //     const jobResponse = res.data;
    //     initialFormValues = {
    //       name: jobResponse.name,
    //       category: jobResponse.category,
    //       pay: jobResponse.pay,
    //       description: jobResponse.description,
    //     };
    //     form.setFieldsValue(initialFormValues);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);

  const onFinish = (values) => {
    const jobObject = JSON.stringify(values);
    api
      .updateJob(job_id, jobObject)
      .then((res) => {
        console.log(res);
        history.push(`/jobs/${job_id}/edit/success`, [values]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function onChange(value) {
    console.log("changed", value);
  }

  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{ minHeight: "90vh" }}
    >
      <Col span={24}>
        <h2 style={{ textAlign: "center", margin: "30px" }}>
          Please edit the relevant details in the job posting and click
          "Update".
        </h2>
        <Form {...layout} onFinish={onFinish} form={form}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true }]}
          >
            <Select allowClear>
              <Option value="Waiter">Waiter</Option>
              <Option value="Deejay">Deejay</Option>
              <Option value="Driver">Driver</Option>
              <Option value="Bartender">Bartender</Option>
              <Option value="Chef">Chef</Option>
            </Select>
          </Form.Item>
          <Form.Item name="pay" label="Salary">
            <InputNumber
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              onChange={onChange}
            />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
