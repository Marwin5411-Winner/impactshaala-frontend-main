import { useState, useEffect } from 'react';
import CollabRequestCard from './collabRequestCard';
import Header from '../../../components/partials/dashboard/HeaderStyle/header';
import Sidebar from '../../../components/partials/dashboard/SidebarStyle/sidebar';
import { Col, Row, Container } from "react-bootstrap";
import Internship from '../home/components/Internship';
import PreferenceCard from '../home/components/PreferenceCard';
import Colaberation from '../home/components/Collaboration';
import ProfileCard from '../home/components/Profile';
import { getLocalStorage } from '../../../utilities/localStorage';
import { useNavigate } from 'react-router-dom';


import user6 from '../../../assets/images/user/06.jpg'
import user7 from '../../../assets/images/user/07.jpg'
import user8 from '../../../assets/images/user/08.jpg'
import user9 from '../../../assets/images/user/09.jpg'
import user10 from '../../../assets/images/user/10.jpg'
import user11 from '../../../assets/images/user/11.jpg'
import user12 from '../../../assets/images/user/12.jpg'
import Card from '../../../components/Card';

const tempRequests = [
	{
		name: "Monkey D Luffy",
		friends: 100,
		image: user6,
	},
	{
		name: "Portkas D Ace",
		friends: 2,
		image: user7,
	},
	{
		name: "Asta",
		friends: 15,
		image: user8,
	},
	{
		name: "Yami Sukehiro",
		friends: 11,
		image: user9,
	},
	{
		name: "Naruto Uzumaki",
		friends: 300,
		image: user10,
	},
	{
		name: "Sasuke Uchiha",
		friends: 16,
		image: user11,
	},
	{
		name: "Hinata Uzumaki",
		friends: 5,
		image: user12,
	},

]

const defaultRequests = {
	sent: [...tempRequests],
	received: [...tempRequests],
	accepted: [...tempRequests],
	rejected: [...tempRequests],
	dropped: [...tempRequests]
}

const CollaborationRequests = () => {
	const types = [
		"sent", 
		"received", 
		"accepted", 
		"rejected", 
		"dropped"
	]
	const [selectedType, setSelectedType] = useState("sent")
	const [requests, setRequests] = useState({
		sent: [],
		received: [],
		accepted: [],
		rejected: [],
		dropped: []
	})
	const navigate = useNavigate()
  const [user, setUser] = useState({})

	const fetchRequests = async () => {
		setRequests(defaultRequests)
	}

	useEffect(() => {
		fetchRequests()
		const user = getLocalStorage("user")
    if(!user) navigate("/login")
    setUser(user)
	}, [])
	
	return (
		<div className="">
      <Header />
      <Sidebar />
      <div className="main-content" style={{ overflowX: "hidden" }}>
        <Row>
          <Col lg={9}>

					<Container>
            <Row>
              <Col sm="12">
                <Card>
                  <Card.Header className="d-flex justify-content-between">
                    <div className="header-title">
                      <h4 className="card-title">Collaboration Requests</h4>
											<div className="d-flex flex-row mt-2" style={{gap: "5px"}}>
												{
													types.map((type, index) => {
														return (
															<button 
																className={`btn ${type==selectedType?"btn-primary":"btn-outline-primary"} rounded-pill`}
																key={index} 
																style={{textTransform: "capitalize"}}
																onClick={() => setSelectedType(type)}
															>
																{type}
															</button>
														)
													})
												}
											</div>
                    </div>
                  </Card.Header>
                  <Card.Body>
										<ul className="request-list list-inline m-0 p-0">
											{
												requests[selectedType] && Array.isArray(requests[selectedType]) && requests[selectedType].map((item, index) => {
													return (
														<CollabRequestCard 
															key={index} 
															data={item} 
															type={selectedType}
														/>
													)
												})
											}
										</ul>
									</Card.Body>
								</Card>
							</Col>
						</Row>
					</Container>

          </Col>
          <Col lg={3} class="position-relative">
            <div className="position-fixed hide-scrollbar" style={{maxHeight: "90vh", overflowY: "auto"}}>
              <Row className="position-relative">
                <ProfileCard user={user}/>
              </Row>
              <Row>
                <Colaberation />
              </Row>
              <Row>
                <Internship />
              </Row>
              <Row>
                <PreferenceCard />
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </div>
	)
}

export default CollaborationRequests;