import { useState } from "react";
import user2 from "../../../../assets/images/user/02.jpg";
import { Card } from "react-bootstrap";

function Answer() {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <li className="mb-2 my-3">
      <Card className="border">
        <Card.Body>
          <div className="d-flex">
            <div className="user-img">
              <img
                src={user2}
                alt="user1"
                className="avatar-35 rounded-circle img-fluid"
              />
            </div>
            <div className="comment-data-block ms-3">
              <h6>Monty Carlo</h6>
              <p className="mb-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus
                faucibus mollis pharetra. Proin blandit ac massa sed rhoncus ?
              </p>
              <div className="d-flex flex-wrap align-items-center comment-activity">
                <i
                  className={
                    clicked
                      ? "material-symbols-outlined text-primary"
                      : "material-symbols-outlined"
                  }
                  style={{ cursor: "pointer" }}
                  onClick={handleClick}
                >
                  thumb_up
                </i>
                <span className="mx-1"> 5 </span>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </li>
  );
}

export default Answer;
