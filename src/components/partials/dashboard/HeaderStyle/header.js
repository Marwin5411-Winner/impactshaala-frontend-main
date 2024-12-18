import React, { useEffect, useState } from "react";
import { Dropdown, Nav, Form, Card, Container, Image } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../../assets/images/logo.png";

//image
import defaultUser from "../../../../assets/images/defaultUser.png";

//Componets
import CustomToggle from "../../../dropdowns";
import LogoutPopup from "../../../LogoutPopup";
import { getLocalStorage } from "../../../../utilities/localStorage";
import { getMyProfile } from "../../../../api/profile";
import { searchUserProfiles } from "../../../../api/search";

const Header = () => {
  const location = useLocation();
  const minisidebar = () => {
    document.getElementsByTagName("ASIDE")[0].classList.toggle("sidebar-mini");
  };

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const [show, setShow] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    profilePic: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleSearch = async () => {
    try {
      if (search.length > 1) {
        setResults([]);
        const response = await searchUserProfiles(search);
        const users = response.data.users;
        setResults(users);
        setShowDropdown(true); // Show the dropdown when results are available
        console.log(users); // Handle the user search results here
      }
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  const fetchUser = async () => {
    const localUser = getLocalStorage("user");
    if (localUser) {
      setUser(localUser);
      return;
    }

    try {
      const resp = await getMyProfile();
      setUser(resp.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Handle keyup or input change for live search
  const handleKeyUp = (e) => {
    const value = e.target.value;
    if (!value) {
      setShowDropdown(false);
    }

    setSearch(value);
    handleSearch(value); // Trigger search
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="iq-top-navbar px-md-5 pe-2">
      <Nav
        expand="lg"
        variant="light"
        className="nav navbar navbar-expand-lg navbar-light iq-navbar p-lg-0"
      >
        <Container fluid className="navbar-inner">
          <div className="d-flex align-items-center gap-3  pb-2 pb-lg-0">
            {location.pathname !== "/chats" && (
              <Link
                to="#"
                className="sidebar-toggle"
                data-toggle="sidebar"
                data-active="false"
                onClick={minisidebar}
              >
                <div className="icon material-symbols-outlined iq-burger-menu">
                  menu
                </div>
              </Link>
            )}
            <Link
              to="/dashboard"
              className="d-flex align-items-center gap-2 iq-header-logo"
            >
              <Image
                src={logo}
                className="img-fluid"
                alt="logo"
                style={{ height: "40px" }}
              />
            </Link>
          </div>

          <Dropdown show={showDropdown}>
            <Dropdown.Toggle
              as={Form.Control}
              value={search}
              onKeyUp={handleKeyUp}
              onChange={(e) => setSearch(e.target.value)} // Keep this for controlled input
              type="text"
              className="text search-input form-control d-none d-lg-block"
              placeholder="Search here..."
            />

            {/* Display search results in dropdown */}
            <Dropdown.Menu style={{ width: "500px" }}>
              {" "}
              {/* Adjust the width as needed */}
              {results.length === 0 && (
                <Dropdown.Item>No results found</Dropdown.Item>
              )}
              {results.map((user) => (
                <Dropdown.Item
                  as="a"
                  href={`/profile-details/${user._id}`}
                  key={user._id}
                >
                  {user.name} - {user.accountType}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <ul className="navbar-nav navbar-list">
            <Link
              to="/notifications"
              className="nav-item d-flex align-items-center"
            >
              <i className="material-symbols-outlined">notifications</i>
            </Link>
            <Dropdown as="li" className="nav-item">
              <Dropdown.Toggle
                href="#"
                as={CustomToggle}
                variant="d-flex align-items-center"
                onClick={() => navigate("/chats")}
              >
                <img
                  src={"/chat_bubble.svg"}
                  alt="Chat"
                  style={{
                    width: "20px",
                    height: "20px",
                    transform: "translateY(2px)",
                  }}
                />
                <span className="mobile-text d-none ms-3">Message</span>
              </Dropdown.Toggle>
            </Dropdown>

            <Nav.Item className="nav-item d-none d-lg-none">
              <Link
                to="#"
                className="dropdown-toggle d-flex align-items-center"
                id="mail-drop-1"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="material-symbols-outlined">mail</i>
                <span className="mobile-text  ms-3">Message</span>
              </Link>
            </Nav.Item>
            <Dropdown as="li" className="nav-item user-dropdown">
              <Dropdown.Toggle
                href="#"
                as={CustomToggle}
                variant="d-flex align-items-center"
              >
                <Image
                  src={user.profilePic ? user.profilePic : defaultUser}
                  className="img-fluid rounded-circle me-3"
                  alt="user"
                  loading="lazy"
                  style={{ objectFit: "cover", width: "40px", height: "40px" }}
                />
              </Dropdown.Toggle>
              <Dropdown.Menu className="sub-drop caption-menu">
                <Card className="shadow-none m-0">
                  <Card.Header>
                    <div className="header-title">
                      <h5 className="mb-0 ">Hello {user.name}</h5>
                    </div>
                  </Card.Header>
                  <Card.Body className="p-0 ">
                    <Link
                      to="/dashboard/app/profile"
                      className="d-flex align-items-center iq-sub-card border-0"
                    >
                      <span className="material-symbols-outlined">
                        line_style
                      </span>
                      <div className="ms-3 h6">My Profile</div>
                    </Link>
                    <Link
                      to="/dashboard/app/edit-profile"
                      className="d-flex align-items-center iq-sub-card border-0"
                    >
                      <span className="material-symbols-outlined">
                        edit_note
                      </span>
                      <div className="ms-3 h6">Edit Profile</div>
                    </Link>
                    <Link
                      to="/dashboard/app/user-account-setting"
                      className="d-flex align-items-center iq-sub-card border-0"
                    >
                      <span className="material-symbols-outlined">
                        manage_accounts
                      </span>
                      <div className="ms-3 h6">Account settings</div>
                    </Link>
                    <div
                      className="d-flex align-items-center iq-sub-card"
                      onClick={() => setShowLogoutPopup(true)}
                    >
                      <span className="material-symbols-outlined">login</span>
                      <div className="ms-3 h6">Sign out</div>
                    </div>
                  </Card.Body>
                </Card>
              </Dropdown.Menu>
            </Dropdown>
          </ul>
        </Container>
      </Nav>
      <LogoutPopup
        logout={handleLogout}
        cancel={() => setShowLogoutPopup(false)}
        show={showLogoutPopup}
      />
    </div>
  );
};

export default Header;
