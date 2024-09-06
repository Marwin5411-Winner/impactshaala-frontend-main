import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Nav,
  Tab,
  ProgressBar,
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
import AccomplishmentsSection from "../../../components/accomplishments/AccomplishmentsSection";
import { getMyAccomplishments } from "../../../api/accomplishments";

const MyProfile = () => {
  const location = useLocation()
  const [userData, setUserData] = useState({});
  const [mediaPosts, setMediaPosts] = useState();
  const [polls, setPolls] = useState([]);
  const [accomplishments, setAccomplishments] = useState([]);
  const [activeTab, setActiveTab] = useState("about")

  const fetchMyProfile = async () => {
    const profile = await getMyProfile();
    setUserData(profile.data.data);
  };

  const fetchMediaPosts = async () => {
    const resp = await listMyMediaPosts();
    if (resp.errRes) {
      if (resp.errRes.response) {
        window.alert(resp.errRes.response.data.message);
        return;
      }
      if (resp.errRes.message) {
        window.alert(resp.errRes.message);
        return;
      }
      return;
    }
    if (resp.data.success) {
      setMediaPosts(resp.data.data);
    }
  };

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
    const resp = await getMyAccomplishments()
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
  }

  const handleDeletePost = async (id) => {
    const resp = await deleteMediaPost(id);
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
      fetchMediaPosts();
    }
  };

  useEffect(() => {
    fetchMyProfile();
    fetchMediaPosts();
    fetchMyPolls();
    fetchMyAccomplishments();
  }, []);

  useEffect(() => {
    const tab = location.hash.replace("#", "")
    if(tab) {
      if(tab === "about-tab") setActiveTab("about")
      if(tab === "posts-tab" || tab === "polls-tab") setActiveTab("posts")
      if(tab === "projects-tab") setActiveTab("projects")
      if(tab === "accomplishments-tab") setActiveTab("accomplishments")
    }
    else setActiveTab("about")
  }, [location])

  return (
    <>
      <PageTemplate2>
        <Row className="px-5 pt-5">
          <Col sm={12}>
            <Card>
              <Card.Body className=" profile-page p-0">
                <div className="profile-header">
                  <div className="position-relative">
                    <img
                      loading="lazy"
                      src={img1}
                      alt="profile-bg"
                      className="rounded img-fluid"
                    />
                    <ul className="header-nav list-inline d-flex flex-wrap justify-end p-0 m-0">
                      <li>
                        <Link
                          to="/dashboard/app/edit-profile"
                          className="material-symbols-outlined position-relative"
                          style={{ zIndex: "100" }}
                        >
                          edit
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="user-detail text-center mb-3">
                    <div className="profile-img">
                      <img
                        loading="lazy"
                        src={
                          userData.profilePic
                            ? userData.profilePic
                            : defaultUser
                        }
                        alt="profile-img1"
                        className="avatar-130 img-fluid"
                        style={{
                          width: "150px",
                          height: "150px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div className="profile-detail">
                      <h3>{userData.name}</h3>
                    </div>
                  </div>
                  <div className="profile-info p-3 d-flex align-items-center justify-content-between position-relative">
                    <div className="social-links">
                      <ul
                        className="social-data-block d-flex align-items-center justify-content-between list-inline p-0 m-0"
                        style={{ gap: "5px" }}
                      >
                        <li className="text-center pe-3">
                          <Link to="#">
                            <BsFacebook
                              style={{ width: "20px", height: "20px" }}
                            />
                          </Link>
                        </li>
                        <li className="text-center pe-3">
                          <Link to="#">
                            <BsTwitterX
                              style={{ width: "20px", height: "20px" }}
                            />
                          </Link>
                        </li>
                        <li className="text-center pe-3">
                          <Link to="#">
                            <BsInstagram
                              style={{ width: "20px", height: "20px" }}
                            />
                          </Link>
                        </li>
                        <li className="text-center pe-3">
                          <Link to="#">
                            <BsYoutube
                              style={{ width: "20px", height: "20px" }}
                            />
                          </Link>
                        </li>
                        <li className="text-center md-pe-3 pe-0">
                          <Link to="#">
                            <BsLinkedin
                              style={{ width: "20px", height: "20px" }}
                            />
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="social-info">
                      <ul className="social-data-block d-flex align-items-center justify-content-between list-inline p-0 m-0">
                        <li className="text-center ps-3">
                          <h6>Posts</h6>
                          <p className="mb-0">690</p>
                        </li>
                        <li className="text-center ps-3">
                          <h6>Followers</h6>
                          <p className="mb-0">206</p>
                        </li>
                        <li className="text-center ps-3">
                          <h6>Following</h6>
                          <p className="mb-0">100</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div>
                  <ProgressBar
                    now={60}
                    label={"60%"}
                    variant="success"
                    animated
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="px-5">
          <Col>
						<Card>
							<Card.Body>
								<GenericUserInfo data={userData}/>
							</Card.Body>
						</Card>
					</Col>
        </Row>
        <Row className="px-5">
          <Tab.Container activeKey={activeTab}>
            <Card className="p-0">
              <Card.Body className="p-0">
                <div className="user-tabing">
                  <Nav
                    as="ul"
                    variant="pills"
                    className="d-flex align-items-center justify-content-center profile-feed-items p-0 m-0"
                  >
                    <Nav.Item as="li" className="col-12 col-sm-3 p-0">
                      <Nav.Link
                        href="#about-tab"
                        eventKey="about"
                        role="button"
                        className="text-center p-3"
                        onClick={() => setActiveTab("about")}
                      >
                        About
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li" className=" col-12 col-sm-3 p-0">
                      <Nav.Link
                        href="#posts-tab"
                        eventKey="posts"
                        role="button"
                        className="text-center p-3"
                        onClick={() => setActiveTab("posts")}
                      >
                        Posts
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li" className="col-12 col-sm-3 p-0">
                      <Nav.Link
                        href="#projects-tab"
                        eventKey="projects"
                        role="button"
                        className="text-center p-3"
                        onClick={() => setActiveTab("projects")}
                      >
                        Ongoing Projects
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li" className="col-12 col-sm-3 p-0">
                      <Nav.Link
                        href="#accomplishments-tab"
                        eventKey="accomplishments"
                        role="button"
                        className="text-center p-3"
                        onClick={() => setActiveTab("accomplishments")}
                      >
                        Accomplishments
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </div>
              </Card.Body>
            </Card>
            <Col sm={12}>
              <Tab.Content>
                <Tab.Pane eventKey="about">
                  <AboutSection data={userData} />
                </Tab.Pane>
                <Tab.Pane eventKey="posts">
                  <PostsSection
                    myProfile
                    mediaPosts={mediaPosts}
                    user={userData}
                    handleDeletePost={handleDeletePost}
                    polls={polls}
                    setPolls={setPolls}
                    setUser={setUserData}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="projects">
                  <ProjectSection ongoing myProfile />
                </Tab.Pane>
                <Tab.Pane eventKey="accomplishments">
                  <AccomplishmentsSection accomplishments={accomplishments}/>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Tab.Container>
        </Row>
      </PageTemplate2>
    </>
  );
};
export default MyProfile;
