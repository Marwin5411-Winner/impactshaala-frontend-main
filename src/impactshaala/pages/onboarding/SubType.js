import React, { useEffect, useState } from "react";
import { Row, Col, Button, Image, Form } from "react-bootstrap";

//img
import logo from "../../../assets/images/logo.png";

//back icon
import { IoIosArrowBack } from "react-icons/io";
import { PiStudentLight } from "react-icons/pi";
import { CiUser } from "react-icons/ci";


const Type = (props) => {
  const [SubType, setSubType] = useState("");
  const [activeStudent, setActiveStudent] = useState(false);
  const [activeWorking, setActiveWorking] = useState(false);

  useEffect(() => {
    props.setUserDetails({ ...props.userDetails, SubType: SubType });
  }, [SubType]);

  useEffect(() => {
    setSubType(props.userDetails.SubType);
    if (props.userDetails.SubType === "Student") {
      setActiveStudent(true);
      setActiveWorking(false);
    } else if (props.userDetails.SubType === "Working Professional") {
      setActiveStudent(false);
      setActiveWorking(true);
    }
  }, []);

  return (
    <div className="text-center position-relative">
      <div className="m-5">
        <Image src={logo} className="img-fluid position-absolute" style={{ height: "50px", top: "0px", left: "0px" }} />
      </div>

      <Row style={{paddingTop: "100px"}}>
        <Col md="6" xs="6" className="p-0">
          <div className="d-flex justify-content-start">
            <span
              className="fs-3 mx-2"
              onClick={() => {
                props.previousStep();
              }}
              style={{ cursor: "pointer" }}
            >
              <IoIosArrowBack />
            </span>

            <h3 className="d-flex align-items-center">Select role</h3>
          </div>
        </Col>

        <Col></Col>
      </Row>

      <Row className="justify-content-around my-5 pe-5" key="inline-radio">
      <Col md={9}>
            <Form.Group 
              className="form-group d-flex justify-content-start" 
              style={{
                gap: "10px",
                border: activeStudent?"1px solid #003049":"1px solid #ccc",
                height: "50px",
                position: "relative",
              }}
            >
							<Form.Check 
								type="radio"
                onChange={() => {
                  setSubType("Student");
                  setActiveStudent(true);
                  setActiveWorking(false);
                }}
                checked={activeStudent}
								// onChange={() => set_T_And_C(state => !state)}
								id="inline-radio-1"
                name="sub-type-radio"
                style={{
                  height: "100%",
                  transform: "translateX(20px) translateY(12px)"
                }}
              />
								<Form.Label 
                  for="inline-radio-1" 
                  style={{flexGrow: "1", width: "100%", height: "100%"}}
                  className="position-absolute text-center left-0 top-0 d-flex flex-column justify-content-center"
                >
                  Student
								</Form.Label>
            </Form.Group>
          </Col>
          <Col md={9}>
            <Form.Group
              className="form-group d-flex justify-content-start" 
              style={{
                gap: "10px",
                border: activeWorking?"1px solid #003049":"1px solid #ccc",
                height: "50px",
                position: "relative",
              }}
            >
							<Form.Check 
								type="radio"
                checked={activeWorking}
                onChange={() => {
                  setSubType("Working Professional");
                  setActiveWorking(true);
                  setActiveStudent(false);
                }}
								// onChange={() => set_T_And_C(state => !state)}
								id="inline-radio-2"
                name="sub-type-radio"
                style={{
                  height: "100%",
                  transform: "translateX(20px) translateY(12px)"
                }}
                />
								<Form.Label 
                  for="inline-radio-2" 
                  style={{flexGrow: "1", width: "100%", height: "100%"}}
                  className="position-absolute text-center left-0 top-0 d-flex flex-column justify-content-center"
                >
                  Working
								</Form.Label>
            </Form.Group>
          </Col>
      </Row>

      {/* <Row className="justify-content-around my-5 mt-lg-5 ">
        <Col md="6" xs="12" className="mb-5 mb-lg-0 mb-md-0">
          <div>
            <div
              className={
                activeStudent
                  ? "d-inline-block active border border-primary border-2"
                  : "d-inline-block  border border-gray border-2"
              }
            >
              <PiStudentLight
                size={100}
                onClick={() => {
                  setSubType("Student");
                  setActiveStudent(true);
                  setActiveWorking(false);
                }}
                className={activeStudent ? "text-primary m-4 p-4" : "m-4 p-4"}
              />
            </div>
            <p
              className={
                activeStudent ? " text-primary my-1 fs-5" : "my-1 fs-5"
              }
            >
              Student
            </p>
          </div>
        </Col>

        <Col md="6" xs="12" className="">
          <div>
            <div
              className={
                activeWorking
                  ? "d-inline-block active border border-primary border-2"
                  : "d-inline-block  border border-gray border-2"
              }
            >
              <CiUser
                size={100}
                onClick={() => {
                  setSubType("Working Professional");
                  setActiveWorking(true);
                  setActiveStudent(false);
                }}
                className={activeWorking ? "text-primary m-4 p-4" : "m-4 p-4"}
              />
            </div>
            <p
              className={
                activeWorking ? " text-primary my-1 fs-5" : "my-1 fs-5"
              }
            >
              Working Professional
            </p>
          </div>
        </Col>
      </Row> */}
      <Row className="justify-content-around my-5 pe-5">
        <Col md={9}>
          <Button
            onClick={props.nextStep}
            className="w-100"
            style={{
              backgroundColor: !(activeWorking || activeStudent) ? "grey" : null,
              borderRadius: "100px"
            }}
            color="primary"
            disabled={!(activeWorking || activeStudent)}
          >
            Next
          </Button>

        </Col>
      </Row>
    </div>
  );
};

export default Type;
