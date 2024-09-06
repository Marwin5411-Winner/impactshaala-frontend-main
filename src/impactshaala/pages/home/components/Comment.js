import user2 from "../../../../assets/images/user/02.jpg";
import { Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import LikeComponent from "./LikeComponent";
import { deleteMediaPostComment, likeMediaPostComment, unlikeMediaPostComment } from "../../../../api/mediaPost";
import defaultUser from '../../../../assets/images/defaultUser.png';

function Comment({data: comment, user, postId, handleDeleteComment}) {
  const [data, setData] = useState(comment)

  useEffect(() => {
    setData(comment)
  }, [comment])

  const handleLike = async () => {
    const resp = await likeMediaPostComment(postId, data._id);
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
      setData(state => ({
        ...state,
        likes: [...state.likes, user._id]
      }))
    }
  }

  const handleUnlike = async () => {
    const resp = await unlikeMediaPostComment(postId, comment._id);
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
      const index = data.likes.indexOf(user._id)
      setData(state => ({
        ...state, 
        likes: [...state.likes.slice(0, index), ...state.likes.slice(index + 1)]
      }))
    }
  }

  return (data) && data.writer && (
    <>
      <li className="mb-2 my-1">
        <Card className="border">
          <Card.Body>
            <div className="d-flex">
              <div className="user-img">
                <img
                  src={data.writer.profilePic?data.writer.profilePic:defaultUser}
                  alt="user1"
                  className="avatar-35 rounded-circle img-fluid"
                  style={{objectFit: "cover"}}
                />
              </div>
              <div className="comment-data-block ms-3">
                <h6>{data.writer.name}</h6>
                <p className="mb-0">{data.text}</p>
                {/* <div className="d-flex flex-wrap align-items-center comment-activity">
                  <div className="d-flex align-items-center">
                    <LikeComponent user={user} likes={data.likes} handleLike={handleLike} handleUnlike={handleUnlike}/>
                  </div>
                  <div className="mx-2">
                    <span className="d-flex align-items-center">{data.likes.length}</span>
                  </div>
                </div> */}
              </div>
              <div className="ms-auto">
                {
                  user._id === data.writer._id && (
                    <button className="bg-white border-none outline-none" style={{border: "none", outline: "none"}} onClick={() => handleDeleteComment(data._id)}>
                      <i className="ri-delete-bin-line h4"></i>
                    </button>
                  )
                }
              </div>
            </div>
          </Card.Body>
        </Card>
      </li>
    </>
  );
}

export default Comment;
