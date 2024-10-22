import React, { useState, useEffect } from 'react';
import { Col, Card, Modal, Button, ListGroup, Row, Dropdown, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { fetchCommunityMembers, removeCommunityMember, blockCommunityMember, highlightCommunityMember } from '../../../../api/Community'; // Import the API functions

const MyCommunitySection = () => {
  const [showModal, setShowModal] = useState(false);
  const [individualMembers, setIndividualMembers] = useState([]);
  const [organizationMembers, setOrganizationMembers] = useState([]);
  const getCommunityMembers = async () => {
    const { data, errRes } = await fetchCommunityMembers();

    if (errRes) {
      console.error("Error fetching community members:", errRes);
      return;
    }

    // Set the individuals and organizations separately in the state
    setIndividualMembers(data.data.individuals);
    setOrganizationMembers(data.data.organizations);
  };

  // Fetch community members when component mounts
  useEffect(() => {
   
    getCommunityMembers();
  }, []);

  const toggleModal = () => setShowModal(!showModal);

  return (
    <>
      <Col sm={6}>
        <Card className="p-3 d-flex flex-row align-items-center" style={{ backgroundColor: "#e0e0e0" }}>
          <strong className="me-3">My Community</strong>
          <Link to="#" className="text-primary" onClick={toggleModal}>
            {/* Display total count of community members */}
            {(individualMembers.length + organizationMembers.length) || 0} members
          </Link>
        </Card>
      </Col>

      <Modal show={showModal} onHide={toggleModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Community Members</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Render Individuals */}
          <h5>Individuals</h5>
          <ListGroup>
            {individualMembers.map(member => (
              <CommunityMember key={member._id} member={member} />
            ))}
          </ListGroup>

          {/* Render Organizations */}
          <h5 className="mt-4">Organizations</h5>
          <ListGroup>
            {organizationMembers.map(member => (
              <CommunityMember key={member._id} member={member} />
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const CommunityMember = ({ member }) => {
  const handleRemove = async () => {
    const { data, errRes } = await removeCommunityMember(member._id);
    if (errRes) {
      console.error("Error removing member:", errRes);
      return;
    }
    alert(`Removed ${member.name} from community.`);
  };

  const handleBlock = async () => {
    const { data, errRes } = await blockCommunityMember(member._id);
    if (errRes) {
      console.error("Error blocking member:", errRes);
      return;
    }
    alert(`Blocked ${member.name} from community.`);
  };

  const handleHighlight = async () => {
    const { data, errRes } = await highlightCommunityMember(member._id);
    if (errRes) {
      console.error("Error highlighting member:", errRes);
      return;
    }
    alert(`Highlighted ${member.name} in community.`);
  };

  return (
    <ListGroup.Item>
      <Row>
        <Col sm={8}>{member.name}</Col>
        <Col sm={4} className="text-end">
          <Dropdown as={ButtonGroup}>
            <Button variant="secondary">Actions</Button>
            <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic" />
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleRemove}>Remove from Community</Dropdown.Item>
              <Dropdown.Item onClick={handleBlock}>Block from Community</Dropdown.Item>
              <Dropdown.Item onClick={handleHighlight}>Highlight/Star in Community</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default MyCommunitySection;
