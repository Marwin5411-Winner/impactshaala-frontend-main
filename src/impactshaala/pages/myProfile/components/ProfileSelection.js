import React, { useState } from "react";
import { Dropdown, ButtonGroup, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

// Sample list of keywords for My Offerings
const sampleKeywords = [
  "Consulting",
  "Mentorship",
  "Workshop",
  "Webinar",
  "Coaching",
  "Seminar",
];

const ProfileSectionDropdown = () => {
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  
  const handleKeywordChange = (e) => {
    const keyword = e.target.name;
    if (e.target.checked) {
      // Add the keyword if it's selected and under the limit of 5
      if (selectedKeywords.length < 5) {
        setSelectedKeywords([...selectedKeywords, keyword]);
      } else {
        alert("You can only select up to 5 keywords.");
        e.target.checked = false; // Uncheck if limit reached
      }
    } else {
      // Remove the keyword if unselected
      setSelectedKeywords(selectedKeywords.filter((kw) => kw !== keyword));
    }
  };

  return (
    <Card className="p-3" style={{ backgroundColor: "#e0e0e0" }}>
      {/* Dropdown Trigger */}
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle
          variant="link"
          className="text-decoration-none"
          style={{ color: "blue", fontWeight: "bold" }}
        >
          Add Profile Section
        </Dropdown.Toggle>

        {/* Dropdown Menu */}
        <Dropdown.Menu>
          <Dropdown.Item>Credibility Board</Dropdown.Item>

          {/* My Offerings Section */}
          <Dropdown.Item>
            My Offerings
            <div className="mt-2 px-3">
              <Form.Check
                type="checkbox"
                name="Consulting"
                label="Consulting"
                onChange={handleKeywordChange}
                disabled={
                  selectedKeywords.length >= 5 &&
                  !selectedKeywords.includes("Consulting")
                }
              />
              <Form.Check
                type="checkbox"
                name="Workshop"
                label="Workshop"
                onChange={handleKeywordChange}
                disabled={
                  selectedKeywords.length >= 5 &&
                  !selectedKeywords.includes("Workshop")
                }
              />
              <Form.Check
                type="checkbox"
                name="Mentorship"
                label="Mentorship"
                onChange={handleKeywordChange}
                disabled={
                  selectedKeywords.length >= 5 &&
                  !selectedKeywords.includes("Mentorship")
                }
              />
              <Form.Check
                type="checkbox"
                name="Webinar"
                label="Webinar"
                onChange={handleKeywordChange}
                disabled={
                  selectedKeywords.length >= 5 &&
                  !selectedKeywords.includes("Webinar")
                }
              />
            </div>
          </Dropdown.Item>

          {/* Other Dropdown Items */}
          <Dropdown.Item>My Reviews</Dropdown.Item>
          <Dropdown.Item>My Achievements</Dropdown.Item>
          <Dropdown.Item>Current Projects/Activities</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Card>
  );
};

export default ProfileSectionDropdown;
