import { Button, Col, Container, Row, Card } from "react-bootstrap";
import user6 from '../../../assets/images/user/06.jpg'
import user7 from '../../../assets/images/user/07.jpg'
import user8 from '../../../assets/images/user/08.jpg'
import user9 from '../../../assets/images/user/09.jpg'
import user10 from '../../../assets/images/user/10.jpg'
import user11 from '../../../assets/images/user/11.jpg'
import user12 from '../../../assets/images/user/12.jpg'
import { useState, useEffect } from 'react';
import RequestCard from "./RequestCard";

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

function ProjectDetailsCard() {
  const [requests, setRequests] = useState([])

  useEffect(() => {
    setRequests([...tempRequests])
  }, [])

  return (
    <Container className="p-2">
      <div className="position-relative">
        <div className="position-fixed">
        <Card>
          <Card.Body style={{"max-height": "90vh", "overflow-y":"auto", "scrollbarWidth": 'none' }}>
          <Row md={8} className="align-items-start">
            <Col>
              <h2>Project detail</h2>
            </Col>
            <Col md={4} className="d-flex flex-row justify-content-end" style={{gap: "5px"}}>
              <button style={{width: "75px"}} className="btn btn-primary rounded-pill">Edit</button>
              <button style={{width: "80px"}} className="btn punchred-button rounded-pill">Delete</button>
            </Col>
          </Row>
          <Row className="pt-3">
            <p>
              <b>Project Title: </b>
              <br/>
              Gender studies, globalization, social movements, technology and social problems, and the impact of globalization on society
            </p>
          </Row>
          <Row className="pt-0">
            <Col>
              <b>Looking to provide:</b>
              <p>Mentorship, Growth, Investment</p>
            </Col>
            <Col>
              <b>Looking to receive:</b>
              <p>Talented individuals, Experienced candidates in the domain</p>
            </Col>
            <Col>
              <b>Collaborate with:</b>
              <p>Educational Institution</p>
            </Col>
            <Col>
              <b>Select the stakeholders:</b>
              <p>Educational Exhibition organizers</p>
            </Col>
          </Row>
          <Row className="pt-0">
            <Col>
              <b>Project start & end date:</b>
              <p>12th August 2024 - 24th January 2025</p>
            </Col>
            <Col>
              <b>Project Timeline:</b>
              <p>Semester projects (4 to 6 months)</p>
            </Col>
            <Col>
              <b>Language preferences:</b>
              <p>English, Hindi, Kannada</p>
            </Col>
            <Col>
              <b>Location Type:</b>
              <p>Onsite</p>
            </Col>
          </Row>
          <Row className="pt-0">
            <Col>
              <b>Service type</b>
              <p>Paid</p>
              <p>Range: ₹20k - ₹1.5L </p>
            </Col>
          </Row>
          <Row className="pt-0">
            <Col>
              <b>Physical Address of the project:</b>
              <p>Cunningham Rd, Vasanth Nagar, Bengaluru, Karnataka 560001</p>
            </Col>
          </Row>
          <Row className="pt-0">
            <p style={{textAlign: "justify"}}>
              <b>Objective of the project: </b>
              <br/>
              In this contemporary era of rapid globalization, the intricate interplay between various social dynamics shapes the fabric of societies worldwide. This interdisciplinary exploration delves into the multifaceted impacts of globalization, with a particular focus on the intersections of gender studies, social movements, and technological advancements.
              <br/>
              Moving forward, the discourse navigates through the realm of social movements, which emerge as potent agents of change amidst globalization. From grassroots activism to transnational advocacy networks, social movements harness the power of collective action to address diverse socio-political issues. By analyzing the strategies, motivations, and impacts of these movements, this section illuminates their role in shaping global agendas and challenging dominant structures.
            </p>
          </Row>
          <Row className="pt-0">
            <p style={{textAlign: "justify"}}>
              <b>Project Description: </b>
              <br/>
              In this contemporary era of rapid globalization, the intricate interplay between various social dynamics shapes the fabric of societies worldwide. This interdisciplinary exploration delves into the multifaceted impacts of globalization, with a particular focus on the intersections of gender studies, social movements, and technological advancements.
              <br/>
              The journey begins with an examination of gender studies in the context of globalization. As societies become increasingly interconnected, traditional gender roles and norms encounter both challenges and transformations. This section scrutinizes how globalization influences gender identity, roles, and power dynamics, offering insights into the complexities of gender relations in a globalized world.
              <br/>
              Moving forward, the discourse navigates through the realm of social movements, which emerge as potent agents of change amidst globalization. From grassroots activism to transnational advocacy networks, social movements harness the power of collective action to address diverse socio-political issues. By analyzing the strategies, motivations, and impacts of these movements, this section illuminates their role in shaping global agendas and challenging dominant structures.
            </p>
          </Row>
          <Row className="pt-0">
            <p style={{textAlign: "justify"}}>
              <b>Benefiriaries: </b>
              <br/>
              Moving forward, the discourse navigates through the realm of social movements, which emerge as potent agents of change amidst globalization. From grassroots activism to transnational advocacy networks, social movements harness the power of collective action to address diverse socio-political issues. By analyzing the strategies, motivations, and impacts of these movements, this section illuminates their role in shaping global agendas and challenging dominant structures.
            </p>
          </Row>
          <Row className="pt-0">
            <p style={{textAlign: "justify"}}>
              <b>Special Notes: </b>
              <br/>
              Please come on time
            </p>
          </Row>
          <Row className="pt-0">
            <p style={{textAlign: "justify"}}>
              <b>Attachments: </b>
              <br/>
              <a href="#">Project brochure.pdf</a>
            </p>
          </Row>
          <Row className="my-5">
            <Col md={12}>
              <h2>Requests: </h2>
              <div className="d-flex flex-column justify-content-start mt-3" style={{gap: "10px"}}>
                {
                  requests && Array.isArray(requests) && requests.map((item, index) => (
                    <RequestCard  
                      key={index}
                      data={item}
                      type="received"
                    />
                  ))
                }
              </div>
            </Col>
          </Row>
          </Card.Body>
        </Card>
        </div>
      </div>
    </Container>
  );
}

export default ProjectDetailsCard;
