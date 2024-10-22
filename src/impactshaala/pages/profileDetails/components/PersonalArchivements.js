import React, { useState, useEffect } from "react";
import { Row, Col, Container, Card, Image } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { getMyAccomplishments } from "../../../../api/accomplishments";
import { useNavigate } from "react-router-dom";

// Component for rendering a single accomplishment block
const PersonalAchievementsBlock = ({ projectTitle, image }) => (
  <Col sm={4} className="mb-4">
    <Card>
      <Card.Body className="d-flex align-items-center">
        <Image
          src={image}
          roundedCircle
          className="me-3"
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
        <div>
          <Card.Title>
            <strong>{projectTitle}</strong>
          </Card.Title>
        </div>
      </Card.Body>
    </Card>
  </Col>
);

const PersonalArchivementComp = () => {
  const [achievements, setAchievements] = useState([]);
  const navigate = useNavigate();

  const fetchMyAchievements = async () => {
    try {
      const { data, errRes } = await getMyAccomplishments();

      if (errRes) {
        console.error(errRes);
        return;
      }

      // Assuming 'data' is the array of accomplishments
      console.log(data.data);
      setAchievements(data.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchMyAchievements();
  }, []);

  return (
    <Container fluid className="px-5">
      {/* Achievements Grid */}
      <Row>
        {achievements.length > 0 ? (
          achievements.map((achievement, index) => (
            <PersonalAchievementsBlock
              key={achievement._id || index} // Use _id if available, fallback to index
              projectTitle={achievement.projectTitle} // Use projectTitle from fetched data
              image={
                achievement.images.length > 0
                  ? achievement.images[0]
                  : "https://via.placeholder.com/50"
              } // Check if there are images, otherwise provide a placeholder
            />
          ))
        ) : (
          <p>No accomplishments available</p>
        )}
      </Row>
    </Container>
  );
};

export default PersonalArchivementComp;
