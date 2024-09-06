import { Card, Row, Col } from 'react-bootstrap';
import AccomplishmentCard from './AccomplishmentCard';

const properties = [
	{
		key: "collaborations",
		label: "Collaboration"
	}, 
	{
		key: "startDate",
		label: "Start Date"
	}, 
	{
		key: "endDate",
		label: "End Date"
	}, 
	{
		key: "primaryObjective",
		label: "Primary Objective"
	}, 
	{
		key: "keyDeliverables",
		label: "Key Deliverables"
	}, 
	{
		key: "approach",
		label: "Approach"
	}, 
	{
		key: "educationalImpact",
		label: "Educational Impact"
	}, 
	{
		key: "activities",
		label: "Activities",
		singular: "Activity"
	}, 
	{
		key: "challenges",
		label: "Challenges",
		singular: "Challenge"
	}, 
	{
		key: "achievements",
		label: "Achievements",
		singular: "Achievement"
	}, 
	{
		key: "testimonials",
		label: "Testimonials",
		singular: "Testimonial"
	}, 
]

const AccomplishmentsList = ({data}) => {
	console.log(data)
	return (data && Array.isArray(data))? data.map((acc) => (
		<AccomplishmentCard data={acc} key={acc._id}/>
	)): (
		<h4 className="text-center" style={{minHeight: "80vh"}}>No Accomplishments Found</h4>
	)
}

export default AccomplishmentsList;