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
    <Dropdown as={ButtonGroup}>
      <Card className="p-3" style={{ backgroundColor: "#e0e0e0" }}>
        <Dropdown.Toggle
          as={Link}
          to="#"
          className="btn btn-link"
          style={{ color: "blue", fontWeight: "bold" }}
        >
          Add profile section
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item>Credibility Board</Dropdown.Item>
          {/* Nested Dropdown for My Offerings */}
          <Dropdown as={ButtonGroup} drop="end">
            <Dropdown.Toggle className="dropdown-item">
              My Offerings
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {/* Nested Options for My Offerings */}
              <Dropdown.Item>
                Collaborate For
                <Dropdown.Menu>
                  <Form.Check 
                    type="checkbox" 
                    name="Consulting" 
                    label="Consulting" 
                    onChange={handleKeywordChange} 
                    disabled={selectedKeywords.length >= 5 && !selectedKeywords.includes("Consulting")} 
                  />
                  <Form.Check 
                    type="checkbox" 
                    name="Workshop" 
                    label="Workshop" 
                    onChange={handleKeywordChange} 
                    disabled={selectedKeywords.length >= 5 && !selectedKeywords.includes("Workshop")} 
                  />
                </Dropdown.Menu>
              </Dropdown.Item>
              <Dropdown.Item>
                Book Your Slot
                <Dropdown.Menu>
                  <Form.Check 
                    type="checkbox" 
                    name="Mentorship" 
                    label="Mentorship" 
                    onChange={handleKeywordChange} 
                    disabled={selectedKeywords.length >= 5 && !selectedKeywords.includes("Mentorship")} 
                  />
                  <Form.Check 
                    type="checkbox" 
                    name="Webinar" 
                    label="Webinar" 
                    onChange={handleKeywordChange} 
                    disabled={selectedKeywords.length >= 5 && !selectedKeywords.includes("Webinar")} 
                  />
                </Dropdown.Menu>
              </Dropdown.Item>
              <Dropdown.Item>
                Request Services
                <Dropdown.Menu>
                  <Form.Check 
                    type="checkbox" 
                    name="Coaching" 
                    label="Coaching" 
                    onChange={handleKeywordChange} 
                    disabled={selectedKeywords.length >= 5 && !selectedKeywords.includes("Coaching")} 
                  />
                  <Form.Check 
                    type="checkbox" 
                    name="Seminar" 
                    label="Seminar" 
                    onChange={handleKeywordChange} 
                    disabled={selectedKeywords.length >= 5 && !selectedKeywords.includes("Seminar")} 
                  />
                </Dropdown.Menu>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown.Item>My Reviews</Dropdown.Item>
          <Dropdown.Item>My Achievements</Dropdown.Item>
          <Dropdown.Item>Current Projects/Activities</Dropdown.Item>
        </Dropdown.Menu>
      </Card>
    </Dropdown>
  );
};

export default ProfileSectionDropdown;
