import React, { useState } from "react";
import { Row, Col, Card, Tab, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const RecentPost = ({ userName, userType, feedbackContent }) => (
  <Card className="mb-4">
    <Card.Body>
      <h5><strong>{userName}</strong></h5>
      <p><strong>{userType}</strong></p>
      <p>{feedbackContent}</p>
    </Card.Body>
  </Card>
);

export default RecentPost;