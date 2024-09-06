//libray import
import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useEffect, useState } from 'react';

import MediaPost from "./components/Media";
import PollCard from "./components/PollCard";
import Question from "./components/Question";
import Project from "../projects/Project";

// custom css to make the tab bar different from the default
import "../index.css"
import PageTemplate1 from "../../../components/PageTemplate1";
import { getLocalStorage, setLocalStorage } from "../../../utilities/localStorage";
import { getRelatedMediaPosts } from "../../../api/mediaPost";
import { getRelatedPolls } from "../../../api/polls";
import { deleteMediaPost } from "../../../api/mediaPost";

//home component
function HomeIndex() {
  return (
    <PageTemplate1>
      <TabBar />
    </PageTemplate1>
  );
}

export default HomeIndex;

// tabbar component for the home page

function TabBar() {
  const [mediaPosts, setMediaPosts] = useState([])
  const [polls, setPolls] = useState([])
  const [user, setUser] = useState({})
  const [greeting, setGreeting] = useState("Morning")

  const fetchRelatedMediaPosts = async () => {
    const resp = await getRelatedMediaPosts()
    if(resp.errRes) {
      if(resp.errRes.data) {
        window.alert(resp.errRes.data.message)
        return;
      }
      if(resp.errRes.message) {
        window.alert(resp.errRes.message)
        return;
      }
      console.log(resp)
      return;
    }
    if(resp.data.success) {
      setMediaPosts(resp.data.data.map((item) => ({...item})))
    }
  }

  const fetchRelatedPolls = async () => {
    const resp = await getRelatedPolls()
    if(resp.errRes) {
      if(resp.errRes.data) {
        window.alert(resp.errRes.data.message)
        return;
      }
      if(resp.errRes.message) {
        window.alert(resp.errRes.message)
        return;
      }
      console.log(resp)
      return;
    }
    if(resp.data.success) {
      setPolls(resp.data.data)
    }
  }

  const handleDeletePost = async (id) => {
    const resp = await deleteMediaPost(id)
    if(resp.errRes) {
       if(resp.errRes.data) {
          window.alert(resp.errRes.data.message)
          return;
       }
       if(resp.errRes.message) {
          window.alert(resp.errRes.message)
          return;
       }
       console.log(resp)
       return;
    }
    if(resp.data.success) {
      fetchRelatedMediaPosts()
    }
  }

  const handleSaveMediaPost = (id) => {
    const tempUser = {...user}
    tempUser.savedMediaPosts = [...tempUser.savedMediaPosts, id]
    setUser(tempUser)
    setLocalStorage('user', tempUser)
  }

  const handleUnsaveMediaPost = (id) => {
    const tempUser = {...user}
    const index = tempUser.savedMediaPosts.indexOf(id)
    if(index === -1) return
    tempUser.savedMediaPosts.splice(index, 1)
    setUser(tempUser)
    setLocalStorage('user', tempUser)
  }

  const handleSavePoll = (id) => {
    const tempUser = {...user}
    tempUser.savedPolls = [...tempUser.savedPolls, id]
    setUser(tempUser)
    setLocalStorage('user', tempUser)
  }

  const handleUnsavePoll = (id) => {
    const tempUser = {...user}
    const index = tempUser.savedPolls.indexOf(id)
    if(index === -1) return
    tempUser.savedPolls.splice(index, 1)
    setUser(tempUser)
    setLocalStorage('user', tempUser)
  }

  const handleVoteCallback = (poll) => {
    setPolls(state => [...state.map((item) => {
      return poll._id.toString() === item._id.toString()?{...poll}:{...item}
    })])
  }

  useEffect(() => {
    const userData = getLocalStorage("user")
    setUser(userData)
    fetchRelatedMediaPosts()
    fetchRelatedPolls()
    const hour = (new Date()).getHours()
    if(hour < 12) setGreeting("Morning")
    else if(hour >= 12 && hour < 18) setGreeting("Afternoon")
    else if(hour >= 18 && hour < 21) setGreeting("Evening")
    else setGreeting("Night")
  }, [])

  return (
    <div>
    <h1 className="p-3 mt-3 text-primary">Good {greeting} {user.name}!</h1>
    <Tabs defaultActiveKey="media" id="fill-tab-example" className="mb-3"  fill>
      <Tab eventKey="media" title="Media">
        {
          mediaPosts.map((item) => (
            <MediaPost 
              post={item} 
              key={item._id} 
              user={user} 
              saveMediaPostCallback={handleSaveMediaPost} 
              unsaveMediaPostCallback={handleUnsaveMediaPost}
              handleDelete={handleDeletePost}
            />
          ))
        }
      </Tab>
      <Tab eventKey="home" title="Project / Initiative" className="bg-white">
        <Project name="1" />
        <Project name="2" />
        <Project name="3" />
        <Project name="4" />
        <Project name="5" />
      </Tab>
      <Tab eventKey="polling" title="Polls / Questions">
        {
          polls && polls.map((poll, index) => {
            return (poll.options && poll.options.length > 0) ? (
              <PollCard poll={poll} key={index} user={user} savePollCallback={handleSavePoll} unsavePollCallback={handleUnsavePoll} voteCallback={handleVoteCallback}/>
            ): (
              <Question poll={poll} key={index} user={user} savePollCallback={handleSavePoll} unsavePollCallback={handleUnsavePoll}/>
            )
          })
        }
      </Tab>

    </Tabs>
    </div>
  );
}

