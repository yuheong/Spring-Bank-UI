import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import ManageApplicants from "./ManageApplicants";
import CreateApplicant from "./CreateApplicant";
import ViewApplicant from "./ViewApplicant";

const { Header, Content } = Layout;

function App() {
  return (
    <Router>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/applicants">Manage Applicants</Link>
            </Menu.Item>
          </Menu>
        </Header>

        <Content style={{ padding: "0 50px" }}>
          <div className="site-layout-content">
            <Switch>
              <Route exact path="/applicants" component={ManageApplicants} />
              <Route exact path="/applicants/add" component={CreateApplicant} />
              <Route path="/applicants/:user_id" component={ViewApplicant} />
              <Route path="/" component={Home} />
            </Switch>
          </div>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
