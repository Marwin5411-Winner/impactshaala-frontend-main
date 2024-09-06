import React, { useRef, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";

import { BsEye, BsEyeSlash, BsPerson } from "react-icons/bs";
import Delete from '../../../assets/images/delete.svg'

const AccountInformation = ({errors, data, handleChange}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if(!file) return
    setSelectedFile(file);
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      console.log(reader.result)
      handleChange({target: {
        name: "profilePic",
        value: reader.result,
      }})
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile("")
    handleChange({target: {
      name: "profilePic",
      value: ""
    }})
  }

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      className="bg-white pb-lg-0 position-relative"
      style={{overflowX: "hidden", height: "auto !important", maxHeight: "none"}}
    >
      <Row className="justify-content-center px-5" style={{height: "auto"}}>
        <Col md="12" xs="10" className="text-center">
          <div className="d-flex">
            <h4 className="text-primary">Personal Information</h4>
          </div>
          <Form className="text-start ">
            <Row>
              <div className="d-flex justify-content-center my-3">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <button 
                    type="button"
                    style={{
                      position: "absolute",
                      bottom: "20px", 
                      right: "20px",
                      width: "40px", 
                      height: "40px",
                      background: "white",
                      zIndex: "1",
                      padding: "5px",
                      borderRadius: "100px",
                      border: "1px solid #ccc",
                      outline: "none",
                    }}
                    onClick={handleRemoveImage}
                  >
                    <img src={Delete} alt="Delete p-4" />
                  </button>
                  <div
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      width: (selectedFile || data.profilePic)?"200px":"100px",
                      height:(selectedFile || data.profilePic)?"200px":"100px",
                      border: (selectedFile || data.profilePic)?"none":"2px solid #ccc",
                      borderRadius: "100px",
                      textAlign: "center",
                      cursor: "pointer",
                      padding: (selectedFile || data.profilePic)?"0px":"10px",
                    }}
                    className="upload-placeholder"
                    onClick={handleImageClick}
                  >
                    {selectedFile ? (
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        alt="Uploaded Preview"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "10px",

                        }}
                      />
                    ) : (data.profilePic) ? (
                      <img
                        src={data.profilePic}
                        alt="Uploaded Preview"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "10px",

                        }}
                      />
                    ):(
                      <div className="d-flex align-items-center justify-content-center">
                        <BsPerson 
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "",
                            borderRadius: "100px",
                            color: "#ccc"
                          }}
                        />
                      </div>
                    )}
                    <input
                      type="file"
                      id="fileInput"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                      ref={fileInputRef}
                      accept="image/*"
                    />
                  </div>
                  <div className="">
                    <h6 className="text-center mt-2">
                      Profile Picture (optional)
                    </h6>
                  </div>
                </div>
              </div>
              {/* <div className="d-flex" >
                <h6 className="text-center">Upload Profile Picture</h6>
              </div> */}
            </Row>
            <Row className="mt-3">
              <Col md={6}>
                <Form.Group className="form-group">
                  <Form.Label>
                    Enter Your Name<span style={{ color: "red" }}>*</span>{" "}
                  </Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Enter Your Name" 
                    value={data.name}
                    onChange={handleChange}
                    name="name"
                  />
                  <div>
                    <p className="text-danger">{errors.name}</p>
                  </div>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="form-group">
                  <Form.Label>
                    Enter Your Email<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Enter Your Email" 
                    value={data?.authId?.email}  
                    disabled
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="form-group">
                  <Form.Label>
                    Enter Your Tagline
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Your Tagline"
                    value={data.tagline}
                    onChange={handleChange}
                    name="tagline"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="form-group">
                  <Form.Label>
                    Enter Your Description
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Your Description"
                    value={data.description}
                    onChange={handleChange}
                    name="description"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default AccountInformation;