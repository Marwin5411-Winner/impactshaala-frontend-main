import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  
  Form,
  Button,
  Image,

} from "react-bootstrap";

//img
import logo from "../../../assets/images/logo.png";
import organization from "../../../assets/images/organization-chart.png";
import individual from "../../../assets/images/user.png";
import { IoIosArrowBack } from "react-icons/io";
import { VscOrganization } from "react-icons/vsc";
import { IoPersonOutline } from "react-icons/io5";
// student icon from react icons

const Type = (props) => {
  // variables to collect data
  const [type, setType] = useState("");
  const [acitveOrg, setActiveOrg] = useState(false);
  const [activeInd, setActiveInd] = useState(false);

  // useEffect to set the type to global state when ever it changes
  useEffect(() => {
    props.setUserDetails({ ...props.userDetails, type: type });
  }, [type]);

  // useEffect to set the type to global state on first render the reason is that when we go back from next step to this step the type is not set to global state
  useEffect(() => {
    setType(props.userDetails.type);
    if (props.userDetails.type === "organization") {
      setActiveOrg(true);
      setActiveInd(false);
    } else if (props.userDetails.type === "individual") {
      setActiveOrg(false);
      setActiveInd(true);
    }
  }, []);

  return (
    <div md={6} className="h-100 h-sm-auto">
      <div className="text-center mt-lg-5 position-relative">
        <div className="m-5">
          <Image src={logo} className="img-fluid position-absolute" style={{ height: "50px", top: "0px", left: "0px" }} />
        </div>

        <Row style={{paddingTop: "100px"}}>
          <Col md="6" xs="6" className="">
            <div className="d-flex justify-content-start ">
              <span
                className="fs-2"
                onClick={() => {
                  props.previousStep();
                }}
                style={{ cursor: "pointer" }}
              >
                <IoIosArrowBack />
              </span>

              <h3 className="d-flex align-items-center mx-2 ">Sign up as</h3>
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
                border: acitveOrg?"1px solid #003049":"1px solid #ccc",
                height: "50px",
                position: "relative",
              }}
            >
							<Form.Check 
								type="radio"
                onChange={() => {
                  setActiveOrg(true);
                  setActiveInd(false);
                  setType("organization");
                }}
                checked={acitveOrg}
								// onChange={() => set_T_And_C(state => !state)}
								id="inline-radio-1"
                name="user-type-radio"
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
                  Organization
								</Form.Label>
            </Form.Group>
          </Col>
          <Col md={9}>
            <Form.Group
              className="form-group d-flex justify-content-start" 
              style={{
                gap: "10px",
                border: activeInd?"1px solid #003049":"1px solid #ccc",
                height: "50px",
                position: "relative",
              }}
            >
							<Form.Check 
								type="radio"
                onChange={() => {
                  setActiveInd(true);
                  setActiveOrg(false);
                  setType("individual");
                }}
                checked={activeInd}
								// onChange={() => set_T_And_C(state => !state)}
								id="inline-radio-2"
                name="user-type-radio"
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
                  Individual
								</Form.Label>
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-around my-5 pe-5">
          <Col md={9}>
            <Button
              onClick={() => {
                props.nextStep();
              }}
              disabled={!(activeInd || acitveOrg)}
              className="w-100 "
              style={{
                backgroundColor: !(activeInd || acitveOrg) ? "grey" : null,
                borderRadius: "100px",
              }}
              color="primary"
            >
              Next
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Type;
