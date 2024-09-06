import { useState, useEffect } from 'react';
import Header from '../../../components/partials/dashboard/HeaderStyle/header';
import Sidebar from '../../../components/partials/dashboard/SidebarStyle/sidebar';
import { Col, Row } from "react-bootstrap";
import ProfileCard from '../home/components/Profile';
import Colaberation from '../home/components/Collaboration';
import Internship from '../home/components/Internship';
import PreferenceCard from '../home/components/PreferenceCard';
import NotificationCard from './notificationCard';

// image
import user1 from "../../../assets/images/user/1.jpg";
import user2 from "../../../assets/images/user/02.jpg";
import user3 from "../../../assets/images/user/03.jpg";
import user4 from "../../../assets/images/user/04.jpg";
import user5 from "../../../assets/images/user/05.jpg";
import PageTemplate1 from '../../../components/PageTemplate1';

const notification = [
	{
		image: user1,
		name: "Mila Kunis",
		description: "Posted in UI/UX Community",
		time: "1day ago",		
	},
	{
		image: user2,
		name: "Kamal Harris",
		description: "Liked Your Photo",
		time: "2day ago",		
	},
	{
		image: user3,
		name: "Justin Timberlake",
		description: "add Story",
		time: "5 hours ago",		
	},
	{
		image: user4,
		name: "Naruto Uzumaki",
		description: "Dattebayo",
		time: "1 day ago",		
	},
	{
		image: user5,
		name: "Monkey D Luffy",
		description: "Gear 5th",
		time: "3 months ago",
	}
]


const Notification = () => {
	const [notifications, setNotifications] = useState()
	
	const getNotifications = async () => {
		setNotifications(notification)
	}

	useEffect(() => {
		getNotifications()
	}, [])

	return (
		<PageTemplate1>
			<div className="p-3 d-flex flex-column" style={{gap: "10px"}}>
				{
					notifications && Array.isArray(notifications) && notifications.length > 0 && notifications.map((item, index) => {
						return (
							<NotificationCard data={item} key={index}/>
						)
					})
				}
			</div>
		</PageTemplate1>
	)
}

export default Notification;