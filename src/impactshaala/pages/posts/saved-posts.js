//libray import
import { useState, useEffect } from "react";
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
import "../index.css";
import { getSavedPosts, getMediaPost } from "../../../api/mediaPost";
import {
  setLocalStorage,
  getLocalStorage,
} from "../../../utilities/localStorage";

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
  const [mediaPosts, setMediaPosts] = useState([]);
  const [user, setUser] = useState({});

  const fetchSaveMediaPosts = async () => {
    const resp = await getSavedPosts();
    if (resp.errRes) {
      if (resp.errRes.data) {
        window.alert(resp.errRes.data.message);
        return;
      }
      if (resp.errRes.message) {
        window.alert(resp.errRes.message);
        return;
      }
      
      return;
    }
    if (resp.data.success) {

      const updatedPosts = [];  
      for (const item of resp.data.savedPosts) {
        const resp = await getMediaPost(item);
        

        if (resp.errRes) {
          if (resp.errRes.data) {
            window.alert(resp.errRes.data.message);
            continue; // Skip this iteration on error
          }
          if (resp.errRes.message) {
            window.alert(resp.errRes.message);
            continue; // Skip this iteration on error
          }
          console.log(resp);
          continue; // Skip this iteration on error
        }
  
        if (resp.data && resp.data.success) {
          console.log(resp.data)
          updatedPosts.push(resp.data.post); // Collect the post data on success
        }
      }

      console.log(updatedPosts)
      
  
      setMediaPosts(updatedPosts);
    }
  };
  
  

  const handleSaveMediaPost = (id) => {
    const tempUser = { ...user };
    tempUser.savedMediaPosts = [...tempUser.savedMediaPosts, id];
    setUser(tempUser);
    setLocalStorage("user", tempUser);
  };

  const handleUnsaveMediaPost = (id) => {
    const tempUser = { ...user };
    const index = tempUser.savedMediaPosts.indexOf(id);
    if (index === -1) return;
    tempUser.savedMediaPosts.splice(index, 1);
    setUser(tempUser);
    setLocalStorage("user", tempUser);
  };

  useEffect( () => {
    const userData = getLocalStorage("user");
    setUser(userData);
    fetchSaveMediaPosts()
  }, []);

  return (
    <div>
      <h1 className="p-3 mt-3 text-primary">Saved Posts</h1>
      <Tabs
        defaultActiveKey="media"
        id="fill-tab-example"
        className="mb-3"
        fill
      >
        <Tab eventKey="media" title="Media">
          {mediaPosts.map((item) => (
            <MediaPost
              post={item}
              key={item._id}
              user={user}
              saveMediaPostCallback={handleSaveMediaPost}
              unsaveMediaPostCallback={handleUnsaveMediaPost}
            />
          ))}
        </Tab>
        <Tab eventKey="home" title="Project / Initiative" className="bg-white">
          {/* <Project name="1" />
        <Project name="2" />
        <Project name="3" />
        <Project name="4" />
        <Project name="5" /> */}
        </Tab>
        <Tab eventKey="polling" title="Polls & Questions">
          {/* <PollCard />
        <Question />
        <PollCard />
        <Question />
        <PollCard />
        <Question />
        <PollCard /> */}
        </Tab>
      </Tabs>
    </div>
  );
}
