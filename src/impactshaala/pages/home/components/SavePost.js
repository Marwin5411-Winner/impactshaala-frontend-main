import { useState } from "react";
import "../../../../assets/vendor/remixicon/fonts/remixicon.css";

function SavePost({
  handleSave = () => {},
  handleUnsave = () => {},
  isSaved = false,
}) {
  return (
    <>
      {isSaved ? (
        <i
          className="ri-bookmark-fill text-primary fs-3"
          onClick={handleUnsave}
        ></i>
      ) : (
        <i class="ri-bookmark-line text-secondary fs-3" onClick={handleSave}></i>
      )}
    </>
  );
}

export default SavePost;
