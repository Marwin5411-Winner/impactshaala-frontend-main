import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, ListGroup, Image } from "react-bootstrap";
import AchievementView from "./view";
import AchievementForm from "./form";
import { getMyAccomplishments } from "../../../../../api/accomplishments";

const MyAccomplishmentPageComponent = ({ profile }) => {
  const [achievements, setAchievements] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const fetchMyAchievements = async () => {
    try {
      const id = profile.authId._id;
    //   console.log(id);
      const { data, errRes } = await getMyAccomplishments(id);
    //   console.log(data);
      if (errRes) {
        console.error(errRes);
        return;
      }
    //   console.log(data.accomplishments);
      setAchievements(data.accomplishments);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (profile) {
    fetchMyAchievements();
    }
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

export default MyAccomplishmentPageComponent;
