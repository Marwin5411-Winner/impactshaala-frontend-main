import { Button, Card, Col, Dropdown } from "react-bootstrap";

import { useState } from "react";
import Comment from "./Comment";
import LikeComponent from "./LikeComponent";
import SavePost from "./SavePost";
import defaultUser from '../../../../assets/images/defaultUser.png';
import { useNavigate } from "react-router-dom";
import { deletePoll, deletePollComment, likePoll, pollComment, reportPoll, savePoll, unlikePoll, unsavePoll } from "../../../../api/polls";
import ConfirmationPopup from "../../../../components/ConfirmationPopup";

function Question({
  poll: data, 
  user,
  savePollCallback,
  unsavePollCallback,
}) {
  const navigate = useNavigate()
  const [showPopup, setShowPopup] = useState(false)
  const [poll, setPoll] = useState(data)
  const [comment, setComment] = useState("")

  const [commentNumber, setcommentNumber] = useState(0);

  const createdAt = poll.createdAt? (new Date(poll.createdAt).toLocaleDateString("en-IN", {day: "2-digit", year: "2-digit", month: "2-digit"})): (new Date()).toLocaleDateString("en-IN", {day: "2-digit", year: "2-digit", month: "2-digit"}) 

  const handleChange = (e) => setComment(e.target.value)

  function handleMoreComment() {
    setcommentNumber(commentNumber + 2);
  }

  const handleLike = async () => {
    const resp = await likePoll(poll._id)
    if(resp.errRes) {
      if(resp.errRes.response) {
         window.alert(resp.errRes.response.data.message)
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

  const handleComment = async (e) => {
    e.preventDefault();
    const resp = await pollComment(comment, poll._id)
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
      setPoll(state => ({...state, comments: [...resp.data.data.comments]}))
    }
    setComment("")
  }

  const handleUnlike = async () => {
    const resp = await unlikePoll(poll._id)
    if(resp.errRes) {
      if(resp.errRes.response) {
         window.alert(resp.errRes.response.data.message)
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

  const handleDelete = async () => {
    const resp = await deletePoll(poll._id)
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
      if(resp.errRes) {
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
          prompt: "Question Reported Successfully",
          path: -1,
        }
      })
    }
  }

  const handleDeleteComment = async (commentId) => {
    const resp = await deletePollComment(poll._id, commentId)
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
      setPoll(state => ({...state, comments: state.comments.filter((comment) => comment._id !== commentId)}))
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
              {poll.question}
            </p>
            <p className="text-secondary">
              {poll.caption}
            </p>
            <p className="text-secondary">{poll.comments.length?poll.comments.length:0} answers</p>
          </div>

          <div className="comment-area mt-3">
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <div className="like-block position-relative d-flex align-items-center">
                <div className="d-flex align-items-center">
                  <div className="like-data">
                    <>
                      {/* <img src={icon1} className="img-fluid" alt="" /> */}
                      <LikeComponent handleLike={handleLike} handleUnlike={handleUnlike} user={user} likes={poll.likes}/>
                    </>
                  </div>
                  <div className="align-items-center mx-2">
                    <span
                      className=" text-primary"
                    >
                      {poll.likes.length? poll.likes.length: 0} Likes
                    </span>
                  </div>
                </div>
              </div>
              {/* <ShareOffcanvas /> */}
              <SavePost handleSave={handleSave} handleUnsave={handleUnsave} isSaved={user.savedPolls.includes(poll._id)}/>
            </div>
            <hr />
            <ul className="post-comments list-inline p-0 m-0">
              {
                poll.comments.slice(0, commentNumber).map((comment, index) => {
                  if(!comment) console.log(poll)
                  return (comment) && (
                    <Comment data={comment} key={index} user={user} postId={poll._id} handleDeleteComment={handleDeleteComment}/>
                  )
                })
              }
              {
                commentNumber < poll.comments.length && (
                  <div
                    className="d-flex"
                    style={{ cursor: "pointer" }}
                    onClick={handleMoreComment}
                  >
                    <div>
                      <span class="material-symbols-outlined">more_horiz</span>
                    </div>
                    <div className="mx-1  text-secondary">View more answers</div>
                  </div>
                )
              }
            </ul>
            <form className="comment-text d-flex align-items-center mt-3">
              <input
                type="textarea"
                className="form-control rounded m-2"
                placeholder="Enter Your Answer..."
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
        confirmationText="Are you sure you want delete this poll?"
        show={showPopup}
        handleSuccess={async () => {
          await handleDelete(poll._id)
          setShowPopup(false)
        }}
        handleCancel={() => setShowPopup(false)}
      />
    </Col>
  );
}

export default Question;
