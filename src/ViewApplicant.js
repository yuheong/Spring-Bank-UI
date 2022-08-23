import React, { useState, useEffect } from "react";
import {
  Form,
  Select,
  Button,
  Divider,
  Row,
  Col,
  Descriptions,
  InputNumber,
  DatePicker,
} from "antd";
import { useParams } from "react-router-dom";
import api from "./api";
import "./ViewApplicant.css";

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 8 },
};

export default function ViewApplicant(props) {
  const [form] = Form.useForm();
  let { user_id } = useParams();
  let [applicant, setApplicant] = useState({});
  let [creditFacility, setCreditFacility] = useState({});
  let [loans, setLoans] = useState([]);

  useEffect(() => {
    api.getCustomer(user_id).then((res) => {
      setApplicant(res);
    });

    api.getCreditFacility(user_id).then((res) => {
      setCreditFacility(res);
      if (!!res) {
        api.getLoans(user_id).then((res) => {
          setLoans(res);
        });
      }
    });
  }, [user_id]);

  const handleOpenFacility = () => {
    api.openCreditFacility(user_id).then((res) => {
      setCreditFacility(res);
    });
  };

  const onFinish = (values) => {
    const loanObject = {
      customer_id: user_id,
      loan_type: values.loan_type,
      loan_amount: values.loan_amount,
      due_date: values.due_date.format("YYYY-MM-DD"),
      interest_rate: values.interest_rate,
    };
    api
      .createLoan(loanObject)
      .then((res) => {
        setLoans((loans) => [...loans, res]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <Row justify="center">
        <Col span={10}>
          <Descriptions title="Applicant Info" column={1}>
            <Descriptions.Item label="Name">{applicant.name}</Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
      <Divider />
      <Row justify="center">
        <Col>
          {creditFacility ? (
            <div>
              <h2>All Loans</h2>
              <table>
                <thead>
                  <tr>
                    <th>Loan ID</th>
                    <th>Loan Type</th>
                    <th>Loan Amount</th>
                    <th>Due Date</th>
                    <th>Interest Rate</th>
                    <th>Paid</th>
                  </tr>
                </thead>
                <tbody>
                  <tr></tr>
                  {loans.map((loan, id) => (
                    <tr key={id}>
                      <td>{loan.id}</td>
                      <td>{loan.loanType}</td>
                      <td>${loan.loanAmount}</td>
                      <td>{loan.dueDate}</td>
                      <td>{loan.interestRate}%</td>
                      <td>{loan.paid ? "Paid" : "Unpaid"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Divider />
              <h2>Create loan</h2>
              <Form
                {...layout}
                form={form}
                name="control-hooks"
                onFinish={onFinish}
              >
                <Form.Item
                  name="loan_type"
                  label="Loan type"
                  rules={[{ required: true }]}
                >
                  <Select placeholder="Select an option">
                    <Option value="HOME_LOAN">Home loan</Option>
                    <Option value="CAR_LOAN">Car loan</Option>
                    <Option value="BUSINESS_LOAN">Business loan</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="loan_amount"
                  label="Loan Amount ($)"
                  rules={[{ required: true }]}
                >
                  <InputNumber />
                </Form.Item>
                <Form.Item
                  name="due_date"
                  label="Due Date"
                  rules={[{ required: true }]}
                >
                  <DatePicker />
                </Form.Item>
                <Form.Item
                  name="interest_rate"
                  label="Interest rate (%)"
                  rules={[{ required: true }]}
                >
                  <InputNumber />
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
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              Would you like to open a credit facility for the applicant?
              <br />
              <Button type="primary" onClick={handleOpenFacility}>
                Open credit facility
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </>
  );
}
