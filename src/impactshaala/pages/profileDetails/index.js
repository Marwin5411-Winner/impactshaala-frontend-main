import React,{useState, useEffect} from 'react'
import {Row, Col, Nav, Tab } from 'react-bootstrap'
import Card from '../../../components/Card'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { BsFacebook, BsLinkedin, BsInstagram, BsTwitterX, BsYoutube } from 'react-icons/bs'
import { useParams } from 'react-router-dom'
import defaultUser from '../../../assets/images/defaultUser.png';

// images
import img1 from '../../../assets/images/page-img/profile-bg1.jpg'
import PageTemplate2 from '../../../components/PageTemplate2'
import AboutSection from '../../../components/profile/AboutSection'
import PostsSection from '../../../components/profile/PostsSection'
import ProjectSection from '../../../components/profile/ProjectSection'
import { getProfile } from '../../../api/profile'
import { getProfileMediaPosts } from '../../../api/mediaPost'
import { getProfilePolls } from '../../../api/polls'
import AccomplishmentsSection from '../../../components/accomplishments/AccomplishmentsSection'
import { getProfileAccomplishments } from '../../../api/accomplishments'

const ProfileDetails =() =>{
   const navigate = useNavigate()
   const location = useLocation()
   const {id} = useParams()
   const [user, setUser] = useState()
   const [mediaPosts, setMediaPosts] = useState([])
   const [polls, setPolls] = useState([])
   const [loading, setLoading] = useState(true)
   const [accomplishments, setAccomplishments] = useState([])
   const [activeTab, setActiveTab] = useState("about")

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

   const fetchProfile = async () => {
      setLoading(true)
      const res = await getProfile(id)
      if(res.errRes) {
         if(res.errRes.data.message) {
            window.alert(res.errRes.data.message)
            navigate(-1)
            return 
         }
         window.alert("User not found")
         navigate(-1)
      }
      if(res.data.success) setUser(res.data.data)
      if(!res.data.success) {
         window.alert("User not found")
         navigate(-1)
      }
      setLoading(false)
   }

   const fetchProfileAccomplishments = async () => {
      const resp = await getProfileAccomplishments(id)
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

   const fetchMediaPosts = async () => {
      const resp = await getProfileMediaPosts(id) 
      if(resp.errRes) {
         if(resp.errRes.response) {
            window.alert(resp.errRes.response.data.message)
            return;
         }
         if(resp.errRes.message) {
            window.alert(resp.errRes.message)
            return;
         }
         console.log(resp)
         return;
      }
      if(resp.data.success) {
         setMediaPosts(resp.data.data)
      }
   }

   const fetchProfilePolls = async () => {
      const resp = await getProfilePolls(id) 
      if(resp.errRes) {
         if(resp.errRes.response) {
            window.alert(resp.errRes.response.data.message)
            return;
         }
         if(resp.errRes.message) {
            window.alert(resp.errRes.message)
            return;
         }
         console.log(resp)
         return;
      }
      if(resp.data.success) {
         setPolls(resp.data.data)
      }
   }

   useEffect(() => {
      fetchProfile()
      fetchMediaPosts()
      fetchProfilePolls()
      fetchProfileAccomplishments()
   }, [id])

   return loading?(
      <div className="text-center d-flex flex-column justify-content-center" style={{height: "100vh"}}>
         <div className="text-center">
            <img src="/loader.svg" alt="Loading..."/>
         </div>
      </div>
   ): user ? (
      <>
			<PageTemplate2>
            <Row className="px-5 pt-5">
               <Col sm={12}>
                  <Card>
                     <Card.Body className=" profile-page p-0">
                        <div className="profile-header">
                           <div className="position-relative">
                              <img loading="lazy" src={img1} alt="profile-bg" className="rounded img-fluid"/>
                           </div>
                           <div className="user-detail text-center mb-3">
                              <div className="profile-img">
                                 <img loading="lazy" src={user.profilePic?user.profilePic:defaultUser} alt="profile-img1" className="avatar-130 img-fluid" style={{width: "150px", height: "150px", objectFit: "cover",background: "white"}} />
                              </div>
                              <div className="profile-detail">
                                 <h3>{user.name}</h3>
                              </div>
                           </div>
                           <div className="profile-info p-3 d-flex align-items-center justify-content-between position-relative">
                              <div className="social-links">
                                 <ul className="social-data-block d-flex align-items-center justify-content-between list-inline p-0 m-0" style={{gap: "5px"}}>
                                    <li className="text-center pe-3">
                                       <Link to="#"><BsFacebook style={{width: "20px", height: "20px"}}/></Link>
                                    </li>
                                    <li className="text-center pe-3">
                                       <Link to="#"><BsTwitterX style={{width: "20px", height: "20px"}}/></Link>
                                    </li>
                                    <li className="text-center pe-3">
                                       <Link to="#"><BsInstagram style={{width: "20px", height: "20px"}}/></Link>
                                    </li>
                                    <li className="text-center pe-3">
                                       <Link to="#"><BsYoutube style={{width: "20px", height: "20px"}}/></Link>
                                    </li>
                                    <li className="text-center md-pe-3 pe-0">
                                       <Link to="#"><BsLinkedin style={{width: "20px", height: "20px"}}/></Link>
                                    </li>
                                 </ul>
                              </div>
                              <div className="social-info">
                                 <button className='btn btn-primary rounded-pill' style={{width: "100px"}}>Collaborate</button>
                              </div>
                          </div>
                        </div>
                     </Card.Body>
                  </Card>
               </Col>
					</Row>
               <Row className="px-5 pt-5">
                  <Tab.Container defaultActiveKey="about">
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
										<AboutSection data={user}/>
									</Tab.Pane>
									<Tab.Pane eventKey="posts">
										<PostsSection mediaPosts={mediaPosts} user={user} polls={polls} setUser={setUser} setPolls={setPolls}/>
									</Tab.Pane>
									<Tab.Pane eventKey="projects">
										<ProjectSection ongoing/>
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
   ): (
      <div>
         User not found
      </div>
   )
}
export default ProfileDetails;