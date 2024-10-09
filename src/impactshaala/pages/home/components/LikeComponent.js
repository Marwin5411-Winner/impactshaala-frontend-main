import React from 'react';
import { Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import icon1 from "../../../../assets/images/icon/01.png";
import icon2 from "../../../../assets/images/icon/02.png";
import icon3 from "../../../../assets/images/icon/03.png";
import icon4 from "../../../../assets/images/icon/04.png";
import icon5 from "../../../../assets/images/icon/05.png";
import icon6 from "../../../../assets/images/icon/06.png";
import icon7 from "../../../../assets/images/icon/07.png";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <span
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    style={{ cursor: 'pointer' }}
  >
    {children}
  </span>
));

function LikeComponent({ likes = [], user, handleLike }) {
  const reactions = [
    { type: 'Like', icon: icon1, tooltip: 'Like' },
    { type: 'Love', icon: icon2, tooltip: 'Love' },
    { type: 'Happy', icon: icon3, tooltip: 'Happy' },
    { type: 'HaHa', icon: icon4, tooltip: 'HaHa' },
    { type: 'Think', icon: icon5, tooltip: 'Think' },
    { type: 'Sad', icon: icon6, tooltip: 'Sad' },
    { type: 'Lovely', icon: icon7, tooltip: 'Lovely' },
  ];

  console.log(likes)
  // Get the current user's reaction
  const userReactionObj = likes.find((like) => like.user === user._id);
  const userReaction = userReactionObj ? userReactionObj.type : null;

  const handleReaction = (reactionType) => {
    handleLike(reactionType);
  };

  const totalReactions = likes.length;

  return (
    user && (
      <div className="like-block position-relative d-flex align-items-center">
        <div className="d-flex align-items-center">
          <div className="like-data">
            <Dropdown>
              <Dropdown.Toggle as={CustomToggle}>
                {userReaction ? (
                  <img
                    src={reactions.find((r) => r.type === userReaction).icon}
                    className="img-fluid"
                    alt={userReaction}
                  />
                ) : (
                  <img src={icon1} className="img-fluid" alt="Like" />
                )}
              </Dropdown.Toggle>
              <Dropdown.Menu className="py-2">
                {reactions.map((reaction) => (
                  <OverlayTrigger
                    key={reaction.type}
                    placement="top"
                    overlay={<Tooltip>{reaction.tooltip}</Tooltip>}
                  >
                    <img
                      loading="lazy"
                      src={reaction.icon}
                      className="img-fluid me-2"
                      alt={reaction.type}
                      onClick={() => handleReaction(reaction.type)}
                      style={{ cursor: 'pointer' }}
                    />
                  </OverlayTrigger>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="total-like-block ms-2 me-3">
            <Dropdown>
              <Dropdown.Toggle as={CustomToggle} id="post-option">
                {totalReactions} Likes
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {likes.map((like, index) => (
                  <Dropdown.Item key={index}>
                    {like.userName} reacted with {like.reaction}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        {/* Add comments section if needed */}
      </div>
    )
  );
}

export default LikeComponent;
