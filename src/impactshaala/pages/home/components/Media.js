import { Button, Card, Carousel, Col, Dropdown } from "react-bootstrap";
import { useState } from "react";
import LikeComponent from "./LikeComponent";

import Comment from "./Comment";
import CustomToggle from "../../../../components/dropdowns";
import LikeModal from "./LikeModal";
import defaultUser from '../../../../assets/images/defaultUser.png';

import "../../../../assets/vendor/remixicon/fonts/remixicon.css";
import SavePost from "./SavePost";
import { useNavigate } from "react-router-dom";
import { likeMediaPost, mediaPostComment, reportMediaPost, saveMediaPost, unlikeMediaPost, unsaveMediaPost } from "../../../../api/mediaPost";
import { deleteMediaPostComment } from "../../../../api/mediaPost";
import ConfirmationPopup from "../../../../components/ConfirmationPopup";

function Media({
  post: userPost,
  user,
  handleDelete,
  saveMediaPostCallback,
  unsaveMediaPostCallback,
}) {
  const navigate = useNavigate()
  const [showPopup, setShowPopup] = useState(false);
  const [commentNumber, setCommentNumber] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [post, setPost] = useState(userPost)
  const [comment, setComment] = useState("")

  const handleMoreComments = () => {
    if(commentNumber < post.comments.length)
      setCommentNumber(commentNumber + 2);
  };

  useState(() => {
    setPost(userPost)
  }, [userPost])

  const createdAt = post.createdAt? (new Date(post.createdAt).toLocaleDateString("en-IN", {day: "2-digit", year: "2-digit", month: "2-digit"})): (new Date()).toLocaleDateString("en-IN", {day: "2-digit", year: "2-digit", month: "2-digit"}) 

  const handleLike = async () => {
    const resp = await likeMediaPost(post._id)
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
      setPost(state => ({
        ...state,
        likes: [...state.likes, user._id]
      }))
    }
  }

  const handleUnlike = async () => {
    const resp = await unlikeMediaPost(post._id)
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
      const index = post.likes.indexOf(user._id)
      setPost(state => ({
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
    const resp = await mediaPostComment(comment, post._id)
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
      setPost(state => ({...state, comments: [...resp.data.data.comments]}))
    }
    setComment("")
  }

  const handleDeleteComment = async (commentId) => {
    const resp = await deleteMediaPostComment(post._id, commentId)
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
      setPost(state => ({...state, comments: state.comments.filter((comment) => comment._id !== commentId)}))
    }
  }

  const handleReportPost = async () => {
    const resp = await reportMediaPost(post._id)
    console.log(resp)
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
          prompt: "Post Reported Successfully",
          path: -1,
        }
      })
    }
  }

  const handleSave = async () => {
    const resp = await saveMediaPost(post._id)
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
      window.alert(resp.data.message)
      saveMediaPostCallback(post._id)
    }
  }

  const handleUnsave = async () => {
    const resp = await unsaveMediaPost(post._id)
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
      window.alert(resp.data.message)
      unsaveMediaPostCallback(post._id)
    }  
  }

  return (
    <Col sm={12}>
      <Card className=" card-block card-stretch card-height">
        <Card.Body>
          <div className="user-post-data">
            <div className="d-flex justify-content-between">
              <div className="me-3">
                <img 
                  className="rounded-circle img-fluid" 
                  src={post.userId.profilePic?post.userId.profilePic:defaultUser} 
                  alt="Profile Pic" 
                  style={{
                    width: "40px",
                    height: "40px",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="w-100">
                <div className="d-flex justify-content-between">
                  <div onClick={() => navigate("/profile-details/" + post.userId._id)} style={{cursor: "pointer"}}>
                    <h5 className="mb-0 d-inline-block">{post.userId.name}</h5>
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
                        <Dropdown.Item className=" p-3" onClick={handleReportPost}>
                          <div className="d-flex align-items-top">
                            <i className="ri-notification-line h4"></i>
                            <div className="data ms-2">
                              <h6>Report</h6>
                              <p className="mb-0">Report this post</p>
                            </div>
                          </div>
                        </Dropdown.Item>
                        {
                          user && user._id === post.userId._id && (
                            <Dropdown.Item className=" p-3" onClick={() => navigate("/posts/edit-media-post", {state: post})}>
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
                          user && user._id === post.userId._id && (
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
              {
                post.description.split("\n").map((str, index) => <div key={index}>{str}</div>)
              }
            </p>
          </div>
          <div className="user-post" style={{maxHeight: "400px"}}>
            <div className="h-100 w-100">
              <Carousel style={{maxHeight: "400px", overflow: "hidden"}} variant="dark">
                {
                  post && post.image && Array.isArray(post.image) && post.image.map((image, index) => (
                    <Carousel.Item key={index} className="w-100" style={{maxHeight: "400px"}}>
                      <div className="h-100 w-100">
                        <img src={image} alt="Post" className="w-100 h-100"style={{objectFit: "contain", maxHeight:"400px"}} />
                      </div>
                    </Carousel.Item>
                  ))
                }
              </Carousel>
            </div>
          </div>
          <div className="comment-area mt-3">
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <div className="like-block position-relative d-flex align-items-center">
                <div className="d-flex align-items-center">
                  <div className="like-data">
                    <div className="d-flex align-items-start">
                      <LikeComponent 
                        likes={post.likes}
                        user={user}
                        handleLike={handleLike} 
                        handleUnlike={handleUnlike}
                      />
                    </div>
                  </div>
                  <div className="total-like-block ms-2 me-3">
                    <LikeModal likes={post.likes}/>
                  </div>
                  <div
                    className="total-comment-block"
                    onClick={() => {
                      console.log("comment");
                    }}
                  >
                    <span className="text-primary">{post.comments.length} Comments</span>
                  </div>
                </div>
              </div>
              {/* <ShareOffcanvas /> */}
              <SavePost isSaved={user.savedMediaPosts.includes(post._id)} handleSave={handleSave} handleUnsave={handleUnsave}/>
            </div>
            <hr />
            <ul className="post-comments list-inline p-0 m-0">
              {
                post.comments && post.comments.slice(0, commentNumber).map((comment, index) => {
                  if(!comment) console.log(post)
                  return (comment) && (
                    <Comment data={comment} key={index} user={user} postId={post._id} handleDeleteComment={handleDeleteComment}/>
                  )
                })
              }

              {/* {Array.from({ length: commentNumber }, (_, index) => (
              ))} */}
            </ul>
            {
              commentNumber < post.comments.length && (
                <div
                  className="mx-1  text-secondary"
                  style={{ cursor: "pointer" }}
                  onClick={handleMoreComments}
                >
                  View more comment
                </div>
              )
            }
            <form className="comment-text d-flex align-items-center mt-3" onSubmit={handleComment}>
              <input
                type="text"
                className="form-control rounded mx-2"
                placeholder="Enter Your Comment"
                value={comment}
                onChange={handleChange}
              />
              <Button variant="outline-primary" type="submit">
                Post
              </Button>
            </form>
          </div>
        </Card.Body>
      </Card>
      <ConfirmationPopup confirmationText="Are you sure you want to delete this post?" show={showPopup} handleSuccess={() => handleDelete(post._id)} handleCancel={() => setShowPopup(false)}/>
    </Col>
  );
}

export default Media;
