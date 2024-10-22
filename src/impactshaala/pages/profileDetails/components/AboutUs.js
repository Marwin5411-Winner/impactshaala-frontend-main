import React from 'react';
import { Row, Col } from 'react-bootstrap';

const AboutSection = ({ user }) => {
  return (
    <>
      {/* For Organizations */}
      {user.accountType === "ORGANIZATIONS" && (
        <>
          {/* Part A */}
          <Row className="mt-5 px-4">
            <Col sm={8}>
              <h3>{user.name || "User Name"}</h3>
              <div className="me-4">
                <strong>Stakeholder Type</strong>
                <p>{user.userType1 || "N/A"}</p>
              </div>
              {user.bio && (
                <div className="mb-2">
                  <strong>Bio</strong>
                  <p>{user.bio}</p>
                </div>
              )}
              {user.website && (
                <div className="me-4">
                  <strong>Website</strong>
                  <p>{user.website}</p>
                </div>
              )}
              {user.description && (
                <div className="mb-2">
                  <strong>User Description</strong>
                  <p>{user.description}</p>
                </div>
              )}
            </Col>
            {user.showCustomButton && (
              <Col sm={4} className="d-flex align-items-center justify-content-end">
                <button className="btn btn-primary">Edit Collaboration Preferences</button>
              </Col>
            )}
          </Row>

          
        </>
      )}

      {/* For Students */}
      {user.accountType === "INDIVIDUAL" && user.userType1 === "Student" && (
        <>
          {/* Part A */}
          <Row className="mt-5 px-4">
            <Col sm={8}>
              <h3>{user.name || "User Name"}</h3>
              <div className="me-4">
                <strong>Stakeholder Type</strong>
                <p>Student</p>
              </div>
              {user.bio && (
                <div className="mb-2">
                  <strong>Bio</strong>
                  <p>{user.bio}</p>
                </div>
              )}
              {user.website && (
                <div className="me-4">
                  <strong>Website</strong>
                  <p>{user.website}</p>
                </div>
              )}
              {user.description && (
                <div className="mb-2">
                  <strong>User Description</strong>
                  <p>{user.description}</p>
                </div>
              )}
            </Col>
            {user.showCustomButton && (
              <Col sm={4} className="d-flex align-items-center justify-content-end">
                <button className="btn btn-primary">Edit Collaboration Preferences</button>
              </Col>
            )}
          </Row>

          
        </>
      )}

      {/* For Working Professional/Entrepreneur/Educator */}
      {user.accountType === "INDIVIDUAL" && 
       (user.userType1 === "Working Professional" || 
        user.userType1 === "Entrepreneur" || 
        user.userType1 === "Educator") && (
        <>
          {/* Part A */}
          <Row className="mt-5 px-4">
            <Col sm={8}>
              <h3>{user.name || "User Name"}</h3>
              <div className="me-4">
                <strong>Stakeholder Type</strong>
                <p>{user.userType1 || "N/A"}</p>
              </div>
              {user.bio && (
                <div className="mb-2">
                  <strong>Bio</strong>
                  <p>{user.bio}</p>
                </div>
              )}
              {user.website && (
                <div className="me-4">
                  <strong>Website</strong>
                  <p>{user.website}</p>
                </div>
              )}
              {user.description && (
                <div className="mb-2">
                  <strong>User Description</strong>
                  <p>{user.description}</p>
                </div>
              )}
            </Col>
            {user.showCustomButton && (
              <Col sm={4} className="d-flex align-items-center justify-content-end">
                <button className="btn btn-primary">Edit Collaboration Preferences</button>
              </Col>
            )}
          </Row>

          
        </>
      )}
    </>
  );
};

export default AboutSection;
