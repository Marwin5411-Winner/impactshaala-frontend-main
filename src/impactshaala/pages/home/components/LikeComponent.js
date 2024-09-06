import { useState, useEffect } from "react";
import "../../../../assets/vendor/remixicon/fonts/remixicon.css";

function LikeComponent({likes = [], user, handleLike, handleUnlike}) {
  
  return (user) && (
    <>
      {likes.includes(user._id)? (
        <i
          className="ri-thumb-up-fill text-primary fs-3"
          onClick={handleUnlike}
          style={{ cursor: "pointer" }}
        ></i>
      ) : (
        <i
          class="ri-thumb-up-line fs-3 text-secondary"
          onClick={handleLike}
          style={{ cursor: "pointer" }}
        ></i>
      )}
    </>
  );
}

export default LikeComponent;
