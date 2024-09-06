import React from 'react'
import { Row, Col } from 'react-bootstrap'

const GenericUserInfo = ({data}) => {
	return (
		<div>
			<Row className="mb-2">
				<div className="col-3">
					User Name
				</div>
				<div className="col-9">
					{data.name}
				</div>
			</Row>
			<Row className="mb-2">
				<div className="col-3">
					Stakeholder
				</div>
				<div className="col-9">
					{
						data.userType1 === "Working Professional"?
							data.userType2:
							data.userType1
					}
				</div>
			</Row>
			{
				data.tagline && (
					<Row className="mb-2">
						<div className="col-3">
							Tagline
						</div>
						<div className="col-9">
							{data.tagline}
						</div>
					</Row>
				)
			}
			{
				data.website && (
					<Row className="mb-2">
						<div className="col-3">
							Website
						</div>
						<div className="col-9">
							{data.website}
						</div>
					</Row>
				)
			}
			{
				data.description && (
					<Row className="mb-2">
						<div className="col-3">
							User Description
						</div>
						<div className="col-9">
							{data.description}
						</div>
					</Row>
				)
			}
      {
         data.collabKeywords && Array.isArray(data.collabKeywords) && data.collabKeywords.length > 0 && (
            <Row className="mb-2">
               <div className="col-3 d-flex flex-column justify-content-center">
                  <h6>Keywords:</h6>
               </div>
               <div className="col-9 d-flex flex-row justify-content-start flex-wrap" style={{gap: "5px"}}>
               {data.collabKeywords.map((collab, index) => {
                  return (
                  <div key={index}>
                     <span className="badge text-primary border border-primary">{collab.collabTag}</span>
                  </div>
                  );
               })}
               </div>  
            </Row>
         )
      }
		</div>
	)
}

export default GenericUserInfo