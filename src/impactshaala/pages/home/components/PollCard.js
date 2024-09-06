import { Button, Card, Col, Dropdown, ProgressBar } from "react-bootstrap";
import { useState, useEffect } from "react";
import user01 from "../../../../assets/images/user/01.jpg";
import Comment from "./Comment";
import { Modal } from "react-bootstrap";
import  LikeComponent from "./LikeComponent";
import SavePost from "./SavePost";
import defaultUser from '../../../../assets/images/defaultUser.png';
import { useNavigate } from "react-router-dom";
import { deletePoll, deletePollComment, likePoll, pollComment, reportPoll, unlikePoll, voteOnPoll } from "../../../../api/polls";
import { savePoll, unsavePoll } from "../../../../api/polls";
import ConfirmationPopup from "../../../../components/ConfirmationPopup";

// this is the poll card component for the home page
function PollCard({
  poll: data, 
  user,
  savePollCallback,
  unsavePollCallback,
  voteCallback,
}) {
  const [poll, setPoll] = useState(data)
  const [showPopup, setShowPopup] = useState(false)
  const navigate = useNavigate()
  const [like, setLike] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [commentNumber, setCommentNumber] = useState(1);
  const [comment, setComment] = useState("")

  const createdAt = poll.createdAt? (new Date(poll.createdAt).toLocaleDateString("en-IN", {day: "2-digit", year: "2-digit", month: "2-digit"})): (new Date()).toLocaleDateString("en-IN", {day: "2-digit", year: "2-digit", month: "2-digit"}) 

  function handleClick() {
    setClicked(!clicked);
  }

  function handleMoreComments() {
    if(commentNumber < poll.comments.length)
      setCommentNumber(commentNumber + 2);
  }

  const handleLike = async () => {
    const resp = await likePoll(poll._id)
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
      setPoll(state => ({
        ...state,
        likes: [...state.likes, user._id]
      }))
    }
  }

  const handleUnlike = async () => {
    const resp = await unlikePoll(poll._id)
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
      const index = poll.likes.indexOf(user._id)
      setPoll(state => ({
        ...state, 
        likes: [...state.likes.slice(0, index), ...state.likes.slice(index + 1)]
      }))
    }
  }

  const handleChange = (e) => {
    setComment(e.target.value)
  }

  const handleComment = async (e) => {
    e.preventDefault();
    const resp = await pollComment(comment, poll._id)
    if(resp.errRes) {
      if(resp.errRes.data) {
         window.alert(resp.errRes.data.message)
         return;
      }
      if(resp.errRes.message) {
         window.alert(resp.errRes.message)
         return;
      }
      return;
    }
    if(resp.data.success) {
      setPoll(state => ({...state, comments: [...resp.data.data.comments]}))
    }
    setComment("")
  }

  const handleDeleteComment = async (commentId) => {
    const resp = await deletePollComment(poll._id, commentId)
    if(resp.errRes) {
      if(resp.errRes.data) {
         window.alert(resp.errRes.data.message)
         return;
      }
      if(resp.errRes.message) {
         window.alert(resp.errRes.message)
         return;
      }
      return;
    }
    if(resp.data.success) {
      setPoll(state => ({...state, comments: state.comments.filter((comment) => comment._id !== commentId)}))
    }
  }

  const handleDelete = async () => {
    const resp = await deletePoll(poll._id)
    if(resp.errRes) {
      if(resp.errRes.data) {
         window.alert(resp.errRes.data.message)
         return;
      }
      if(resp.errRes.message) {
         window.alert(resp.errRes.message)
         return;
      }
      return;
    }
    if(resp.data.success) {
      navigate("/dashboard/success", {
        state: {
          prompt: "Poll Deleted Successfully",
          path: -1,
        }
      })
    }
  }

  const handleReportPoll = async () => {
    const resp = await reportPoll(poll._id)
    if(resp.errRes) {
      if(resp.errRes.data) {
         window.alert(resp.errRes.data.message)
         return;
      }
      if(resp.errRes.message) {
         window.alert(resp.errRes.message)
         return;
      }
      return;
    }
    if(resp.data.success) {
      navigate("/dashboard/success", {
        state: {
          prompt: "Poll Reported Successfully",
          path: -1,
        }
      })
    }
  }

  const handleSave = async () => {
    const resp = await savePoll(poll._id)
    if(resp.errRes) {
      if(resp.errRes.response) {
         window.alert(resp.errRes.response.data.message)
         return;
      }
      if(resp.errRes.message) {
         window.alert(resp.errRes.message)
         return;
      }
      return;
    }
    if(resp.data.success) {
      window.alert(resp.data.message)
      savePollCallback(poll._id)
    }
  }

  const handleUnsave = async () => {
    const resp = await unsavePoll(poll._id)
    if(resp.errRes) {
      if(resp.errRes.response) {
         window.alert(resp.errRes.response.data.message)
         return;
      }
      if(resp.errRes.message) {
         window.alert(resp.errRes.message)
         return;
      }
      return;
    }
    if(resp.data.success) {
      window.alert(resp.data.message)
      unsavePollCallback(poll._id)
    }  
  }

  const handleVote = async (optionId) => {
    const resp = await voteOnPoll(poll._id, optionId)
    if(resp.errRes) {
      if(resp.errRes.response) {
         window.alert(resp.errRes.response.data.message)
         return;
      }
      if(resp.errRes.message) {
         window.alert(resp.errRes.message)
         return;
      }
      return;
    }
    if(resp.data.success) {
      window.alert(resp.data.message)
      voteCallback(resp.data.data)
      setPoll(resp.data.data)
    }  
  }

  return (
    <Col sm={12}>
      <Card className=" card-block card-stretch card-height">
        <Card.Body>
          <div className="user-post-data">
            <div className="d-flex justify-content-between">
              <div className="me-3">
                <img className="rounded-circle img-fluid" src={poll.userId.profilePic?poll.userId.profilePic:defaultUser} alt="" style={{width: "40px", height: "40px", objectFit: "cover"}}/>
              </div>
              <div className="w-100">
                <div className="d-flex justify-content-between">
                  <div onClick={() => navigate("/profile-details/" + poll.userId._id)} style={{cursor: "pointer"}}>
                    <h5 className="mb-0 d-inline-block">{poll.userId.name}</h5>
                    <p className="mb-0 text-primary">{createdAt}</p>
                  </div>
                  <div className="card-post-toolbar">
                    <Dropdown>
                      <Dropdown.Toggle variant="bg-transparent">
                        <span className="material-symbols-outlined">
                          more_horiz
                        </span>
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="dropdown-menu m-0 p-0">
                        <Dropdown.Item className=" p-3" to="#">
                          <div className="d-flex align-items-top">
                            <div className="h4 material-symbols-outlined">
                              <i className="ri-save-line"></i>
                            </div>
                            <div className="data ms-2">
                              <h6>Save Post</h6>
                              <p className="mb-0">
                                Add this to your saved items
                              </p>
                            </div>
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item className=" p-3" onClick={handleReportPoll}>
                          <div className="d-flex align-items-top">
                            <i className="ri-notification-line h4"></i>
                            <div className="data ms-2">
                              <h6>Report</h6>
                              <p className="mb-0">Report this post</p>
                            </div>
                          </div>
                        </Dropdown.Item>
                        {
                          user && user._id === poll.userId._id && (
                            <Dropdown.Item className=" p-3" onClick={() => navigate("/posts/edit-poll", {state: poll})}>
                              <div className="d-flex align-items-top">
                                <i className="ri-delete-bin-line h4"></i>
                                <div className="data ms-2">
                                  <h6>Edit</h6>
                                  <p className="mb-0">Edit this post</p>
                                </div>
                              </div>
                            </Dropdown.Item>
                          )
                        }
                        {
                          user && user._id === poll.userId._id && (
                            <Dropdown.Item className=" p-3" onClick={() => setShowPopup(true)}>
                              <div className="d-flex align-items-top">
                                <i className="ri-delete-bin-line h4"></i>
                                <div className="data ms-2">
                                  <h6>Remove</h6>
                                  <p className="mb-0">Remove this post</p>
                                </div>
                              </div>
                            </Dropdown.Item>
                          )
                        }
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <p>
              {poll.caption}
            </p>
          </div>
          <PollComponent handleVote={handleVote} poll={poll} userId={user._id}/>
          <div className="comment-area mt-3">
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <div className="like-block position-relative d-flex align-items-center">
                <div className="d-flex align-items-center">
                  <div className="like-data">
                    <div className="d-flex align-items-center">
                     <LikeComponent handleLike={handleLike} handleUnlike={handleUnlike} likes={poll.likes} user={user}/>
                    </div>
                  </div>
                  <div className="align-items-center mx-2">
                    <span
                      className=" text-primary"
                    >
                      {poll.likes.length? poll.likes.length: 0} Likes
                    </span>
                  </div>
                </div>
                <div
                  className="total-comment-block"
                  onClick={() => {
                    console.log("comment");
                  }}
                >
                  <span className="text-primary">{poll.comments.length} Comments</span>
                </div>
              </div>

              <div
                className="d-flex"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  console.log("bookmark");
                }}
              >
                <SavePost handleSave={handleSave} handleUnsave={handleUnsave} isSaved={user.savedPolls.includes(poll._id)}/>
              </div>
            </div>
            <hr />
            <ul
              className="post-comments list-inline p-0 m-0 "
              id="comments-section"
            >
              {
                poll.comments.slice(0, commentNumber).map((comment, index) => {
                  if(!comment) console.log(poll)
                  return (comment) && (
                    <Comment data={comment} key={index} user={user} postId={poll._id} handleDeleteComment={handleDeleteComment}/>
                  )
                })
              }
            </ul>

            {
              commentNumber < poll.comments.length && (
                <div
                  className="mx-1  text-secondary"
                  style={{ cursor: "pointer" }}
                  onClick={handleMoreComments}
                >
                  View more comment
                </div>
              )
            }
            <form className="comment-text d-flex align-items-center mt-3">
              <input
                type="text"
                className="form-control rounded mx-2"
                placeholder="Enter Your Comment"
                onChange={handleChange}
                value={comment}
              />
              <Button variant="outline-primary" type="submit" onClick={handleComment}>
                Post
              </Button>
            </form>
          </div>
        </Card.Body>
      </Card>
      <ConfirmationPopup 
        confirmationText="Are you sure you want to delete this poll?"
        handleSuccess={() => {
          handleDelete(poll._id)
          setShowPopup(false)
        }}
        handleCancel={() => setShowPopup(false)}
        show={showPopup}
      />
    </Col>
  );
}

export default PollCard;


function PollComponent({ poll, handleVote, userId}) {
  const [voted, setVoted] = useState(false)
  const [totalVotes, setTotalVotes] = useState(0)

  useEffect(() => {
    if(poll) {
      const allVotes = []
      poll.options.forEach(item => allVotes.push(...item.votes))
      if(allVotes.includes(userId)) setVoted(true)
      else setVoted(false)
      setTotalVotes(allVotes.length)
    }
  }, [poll])

  return (
    <div
      className="user-post rounded border border-secondary-subtle m-2 p-2 "
      style={{
        backgroundColor: "#f8f9fa",
      }}
    >
      <div>
        <h5 className="m-1 p-1" style={{ fontWeight: "bold" }}>
          {" "}
          {poll.question}
        </h5>
      </div>
      <div className="w-75 mx-auto">
        {voted? (
          <PollResult options={poll.options} totalVotes={totalVotes}/>
        ) : (
          <>
            {
              poll && poll.options && poll.options.map((item, index) => (
                <PollOption value={item.text} handleClick={() => handleVote(item._id)} key={index}/>
              ))
            }
          </>
        )}
      </div>
    </div>
  );
}

function PollOption({ value, handleClick }) {
  return (
    <div className="d-flex my-3 justify-content-center">
      <Button
        variant="outline-primary"
        className="rounded-sides w-100 "
        style={{
          borderTopLeftRadius: "20px",
          borderBottomLeftRadius: "20px",
          borderTopRightRadius: "20px",
          borderBottomRightRadius: "20px",
          fontWeight: "bold",
        }}
        onClick={handleClick}
      >
        {value}
      </Button>
    </div>
  );
}

function PollResult({options, totalVotes}) {
  return (
    <div className="">
      {
        options && Array.isArray(options) && options.map((option, index) => (
          <PollResultOption now={totalVotes > 0 ?option.votes.length * 100 / totalVotes: 0} value={option.text} key={index}/>
        ))
      }
    </div>
  );
}

function PollResultOption({ value, now }) {
  return (
    <div className="mx-2 my-2 p-2">
      <span>
        <ProgressBar
          label={value + " " + now + "%"}
          now={now}
          variant="primary"
          style={{ height: "30px", fontSize: "1.0rem" }}
          className="text-start"
        />
      </span>
    </div>
  );
}
