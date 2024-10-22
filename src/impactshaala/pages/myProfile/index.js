import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Nav,
  Tab,
  ProgressBar,
  Dropdown,
  ButtonGroup,
} from "react-bootstrap";
import Card from "../../../components/Card";
import { Link } from "react-router-dom";
import {
  BsInstagram,
  BsYoutube,
  BsLinkedin,
  BsTwitterX,
  BsFacebook,
} from "react-icons/bs";
import { deleteMediaPost } from "../../../api/mediaPost";
import { useLocation } from "react-router-dom";

// images
import img1 from "../../../assets/images/page-img/profile-bg1.jpg";
import PageTemplate2 from "../../../components/PageTemplate2";
import PostsSection from "../../../components/profile/PostsSection";
import ProjectSection from "../../../components/profile/ProjectSection";
import AboutSection from "../../../components/profile/AboutSection";

import user6 from "../../../assets/images/user/06.jpg";
import user7 from "../../../assets/images/user/07.jpg";
import user8 from "../../../assets/images/user/08.jpg";
import user9 from "../../../assets/images/user/09.jpg";
import user10 from "../../../assets/images/user/10.jpg";
import user11 from "../../../assets/images/user/11.jpg";
import user12 from "../../../assets/images/user/12.jpg";
import { getMyProfile } from "../../../api/profile";
import defaultUser from "../../../assets/images/defaultUser.png";
import { listMyMediaPosts } from "../../../api/mediaPost";
import { getMyPolls } from "../../../api/polls";
import GenericUserInfo from "../../../components/GenericUserInfo";
import { getMyAccomplishments } from "../../../api/accomplishments";

import ReviewsTabs from "./components/ReviewTab";
import HexagonCard from "./components/HexagonCard";
import MyCommunitySection from "./components/MyCommunitySec";
import ProfileSectionDropdown from "./components/ProfileSelection";



const MyProfile = () => {
  const location = useLocation();
  const [userData, setUserData] = useState({});
  const [mediaPosts, setMediaPosts] = useState();
  const [polls, setPolls] = useState([]);
  const [accomplishments, setAccomplishments] = useState([]);
  const [activeTab, setActiveTab] = useState("about");
  const [showSections, setShowSections] = useState(false); // State to toggle sections
  const [communityMembers, setCommunityMembers] = useState("");
  const [showAllIndustries, setShowAllIndustries] = useState(false);

  const toggleShowAllIndustries = () => {
    setShowAllIndustries(!showAllIndustries);
  };

  const fetchMyProfile = async () => {
    const profile = await getMyProfile();
    console.log(profile.data.data);
    setUserData(profile.data.data);
  };

  // const fetchMediaPosts = async () => {
  //   const resp = await listMyMediaPosts();
  //   if (resp.errRes) {
  //     if (resp.errRes.response) {
  //       window.alert(resp.errRes.response.data.message);
  //       return;
  //     }
  //     if (resp.errRes.message) {
  //       window.alert(resp.errRes.message);
  //       return;
  //     }
  //     return;
  //   }
  //   if (resp.data.success) {
  //     setMediaPosts(resp.data.data);
  //   }
  // };

  const fetchMyPolls = async () => {
    const resp = await getMyPolls();
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

  const fetchMyAccomplishments = async () => {
    const resp = await getMyAccomplishments();
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

  // const handleDeletePost = async (id) => {
  //   const resp = await deleteMediaPost(id);
  //   if (resp.errRes) {
  //     if (resp.errRes.response) {
  //       window.alert(resp.errRes.response.data.message);
  //       return;
  //     }
  //     if (resp.errRes.message) {
  //       window.alert(resp.errRes.message);
  //       return;
  //     }

  //     return;
  //   }
  //   if (resp.data.success) {
  //     fetchMediaPosts();
  //   }
  // };

  const handleToggleSections = () => {
    setShowSections(!showSections); // Toggle the visibility of the sections
  };

  useEffect(() => {
    fetchMyProfile();
    // fetchMediaPosts();
    fetchMyPolls();
    fetchMyAccomplishments();
  }, []);

  useEffect(() => {
    const tab = location.hash.replace("#", "");
    if (tab) {
      if (tab === "about-tab") setActiveTab("about");
      if (tab === "posts-tab" || tab === "polls-tab") setActiveTab("posts");
      if (tab === "projects-tab") setActiveTab("projects");
      if (tab === "accomplishments-tab") setActiveTab("accomplishments");
    } else setActiveTab("about");
  }, [location]);

  return (
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
                          src={
                            userData.profilePic
                              ? userData.profilePic
                              : defaultUser
                          }
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
                  </div>
                </div>

                {/* User Information */}
                <Row className="mt-5 px-4">
                  <Col sm={8}>
                    <h3>{userData.name || "User Name"}</h3>

                    <div className="mb-2">
                      <strong>Bio</strong>
                      <p>{userData.bio || "N/A"}</p>
                    </div>

                    <div className="d-flex flex-wrap">
                      <div className="me-4">
                        <strong>User Sub Type</strong>
                        <p>{userData.userType1 || "N/A"}</p>
                      </div>
                      <div className="me-4">
                        <strong>Location</strong>
                        <p>{userData.location || "N/A"}</p>
                      </div>
                      <div className="me-4">
                        <strong>Website</strong>
                        <p>{userData.website || "N/A"}</p>
                      </div>

                      {/* Conditional rendering based on userType1 */}
                      {userData.userType1 === "Working Professional" && (
                        <>
                          <div className="me-4">
                            <strong>Domain</strong>
                            <p>{userData.userType3?.[0] || "N/A"}</p>{" "}
                            {/* Display first industry */}
                            {userData.userType3?.length > 1 && (
                              <button
                                className="btn btn-link p-0"
                                onClick={toggleShowAllIndustries}
                              >
                                {showAllIndustries ? "Show Less" : "More"}
                              </button>
                            )}
                            {showAllIndustries && (
                              <div>
                                <strong>All Domains:</strong>
                                <ul>
                                  {userData.industry.map((item, index) => (
                                    <li key={index}>{item}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {/* Domain replaces Industry */}
                          </div>
                          <div className="me-4">
                            <strong>Years of Work Experience</strong>
                            <p>{userData.yearsOfExperience || "N/A"}</p>
                          </div>
                          <div className="me-4">
                            <strong>User Profession</strong>
                            <p>{userData.profession || "N/A"}</p>
                          </div>
                        </>
                      )}

                      {userData.userType1 === "Student" && (
                        <>
                          <div className="me-4">
                            <strong>Educational Institutions</strong>
                            <p>{userData.educationalInstitution || "N/A"}</p>
                          </div>
                          <div className="me-4">
                            <strong>Level of Education</strong>
                            <p>{userData.highestEducation || "N/A"}</p>
                          </div>
                        </>
                      )}

                      {/* Default content for other user types */}
                      {userData.userType1 !== "Working Professional" &&
                        userData.userType1 !== "Student" && (
                          <>
                            <div className="me-4">
                              <strong>Industry</strong>
                              <p>{userData.industry || "N/A"}</p>
                            </div>
                            <div className="me-4">
                              <strong>Org Size</strong>
                              <p>{userData.orgSize || "N/A"}</p>
                            </div>
                          </>
                        )}
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Row className="mt-4 px-4">
              <Col sm={8}>
                {/* User Description */}
                <Card className="p-3" style={{ backgroundColor: "#e0e0e0" }}>
                  <strong>User Description</strong>
                  <p className="mb-0">
                    {userData.description || "No description available"}
                  </p>
                </Card>
              </Col>

              {/* Add Profile Section Dropdown */}
              <Col
                sm={4}
                className="justify-content-end"
              >
                <ProfileSectionDropdown />
              </Col>
            </Row>

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

            <ReviewsTabs profile={userData} post={mediaPosts}/>
          </Col>
        </Row>
      </PageTemplate2>
    </>
  );
};
export default MyProfile;
