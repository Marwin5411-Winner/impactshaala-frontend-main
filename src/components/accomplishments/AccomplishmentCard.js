import { Card, Row, Col, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BsImage, BsPlayBtnFill, BsFileEarmark } from 'react-icons/bs';

const AccomplishmentCard = ({data}) => {
	const navigate = useNavigate();

	return (
		<Card>
      <Card.Body style={{ cursor: "pointer", background: "#fff" }}>
        <div>
          <Row>
            <Col
              md={1}
              className="d-md-flex justify-content-center align-items-start"
            >
              <Image src={data.userId.profilePic} height={"50px"} width={"50px"} style={{objectFit: "cover", overflow: "hidden", borderRadius: "100px"}}/>
            </Col>
            <Col md={9} className="mt-2 mt-md-0 px-3">
              <h4
                className="font-weight-bold"
                style={{ fontWeight: 600, color: "#FBAD17" }}
              >
                {data.userId.name}
              </h4>
              <p>{data.userId.tagline}</p>
              <p className="text-secondary text-justify" style={{textAlign:"justify"}}>
                <b>Title: </b>
								{data.projectTitle}
                <br/>
              </p>
              <Row className="text-secondary mb-2">
                <Col>
                  <b>Collaborations: </b>
                  <br/>
                  {data.collaborations}
                </Col>
                <Col>
									<b>Date Range: </b>
									<br/>
									{data.startDate.split("T")[0]} - {data.endDate.split("T")[0]}
                </Col>
                <Col>
                  <b>Primary Objective: </b>
                  <br/>
                  {data.primaryObjective}
                </Col>
							</Row>
							<Row className="text-secondary mb-2">
								<Col>
                  <b>Key Deliverables: </b>
                  <br/>
                  {data.keyDeliverables}
                </Col>
								<Col>
                  <b>Approach: </b>
                  <br/>
                  {data.approach}
                </Col>
								<Col>
                  <b>Educational Impact: </b>
                  <br/>
                  {data.educationalImpact}
                </Col>
              </Row>
              <Row className="text-secondary mb-2">
                <Col>
                  <b>Activities </b><br/>
									<ol>
										{
											data.activities.map((activity, index) => (
												<li key={index}>{activity}</li>
											))
										}
									</ol>
                </Col>
								<Col>
                  <b>Challenges </b><br/>
									<ol>
										{data.challenges.map((challenge, index) => (
											<li key={index}>{challenge}</li>
										))}
									</ol>
                </Col>
              </Row>
							<Row className="text-secondary mb-2">
                <Col>
                  <b>Achievements </b><br/>
									<ol>
										{
											data.achievements.map((acheivement, index) => (
												<li key={index}>{acheivement}</li>
											))
										}
									</ol>
                </Col>
								<Col>
                  <b>Testimonials </b><br/>
									<ol>
										{
											data.testimonials.map((testimonial, index) => (
												<li key={index}>{testimonial}</li>
											))
										}
									</ol>
                </Col>
              </Row>
							<Row className="text-secondary mb-2">
								{
									data.images && Array.isArray(data.images) && data.images.length > 0 && (
										<Col>
											<b className="col-12">Images</b>
											<div className="col-12">
												{
													data.images.map((image, index) => (
														<div key={index}>
															<BsImage style={{width: "20px", height: "20px", marginRight: "10px", fill: "lightblue"}}/> 
															<span>
																Image {index + 1}
															</span>
														</div>
													))}
											</div>
										</Col>
									)
								}
								{
									data.videos && Array.isArray(data.videos) && data.videos.length > 0 && (
										<Col>
											<b className="col-12">Videos</b>
											<div className="col-12">
												{
													data.videos.map((vid, index) => (
														<div key={index}>
															<BsPlayBtnFill style={{width: "20px", height: "20px", marginRight: "10px", fill: "red"}}/> 
															<span>
																Video {index + 1}
															</span>
														</div>
													))}
											</div>
										</Col>
									)
								}
								{
									data.documents && Array.isArray(data.documents) && data.documents.length > 0 && (
										<Col>
											<b className="col-12">Documents</b>
											<div className="col-12">
												{
													data.documents.map((doc, index) => (
														<div key={index}>
															<BsFileEarmark style={{width: "20px", height: "20px", marginRight: "10px", fill: "red"}}/> 
															<span>
																Document {index + 1}
															</span>
														</div>
													))}
											</div>
										</Col>
									)
								}
							</Row>
            </Col>
          </Row>
        </div>
      </Card.Body>
    </Card>
	)
}

// const AccTable = ({singular, data}) => {
// 	return (
// 		<table className="w-100">
// 			<thead>
// 				<tr style={{fontWeight: "bold"}}>
// 					<th style={{border: "1px solid #aaa", padding: "0px 10px"}}>Sl No</th>
// 					<th style={{width: "80%", border: "1px solid #aaa", padding: "0px 10px"}}>{singular}</th>
// 				</tr>
// 			</thead>
// 			<tbody>
// 				{
// 					data.map((value, ind) => (
// 						<tr key={ind}>
// 							<td style={{border: "1px solid #aaa", padding: "0px 10px"}}>{ind + 1}</td>
// 							<td style={{border: "1px solid #aaa", padding: "0px 10px"}}>{value}</td>
// 						</tr>
// 					))
// 				}
// 			</tbody>
// 		</table>
// 	)
// }

export default AccomplishmentCard