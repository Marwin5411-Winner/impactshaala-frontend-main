import React, { useState } from "react";
import { Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { IoIosArrowBack } from "react-icons/io";
import { BsGeoAlt } from "react-icons/bs";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

const ContactInformation = ({data, handleChange, collabKeywords, errors}) => {
  return (
    <div md={6} className="bg-white pb-lg-0 position-relative" style={{marginTop: "20px"}}>
      <Row className="justify-content-center px-5">
        <Col md="12" xs="10" className="text-center">
          <div className="d-flex my-2">
            <h4 className="text-primary">Contact Information</h4>
          </div>
          <Form className="text-start mt-5">
            <Row>
              <Col md={6}>
                <Form.Group className="form-group">
                  <Form.Label>Website</Form.Label>
                  <Form.Control 
                    type="website" 
                    placeholder="Enter Your Website" 
                    value={data.website}  
                    onChange={handleChange}
                    name="website"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="form-group">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control 
                    type="number"
                    placeholder="Enter Your Contact Number" 
                    value={data.contactNo}
                    name="contactNo"
                    onChange={handleChange}
                  />
                  <div>
                    <p className="text-danger">{errors.contactNo}</p>
                  </div>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Group className="form-group">
                  <Form.Label>
                    Enter Communication Email{" "} (For Communication purposes only)
                  </Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="Enter Your Communication Email" 
                    value={data.comEmail}  
                    onChange={handleChange}
                    name="comEmail"
                  />
                  <div>
                    <p className="text-danger">{errors.comEmail}</p>
                  </div>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Group className="form-group">
                  <Form.Label className="d-flex flex-row justify-content-start" style={{gap: "10px"}}>
                    <div>Address</div>
                    <div>
                      <OverlayTrigger
                        placement="right"
                        overlay={<Tooltip>Use Current Location</Tooltip>}
                      >
                        <button style={{border: "none", background: "transparent"}}>
                          <BsGeoAlt style={{width: "20px", height: "20px"}}/>                
                        </button>
                      </OverlayTrigger>
                    </div>
                  </Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={2} 
                    placeholder="Enter your local address"
                    value={data.address}  
                    onChange={handleChange}
                    name="address"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="form-group">
                  <Form.Label className="d-flex flex-row justify-content-start" style={{gap: "10px"}}>
                    <div>
                      City
                    </div>
                  </Form.Label>
                  <Form.Control 
                    type="text"
                    placeholder="Enter your city"
                    value={data.city}
                    onChange={handleChange}
                    name="city"
                  />
                  <div>
                    <p className="text-danger">{errors.city}</p>
                  </div>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="form-group">
                  <Form.Label className="d-flex flex-row justify-content-start" style={{gap: "10px"}}>
                    <div>
                      District
                    </div>
                  </Form.Label>
                  <Form.Control 
                    type="text"
                    placeholder="Enter your district"
                    value={data.district}
                    onChange={handleChange}
                    name="district"
                  />
                  <div>
                    <p className="text-danger">{errors.district}</p>
                  </div>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="form-group">
                  <Form.Label className="d-flex flex-row justify-content-start" style={{gap: "10px"}}>
                    <div>
                      State
                    </div>
                  </Form.Label>
                  <Form.Control 
                    type="text"
                    placeholder="Enter your state"
                    value={data.state}  
                    onChange={handleChange}
                    name="state"
                  />
                  <div>
                    <p className="text-danger">{errors.state}</p>
                  </div>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="form-group">
                  <Form.Label className="d-flex flex-row justify-content-start" style={{gap: "10px"}}>
                    <div>
                      Country
                    </div>
                  </Form.Label>
                  <Form.Control 
                    type="text"
                    placeholder="Enter your country"
                    value={data.country}
                    onChange={handleChange}
                    name="country"
                  />
                  <div>
                    <p className="text-danger">{errors.country}</p>
                  </div>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default ContactInformation;
