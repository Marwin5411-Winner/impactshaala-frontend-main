import { Card } from "react-bootstrap";

import user1 from "../../../../assets/images/user/1.jpg";

import small07 from "../../../../assets/images/small/07.png";
import small08 from "../../../../assets/images/small/08.png";
import small09 from "../../../../assets/images/small/09.png";

function CreatePost() {
  return (
    <Card id="post-modal-data">
      <div className="card-header d-flex justify-content-between">
        <div className="header-title">
          <h4 className="card-title">Create Post</h4>
        </div>
      </div>
      <Card.Body>
        <div className="d-flex align-items-center">
          <div className="user-img">
            <img
              loading="lazy"
              src={user1}
              alt="userimg"
              className="avatar-60 rounded-circle"
            />
          </div>
          <form className="post-text ms-3 w-100 ">
            <input
              type="text"
              className="form-control rounded"
              placeholder="Write something here..."
              style={{ border: "none" }}
            />
          </form>
        </div>
        <hr />
        <ul className=" post-opt-block d-flex list-inline m-0 p-0 flex-wrap">
          <li className="bg-soft-primary rounded p-2 pointer d-flex align-items-center me-3 mb-md-0 mb-2">
            <img
              loading="lazy"
              src={small07}
              alt="icon"
              className="img-fluid me-2"
            />{" "}
            Photo/Video
          </li>
          <li className="bg-soft-primary rounded p-2 pointer d-flex align-items-center me-3 mb-md-0 mb-2">
            <img
              loading="lazy"
              src={small08}
              alt="icon"
              className="img-fluid me-2"
            />{" "}
            Tag Friend
          </li>
          <li className="bg-soft-primary rounded p-2 pointer d-flex align-items-center me-3">
            <img
              loading="lazy"
              src={small09}
              alt="icon"
              className="img-fluid me-2"
            />{" "}
            Feeling/Activity
          </li>
        </ul>
      </Card.Body>
    </Card>
  );
}

export default CreatePost;
