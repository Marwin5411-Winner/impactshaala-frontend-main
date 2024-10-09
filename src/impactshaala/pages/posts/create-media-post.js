import React, { useEffect, useState } from "react";
import { Col, Card, Container, Row, Form, Button } from "react-bootstrap";

import Header from "../../../components/partials/dashboard/HeaderStyle/header";
import Sidebar from "../../../components/partials/dashboard/SidebarStyle/sidebar";
import { useNavigate } from "react-router-dom";
import { createMediaPost, saveMediaPostDraft } from "../../../api/mediaPost";
import { ReactComponent as DeleteIcon } from "../../../assets/images/delete.svg";
import { getLocalStorage } from "../../../utilities/localStorage";

function CreateMediaPost() {
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [selectedLabel, setSelectedLabel] = useState("");
  const [errors, setErrors] = useState({
    description: "",
    misc: "",
  });
  const [mediaFiles, setMediaFiles] = useState([null]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const userData = getLocalStorage("user");
    if (userData) {
      setUser(userData);
    } else {
      console.error("No user data found in local storage");
    }
  }, []); // Dependency array is empty to run effect only once on mount

  const labelsForIndividual = [
    "Daily Inspiration",
    "Learnings",
    "Social Impact",
    "Achievement",
    "Interests & Passion",
    "Personal Branding & Goals",
    "Educational Tips & Resources",
    "Hobbies & Leisure Activities",
    "Others",
  ];

  const labelsForOrganization = [
    "Daily Inspiration",
    "Daily Work",
    "Initiatives & Campaigns",
    "Achievement",
    "Social Impact",
    "Educational Tips & Resources",
    "Employee Shoutout & Mentions",
    "Self Promotion & Advertising",
    "Others",
  ];

  const labels =
    user?.accountType === "Individual"
      ? labelsForIndividual
      : labelsForOrganization;

  const handleMediaChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      if (
        !file.type.includes("image") &&
        !file.type.includes("video")
      ) {
        window.alert("Only images and videos are allowed");
        return;
      }

      setErrors((state) => ({ ...state, misc: "" }));

      const updateStateWithFile = () => {
        const updatedMediaFiles = [...mediaFiles];
        updatedMediaFiles[index] = file;
        setMediaFiles([...updatedMediaFiles]);
      };

      if (file.type.includes("image")) {
        const maxSize = 1024 * 1024 * 2; // 2MB
        if (file.size > maxSize) {
          window.alert("Please select an image less than 2 MB");
          return;
        }
        updateStateWithFile();
      } else if (file.type.includes("video")) {
        const maxSize = 1024 * 1024 * 10; // 10MB
        if (file.size > maxSize) {
          window.alert("Please select a video less than 10 MB");
          return;
        }

        const video = document.createElement("video");
        video.preload = "metadata";

        video.onloadedmetadata = function () {
          window.URL.revokeObjectURL(video.src);
          const duration = video.duration;
          if (duration > 60) {
            window.alert("Video duration exceeds 1 minute");
            return;
          } else {
            // Proceed to set the video file
            updateStateWithFile();
          }
        };
        video.onerror = function () {
          window.alert("Failed to load video metadata");
        };
        video.src = URL.createObjectURL(file);
      }
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!description && mediaFiles.filter((file) => file != null).length === 0) {
      setErrors((state) => ({
        ...state,
        misc: "Please add a caption or select at least one media file",
      }));
      return;
    }
    const mediaList = mediaFiles.filter((file) => file != null);

    const promises = mediaList.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    });

    try {
      const mediaData = await Promise.all(promises);
      console.log(mediaData);
      const resp = await createMediaPost({
        images: mediaData,
        description,
        label: selectedLabel, // Include the selected label in the post payload
      });
      if (resp.errRes) {
        if (resp.errRes.response) {
          setErrors((state) => ({
            ...state,
            misc: resp.errRes.response.data.message,
          }));
          return;
        }
        console.log(resp);
        return;
      }
      if (resp.data.success) {
        navigate("/dashboard/success", {
          state: {
            prompt: resp.data.message,
            path: "/dashboard/app/profile#pills-friends-tab",
          },
        });
      }
    } catch (err) {
      if (err.errRes) {
        setErrors((state) => ({
          ...state,
          misc: err.errRes.response.data.message,
        }));
        return;
      }
      if (err.message) {
        setErrors((state) => ({ ...state, misc: err.message }));
        return;
      }
      console.log(err);
    }
  };

  const handleSaveDraft = async (e) => {
    e.preventDefault();
    const mediaList = mediaFiles.filter((file) => file != null);
    if (mediaList.length === 0 && !description) {
      setErrors((state) => ({
        ...state,
        misc: "Please add at least one media file or a caption to save as draft",
      }));
      return;
    }

    const promises = mediaList.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    });

    try {
      const mediaData = await Promise.all(promises);
      const resp = await saveMediaPostDraft({
        mediaData,
        description,
        label: selectedLabel,
      });
      if (resp.errRes) {
        if (resp.errRes.response) {
          setErrors((state) => ({
            ...state,
            misc: resp.errRes.response.data.message,
          }));
          return;
        }
        console.log(resp);
        return;
      }
      if (resp.data.success) {
        navigate("/dashboard/success", {
          state: {
            prompt: resp.data.message,
            path: "/dashboard/app/drafts",
          },
        });
      }
    } catch (err) {
      if (err.errRes) {
        setErrors((state) => ({
          ...state,
          misc: err.errRes.response.data.message,
        }));
        return;
      }
      if (err.message) {
        setErrors((state) => ({ ...state, misc: err.message }));
        return;
      }
      console.log(err);
    }
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    if (e.target.value.length > 100) return;
    if (e.target.value.split("\n").length > 9) {
      window.alert("Maximum of 10 lines is allowed");
      return;
    }
    if (e.target.value.trim().length !== e.target.value.length)
      setErrors((state) => ({
        ...state,
        description: "Please Remove Leading and Trailing Spaces.",
      }));
    if (e.target.value.trim().length === e.target.value.length)
      setErrors((state) => ({ ...state, description: "" }));
    setDescription(e.target.value);
  };

  const handleAddMedia = () => {
    setMediaFiles((state) => {
      if (state.length < 5) return [...state, null];
      window.alert("Maximum of 5 media files allowed");
      return state;
    });
  };

  const handleRemoveMedia = (index) => {
    if (mediaFiles.length <= 1) {
      window.alert("Cannot delete the last media file");
      return;
    }

    setMediaFiles((state) => {
      const tempState = [...state];
      console.log(tempState.splice(index, 1));
      return [...tempState];
    });
  };

  const handleLabelFilter = (e) => {
    setSelectedLabel(e.target.value);
    console.log(`Selected Label: ${e.target.value}`);
  };

  return (
    <div className="max-vw-100" style={{ overflow: "hidden" }}>
      <Header />
      <Sidebar />
      <div className="main-content">
        <Container fluid className="p-5">
          <Card style={{ minHeight: "80vh" }}>
            <Card.Header>
              <h3 className="">
                Create post /{" "}
                <span style={{ color: "#FCBF49" }}>
                  <small>Media</small>
                </span>
              </h3>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-center mt-5">
                <div className="w-100 ">
                  <Row>
                    <Col md="6">
                      <Form id="form-wizard3" className="text-start">
                        <fieldset>
                          <div className=" ">
                            <Row>
                              <Col md="6">
                                <Form.Label>Select your Post Label</Form.Label>
                                <Form.Select
                                  aria-label="Label"
                                  value={selectedLabel}
                                  onChange={handleLabelFilter}
                                >
                                  <option value="">
                                    Open this select menu
                                  </option>
                                  {labels.map((label, index) => (
                                    <option key={index} value={label}>
                                      {label}
                                    </option>
                                  ))}
                                </Form.Select>
                              </Col>
                            </Row>
                            <Row>
                              {mediaFiles.map((file, index) => (
                                <Col md="12" key={index} className="my-2">
                                  <Form.Label>
                                    Upload and preview Media
                                  </Form.Label>
                                  <div className="position-relative">
                                    <input
                                      type="file"
                                      value=""
                                      accept="image/*,video/*"
                                      id={`mediaInput-${index}`}
                                      className="position-absolute w-100 h-100 opacity-0"
                                      onChange={(e) => {
                                        console.log("index", index);
                                        handleMediaChange(e, index);
                                      }}
                                    />
                                  </div>

                                  {file ? (
                                    <div
                                      className="position-relative"
                                      style={{
                                        width: "100%",
                                        height: "300px",
                                      }}
                                    >
                                      {mediaFiles.length > 1 && (
                                        <div
                                          className="position-absolute h-100 d-flex flex-column justify-content-center"
                                          style={{ right: "-50px" }}
                                        >
                                          <button
                                            className="btn btn-danger rounded-circle"
                                            style={{
                                              width: "40px",
                                              height: "40px",
                                            }}
                                            onClick={() =>
                                              handleRemoveMedia(index)
                                            }
                                            type="button"
                                          >
                                            <DeleteIcon
                                              className="w-100 h-100"
                                              style={{ fill: "white" }}
                                            />
                                          </button>
                                        </div>
                                      )}
                                      {file.type.includes("image") ? (
                                        <img
                                          style={{
                                            width: "100%",
                                            height: "300px",
                                            objectFit: "contain",
                                          }}
                                          className="border border-primary rounded text-center cursor-pointer"
                                          src={URL.createObjectURL(file)}
                                          alt="Preview"
                                          onClick={() => {
                                            const fileInput =
                                              document.getElementById(
                                                `mediaInput-${index}`
                                              );
                                            fileInput.click();
                                          }}
                                        />
                                      ) : (
                                        <video
                                          style={{
                                            width: "100%",
                                            height: "300px",
                                            objectFit: "contain",
                                          }}
                                          className="border border-primary rounded text-center cursor-pointer"
                                          controls
                                          onClick={() => {
                                            const fileInput =
                                              document.getElementById(
                                                `mediaInput-${index}`
                                              );
                                            fileInput.click();
                                          }}
                                        >
                                          <source
                                            src={URL.createObjectURL(file)}
                                            type={file.type}
                                          />
                                          Your browser does not support the
                                          video tag.
                                        </video>
                                      )}
                                    </div>
                                  ) : (
                                    <div
                                      className=" d-flex justify-content-center align-items-center border border rounded p-3 text-center cursor-pointer"
                                      style={{
                                        width: "100%",
                                        height: "270px",
                                      }}
                                      onClick={() => {
                                        const fileInput =
                                          document.getElementById(
                                            `mediaInput-${index}`
                                          );
                                        fileInput.click();
                                      }}
                                    >
                                      <p className="">
                                        + Click here to upload image/video
                                      </p>
                                    </div>
                                  )}
                                </Col>
                              ))}
                              {mediaFiles.length < 5 && (
                                <Button
                                  className="mt-3 btn btn-primary"
                                  style={{ maxWidth: "100px" }}
                                  type="button"
                                  onClick={handleAddMedia}
                                >
                                  Add Media
                                </Button>
                              )}
                            </Row>
                            <Row className="mt-3">
                              <Col md="12" className="my-2 ">
                                <Form.Group className="form-group">
                                  <Form.Label>
                                    Provide a caption (optional)
                                  </Form.Label>
                                  <Form.Control
                                    as="textarea"
                                    placeholder="Provide caption for the post"
                                    style={{ minHeight: "31vh", width: "100%" }}
                                    value={description}
                                    onChange={handleChange}
                                  />
                                  {errors.description && (
                                    <p className="text-danger">
                                      {errors.description}
                                    </p>
                                  )}
                                </Form.Group>
                              </Col>
                            </Row>
                          </div>
                        </fieldset>
                        {errors.misc && (
                          <p className="text-danger">{errors.misc}</p>
                        )}
                        <div className="d-flex">
                          <button
                            className="mt-1 punchred-button me-2"
                            onClick={handleCreatePost}
                          >
                            Post Now
                          </button>
                          <button
                            className="mt-1 punchred-button"
                            onClick={handleSaveDraft}
                          >
                            Save as Draft
                          </button>
                        </div>
                      </Form>
                    </Col>
                  </Row>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
}

export default CreateMediaPost;
