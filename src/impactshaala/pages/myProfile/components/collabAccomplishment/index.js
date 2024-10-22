import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, ListGroup, Image } from "react-bootstrap";
import AchievementView from "./view";
import AchievementForm from "./form";
import { getMyCollabAccomplishments } from "../../../../../api/accomplishments";

const AccomplishmentPageComponent = ({ profile }) => {
  const [achievements, setAchievements] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const fetchAchievements = async () => {
    try {
      const { data, errRes } = await getMyCollabAccomplishments();
      console.log(data);
      if (errRes) {
        console.error(errRes);
        return;
      }
      console.log(data);
      setAchievements(data.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, [profile]);

  return (
    <Container className="mt-5 main-section">
      {isFormVisible ? (
        <AchievementForm onCancel={() => setIsFormVisible(false)} />
      ) : (
        <AchievementView
          achievements={achievements}
          onAddNewAchievement={() => setIsFormVisible(true)}
        />
      )}
    </Container>
  );
};

export default AccomplishmentPageComponent;
