import Card from '../../../components/Card';
import {Dropdown} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotificationCard = ({ data }) => {
  const { userId, message, type, createdAt, isRead } = data;

  // Format the notification type or any specific message if needed
  const notificationTypeText = () => {
    switch (type) {
      case 'FRIEND_REQUEST':
        return 'sent you a friend request';
      case 'MESSAGE':
        return 'sent you a message';
      case 'LIKE':
        return 'liked your post';
      case 'COMMENT':
        return 'commented on your post';
      default:
        return 'sent you a notification';
    }
  };

  return (
    <Card className={isRead ? "" : "bg-light"}>
      <Card.Body>
        <ul className="notification-list m-0 p-0">
          <li className="d-flex align-items-center justify-content-between">
            <div className="user-img img-fluid">
              <img
                src={userId?.profilePic || '/path/to/default/avatar.png'}
                alt="user-img"
                className="rounded-circle avatar-40"
              />
            </div>
            <div className="w-100">
              <div className="d-flex justify-content-between">
                <div className="ms-3">
                  <h6>{userId?.name} {notificationTypeText()}</h6>
                  <p className="mb-0">{message}</p>
                  <small className="text-muted">{new Date(createdAt).toLocaleDateString()}</small>
                </div>
                <div className="d-flex align-items-center">
                  <Link to="#" className="me-3 iq-notify bg-soft-success rounded">
                    <i className="material-symbols-outlined md-16">chat_bubble_outline</i>
                  </Link>
                  <div className="card-header-toolbar d-flex align-items-center">
                    <Dropdown>
                      <Dropdown.Toggle as="span" className="material-symbols-outlined">
                        more_horiz
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="dropdown-menu-right">
                        <Dropdown.Item as={Link} to="#">
                          <i className="ri-eye-fill me-2"></i>View
                        </Dropdown.Item>
                        <Dropdown.Item as={Link} to="#">
                          <i className="ri-delete-bin-6-fill me-2"></i>Delete
                        </Dropdown.Item>
                        <Dropdown.Item as={Link} to="#">
                          <i className="ri-pencil-fill me-2"></i>Edit
                        </Dropdown.Item>
                        <Dropdown.Item as={Link} to="#">
                          <i className="ri-printer-fill me-2"></i>Print
                        </Dropdown.Item>
                        <Dropdown.Item as={Link} to="#">
                          <i className="ri-file-download-fill me-2"></i>Download
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </Card.Body>
    </Card>
  );
};

export default NotificationCard;
