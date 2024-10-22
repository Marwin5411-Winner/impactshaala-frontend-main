import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Nav,
  Tab,
  Dropdown,
  ButtonGroup,
  Modal,
  Button,
} from "react-bootstrap";
import Card from "../../../components/Card";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  BsFacebook,
  BsLinkedin,
  BsInstagram,
  BsTwitterX,
  BsYoutube,
} from "react-icons/bs";
import { useParams } from "react-router-dom";
import defaultUser from "../../../assets/images/defaultUser.png";

// images
import img1 from "../../../assets/images/page-img/profile-bg1.jpg";
import PageTemplate2 from "../../../components/PageTemplate2";
import {
  getProfile,
  sendFriendRequest,
  getMyProfile,
} from "../../../api/profile";
import { getProfileMediaPosts } from "../../../api/mediaPost";
import { getProfilePolls } from "../../../api/polls";
import { getProfileAccomplishments } from "../../../api/accomplishments";
import ReviewsTabs from "./components/ReviewTab";
import AboutSection from "./components/AboutUs";
import MyCommunitySection from "./components/MyCommunitySec";

const ProfileDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [user, setUser] = useState();
  const [myUser, setmyUser] = useState();
  const [mediaPosts, setMediaPosts] = useState([]);
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accomplishments, setAccomplishments] = useState([]);
  const [activeTab, setActiveTab] = useState("about");
  const [communityMembers, setCommunityMembers] = useState("");
  const [showModal, setShowModal] = useState(false); // State to handle the modal visibility
  const [error, setError] = useState(null);
  const [showAllIndustries, setShowAllIndustries] = useState(false);

  const toggleShowAllIndustries = () => {
    setShowAllIndustries(!showAllIndustries);
  };

  useEffect(() => {
    const tab = location.hash.replace("#", "");
    if (tab) {
      if (tab === "about-tab") setActiveTab("about");
      if (tab === "posts-tab" || tab === "polls-tab") setActiveTab("posts");
      if (tab === "projects-tab") setActiveTab("projects");
      if (tab === "accomplishments-tab") setActiveTab("accomplishments");
    } else setActiveTab("about");
  }, [location]);

  const fetchMyProfile = async () => {
    const profile = await getMyProfile();
    setmyUser(profile.data.data);
  };

  const fetchProfile = async () => {
    setLoading(true);
    const res = await getProfile(id);
    if (res.errRes) {
      if (res.errRes.data.message) {
        window.alert(res.errRes.data.message);
        navigate(-1);
        return;
      }
      window.alert("User not found");
      navigate(-1);
    }
    if (res.data.success) setUser(res.data.data);
    if (!res.data.success) {
      window.alert("User not found");
      navigate(-1);
    }

    console.log(user);
    setLoading(false);
  };

  const handleSendFriendRequest = async () => {
    const { data, errRes } = await sendFriendRequest(user.authId);
    if (errRes) {
      setError(errRes);
      console.log(errRes);
      alert(errRes);
    } else {
      console.log("Friend request sent", data);
    }
  };

  const fetchProfileAccomplishments = async () => {
    const resp = await getProfileAccomplishments(id);
    if (resp.errRes) {
      if (resp.errRes.response) {
        window.alert(resp.errRes.response.data.message);
        return;
      }
      if (resp.errRes.message) {
        window.alert(resp.errRes.message);
        return;
      }
      console.log(resp);
      return;
    }
    if (resp.data.success) {
      setAccomplishments(resp.data.data);
    }
  };

  const fetchMediaPosts = async () => {
    const resp = await getProfileMediaPosts(id);
    if (resp.errRes) {
      if (resp.errRes.response) {
        window.alert(resp.errRes.response.data.message);
        return;
      }
      if (resp.errRes.message) {
        window.alert(resp.errRes.message);
        return;
      }
      console.log(resp);
      return;
    }
    if (resp.data.success) {
      setMediaPosts(resp.data.data);
    }
  };

  const fetchProfilePolls = async () => {
    const resp = await getProfilePolls(id);
    if (resp.errRes) {
      if (resp.errRes.response) {
        window.alert(resp.errRes.response.data.message);
        return;
      }
      if (resp.errRes.message) {
        window.alert(resp.errRes.message);
        return;
      }
      console.log(resp);
      return;
    }
    if (resp.data.success) {
      setPolls(resp.data.data);
    }
  };

  useEffect(() => {
    fetchMyProfile();
    fetchProfile();
    fetchMediaPosts();
    fetchProfilePolls();
    fetchProfileAccomplishments();
  }, [id]);

  return loading ? (
    <div
      className="text-center d-flex flex-column justify-content-center"
      style={{ height: "100vh" }}
    >
      <div className="text-center">
        <img src="/loader.svg" alt="Loading..." />
      </div>
    </div>
  ) : user ? (
    <>
      <PageTemplate2>
        <Row className="px-5 pt-5">
          <Col sm={12}>
            <Card className="profile-page">
              <Card.Body className="p-0">
                <div>
                  <div
                    className="profile-header position-relative"
                    style={{ height: "300px", marginBottom: "50px" }}
                  >
                    <div className="">
                      {/* Background banner */}
                      <div
                        style={{
                          height: "100%",
                          width: "100%",
                          position: "absolute",
                          top: 0,
                          left: 0,
                        }}
                      >
                        <img
                          loading="lazy"
                          src={img1} // This is the banner image
                          alt="profile-bg"
                          className="w-100"
                          style={{ objectFit: "cover", height: "100%" }}
                        />
                      </div>

                      {/* Profile Image */}
                      <div
                        className="position-absolute"
                        style={{ left: "30px", bottom: "-50px" }}
                      >
                        <img
                          loading="lazy"
                          src={user.profilePic ? user.profilePic : defaultUser}
                          alt="profile-img1"
                          className="rounded-circle"
                          style={{
                            width: "150px",
                            height: "150px",
                            objectFit: "cover",
                            border: "5px solid white",
                          }}
                        />
                      </div>
                    </div>

                    {/* Credibility Board */}
                    <div
                      className="position-absolute"
                      style={{ right: "30px", bottom: "-70px" }} // Adjust the position as per design
                    >
                      <div className="d-flex flex-column align-items-center justify-content-center">
                        {/* First row with one hexagon */}
                        <div
                          className="text-center mb-3 d-flex justify-content-center"
                          style={{ width: "100%" }}
                        >
                          <div
                            className="mb-3 text-center"
                            style={{
                              width: "150px",
                              borderRadius: "10px",
                              backgroundColor: "#f1f1f1",
                              padding: "10px",
                              boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
                            }}
                          >
                            <h3>360</h3>
                            <p>Posts</p>
                          </div>
                        </div>

                        {/* Second row with two hexagons */}
                        <div
                          className="d-flex justify-content-between"
                          style={{ gap: "10px" }}
                        >
                          <div
                            className="mb-3 text-center"
                            style={{
                              width: "150px",
                              borderRadius: "10px",
                              backgroundColor: "#f1f1f1",
                              padding: "10px",
                              boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
                            }}
                          >
                            <h3>120</h3>
                            <p>Reviews</p>
                          </div>
                          <div
                            className="mb-3 text-center"
                            style={{
                              width: "150px",
                              borderRadius: "10px",
                              backgroundColor: "#f1f1f1",
                              padding: "10px",
                              boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
                            }}
                          >
                            <h3>50</h3>
                            <p>Achievements</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* User Information */}
                <Row className="mt-5 px-4">
                  <Col sm={8} className="">
                    <AboutSection user={user} />
                  </Col>

                  {/* Add to my Community button */}
                  {user?._id !== myUser?._id && (
                    <Col
                      sm={4}
                      className="d-flex align-items-center justify-content-end"
                    >
                      <button
                        className="btn btn-primary"
                        onClick={() => handleSendFriendRequest()}
                      >
                        Add to my Community
                      </button>
                    </Col>
                  )}
                </Row>
              </Card.Body>
            </Card>

            <Row className="mt-4 px-4">
              {/* User Description */}
              <Col sm={8}>
                <Card
                  className="p-3"
                  style={{
                    backgroundColor: "#e0e0e0",
                    border: "1px solid black",
                  }}
                >
                  <strong>User Description</strong>
                  <p className="mb-0">
                    {user.description || "No description available"}
                  </p>
                </Card>
              </Col>

              {/* Add Profile Section Dropdown */}
              <Col
                sm={4}
                className="d-flex align-items-start justify-content-end"
              >
                <Col
                  sm={4}
                  className="d-flex align-items-start justify-content-end"
                >
                  <Dropdown as={ButtonGroup}>
                    <Card
                      className="p-3"
                      style={{ backgroundColor: "#e0e0e0" }}
                    >
                      <Dropdown.Toggle
                        as={Link}
                        to="#"
                        className="btn btn-link"
                        style={{ color: "blue", fontWeight: "bold" }}
                      >
                        More
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item>Copy Profile URL</Dropdown.Item>
                        <Dropdown.Item onClick={() => setShowModal(true)}>
                          About User
                        </Dropdown.Item>
                        <Dropdown.Item>Message to User</Dropdown.Item>
                      </Dropdown.Menu>
                    </Card>
                  </Dropdown>
                </Col>
              </Col>
            </Row>

            {/* Modal for Part B */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>About User</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {/* Part B - Display based on account type */}

                {/* For Students */}
                {user.accountType === "INDIVIDUAL" &&
                  user.userType1 === "Student" && (
                    <>
                      <Row className="mt-4 px-4">
                        <Col sm={6}>
                          <strong>Highest Level of Education</strong>
                          <p>{user.highestEducation || "N/A"}</p>
                        </Col>
                        <Col sm={6}>
                          <strong>Educational Institution</strong>
                          <p>{user.educationalInstitution || "N/A"}</p>
                        </Col>
                      </Row>
                      <Row className="mt-4 px-4">
                        <Col sm={6}>
                          <strong>Course / Stream</strong>
                          <p>{user.course || "N/A"}</p>
                        </Col>
                        <Col sm={6}>
                          <strong>Account Creation Date</strong>
                          <p>{user.createdAt || "N/A"}</p>{" "}
                          {/* The correct field is `createdAt` based on your schema */}
                        </Col>
                      </Row>
                    </>
                  )}

                {/* For Working Professional / Entrepreneur / Educator */}
                {user.accountType === "INDIVIDUAL" &&
                  (user.userType1 === "Working Professional" ||
                    user.userType1 === "Entrepreneur" ||
                    user.userType1 === "Educator") && (
                    <>
                      <Row className="mt-4 px-4">
                        <Col sm={6}>
                          <strong>Location</strong>
                          <p>{user.location || "N/A"}</p>
                        </Col>
                        <Col sm={6}>
                          <strong>Industry</strong>
                          <p>{user.industry || "N/A"}</p>
                        </Col>
                      </Row>

                      {/* Work Experience Details */}
                      {user.workExperience && user.workExperience.length > 0 ? (
                        user.workExperience.map((experience, index) => (
                          <Row className="mt-4 px-4" key={index}>
                            <Col sm={6}>
                              <strong>Work Designation</strong>
                              <p>{experience.designation || "N/A"}</p>
                            </Col>
                            <Col sm={6}>
                              <strong>Work Duration</strong>
                              <p>{experience.duration || "N/A"}</p>
                            </Col>
                            <Col sm={6}>
                              <strong>Name of the Organization</strong>
                              <p>
                                {experience.nameOfOrganization || "N/A"}
                              </p>{" "}
                              {/* Corrected field: `nameOfOrganization` from schema */}
                            </Col>
                          </Row>
                        ))
                      ) : (
                        <Row className="mt-4 px-4">
                          <Col sm={12}>
                            <strong>No Work Experience Available</strong>
                          </Col>
                        </Row>
                      )}

                      <Row className="mt-4 px-4">
                        <Col sm={6}>
                          <strong>Account Creation Date</strong>
                          <p>{user.createdAt || "N/A"}</p>
                        </Col>
                      </Row>
                    </>
                  )}

                {/* For Organizations */}
                {user.accountType === "ORGANIZATIONS" && (
                  <>
                    <Row className="mt-4 px-4">
                      <Col sm={6}>
                        <strong>Founding Year</strong>
                        <p>{user.foundingYear || "N/A"}</p>
                      </Col>
                      <Col sm={6}>
                        <strong>Location</strong>
                        <p>{user.location || "N/A"}</p>
                      </Col>
                    </Row>
                    <Row className="mt-4 px-4">
                      <Col sm={6}>
                        <strong>Industry</strong>
                        <p>{user.industry || "N/A"}</p>
                      </Col>
                      <Col sm={6}>
                        <strong>Organization Size</strong>
                        <p>{user.organizationSize || "N/A"}</p>{" "}
                        {/* Corrected field: `organizationSize` based on schema */}
                      </Col>
                    </Row>
                    <Row className="mt-4 px-4">
                      <Col sm={6}>
                        <strong>Account Creation Date</strong>
                        <p>{user.createdAt || "N/A"}</p>{" "}
                        {/* The correct field is `createdAt` */}
                      </Col>
                    </Row>
                  </>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

            <Card className="p-3" style={{ border: "1px solid black" }}>
              {/* Header */}
              <Card.Header
                style={{
                  fontWeight: "bold",
                  borderBottom: "1px solid black",
                  backgroundColor: "#f8f9fa",
                }}
              >
                Collaborate For/Book Your Slot/Request Services
              </Card.Header>

              {/* Row for categories */}
              <Card.Body>
                <Row className="text-center" style={{ fontWeight: "bold" }}>
                  <Col style={{ borderRight: "1px solid black" }}>
                    Guest Lecture
                  </Col>
                  <Col style={{ borderRight: "1px solid black" }}>
                    STEM Education
                  </Col>
                  <Col style={{ borderRight: "1px solid black" }}>
                    Internship
                  </Col>
                  <Col style={{ borderRight: "1px solid black" }}>
                    Community Service Project
                  </Col>
                  <Col>Curriculum Based</Col>
                </Row>
              </Card.Body>
            </Card>

            <Row className="mt-4 px-4">
              {/* Left Section: My Community */}
              <MyCommunitySection />

              {/* Right Section: Current Projects/Activities */}
              <Col sm={6} className="d-flex justify-content-end">
                <Card className="p-3" style={{ border: "2px solid black" }}>
                  <strong>Current Projects/Activities</strong>
                </Card>
              </Col>
            </Row>

            <ReviewsTabs profile={user}  />
          </Col>
        </Row>
      </PageTemplate2>
    </>
  ) : (
    <div>User not found</div>
  );
};
export default ProfileDetails;

/*
{
  "_id": "w",
  "authId": "6700134a1c631d80b88dba7d",
  "accountType": "INDIVIDUAL",
  "userType1": "Student",
  "userType2": "Secondary School (Grade 1 to 10)",
  "userType3": "Christ University",
  "userType4": "",
  "userType5": "",
  "name": "Marvinrop",
  "tagline": "",
  "description": "",
  "website": "",
  "countryCode": 91,
  "collabKeywords": [],
  "contactNo": "",
  "comEmail": "",
  "address": "",
  "city": "",
  "district": "",
  "state": "",
  "country": "",
  "pinCode": "",
  "profilePic": "",
  "lastSeen": "2024-10-04T16:06:37.750Z",
  "savedMediaPosts": [
      "670015ceaf44b378569acb88"
  ],
  "savedPolls": [],
  "admins": [],
  "workExperience": [],
  "createdAt": "2024-10-04T16:09:46.938Z",
  "updatedAt": "2024-10-05T06:58:58.249Z",
  "__v": 0
}

# missing
- Bio
- Website Description
 
*/
