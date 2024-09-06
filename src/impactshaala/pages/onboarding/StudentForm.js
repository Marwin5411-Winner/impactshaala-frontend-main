import React, { useRef, useState } from "react";
import { Row, Col, Form, Button, Image, InputGroup } from "react-bootstrap";

//img
import logo from "../../../assets/images/logo.png";
import { IoIosArrowBack } from "react-icons/io";
import user from "../../../assets/images/edit.png";
import { BsEye, BsEyeSlash, BsPerson } from "react-icons/bs";

const StudentInformation = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

	return (
    <div
      md={6}
      className="bg-white pb-lg-0 position-relative"
      style={{ height: "100%", overflowY: "auto", overflowX: "hidden", maxHeight: "100vh" }}
    >
      <div className="m-5">
        <Image src={logo} className="img-fluid position-absolute" style={{ height: "50px", top: "30px", left: "0px" }} />
      </div>
      <Row className="justify-content-start h-100" style={{paddingTop: "100px"}}>
        <Col md="8" xs="10" className="text-center h-100">
          <div className="d-flex">
            <span className="fs-2" onClick={props.previousStep}>
              <IoIosArrowBack />
            </span>
            <h2 className="font-weight-bold my-2 mx-2 d-flex align-items-center ">
              Student Information
            </h2>
          </div>
          <Form className="text-start ">
            <Row className="mt-3">
              <Col md={6}>
                <Form.Group className="form-group">
                  <Form.Label>
                    Enter Your Name<span style={{ color: "red" }}>*</span>{" "}
                  </Form.Label>
                  <Form.Control type="text" placeholder="Enter Your Name" />
                </Form.Group>
              </Col>
							<Col md={6}>
                <Form.Group className="form-group">
                  <Form.Label>
                    Educational Institution<span style={{ color: "red" }}>*</span>{" "}
                  </Form.Label>
                  <Form.Control type="text" placeholder="Educational Institution" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
							<Col md="6">
                <Form.Group>
                  <Form.Label>Education Level</Form.Label>
                  <Form.Select name="sector">
                    <option>Education Level</option>
                    {
                      ["Higher Secondary", "Graduate", "Post Graduate"].map((item, index) => (
                        <option key={index} value={index}>
                          {item}
                        </option>
                      ))
                    }
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="form-group">
                  <Form.Label>
                    Enter Your Email<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control type="text" placeholder="Enter Your Email" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="form-group">
                  <Form.Label>
                    Enter Password <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={isPasswordVisible ? "text" : "password"}
                      placeholder="Enter password"
                    />
                    <Button variant="secondary" onClick={handlePasswordVisibility}>
                      {isPasswordVisible ? <BsEyeSlash /> : <BsEye />}
                    </Button>
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="form-group">
                  <Form.Label>
                    Confirm Password <span style={{ color: "red" }}>*</span>
                  </Form.Label>

                  <Form.Control
                    type="password"
                    placeholder="Confirm password"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
          <Button className="w-100 mb-5">
            Signup
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default StudentInformation;