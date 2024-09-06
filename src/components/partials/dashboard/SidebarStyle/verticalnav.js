import React, { useState, useContext } from "react";

//router
import { Link, useLocation, useNavigate } from "react-router-dom";

//react-bootstrap
import {
  Accordion,
  Dropdown,
  Tooltip,
  OverlayTrigger,
  Button,
} from "react-bootstrap";

// function CustomToggle({ children, eventKey, onClick }) {
//   const { activeEventKey } = useContext(AccordionContext);

//   const decoratedOnClick = useAccordionButton(eventKey, (active) =>
//     onClick({ state: !active, eventKey: eventKey })
//   );

//   const isCurrentEventKey = activeEventKey === eventKey;

//   return (
//     <Link
//       to="#"
//       aria-expanded={isCurrentEventKey ? "true" : "false"}
//       className="nav-link"
//       role="button"
//       onClick={(e) => {
//         decoratedOnClick(isCurrentEventKey);
//       }}
//     >
//       {children}
//     </Link>
//   );
// }

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href="#"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    style={{ paddingRight: '0.1rem', textDecoration: 'none' }}
  >
    {children}
  </a>
));

const VerticalNav = React.memo(() => {
  let location = useLocation();
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Accordion as="ul" className="navbar-nav iq-main-menu" id="sidebar-menu">
        <li
          className={`${location.pathname === "" ? "active" : ""} nav-item `}
          style={{ cursor: "pointer", margin: "10px" }}
        >
          <Link
            className={`${location.pathname === "" ? "active" : ""} nav-link `}
            aria-current="page"
            to="/dashboard"
          >            
            <div className="btn-group">
              <Dropdown>
                <Dropdown.Toggle as={CustomToggle}>
                  <Button
                    variant="primary"
                    className="d-flex align-items-center rounded-sides nav-dropdown-btn"
                    style={{
                      margin: 0, // Set margin to 0
                      padding: '0.5rem', // Add padding for spacing around the text
                      borderTopLeftRadius: "30px",
                      borderBottomLeftRadius: "30px",
                      borderTopRightRadius: "30px",
                      borderBottomRightRadius: "30px",
                      fontWeight:"bold",
                      transitionDuration: "200ms",
                    }}
                  >
                    <i className="icon material-symbols-outlined">add</i>
                    <span className="mx-2 my-1">Create post</span>
                  </Button>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => navigate("/posts/create-media-post")}>
                        Media
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => navigate("/posts/create-projects-initiatives-post")}>
                        Projects & Initiatives
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => navigate("/posts/create-polls-questions-post")}>
                        Polls & Questions
                      </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              </div>           
          </Link>
        </li>

        <li
          className={`${location.pathname === "/dashboard" ? "active" : ""} nav-item `}
          style={{ cursor: "pointer", margin: "10px" }}
        >
          <Link
            className={`${location.pathname === "/dashboard" ? "active" : ""} nav-link `}
            aria-current="page"
            to="/dashboard"
          >
            <i className="icon material-symbols-outlined">home</i>
            <span className="item-name">Home</span>
          </Link>
        </li>
        <li
          className={`${location.pathname === "/" ? "" : ""} nav-item `}
          style={{ cursor: "pointer", margin: "10px" }}
        >
          <Link
            className={`${location.pathname === "/posts/saved" ? "active" : ""} nav-link `}
            aria-current="page"
            to="/posts/saved"
          >
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>Newsfeed</Tooltip>}
            >
              <>
                <i className="icon material-symbols-outlined">post</i>
              </>
            </OverlayTrigger>
            <span className="item-name">Saved Post</span>
          </Link>
        </li>
        <li
          className={`${location.pathname === "/collab/requests" ? "active" : ""} nav-item `}
          style={{ cursor: "pointer", margin: "10px" }}
        >
          <Link
            className={`${location.pathname === "/collab/requests" ? "active" : ""} nav-link `}
            aria-current="page"
            to="/collab/requests"
          >
            <i className="icon material-symbols-outlined">groups</i>
            <span className="item-name">Collaborations</span>
          </Link>
        </li>

        <li
          className={`${location.pathname === "/settings" ? "active" : ""} nav-item `}
          style={{ cursor: "pointer", margin: "10px" }}
        >
          <Link
            className={`${location.pathname === "/settings" ? "active" : ""} nav-link `}
            aria-current="page"
            to="/settings"
          >
            <i className="icon material-symbols-outlined">Settings</i>
            <span className="item-name">Settings</span>
          </Link>
        </li>
        <li>
          <hr className="hr-horizontal" />
        </li>
      </Accordion>
    </React.Fragment>
  );
});

export default VerticalNav;
