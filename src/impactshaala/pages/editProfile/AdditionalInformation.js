import React, { useRef, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";

import { BsEye, BsEyeSlash, BsPerson } from "react-icons/bs";
import Delete from '../../../assets/images/delete.svg'
import OrganizationFields from "./OrganizationFields";
import WorkingProfessionalFields from "./WorkingProfessionalFields";
import StudentFields from "./StudentFields";

const AdditionalInformation = ({errors, data, handleChange, userDetails}) => {
  return (
    <div
      className="bg-white pb-lg-0 position-relative"
      style={{overflowX: "hidden", height: "auto !important", maxHeight: "none", marginTop: "20px"}}
    >
      <Row className="justify-content-center px-5" style={{height: "auto"}}>
        <Col md="12" xs="10" className="text-center">
          <div className="d-flex">
            <h4 className="text-primary">Additional Information</h4>
          </div>
          <Form className="text-start mt-5">
            {userDetails.accountType === "ORGANIZATION" && <OrganizationFields errors={errors} data={data} handleChange={handleChange}/>}
            {userDetails.accountType === "INDIVIDUAL" && userDetails.userType1 === "Working Professional" && <WorkingProfessionalFields errors={errors} data={data} handleChange={handleChange}/>}
            {userDetails.accountType === "INDIVIDUAL" && userDetails.userType1 === "Student" && <StudentFields errors={errors} data={data} handleChange={handleChange}/>}
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default AdditionalInformation;