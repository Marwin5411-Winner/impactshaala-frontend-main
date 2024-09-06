import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, Image } from "react-bootstrap";

//img
import logo from "../../../assets/images/logo.png";
import { IoIosArrowBack } from "react-icons/io";
import data from '../../../utilities/userType';

const UserType = ({sectorDetails, nextStep, previousStep, setUserDetails}) => {
  const [selectedIndex, setSelectedIndex] = useState({
    sector: sectorDetails?.sector?sectorDetails.sector:"",
    type: sectorDetails?.type?sectorDetails.type:"",
    subtype: sectorDetails?.subtype?sectorDetails.subtype:"",
  })

  const handleChange = (e) => {
    if(e.target.name === "sector") {
      setSelectedIndex({sector: e.target.value, type: "", subtype: ""})
      return
    }
    if(e.target.name === "type") {
      setSelectedIndex(state => ({...state, type: e.target.value, subtype: ""}))
      return
    }
    if(e.target.name === "subtype") {
      setSelectedIndex(state => ({...state, subtype: e.target.value}))
      return 
    }
  }

  const handleSubmit = () => {
    console.log(typeof selectedIndex.sector)

    if(selectedIndex.sector && selectedIndex.type && selectedIndex.subtype) {
      setUserDetails(state => ({...state, sectorDetails: {...selectedIndex}}))
      nextStep()
    }
    else window.alert("Please Select All Sector Related Details");
  }

  return (
    <div className="position-relative">
      <div className="m-5">
        <Image src={logo} className="img-fluid position-absolute" style={{ height: "50px", top: "30px", left: "0px" }} />
      </div>
      <Row className="justify-content-start" style={{paddingTop: "100px"}}>
         <Col md="8" xs="10" className="text-center">
           <div className="d-flex">
             <span className="fs-2" onClick={previousStep}>
               <IoIosArrowBack />
             </span>
             <h2 className="font-weight-bold my-2 mx-2 d-flex align-items-center">
               User Type Information
             </h2>
           </div>
           <Form className="text-start mt-5 mb-5">
            <Row className="d-flex flex-column justify-content-start" style={{gap: "20px"}}>
              <Col md="12">
                <Form.Group>
                  <Form.Label>Select Your Sector</Form.Label>
                  <Form.Select onChange={handleChange} name="sector">
                    <option>Select Sector</option>
                    {
                      data && Array.isArray(data) && data.map((department, index) => (
                        <option key={index} value={index}>
                          {department.name}
                        </option>
                      ))
                    }
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md="12">
                <Form.Group>
                  <Form.Label>Select Your Organization Type</Form.Label>
                  <Form.Select onChange={handleChange} name="type" disabled={!selectedIndex.sector}>
                    <option value="">Select Organization Type</option>
                    {
                      data && selectedIndex.sector && data[selectedIndex.sector] && data[selectedIndex.sector].type.map((type, index) => (
                        <option key={index} value={index}>
                          {type.name}
                        </option>
                      ))
                    }
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md="12">
                <Form.Group>
                  <Form.Label>Select Your Organization Subtype</Form.Label>
                  <Form.Select onChange={handleChange} name="subtype" disabled={!selectedIndex.type}>
                    <option value="">Select Organization Subtype</option>
                    {
                      data && 
                      selectedIndex.sector &&
                      selectedIndex.type &&
                      data[selectedIndex.sector].type[selectedIndex.type].subtype.map((subtype, index) => (
                        <option key={index} value={index}>
                          {subtype}
                        </option>
                      ))
                    }
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
           </Form>
           <Button onClick={handleSubmit} className="w-100">
             Next
           </Button>
         </Col>
       </Row>
    </div>
  )
}

export default UserType;