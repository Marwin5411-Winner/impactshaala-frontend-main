import { Row, Col, Tabs, Tab } from 'react-bootstrap'
import AccomplishmentsForm from './Form'
import { useState, useEffect } from 'react'
import Badges from './Badges'
import AccomplishmentsList from './List'
import { useLocation } from 'react-router-dom'

const AccomplishmentsSection = ({accomplishments}) => {
	const location = useLocation()
	const [badges, setBadges] = useState([])

	const fetchBadges = async () => { 
		setBadges([])
	}

	useEffect(() => {
		fetchBadges()
	}, [])

	return (
		<Tabs className="w-100 d-flex flex-row justify-content-between">
			<Tab eventKey={"list"} title="Accomplishments">
				<AccomplishmentsList data={accomplishments}/>
			</Tab>
			<Tab eventKey={"badges"} title="Badges">
				<Badges badges={badges}/>
			</Tab>
			{
				location.pathname === "/dashboard/app/profile" && (
					<Tab eventKey={"form"} title="Add Accomplishments">
						<AccomplishmentsForm />
					</Tab>
				)
			}
		</Tabs>
	)
}

export default AccomplishmentsSection