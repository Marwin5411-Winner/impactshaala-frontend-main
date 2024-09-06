import PageTemplate2 from "../../../components/PageTemplate2";
import { Col, Row, Container } from 'react-bootstrap';
import Collaborator from "./Collaborator";
import ProjectDetailsCard from "./ProjectDetails";

const MyProject = () => {

	return (
		<PageTemplate2>
        <Container fluid>
              <Row>
                <Col xs={12} lg={4}>
                  <Collaborator />
                  <Collaborator />
                  <Collaborator />
                  <Collaborator />
                  <Collaborator />
                  <Collaborator />
                </Col>
                <Col xs={12} lg={8} className="">
                  <Container className="p-2">
                    <div className="position-relative">
                      <div className="">
                        <ProjectDetailsCard />
                      </div>
                    </div>
                  </Container>
                </Col>
              </Row>
           
        </Container>
		</PageTemplate2>
	)
}

export default MyProject;