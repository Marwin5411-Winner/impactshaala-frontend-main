import React from 'react';
import { Card, Dropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AcceptFriendRequestCard = ({ data, onAccept, onReject }) => {
  const { sender, createdAt, isRead } = data;
  console.log("incard", data);

  return (
    <Card className={`mb-3 ${isRead ? "" : "bg-light"}`}>
      <Card.Body className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <div className="user-img img-fluid me-3">
            <img
              src={sender?.profilePic || '/path/to/default/avatar.png'}
              alt="user-img"
              className="rounded-circle"
              style={{ width: '40px', height: '40px' }}
            />
          </div>
          <div>
            <h6 className="mb-1">{sender?.name} sent you a friend request</h6>
            <small className="text-muted">{new Date(createdAt).toLocaleDateString()}</small>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <Button
            variant="success"
            className="me-2"
            onClick={() => onAccept(data._id)}
          >
            Accept
          </Button>
          <Button
            variant="danger"
            className="me-2"
            onClick={() => onReject(data._id)}
          >
            Reject
          </Button>
          <Dropdown>
            <Dropdown.Toggle as="span" className="material-symbols-outlined" style={{ cursor: 'pointer' }}>
              more_horiz
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-right">
              <Dropdown.Item as={Link} to="#">
                <i className="ri-eye-fill me-2"></i>View Profile
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="#">
                <i className="ri-delete-bin-6-fill me-2"></i>Delete Request
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Card.Body>
    </Card>
  );
};

export default AcceptFriendRequestCard;
