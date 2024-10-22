import React, { useState, useEffect } from "react";
import { Row, Col, Card, Tab, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReviewComponent from "./MyReview";
import RecentPost from "./RecentPosts";
import PersonalArchivementComp from "./PersonalArchivements";
import MyAccomplishmentPageComponent from "./MyAchivement/index";
import AccomplishmentPageComponent from "./collabAccomplishment/index";
import MediaPost from "../../home/components/Media";
import {
  getProfileMediaPosts,
  deleteMediaPost,
  listMyMediaPosts
} from "../../../../api/mediaPost";
import {
  getLocalStorage,
  setLocalStorage,
} from "../../../../utilities/localStorage";
import PostsSection from "../../../../components/profile/PostsSection";
import Post from "../../home/components/Post";

const ReviewsTabs = ({ profile, }) => {
  const [key, setKey] = useState("recentPosts");
  const [mediaPosts, setMediaPosts] = useState([]);
  const [user, setUser] = useState({});

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

  const fetchProfileMediaPosts = async () => {
    console.log("user", user);
    const resp = await listMyMediaPosts();
    if (resp.errRes) {
      if (resp.errRes.data) {
        window.alert(resp.errRes.data.message);
        return;
      }
      if (resp.errRes.message) {
        window.alert(resp.errRes.message);
        return;
      }
      console.log(resp);
      return;
    }
    if (resp.data.success) {
      setMediaPosts(resp.data.data.map((item) => ({ ...item })));
    }
  };

  const handleDeletePost = async (id) => {
    const resp = await deleteMediaPost(id);
    if (resp.errRes) {
      if (resp.errRes.data) {
        window.alert(resp.errRes.data.message);
        return;
      }
      if (resp.errRes.message) {
        window.alert(resp.errRes.message);
        return;
      }
      console.log(resp);
      return;
    }
    if (resp.data.success) {
      fetchProfileMediaPosts();
    }
  };

  // Function for Greeting like Good Morning, Good Afternoon
  useEffect(() => {
    const userData = getLocalStorage("user");

    if (userData) {
      setUser(userData);
    }

    // Ensure the profile exists before fetching media posts
    if (profile) {
      fetchProfileMediaPosts();
    }
  }, [profile]);

  return (
    <Tab.Container activeKey={key} onSelect={(k) => setKey(k)}>
      {/* Tabs Section */}
      <Nav variant="tabs" className="mb-3">
        <Nav.Item>
          <Nav.Link eventKey="recentPosts">Recent Posts</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="myReviews">My Reviews</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="personalAchievements">
            Personal Achievements
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="collaborativeAccomplishments">
            Collaborative Accomplishments
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <Tab.Content>
        {/* Recent Posts Section */}
        <Tab.Pane eventKey="recentPosts">
          {mediaPosts.map((item) => (
            <MediaPost
              post={item}
              key={item._id}
              user={user}
              saveMediaPostCallback={handleSaveMediaPost}
              unsaveMediaPostCallback={handleUnsaveMediaPost}
              handleDelete={handleDeletePost}
            />
          ))}
        </Tab.Pane>

        {/* My Reviews Section */}
        <Tab.Pane eventKey="myReviews">
          <ReviewComponent />
        </Tab.Pane>

        {/* Personal Achievements Section */}
        <Tab.Pane eventKey="personalAchievements">
          <MyAccomplishmentPageComponent profile={profile} />
        </Tab.Pane>

        {/* Collaborative Accomplishments Section */}
        <Tab.Pane eventKey="collaborativeAccomplishments">
          <AccomplishmentPageComponent />
        </Tab.Pane>
      </Tab.Content>
    </Tab.Container>
  );
};

export default ReviewsTabs;
