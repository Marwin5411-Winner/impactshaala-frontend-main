// Library imports
import React, { useEffect, useState } from "react";
import { Tab, Tabs, Button } from "react-bootstrap";

import MediaPost from "./components/Media";
import PollCard from "./components/PollCard";
import Question from "./components/Question";
import Project from "../projects/Project";
import Post from "./components/Post";

// Custom CSS to make the tab bar different from the default
import "../index.css";
import PageTemplate1 from "../../../components/PageTemplate1";
import {
  getLocalStorage,
  setLocalStorage,
} from "../../../utilities/localStorage";
import { getRelatedMediaPosts } from "../../../api/mediaPost";
import { getRelatedPolls } from "../../../api/polls";
import { deleteMediaPost } from "../../../api/mediaPost";

// Home component
function HomeIndex() {
  return (
    <PageTemplate1>
      <TabBar />
    </PageTemplate1>
  );
}

export default HomeIndex;

// Sample categories
const categories = [
  { id: "1", name: "Educational" },
  { id: "2", name: "Social Impact" },
  { id: "3", name: "Careers" },
  { id: "4", name: "Entrepreneurship & Funding" },
  { id: "5", name: "Live Events" },
  { id: "6", name: "Talent Master" },
];

// Sample projects (Replace this with your actual projects data)
const projects = [
  { id: "p1", name: "Project 1", categoryId: "1" },
  { id: "p2", name: "Project 2", categoryId: "2" },
  { id: "p3", name: "Project 3", categoryId: "1" },
  { id: "p4", name: "Project 4", categoryId: "3" },
  { id: "p5", name: "Project 5", categoryId: "2" },
];

// TabBar component for the home page
function TabBar() {
  const [mediaPosts, setMediaPosts] = useState([]);
  const [polls, setPolls] = useState([]);
  const [user, setUser] = useState({});
  const [greeting, setGreeting] = useState("Morning");
  const [selectedCategory, setSelectedCategory] = useState(null); // State for selected category

  const fetchRelatedMediaPosts = async () => {
    const resp = await getRelatedMediaPosts();
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

  const fetchRelatedPolls = async () => {
    const resp = await getRelatedPolls();
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
      setPolls(resp.data.data);
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
      fetchRelatedMediaPosts();
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

  const handleSavePoll = (id) => {
    const tempUser = { ...user };
    tempUser.savedPolls = [...tempUser.savedPolls, id];
    setUser(tempUser);
    setLocalStorage("user", tempUser);
  };

  const handleUnsavePoll = (id) => {
    const tempUser = { ...user };
    const index = tempUser.savedPolls.indexOf(id);
    if (index === -1) return;
    tempUser.savedPolls.splice(index, 1);
    setUser(tempUser);
    setLocalStorage("user", tempUser);
  };

  const handleVoteCallback = (poll) => {
    setPolls((state) =>
      state.map((item) =>
        poll._id.toString() === item._id.toString() ? { ...poll } : { ...item }
      )
    );
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };
  

  // Function for Greeting like Good Morning, Good Afternoon
  useEffect(() => {
    const userData = getLocalStorage("user");
    setUser(userData);
    fetchRelatedMediaPosts();
    fetchRelatedPolls();
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Morning");
    else if (hour >= 12 && hour < 18) setGreeting("Afternoon");
    else if (hour >= 18 && hour < 21) setGreeting("Evening");
    else setGreeting("Night");
  }, []);

  // Filter projects based on selected category
  const filteredProjects = selectedCategory
    ? projects.filter((project) => project.categoryId === selectedCategory)
    : projects;

  return (
    <div>
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
              handleDelete={handleDeletePost}
            />
          ))}
          <Post />
        </Tab>
        <Tab
          eventKey="home"
          title="Project / Initiative"
          className="bg-white"
        >
          {/* Category Filters as Buttons */}
          <div className="category-filters d-flex flex-wrap">
            {/* 'All' Button */}
            <Button
              variant={selectedCategory === null ? "primary" : "outline-primary"}
              onClick={() => setSelectedCategory(null)}
              className="m-2"
            >
              All
            </Button>

            {/* Category Buttons */}
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={
                  selectedCategory === category.id ? "primary" : "outline-primary"
                }
                onClick={() => handleCategoryClick(category.id)}
                className="m-2"
              >
                {category.name}
              </Button>
            ))}
          </div>

          {/* Render Filtered Projects */}
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <Project key={project.id} name={project.name} />
            ))
          ) : (
            <p>No projects found for the selected category.</p>
          )}
        </Tab>

        <Tab eventKey="polling" title="Polls / Questions">
          {polls &&
            polls.map((poll, index) =>
              poll.options && poll.options.length > 0 ? (
                <PollCard
                  poll={poll}
                  key={index}
                  user={user}
                  savePollCallback={handleSavePoll}
                  unsavePollCallback={handleUnsavePoll}
                  voteCallback={handleVoteCallback}
                />
              ) : (
                <Question
                  poll={poll}
                  key={index}
                  user={user}
                  savePollCallback={handleSavePoll}
                  unsavePollCallback={handleUnsavePoll}
                />
              )
            )}
        </Tab>
      </Tabs>
    </div>
  );
}
