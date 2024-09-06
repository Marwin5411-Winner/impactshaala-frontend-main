import { color } from "framer-motion";
import { Button, Col, Container, Row, Card } from "react-bootstrap";
import { IoAdd } from "react-icons/io5";

function ProjectDetailsCard() {
  return (
    <Container className="p-2">
      <div className="position-relative">
        <div className="position-fixed">
        <Card>
          <Card.Body style={{"max-height": "90vh", "overflow-y":"auto", "scrollbarWidth": 'none' }}>
          <Row md={10} className="align-items-start">
            <Col>
              <h2>Project detail</h2>
            </Col>
            <Col md={2} className="">
              <Button
                variant="primary"
                className="rounded-sides"
                style={{
                  borderTopLeftRadius: "20px",
                  borderBottomLeftRadius: "20px",
                  borderTopRightRadius: "20px",
                  borderBottomRightRadius: "20px",
                }}
              >
                Easy Apply
              </Button>
              <br/>
              <sub><span style={{color: "red"}}>*</span> <a>T&C Applied</a></sub>
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

          {/*
          <div className="">
            <Row className="d-flex m-2">
              <span className="d-flex">
                <i className="icon material-symbols-outlined ">add</i>

                <span className="">
                  It is a long established fact that a reader will be distracted
                  by
                </span>
              </span>
            </Row>
            <Row className="m-2">
              <span className="d-flex">
                <i className="icon material-symbols-outlined ">add</i>
                <span className="">
                  It is a long established fact that a reader will be distracted
                  by
                </span>
              </span>
            </Row>
            <Row className="m-2">
              <span className="d-flex">
                <i className="icon material-symbols-outlined ">add</i>
                <span className="">
                  It is a long established fact that a reader will be distracted
                  by
                </span>
              </span>
            </Row>
          </div>
          <Row>
            <Col className="d-flex gap-5">
              <Button
                variant="primary"
                className="rounded-sides "
                style={{
                  borderTopLeftRadius: "20px",
                  borderBottomLeftRadius: "20px",
                  borderTopRightRadius: "20px",
                  borderBottomRightRadius: "20px",
                }}
              >
                Button for the cta
              </Button>
              <Button
                variant="outline-primary"
                className="rounded-sides"
                style={{
                  borderTopLeftRadius: "20px",
                  borderBottomLeftRadius: "20px",
                  borderTopRightRadius: "20px",
                  borderBottomRightRadius: "20px",
                }}
              >
                Non cta button
              </Button>
            </Col>
          </Row>
          <Row className="m-2">
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of It is a long established fact that a reader will
              be distracted by the readable content of a page when looking at
              its layout. The point of using Lorem Ipsum is that it has a
              more-or-less normal distribution of It is a long established fact
              that a reader will be distracted by the readable content of a page
              when looking at its layout. The point of using Lorem Ipsum is that
              it has a more-or-less normal distribution of It is a long
              established fact that a reader will be distracted by the readable
              content of a page when looking at its layout. The point of using
              Lorem Ipsum is that it has a more-or-less normal distribution of
            </p>
          </Row>
          */}
          </Card.Body>
        </Card>
        </div>
      </div>
    </Container>
  );
}

export default ProjectDetailsCard;
