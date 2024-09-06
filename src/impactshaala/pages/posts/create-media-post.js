import React, { useState } from "react";
import {
  Col,
  Card,
  Container,
  Row,
  Form,
  Button,
} from "react-bootstrap";

import Header from "../../../components/partials/dashboard/HeaderStyle/header";
import Sidebar from "../../../components/partials/dashboard/SidebarStyle/sidebar";
import { useNavigate } from "react-router-dom";
import { createMediaPost } from "../../../api/mediaPost";
import {ReactComponent as DeleteIcon} from '../../../assets/images/delete.svg';


function CreateMediaPost() {
    const navigate = useNavigate()
   
    const [description, setDescription] = useState("")
    const [errors, setErrors] = useState({
      description: "",
      misc: "",
    })
    const [images, setImages] = useState([null])

    const handleImageChange = (e, index) => {
      const file = e.target.files[0];
      if (file) {
        if(!file.type.includes("image")) {
          window.alert("Only images are allowed")
          return;
        }

        setErrors(state => ({...state, misc: ""}))
        if(file.size > 1024 * 500) {
          window.alert("Please select an image less than 500 KB")
          return;
        }
        const updatedImages = [...images]; 
        updatedImages[index] = file; 
        setImages([...updatedImages]);
      }
    };

    const handleCreatePost = async (e) => {
      e.preventDefault()
      const imageList = images.filter((image) => image != null)
      if(imageList.length === 0) {
        setErrors(state => ({...state, misc: "Please Select Atleast 1 Image"}))
        return
      }

      const promises = imageList.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
      })

      try {
        const images = await Promise.all(promises)
        console.log(images)
        const resp = await createMediaPost({
          images,
          description,
        })
        if(resp.errRes) {
          if(resp.errRes.response) {
            setErrors(state => ({...state, misc: resp.errRes.response.data.message}))
            return
          }
          console.log(resp)
          return
        }
        if(resp.data.success) {
          navigate("/dashboard/success", {
            state: {
              prompt: resp.data.message,
              path: "/dashboard/app/profile#pills-friends-tab"
            }
          })
        }
      } catch(err) {
        if(err.errRes) {
          setErrors(state => ({...state, misc: err.errRes.response.data.message}))
          return
        }
        if(err.message) {
          setErrors(state => ({...state, misc: err.message}))
          return
        }
        console.log(err)
      }
    }

    const handleChange = (e) => {
      console.log(e.target.value)
      if(e.target.value.length > 100) return
      if(e.target.value.split("\n").length > 9) {
        window.alert("Maximum of 10 lines is allowed")
        return;
      }
      if(e.target.value.trim().length !== e.target.value.length) setErrors(state => ({...state, description: "Please Remove Leading and Trailing Spaces."}))
      if(e.target.value.trim().length === e.target.value.length) setErrors(state => ({...state, description: ""}))
      setDescription(e.target.value)
    }

  const handleAddImage = () => {
    setImages(state => {
      if(state.length <= 4) return [...state, null]
      return state
    })
  }

  const handleRemoveImage = (index) => {
    if(images.length <= 1) {
      window.alert("Cannot delete the iamge")
      return;
    }

    setImages(state => {
      const tempState = [...state]
      console.log(tempState.splice(index, 1))
      return [...tempState]
    })
  }

  return (
    <div className="max-vw-100" style={{overflow: "hidden"}}>
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
                              {images.map((image, index) => (
                                <Col md="12" key={index} className="my-2">
                                  <Form.Label>Upload and preview Image</Form.Label>
                                  <div className="position-relative">
                                    <input
                                      type="file"
                                      value=""
                                      accept="image/*"
                                      id={`imageInput-${index}`}
                                      className="position-absolute w-100 h-100 opacity-0"
                                      onChange={(e) => {
                                        console.log("index", index);
                                        handleImageChange(e, index);
                                      }}
                                    />
                                  </div>

                                  {image ? (
                                    <div
                                      className="position-relative"
                                      style={{
                                        width: "100%",
                                        height: "300px",
                                      }}
                                    >
                                      {
                                        images.length > 1 && (
                                          <div className="position-absolute h-100 d-flex flex-column justify-content-center" style={{right: "-50px"}}>
                                            <button className="btn btn-danger rounded-circle" style={{width: "40px", height: "40px"}} onClick={() => handleRemoveImage(index)} type="button">
                                              <DeleteIcon className="w-100 h-100" style={{fill: "white"}}/>
                                            </button>
                                          </div>
                                        )
                                      }
                                      <img
                                        style={{
                                          width: "100%",
                                          height: "300px",
                                          objectFit: "contain",
                                        }}
                                        className="border border-primary rounded text-center cursor-pointer"
                                        src={URL.createObjectURL(image)}
                                        alt="Preview"
                                        onClick={() => {
                                          const fileInput =
                                            document.getElementById(
                                              `imageInput-${index}`
                                            );
                                          fileInput.click();
                                        }}
                                      />
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
                                            `imageInput-${index}`
                                          );
                                        fileInput.click();
                                      }}
                                    >
                                        <p className=""> 
                                         + Click here to upload image
                                        </p>
                                    </div>
                                  )}
                                </Col>
                              ))}
                              {
                                images.length < 5 && (
                                  <Button className="mt-3 btn btn-primary" style={{maxWidth: "100px"}} type="button" onClick={handleAddImage}>Add Image</Button>
                                )
                              }
                            </Row>
                            <Row className="mt-3">
                              <Col md="12" className="my-2 ">
                                <Form.Group className="form-group">
                                  <Form.Label>Provide a caption (optional)</Form.Label>
                                  <Form.Control
                                    as="textarea"
                                    placeholder="Provide caption for the post"
                                    style={{minHeight:"31vh", width: "100%"}}
                                    value={description}
                                    onChange={handleChange}
                                  />
                                  {
                                    errors.description && (
                                      <p className="text-danger">{errors.description}</p>
                                    )
                                  }
                                </Form.Group>
                              </Col>
                            </Row>
                          </div>
                        </fieldset>
                        {
                          errors.misc && (
                            <p className="text-danger">{errors.misc}</p>
                          )
                        }
                        <button className="mt-1 punchred-button" onClick={handleCreatePost}>
                          Post Now
                        </button>
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







