import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, ListGroup, Image } from 'react-bootstrap';
import Header from '../../../components/partials/dashboard/HeaderStyle/header';
import Sidebar from '../../../components/partials/dashboard/SidebarStyle/sidebar';
import { useNavigate } from 'react-router-dom';
//Change API
import { getMyAccomplishments } from '../../../api/accomplishments';

const CollabAccomplishmentPage = () => {

    // TODO : Change thecontent Below
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
      console.log(data.data)
      setAchievements(data.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchMyAchievements();
  }, []);

  // Add new achievement function
  const addNewAchievement = () => {
    navigate('/accomplishment/add');
  };

  return (
    <div>
      <Header />
      <Sidebar />
      <Container className="mt-5 main-section">
        <Row className="justify-content-between align-items-center">
          <Col xs={9}>
            <h2>My Achievements</h2>
          </Col>
          <Col xs={3} className="text-end">
            <Button variant="link" onClick={addNewAchievement}>
              <i className="bi bi-plus-circle"></i> Add new achievement
            </Button>
          </Col>
        </Row>

        {/* Achievement List */}
        <ListGroup className="mt-4">
          {achievements.length > 0 ? (
            achievements.map((achievement) => (
              <ListGroup.Item key={achievement._id} className="d-flex align-items-center">
                <Image
                  src={achievement.images[0]} // Assuming images[0] contains the first image
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
      </Container>
    </div>
  );
};

export default CollabAccomplishmentPage;
