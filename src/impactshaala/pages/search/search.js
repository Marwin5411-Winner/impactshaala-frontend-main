import PageTemplate2 from "../../../components/PageTemplate2"
import { Row, Col, Form } from 'react-bootstrap';
import { Link, useLocation } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useState, useEffect } from 'react';
import Card from "../../../components/Card";
import Header from "../../../components/partials/dashboard/HeaderStyle/header";
import defaultUser from '../../../assets/images/defaultUser.png';

// images
import user1 from '../../../assets/images/user/01.jpg'
import user2 from '../../../assets/images/user/02.jpg'
import user3 from '../../../assets/images/user/03.jpg'
import user4 from '../../../assets/images/user/04.jpg'
import user5 from '../../../assets/images/user/11.jpg'
import user6 from '../../../assets/images/user/12.jpg'
import { searchProfiles } from "../../../api/profile";

const defaultSearchResults = [
	{
		name: "John Wick",
		description: "First rate assassin",
		location: "Queens",
		image: user1,
	},
	{
		name: "Iron Man",
		description: "Genius, billionaire, philanthropist",
		location: "New York",
		image: user2,
	},
	{
		name: "Captain America",
		description: "Suped up ultra soldier",
		location: "not this timeline",
		image: user3,
	},
	{
		name: "Captain America",
		description: "Suped up ultra soldier",
		location: "not this timeline",
		image: user3,
	},
	{
		name: "Captain America",
		description: "Suped up ultra soldier",
		location: "not this timeline",
		image: user3,
	},
	{
		name: "Captain America",
		description: "Suped up ultra soldier",
		location: "not this timeline",
		image: user3,
	},
	{
		name: "Captain America",
		description: "Suped up ultra soldier",
		location: "not this timeline",
		image: user3,
	},
]

const Search = () => {
	const location = useLocation()
	const [searchTerm, setSearchTerm] = useState("")
	const [searchResults, setSearchResults] = useState([])
	const [filter, setFilter] = useState("")

	const handleSearch = async (term) => {
		try {
			const res = await searchProfiles({name: term})
			if(!res || res.errRes) window.alert(res.errRes.data.message)
			if(res && res.data.success) setSearchResults(res.data.data)
		} catch(err) {
			console.log(err)
		}
	}

	useEffect(() => {
		const params = new URLSearchParams(location.search)
		const search = params.get('search')
		setSearchTerm(search)
		handleSearch(search)
	}, [location.search])

	return (
		<div>
			<Header />
			<div style={{ overflowX: "hidden", padding: "0px 50px" }} className="mt-3">
				<Row>
					<Col md="12">
						<div className="d-flex">
							<h2 className="my-2 mx-2 d-flex align-items-center">
								Search results for
								<span className="ms-2" style={{fontStyle: "italic", fontWeight: "bold"}}>
									"{searchTerm}"
								</span>
							</h2>
						</div>
					</Col>
					<Col md="3">
						<Card>
							<Card.Body>
								<h4>Filter By: </h4>
								<div className="mt-2">
									<Row>
										<Col md="12" className="my-2">
                      <Form.Label> Search By: </Form.Label>
                      <Form.Select
                        onChange={(e) => setFilter(e.target.value)}
                      >
												<option value="">Select a filter</option>
                        <option value="city">City</option>
                        <option value="state">State</option>
                        <option value="country">Country</option>
                        <option value="userType">User Type</option>
                      </Form.Select>
                    </Col>
										<Col md="6" className="mt-4">
											<button className="btn btn-outline-primary w-100">
												Clear
											</button>
										</Col>
										<Col md="6" className="mt-4">
											<button className="btn btn-primary w-100">
												Filter
											</button>
										</Col>
									</Row>
								</div>
							</Card.Body>
						</Card>
					</Col>
					<Col md="9" className="h-100" style={{overflowY: "auto", overflowX: "hidden", padding: "0px 30px"}}>
						<ul className="request-list list-inline m-0 p-0">
							{
								searchResults && Array.isArray(searchResults) && searchResults.map((item, index) => {
									return (
										<li>
											<Card>
												<Card.Body>
													<div className="d-flex align-items-center  justify-content-between flex-wrap">										
														<div className="user-img img-fluid flex-shrink-0">
															<img src={item.profilePic?item.profilePic:defaultUser} alt="story-img" className="rounded-circle avatar-40" style={{objectFit: "cover"}}/>
														</div>
														<div className="flex-grow-1 ms-3">
															<h6>{item.name}</h6>
															<p className="mb-0">{item.tagline}</p>
															<span>{item.description}</span>
														</div>
														<div className="d-flex align-items-center mt-2 mt-md-0">
															<div className="confirm-click-btn">
																<Link to={`/profile-details/${item._id}`} className="me-3 btn btn-primary rounded confirm-btn">View Profile</Link>
															</div>
														</div>
													</div>
												</Card.Body>
											</Card>
										</li>
									)
								})
							}
						</ul>
					</Col>
				</Row>
			</div>
		</div>
	)
}

export default Search