//libray import
import React from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";

//component import
// defalut layout component
import Sidebar from "../../../components/partials/dashboard/SidebarStyle/sidebar";
import Header from "../../../components/partials/dashboard/HeaderStyle/header";

import MediaPost from "../home/components/Media";
import PollCard from "../home/components/PollCard";
import Question from "../home/components/Question";
import Project from "../projects/Project";

// custom css to make the tab bar different from the default
import "../index.css"

//home component
function SavedPosts() {
  return (
    <div className="">
      <Header />
      <Sidebar />
      <div className="main-content" style={{ overflowX: "hidden" }}>
        <Row>
          <Col lg={12}>

          {/* tab bar is to switch to tabs */}
            <TabBar />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default SavedPosts;

// tabbar component for the home page

function TabBar() {
  return (
    <div>
    <h1 className="p-3 mt-3 text-primary">Saved Posts</h1>
    <Tabs defaultActiveKey="media" id="fill-tab-example" className="mb-3"  fill>
    <Tab eventKey="media" title="Media">
        <MediaPost />
        <MediaPost />
        <MediaPost />
        <MediaPost />
        <MediaPost />
      </Tab>
      <Tab eventKey="home" title="Project / Initiative" className="bg-white">
        <Project name="1" />
        <Project name="2" />
        <Project name="3" />
        <Project name="4" />
        <Project name="5" />
      </Tab>
      <Tab eventKey="polling" title="Polls / Questions">
        <PollCard />
        <Question />
        <PollCard />
        <Question />
        <PollCard />
        <Question />
        <PollCard />
      </Tab>
    </Tabs>
    </div>
  );
}

