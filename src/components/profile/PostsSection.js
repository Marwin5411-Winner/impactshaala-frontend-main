import { Tab, Tabs } from "react-bootstrap";
import MediaPost from "../../impactshaala/pages/home/components/Media";
import PollCard from "../../impactshaala/pages/home/components/PollCard";
import Question from "../../impactshaala/pages/home/components/Question";
import ProjectCard from "./ProjectCard";
import { setLocalStorage } from "../../utilities/localStorage";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const PostsSection = ({
  myProfile = false,
  mediaPosts = [],
  polls = [],
  user,
  setPolls,
  setUser,
  handleDeletePost
}) => {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState("media")

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
    const tab = location.hash.replace("#", "")
    if(tab) {
      if(tab === "polls-tab") setActiveTab("polling")
      if(tab === "posts-tab") setActiveTab("media")
    } else setActiveTab("media")

  }, [location])

	return (
		<Tabs activeKey={activeTab} id="fill-tab-example" className="mb-3"  fill onSelect={tab => setActiveTab(tab)}>
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
        <ProjectCard name="1" myProfile={myProfile}/>
        <ProjectCard name="2" myProfile={myProfile}/>
        <ProjectCard name="3" myProfile={myProfile}/>
        <ProjectCard name="4" myProfile={myProfile}/>
        <ProjectCard name="5" myProfile={myProfile}/>
      </Tab>
      <Tab eventKey="polling" title="Polls & Questions">
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
	)
}

export default PostsSection;