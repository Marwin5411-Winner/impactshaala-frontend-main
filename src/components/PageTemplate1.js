import { Col, Row } from 'react-bootstrap';
import Sidebar from './partials/dashboard/SidebarStyle/sidebar';
import Header from './partials/dashboard/HeaderStyle/header';
import ProfileCard from '../impactshaala/pages/home/components/Profile';
import Colaberation from '../impactshaala/pages/home/components/Collaboration';
import Internship from '../impactshaala/pages/home/components/Internship';
import PreferenceCard from '../impactshaala/pages/home/components/PreferenceCard';
import GiveUsAReview from '../impactshaala/pages/home/components/GiveUsAReview';
import { useEffect, useState } from 'react';
import { getLocalStorage } from '../utilities/localStorage';
import { useNavigate } from 'react-router-dom';

const PageTemplate1 = ({children}) => {
  const navigate = useNavigate()
  const [user, setUser] = useState({})

  useEffect(() => {
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
            {children}
          </Col>
          <Col lg={3} class="position-relative">
            <div className="position-fixed hide-scrollbar" style={{maxHeight: "90vh", overflowY: "auto"}}>
              {
                user && (
                  <Row className="position-relative">
                    <ProfileCard user={user}/>
                  </Row>
                )
              }
              <Row>
                <Colaberation />
              </Row>
              <Row>
                  <GiveUsAReview />
              </Row>
              <Row>
                
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </div>
	)
}

export default PageTemplate1;