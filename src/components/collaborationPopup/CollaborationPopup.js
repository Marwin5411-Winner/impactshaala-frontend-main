import { useState, useEffect } from 'react';
import { Modal, Button, Tab, Col, Nav, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CollaborationPopup = ({show, handleClose}) => {
	const [data, setData] = useState({
		myProjects: [
			"First",
			"Second",
			"Third",
			"Fourth",
		],
		otherProjects: [
			"Fourth",
			"Fifth",
			"Sixth",
			"Seventh",
		]
	});
	const [stage, setStage] = useState(1)
	const [selectedIndex, setSelectedIndex] = useState(null)

	useEffect(() => {
		setStage(1)
		setSelectedIndex(null)
	}, [show])

	const handleSubmit = () => {
		handleClose();
	}

	return (
		<div
		className="modal show"
		style={{ display: 'block', position: 'initial' }}
	>
		<Modal show={show} onHide={handleClose} centered>
			<Modal.Header closeButton>
				{
					stage == 1 && (
						<h2>Collaborate on</h2>
					)
				}
				{
					stage == 2 && (
						<h2>Collaborate</h2>
					)
				}
			</Modal.Header>
			<Modal.Body>
				{
					stage == 1 && <Section1 nextStage={() => setStage(2)}/>
				}
				{
					stage == 2 && (
						<Section2 
							data={data} 
							selected={selectedIndex} 
							handleSubmit={handleSubmit} 
							selectProject={(index) => setSelectedIndex(index)}
						/>
					)
				}
			</Modal.Body>
		</Modal>
	</div>
	)
}

const Section1 = ({nextStage}) => {
	return (
		<div>
			<div className="d-flex flex-row justify-content-center mt-3 mb-5" style={{gap: "20px"}}>
				<button className="btn btn-primary rounded-pill px-3" onClick={() => nextStage()}>Existing Project</button>
				<Link to="/posts/create-projects-initiatives-post" className="btn btn-outline-primary rounded-pill px-5">New Project</Link>
			</div>
		</div>
	)
}

const Section2 = ({
	data,
	handleSubmit,
	selectProject,
	selected
}) => {
	return (
		<Tab.Container defaultActiveKey="yourproject">
			<Card className="p-0">
        <Card.Body className="p-0">
          <div className="user-tabing">
            <Nav as="ul" variant="pills" className="d-flex align-items-center justify-content-center profile-feed-items p-0 m-0">
              <Nav.Item as="li" className=" col-12 col-sm-6 p-0">
                <Nav.Link  href="#pills-friends-tab"  eventKey="yourproject" role="button" className="text-center p-3" onClick={() => selectProject(null)}>Your Project</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li" className="col-12 col-sm-6 p-0">
                <Nav.Link  href="#pills-photos-tab"  eventKey="otherproject" role="button" className="text-center p-3" onClick={() => selectProject(null)}>Krishna's Projects</Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </Card.Body>
      </Card>
			<Col sm={12}>
				<Tab.Content>
					<Tab.Pane eventKey="yourproject">
						<ul className="px-0">
							{
								data.myProjects && data.myProjects.map((item, index) => (
									<li key={index} onClick={() => selectProject(index)} className={`d-flex flex-row py-2 px-2 border ${index == selected?"border-primary": ""}`} style={{cursor: "pointer"}}>
										<span className="px-2">{index + 1}</span>
										<span className="px-2" style={{flexGrow: "1"}}>{item}</span>
										<Form.Check type="checkbox" checked={index == selected}/>
									</li>
								))
							}
						</ul>
					</Tab.Pane>
					<Tab.Pane eventKey="otherproject">
						<ul className="px-0">
							{
								data.otherProjects && data.otherProjects.map((item, index) => (
									<li key={index} onClick={() => selectProject(index)} className={`d-flex flex-row py-2 px-2 border ${index == selected?"border-primary": ""}`} style={{cursor: "pointer"}}>
										<span className="px-2">{index + 1}</span>
										<span className="px-2" style={{flexGrow: "1"}}>{item}</span>
										<Form.Check type="checkbox" checked={index == selected}/>
									</li>
								))
							}
						</ul>
					</Tab.Pane>
					<div className="d-flex flex-row justify-content-center" style={{gap: "10px"}}>
						<button 
							className={`btn btn-primary rounded-pill`} 
							style={{width: "100px"}} 
							onClick={handleSubmit}
							disabled={selected == null}
						>
							Submit
						</button>
						<button className="btn btn-outline-primary rounded-pill" style={{width: "100px"}} onClick={() => selectProject(null)}>Clear</button>
					</div>
				</Tab.Content>
			</Col>
		</Tab.Container>
	)
}

export default CollaborationPopup;