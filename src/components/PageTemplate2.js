import { Col, Row } from 'react-bootstrap';
import Sidebar from './partials/dashboard/SidebarStyle/sidebar';
import Header from './partials/dashboard/HeaderStyle/header';

const PageTemplate2 = ({children}) => {
	return (
		<div className="">
      <Header />
      <Sidebar />
      <div className="main-content" style={{ overflowX: "hidden" }}>
        <Row>
          <Col lg={12}>
            {children}
          </Col>
        </Row>
      </div>
    </div>
	)
}

export default PageTemplate2;