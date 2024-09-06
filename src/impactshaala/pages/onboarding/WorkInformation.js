import React, { useEffect, useState } from "react";
import { Row, Col, Container, Form, Button, Image, Card } from "react-bootstrap";

// import 'swiper/components/navigation/navigation.scss';

//img
import logo from "../../../assets/images/logo.png";
import { IoIosArrowBack } from "react-icons/io";

// input import

const SignUp = (props) => {
  const [workDepartment, setWorkDepartment] = useState(
    props.userDetails.workDepartment || ""
  );
  const [workIndustry, setWorkIndustry] = useState(
    props.userDetails.workIndustry || ""
  );
  const [workProfession, setWorkProfession] = useState(
    props.userDetails.workProfession || ""
  );
  const [workExperience, setWorkExperience] = useState(
    props.userDetails.workExperience || ""
  );

  useEffect(() => {
    props.setUserDetails({
      ...props.userDetails,
      workDepartment,
      workIndustry,
      workProfession,
      workExperience,
    });
  }, [workDepartment, workIndustry, workProfession, workExperience]);

  return (
    <div md={6} className="bg-white pb-lg-0 position-relative">
      <div className="m-5">
        <Image src={logo} className="img-fluid position-absolute" style={{ height: "50px", top: "0px", left: "0px" }} />
      </div>
      <Row className="justify-content-start" style={{paddingTop: "100px"}}>
        <Col md="8" xs="10" className="text-center p-0">

          <div className="d-flex align-items-center">
            <span className="fs-2"  onClick={props.previousStep}>
                <IoIosArrowBack />
            </span>
            <h2 className="font-weight-bold mx-2 mt-1">Work Information</h2>
          </div>
          <div className="my-2 mx-2">
            
          <Form className="text-start">

          
            <Form.Group className="form-group">
              <Form.Label htmlFor="exampleFormControlSelect1" >
                Select your Work Department<span style={{color:"red"}}>*</span>
              </Form.Label>
             
              <select
                className={workDepartment ? "form-select" : "form-select text-secondary"}
                id="exampleFormControlSelect1"
                onChange={(e) => {
                  setWorkDepartment(e.target.value);
                }}
               
                value={props.userDetails.workDepartment || ""}
              >
                <option key="key" className="text-secondary">Select your Sector</option>
                <option>Governament Sector</option>
                <option>Private Sector</option>
                <option>Educational & Entertainment Venue</option>
              </select>
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label >Enter Your Industry <span style={{color:"red"}}>*</span></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Your Industry"
                onChange={(e) => {
                  setWorkIndustry(e.target.value);
                }}
                value={props.userDetails.workIndustry || ""}
              />
            </Form.Group>

            <Form.Group className="form-group">
              <Form.Label>Enter Your Profession<span style={{color:"red"}}>*</span> </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Your Profession"
                onChange={(e) => {
                  setWorkProfession(e.target.value);
                }}
                value={props.userDetails.workProfession || ""}
              />
            </Form.Group>

            <Form.Group className="form-group">
              <Form.Label htmlFor="exampleFormControlSelect1">
                Select Number of year of work experience<span style={{color:"red"}}>*</span>
              </Form.Label>
              <select
                className={workExperience ? "form-select" : "form-select text-secondary"}
                id="exampleFormControlSelect1"
                onChange={(e) => {
                  setWorkExperience(e.target.value);
                }}
                value={props.userDetails.workExperience || ""}
              >
                <option className="text-secondary">Select Number of year of work experience</option>
                <option>0-2</option>
                <option>3-5</option>
                <option>6-10</option>
                <option>10-15</option>
                <option>16-20</option>
                <option>20+</option>
              </select>
            </Form.Group>
          </Form>
          </div>
          <Button
            onClick={props.nextStep}
            disabled={
              !(
                workDepartment &&
                workIndustry &&
                workProfession &&
                workExperience
              )
            }
            color="primary"
            style={
              !(
                workDepartment &&
                workIndustry &&
                workProfession &&
                workExperience
              )
                ? { backgroundColor: "grey" }
                : null
            }
            className="w-100 m-2"
          >
            Next
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default SignUp;
