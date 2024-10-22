import React from 'react';
import { Row, Col, Button, ListGroup, Image } from 'react-bootstrap';

const AchievementView = ({ achievements, onAddNewAchievement }) => {
  return (
    <>
      <Row className="justify-content-between align-items-center">
        <Col xs={9}>
          <h2>Collab Achievements</h2>
        </Col>
        {/* <Col xs={3} className="text-end">
          <Button variant="link" onClick={onAddNewAchievement}>
            <i className="bi bi-plus-circle"></i> Add new achievement
          </Button>
        </Col> */}
      </Row>

      {/* Achievement List */}
      <ListGroup className="mt-4">
        {achievements.length > 0 ? (
          achievements.map((achievement) => (
            <ListGroup.Item key={achievement._id} className="d-flex align-items-center">
              <Image
                src={achievement?.images[0]} // Assuming images[0] contains the first image
                roundedCircle
                className="me-3"
                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
              />
              <span>{achievement.projectTitle}</span>
            </ListGroup.Item>
          ))
        ) : (
          <p>No accomplishments available</p>
        )}
      </ListGroup>
    </>
  );
};

export default AchievementView;
