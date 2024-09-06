import { Tab, Row, Col, Card } from "react-bootstrap";

const AboutSection = ({ data }) => {
  const array = [];
  if (data.address) array.push(data.address);
  if (data.city) array.push(data.city);
  if (data.district) array.push(data.district);
  if (data.state) array.push(data.state);
  if (data.country) array.push(data.country);
  if (data.pinCode) array.push(data.pinCode);

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="about1">
      <Row>
        <Col md={12} className="">
          <Card>
						<Card.Header>
							<h5>Additional Info</h5>
						</Card.Header>
						<Card.Body>
							{data.accountType === "ORGANIZATION" && <OrgInfo data={data}/>}
							{data.accountType === "INDIVIDUAL" && data.userType1 === "Working Professional" && (<WorkInfo data={data}/>)}
							{data.accountType === "INDIVIDUAL" && data.userType1 === "Student" && (<StudentInfo data={data}/>)}
							<GeneralInfo data={data} />
						</Card.Body>
					</Card>
        </Col>
      </Row>
    </Tab.Container>
  );
};

const GeneralInfo = ({data}) => {
	return (
		<div>
			<Stat label="User Type 1" value={data.userType1} />
			<Stat label="User Type 2" value={data.userType2} />
			<Stat label="User Type 3" value={data.userType3} />
			<Stat label="User Type 4" value={data.userType4} />
			<Stat label="User Type 5" value={data.userType5} />
			<Stat label="Account Creation Date" value={data.createdAt} />
		</div>
	)
}

const OrgInfo = ({data}) => {
	return (
		<div>
			<Stat label="Founding Year" value={data.foundingYear}/>
			<Stat label="Location" value={data.location}/>
			<Stat label="Industry" value={data.industry}/>
			<Stat label="Organization Size" value={data.organizationSize}/>
		</div>
	)
}

const WorkInfo = ({data}) => {
	return (
		<div>
			<Stat lobel="Location" value={data.location}/>
			<Stat label="Industry" value={data.industry}/>		
			{
				data.workExperience && Array.isArray(data.workExperience) && data.workExperience.length > 0 && (
					<Stat label="Work Experience" value={
						<table className="w-100" style={{tableLayout: "fixed"}}>
							<thead>
								<tr style={{borderBottom: "1px solid #ccc"}}>
									<td style={{paddingBottom: "5px"}}>Name Of Organization</td>
									<td style={{paddingBottom: "5px"}}>Designation</td>
									<td style={{paddingBottom: "5px"}}>Duration</td>
								</tr>
							</thead>
							<tbody>
								{
									data.workExperience.map((exp,index) => (
										<tr key={index}>
											<td>{exp.nameOfOrganization}</td>
											<td>{exp.designation}</td>
											<td>{exp.duration}</td>
										</tr>
									))
								}
							</tbody>
						</table>
					} />
				)
			}
		</div>
	)
}

const StudentInfo = ({data}) => {
	return (
		<div>
			<Stat label="Highest Level Of Education" value={data.highestEducation}/>
			<Stat label="Educational Institution" value={data.educationalInstitution} />
			<Stat label="Course / Stream" value={data.course} />
		</div>
	)
}

const Stat = ({label, value}) => {
	return value && (
		<Row className="mb-2">
			<div className="col-3">
				{label}
			</div>
			<div className="col-9">
				{value}
			</div>
		</Row>
	)
}

export default AboutSection;
