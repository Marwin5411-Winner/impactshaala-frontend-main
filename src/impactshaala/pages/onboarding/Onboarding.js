import React from "react";
import { Row, Col, Button, Image } from "react-bootstrap";

import logo from "../../../assets/images/logo.png";
import { Link } from "react-router-dom";

const SignUp = (props) => {
  return (
    <div
      md={12}
      className="bg-white vh-100 pb-lg-0  d-flex justify-content-start ps-4"
      >
      <Row className=" d-flex  align-items-center mx-4 m-lg-0 position-relative">
        <Image
          src={logo}
          className="img-fluid mb-lg-3 mb-md-0 mb-sm-0 position-absolute"
          style={{ 
            height: "50px",
            width: "auto",
            top: "30px",
            left: "0px"
          }}
        />
        <Col className="d-flex flex-column" style={{gap: "30px", marginBottom: "50px"}}>
          <h2 className="font-weight-bold text-start" style={{color: "#F77F00", fontWeight: "bold"}}>
            Welcome to ImpactShaala
          </h2>
          <p className="text-start" style={{color: "#003049", fontWeight: "bold"}}>
            Where every connection is a step towards a brighter educational future.
          </p>
          <Button
            onClick={() => {
              props.nextStep();
            }}
            className=""
            style={{
              width: "150px",
              borderRadius: "100px",
              fontWeight: "bold",
            }}
          >
            {" "}
            Sign Up
          </Button>
        </Col>
        <div
          className="position-absolute"
          style={{
            bottom: "30px",
            left: "0px"
          }}
        >
          Already a member?{" "}
          <Link to="/login" 
            style={{
              color: "#D62828", 
              fontWeight: "700",
              textShadow: "0px 0px 1px #D62828"
            }}
          >
            Log In
          </Link>
        </div>
      </Row>

    </div>
  );
};

export default SignUp;
