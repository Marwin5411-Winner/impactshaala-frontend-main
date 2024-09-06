import {useState, useEffect} from 'react'
import { Form, Row, Col, Button, Card } from 'react-bootstrap'
import CustomInput from '../CustomInput'
import {ReactComponent as DeleteIcon} from '../../assets/images/delete.svg';
import MultiFileInput from './MultiFileInput';
import { createAccomplishment } from '../../api/accomplishments';
import { useNavigate } from 'react-router-dom';
import { BsTrash } from 'react-icons/bs';

const defaultData = {
	projectTitle: "",
	collaborations: "",
	startDate: "",
	endDate: "",
	primaryObjective: "",
	keyDeliverables: "",
	approach: "",
	activities: [""],
	challenges: [""],
	educationalImpact: "",
	selectInnovativeApproach: "",
	innovativeApproach: "",
	isSustainable: "",
	impactLevel: "",
	impactLevelText: "",
	lastingImpact: "",
	lastingImpactText: "",
	projectAdequacy: "",
	projectAdequacyText: "",
	achievements: [""],
	testimonials: [""],
	images: [""],
	videos: [""],
	documents: [""],
}

const AccomplishmentsForm = () => {
	const navigate = useNavigate()
	const [formData, setFormData] = useState(defaultData)
	const [errors, setErrors] = useState(defaultData)
	const [loading, setLoading] = useState(false)

	const convertToBase64 = async (file, resolve, reject) => {
		if(file) {
			const reader = new FileReader()
			reader.onload = (event) => resolve(event.target.result)
			reader.onerror = (error) => reject(error)
			reader.readAsDataURL(file)
		} else resolve("")
	}

	const validateSubmission = () => {
		if(!formData.projectTitle) {setErrors(state => ({...state, projectTitle: "Project Title is Mandatory"})); return false;}
		if(!formData.collaborations) {setErrors(state => ({...state, collaborations: "Collaborations is Mandatory"})); return false;}
		if(!formData.startDate) {setErrors(state => ({...state, startDate: "Start Date is Mandatory"})); return false}
		if(!formData.endDate) {setErrors(state => ({...state, endDate: "End Date is Mandatory"})); return false;}
		if(!formData.primaryObjective) {setErrors(state => ({...state, primaryObjective: "Primary Objective is Mandatory"})); return false;}
		if(!formData.keyDeliverables) {setErrors(state => ({...state, keyDeliverables: "Key Deliverables is Mandatory"})); return false;}
		if(!formData.approach) {setErrors(state => ({...state, approach: "Approach is Mandatory"})); return false;}
		if(!formData.educationalImpact) {setErrors(state => ({...state, educationalImpact: "Educational Impact is Mandatory"})); return false;}
		if(formData.activities.includes("")) {
			const index = formData.activities.indexOf("")
			setErrors(state => {
				const tempErrors = [...state.activities];
				tempErrors[index] = "This Field is Mandatory"
				return {...state, activities: tempErrors}
			})
			return false;
		}
		if(formData.challenges.includes("")) {
			const index = formData.challenges.indexOf("")
			setErrors(state => {
				const tempErrors = [...state.challenges];
				tempErrors[index] = "This Field is Mandatory"
				return {...state, challenges: tempErrors}
			})
			return false;
		}
		if(formData.achievements.includes("")) {
			const index = formData.achievements.indexOf("")
			setErrors(state => {
				const tempErrors = [...state.achievements];
				tempErrors[index] = "This Field is Mandatory"
				return {...state, achievements: tempErrors}
			})
			return false;
		}
		if(formData.testimonials.includes("")) {
			const index = formData.testimonials.indexOf("")
			setErrors(state => {
				const tempErrors = [...state.testimonials];
				tempErrors[index] = "This Field is Mandatory"
				return {...state, testimonials: tempErrors}
			})
			return false;
		}
		if(formData.selectInnovativeApproach === "Yes" && !formData.innovativeApproach) {setErrors(state => ({...state, innovativeApproach: "Innovative Approach is Mandatory"})); return false}
		if(formData.isSustainable === "Yes" && formData.impactLevel === "Others" && !formData.impactLevelText) {setErrors(state => ({...state, impactLevelText: "Impact Level is Mandatory"})); return false;}
		if(formData.isSustainable === "Yes" && formData.lastingImpact === "Others" && !formData.lastingImpactText) {setErrors(state => ({...state, lastingImpactText: "Lasting Impact is Mandatory"})); return false;}
		if(formData.isSustainable === "Yes" && formData.projectAdequacy === "Others" && !formData.projectAdequacyText) {setErrors(state => ({...state, projectAdequacyText: "Project Adequacy is Mandatory"})); return false;}
		return true;
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		const validForm = validateSubmission()
		if(!validForm) return window.alert("Please resolve all errors");

		const error = Object.keys(errors).find((key) => {
			if(typeof errors[key] === "string") return !!errors[key]
			else return errors[key].find(item => !!item)
		})
		if(error) return window.alert("Please clear all errors in the form")

		const data = {...formData}

		const imagesPromises = data.images.map(image => new Promise((resolve, reject) => convertToBase64(image, resolve, reject)))
		const videosPromises = data.videos.map(video => new Promise((resolve, reject) => convertToBase64(video, resolve, reject)))
		const docPromises = data.documents.map(doc => new Promise((resolve, reject) => convertToBase64(doc, resolve, reject)))
		
		data.images = await Promise.all(imagesPromises)
		data.videos = await Promise.all(videosPromises)
		data.documents = await Promise.all(docPromises)

		if(data.images.filter(item => !!item).length === 0) delete data.images;
		if(data.videos.filter(item => !!item).length === 0) delete data.videos;
		if(data.documents.filter(item => !!item).length === 0) delete data.documents;

		if(data.images) data.images = data.images.filter(item => !!item)
		if(data.videos) data.videos = data.videos.filter(item => !!item)
		if(data.documents) data.documents = data.documents.filter(item => !!item)

		if(data.impactLevel === "Others")data.impactLevel = data.impactLevelText;
		if(data.lastingImpact === "Others")data.lastingImpact = data.lastingImpactText;
		if(data.projectAdequacy === "Others")data.projectAdequacy = data.projectAdequacyText;		

		setLoading(true)
		try {
			const res = await createAccomplishment(data)
			setLoading(false)
			if(typeof res.errRes === "string") {
				console.log(res.errRes)
				return window.alert(res.errRes)
			}
			if(res.errRes && res.errRes.data && res.errRes.data.message) {
				window.alert(res.errRes.data.message)
			}
			if(res.data && res.data.success) {
				navigate("/dashboard/success", {
					state: {
						prompt: res.data.success,
						path: "/dashboard/app/profile#accomplishments-tab",
					}
				})
			}
		}
		catch(err) {
			console.log(err)
			setLoading(false)
		}
	}	

	const validate = ({value, name}) => {
		if(value.length !== value.trim().length) setErrors(state => ({...state, [name]: "Please Remove Leading And Trailing Spaces"}))
		if(value.length === value.trim().length) setErrors(state => ({...state, [name]: ""}))
	}

	const handleChange = (e) => {
		if(e.target.value.length > 200) return;

		if(e.target.name === "startDate" && formData.endDate) {
			const startDate = new Date(e.target.value)
			const endDate = new Date(formData.endDate)
			if(startDate > endDate) return window.alert("Start Date must be prior to end date")
		}

		if(e.target.name === "endDate" && formData.startDate) {
			const startDate = new Date(formData.startDate)
			const endDate = new Date(e.target.value)
			if(startDate > endDate) return window.alert("Start Date must be prior to end date")
		}

		if(e.target.name === "isSustainable" && e.target.value === "No") 
			setErrors(state => (
				{
					...state, 
					impactLevel: "", 
					impactLevelText: "",
					lastingImpact: "",
					lastingImpactText: "",
					projectAdequacy: "",
					projectAdequacyText: ""
				}
			))
		if(e.target.name === "selectInnovativeApproach" && e.target.value === "No") setErrors(state => ({...state, innovativeApproach: ""}))

		validate(e.target)

		setFormData(state => ({...state, [e.target.name]: e.target.value}))
	}

	const handleAddToArray = (name) => {
		setFormData((state) => ({
			...state,
			[name]: [...state[name], ""],
		}))
		setErrors((state) => ({
			...state,
			[name]: [...state[name], ""],
		}))
	}

	const arrayValidate = ({name, value, index}) => {
		if(value.length !== value.trim().length) setErrors(state => {
			const tempErrors = state[name]
			tempErrors[index] = "Please Remove Leading And Trailing Spaces"
			return ({...state, [name]: tempErrors})
		})
		if(value.length === value.trim().length) setErrors(state => {
			const tempErrors = [...state[name]]
			tempErrors[index] = ""
			return ({...state, [name]: tempErrors})
		})
	}

	const handleArrayChange = (e, index) => {
		arrayValidate({name: e.target.name, value: e.target.value, index})
		setFormData((state) => {
			const tempArray = [...state[e.target.name]]
			tempArray[index] = e.target.value;
			return {
				...state,
				[e.target.name]: tempArray
			}
		})
	}

	const handleFileChange = (e, index, type) => {
		const file = e.target.files[0];
		if(file) {
			if(type === "videos" && !file.type.includes("video")) return window.alert("Only videos are allowed");
			if(type === "images" && !file.type.includes("image")) return window.alert("Only images are allowed");
			if(type === "documents" && !file.type.includes("")) return window.alert("Only pdfs are allowed");

			setErrors(state => ({...state, misc: ""}))
			if(type === "videos" && file.size > 1024 * 1024 * 2) return window.alert("Please select a video less than 2 MB");
			if(type === "images" && file.size > 1024 * 512) return window.alert("Please select an image less than 500 KB");
			if(type === "documents" && file.size > 1024 * 512) return window.alert("Please select a document less than 500 KB");

			const updatedFiles = [...formData[type]];
			updatedFiles[index] = file;
			setFormData(state => ({
				...state,
				[type]: [...updatedFiles],
			}))
		}
	}

	const handleAddFile = (key, maxLength) => {
		if(formData[key].length < maxLength)
			setFormData(state => ({
				...state,
				[key]: [...state[key], ""],
			}))
	}

	const handleRemoveFile = (key, index) => {
		setFormData(state => {
			const tempData = {...formData}
			tempData[key] = tempData[key].filter((item, ind) => ind !== index)
			return {...tempData}
		})
	}

	const handleRemoveFromArray = (key, index) => {
		setFormData(state => {
			const tempArray = [...state[key]]
			tempArray.splice(index, 1)
			return {...state, [key]: tempArray}
		})
	}

	return loading?(
    <div className="text-center d-flex flex-column justify-content-center" style={{minHeight: "60vh"}}>
      <div className="text-center">
        <img src="/loader.svg" alt="Loading..."/>
      </div>
    </div>
	):(
		<Card>
			<Card.Header>
				<h5>Add New Accomplishment</h5>
			</Card.Header>
			<Card.Body>
				<Form onSubmit={handleSubmit} noValidate>
					<Row className="">
						<Col md="6">
							<CustomInput 
								type="text"
								label="Project Title"
								placeholder="Enter The Project Title"
								value={formData.projectTitle}
								onChange={handleChange}
								name="projectTitle"
								error={errors.projectTitle}
								required
							/>
						</Col>
						<Col md="6">
							<CustomInput 
								type="text"
								label="Collaborations"
								placeholder="Enter The Names Of All Participants"
								value={formData.collaborations}
								onChange={handleChange}
								name="collaborations"
								error={errors.collaborations}
								required
							/>
						</Col>
						<Col md="6">
							<CustomInput 
								type="date"
								label="Start Date"
								placeholder="Enter The Start Date Of The Project"
								value={formData.startDate}
								onChange={handleChange}
								name="startDate"
								error={errors.startDate}
								required
							/>
						</Col>
						<Col md="6">
							<CustomInput 
								type="date"
								label="End Date"
								placeholder="Enter The End Date Of The Project"
								value={formData.endDate}
								onChange={handleChange}
								name="endDate"
								error={errors.endDate}
								required
							/>
						</Col>
						<Col md="6">
							<CustomInput 
								type="text"
								label="Primary Objective"
								placeholder="Enter The Main Aim Of The Project"
								value={formData.primaryObjective}
								onChange={handleChange}
								name="primaryObjective"
								error={errors.primaryObjective}
								required
							/>
						</Col>
						<Col md="6">
							<CustomInput 
								type="text"
								label="Key Deliverables"
								placeholder="Enter The Desired Outcomes Of The Project"
								value={formData.keyDeliverables}
								onChange={handleChange}
								name="keyDeliverables"
								error={errors.keyDeliverables}
								required
							/>
						</Col>
						<Col md="12">
							<CustomInput 
								as="textarea"
								type="text"
								label="Approach"
								placeholder="Enter A Brief Description Of The Stategies Used"
								value={formData.approach}
								onChange={handleChange}
								name="approach"
								error={errors.approach}
								required
							/>
						</Col>
						<Col md="12" className="my-3">
							<h5>Activities Undertaken</h5>
						</Col>
						{
							formData.activities && Array.isArray(formData.activities) && formData.activities.map((activity, index) => (
								<Col md="6" className="d-flex flex-row justify-content-between">
									<div style={{flexGrow: "1"}}>
										<CustomInput 
											type="text"
											label={`Activity ${index + 1}`}
											placeholder="Enter The Activity Performed"
											value={activity}
											onChange={(e) => handleArrayChange(e, index)}
											name="activities"
											error={errors.activities[index]}
											required
										/>
									</div>
									<div className="d-flex flex-column justify-content-start" style={{paddingTop: "29px"}}>
										<button className="btn btn-danger" onClick={() => handleRemoveFromArray("activities", index)} type="button">
											<BsTrash style={{width: "30px", hegiht: "30px"}} />
										</button>
									</div>
								</Col>
							))
						}
						<Col md="12">
							<Button type="button" onClick={() => handleAddToArray("activities")}>Add Activity</Button>
						</Col>
						<Col md="12" className="my-3">
							<h5>Challenges Faced</h5>
						</Col>
						{
							formData.challenges && Array.isArray(formData.challenges) && formData.challenges.map((challenge, index) => (
								<Col md="6" className="d-flex flex-row justify-content-between">
									<div style={{flexGrow: "1"}}>
										<CustomInput 
											type="text"
											label={`Challenge ${index + 1}`}
											placeholder="Enter The Challenge Faced"
											value={challenge}
											onChange={(e) => handleArrayChange(e, index)}
											name="challenges"
											error={errors.challenges[index]}
											required
										/>
									</div>
									<div className="d-flex flex-column justify-content-start" style={{paddingTop: "29px"}}>
										<button className="btn btn-danger" type="button" onClick={() => handleRemoveFromArray("challenges", index)}>
											<BsTrash style={{width: "30px", hegiht: "30px"}}/>
										</button>
									</div>
								</Col>
							))
						}
						<Col md="12" className="mb-3">
							<Button type="button" onClick={() => handleAddToArray("challenges")}>Add Challenge</Button>
						</Col>
						<Col md="6"> 
							<CustomInput 
								type="text"
								label="Educational Impact"
								placeholder="Write A Brief About The Educational Impact The Project Has"
								value={formData.educationalImpact}
								onChange={handleChange}
								name="educationalImpact"
								required
							/>
						</Col>
						<Col md="6"></Col>
						<Col md="6">
							<Form.Group className="form-group">
								<Form.Label>Was there an innovative approach or solution applied during the project?</Form.Label>
								<Form.Select 
									value={formData.selectInnovativeApproach}
									onChange={handleChange}
									name="selectInnovativeApproach"
								>
									<option value="">Select Yes Or No</option>
									<option value="Yes">Yes</option>
									<option value="No">No</option>
								</Form.Select>
							</Form.Group>
						</Col>
						<Col md="6">
							<CustomInput 
								type="text"
								label="Describe The Innovation"
								placeholder="Enter A Brief About The Innovation"
								value={formData.innovativeApproach}
								onChange={handleChange}
								name="innovativeApproach"
								error={errors.innovativeApproach}
								disabled={formData.selectInnovativeApproach !== "Yes"}
								required={formData.selectInnovativeApproach === "Yes"}
							/>
						</Col>
						<Col md="6">
							<Form.Group className="form-group">
								<Form.Label>Is Your Project Sustainable?</Form.Label>
								<Form.Select
									value={formData.isSustainable}
									onChange={handleChange}
									name="isSustainable"
								>
									<option value="">Select Yes Or No</option>
									<option value="Yes">Yes</option>
									<option value="No">No</option>
								</Form.Select>
							</Form.Group>
						</Col>
					</Row>
					{
						formData.isSustainable === "Yes" && (
							<Row>
								<Col md="6">
									<Form.Group className="form-group">
										<Form.Label>To what extent do you believe the project will have a lasting impact on its target audience or community?</Form.Label>
										<Form.Select
											value={formData.impactLevel}
											onChange={handleChange}
											name="impactLevel"
											required
										>
											<option value="">Select Level Of Impact</option>
											<option value="Minimal Impact: The project may have a slight effect, but it is unlikely to result in any significant or lasting changes within the target audience or community.">
												Minimal Impact: The project may have a slight effect, but it is unlikely to result in any significant or lasting changes within the target audience or community.
											</option>
											<option value="Moderate Impact: I think the project will have a moderate impact, contributing to some noticeable changes or improvements within the target audience or community.">
												Moderate Impact: I think the project will have a moderate impact, contributing to some noticeable changes or improvements within the target audience or community.
											</option>
											<option value="Significant Impact: The project is likely to have a significant impact, leading to substantial changes or improvements within the target audience or community.">
												Significant Impact: The project is likely to have a significant impact, leading to substantial changes or improvements within the target audience or community.
											</option>
											<option value="Transformative Impact: I believe the project will have a transformative impact, fundamentally changing or significantly improving aspects of the target audience or community in a lasting way.">
												Transformative Impact: I believe the project will have a transformative impact, fundamentally changing or significantly improving aspects of the target audience or community in a lasting way.
											</option>
											<option value="Others">Others</option>
										</Form.Select>
									</Form.Group>
								</Col>
								<Col md="6">
									{
										formData.impactLevel === "Others" && (
											<div>
												<div style={{width: "10px", height: "22px"}}></div>
												<CustomInput 
													label="Impact Level"
													placeholder="Enter The Impact Level Your Project Has"
													value={formData.impactLevelText}
													onChange={handleChange}
													name="impactLevelText"
													error={errors.impactLevelText}
													required
												/>
											</div>
										)
									}
								</Col>
								<Col md="6">
									<Form.Group className="form-group">
										<Form.Label>For how much time will the project have a lasting impact on its target audience or community?</Form.Label>
										<Form.Select
											value={formData.lastingImpact}
											onChange={handleChange}
											name="lastingImpact"
											required
										>
											<option value="">
												Select The How Long The Project Affect The World In The Future
											</option>
											<option value="Short-Term: The project will have an impact for less than 1 year.">
												Short-Term: The project will have an impact for less than 1 year.
											</option>
											<option value="Medium-Term: The project will have an impact for 1 to 3 years.">
												Medium-Term: The project will have an impact for 1 to 3 years.
											</option>
											<option value="Long-Term: The project will have an impact for 3 to 5 years.">
												Long-Term: The project will have an impact for 3 to 5 years.
											</option>
											<option value="Very Long-Term: The project will have an impact for 5 to 10 years.">
												Very Long-Term: The project will have an impact for 5 to 10 years.
											</option>
											<option value="Indefinite: The project will have a lasting impact for over 10 years, potentially indefinitely.">
												Indefinite: The project will have a lasting impact for over 10 years, potentially indefinitely.
											</option>
											<option value="Others">Others</option>
										</Form.Select>
									</Form.Group>
								</Col>
								<Col md="6" className="d-flex flex-column justify-content-end">
									{
										formData.lastingImpact === "Others" && (
											<div>
												<div style={{width: "10px", height: "22px"}}></div>
												<CustomInput 
													label="Lasting Impact"
													placeholder="Enter How Long Your Project Will Impact"
													value={formData.lastingImpactText}
													onChange={handleChange}
													name="lastingImpactText"
													error={errors.lastingImpactText}
													required
												/>
											</div>
										)
									}
								</Col>
								<Col md="6">
									<Form.Group className="form-group">
										<Form.Label>How adequately are resources available to continue or maintain the project over time?</Form.Label>
										<Form.Select
											value={formData.projectAdequacy}
											onChange={handleChange}
											name="projectAdequacy"
											required
										>
											<option value="">
												Select How Adequate Your Project Is
											</option>
											<option value="Somewhat Inadequate: Resources are somewhat insufficient, with only minimal support available, making it challenging to ensure the project's continuity or maintenance.">
												Somewhat Inadequate: Resources are somewhat insufficient, with only minimal support available, making it challenging to ensure the project's continuity or maintenance.
											</option>
											<option value="Adequately Provided: Resources are adequately provided for now, but there might be concerns about long-term sustainability or the ability to address unforeseen challenges.">
												Adequately Provided: Resources are adequately provided for now, but there might be concerns about long-term sustainability or the ability to address unforeseen challenges.
											</option>
											<option value="Well-Resourced: Resources are well-allocated, ensuring the project can continue or be maintained effectively over time, with a reasonable buffer for unexpected needs.">
												Well-Resourced: Resources are well-allocated, ensuring the project can continue or be maintained effectively over time, with a reasonable buffer for unexpected needs.
											</option>
											<option value="Exceptionally Well-Resourced: Resources are exceptionally abundant and well-managed, guaranteeing the project's sustainability and adaptability to future challenges or expansions.">
												Exceptionally Well-Resourced: Resources are exceptionally abundant and well-managed, guaranteeing the project's sustainability and adaptability to future challenges or expansions.
											</option>
											<option value="Others">Others</option>
										</Form.Select>
									</Form.Group>
								</Col>
								<Col md="6" className="d-flex flex-column justify-content-end">
									{
										formData.projectAdequacy === "Others" && (
											<div>
												<div style={{width: "10px", height: "22px"}}></div>
												<CustomInput 
													label="Project Adequacy"
													placeholder="Enter Your Project Adequacy"
													value={formData.projectAdequacyText}
													onChange={handleChange}
													name="projectAdequacyText"
													error={errors.projectAdequacyText}
													required
												/>
											</div>
										)
									}
								</Col>
							</Row>
						)	
					}
					<Row>
						<Col md="12" className="my-3">
							<h5>Achievements</h5>
						</Col>
						{
							formData.achievements && Array.isArray(formData.achievements) && formData.achievements.map((achievement, index) => (
								<Col md="6" className="d-flex flex-row justify-content-between">
									<div style={{flexGrow: "1"}}>
										<CustomInput 
											label={`Achievement ${index + 1}`}
											placeholder="Enter Your Achievement"
											value={achievement}
											onChange={(e) => handleArrayChange(e, index)}
											name="achievements"
											error={errors.achievements[index]}
											required
										/>
									</div>
									<div className="d-flex flex-column justify-content-start" style={{paddingTop: "29px"}}>
										<button className="btn btn-danger" onClick={() => handleRemoveFromArray("achievements", index)} type="button">
											<BsTrash style={{width: "30px", hegiht: "30px"}} />
										</button>
									</div>
								</Col>
							))
						}
						<Col md="12" className="mb-2">
							<Button type="button" onClick={() => handleAddToArray("achievements")}>Add Achievement</Button>
						</Col>
						<Col md="12" className="my-3">
							<h5>Testimonials / Quotes</h5>
						</Col>
						{
							formData.testimonials && Array.isArray(formData.testimonials) && formData.testimonials.map((testimonial, index) => (
								<Col md="6" className="d-flex flex-row justify-between">
									<div style={{flexGrow: "1"}}>
										<CustomInput 
											label={`Testimonial ${index + 1}`}
											placeholder="Enter Testimonial"
											value={testimonial}

											onChange={(e) => handleArrayChange(e, index)}
											name="testimonials"
											error={errors.testimonials[index]}
											required
										/>
									</div>
									<div className="d-flex flex-column justify-content-start" style={{paddingTop: "29px"}}>
										<button className="btn btn-danger" onClick={() => handleRemoveFromArray("testimonials", index)} type="button">
											<BsTrash style={{width: "30px", hegiht: "30px"}}/>
										</button>
									</div>
								</Col>
							))
						}
						<Col md="12" className="mb-2">
							<Button type="button" onClick={() => handleAddToArray("testimonials")}>Add Testimonial</Button>
						</Col>
					</Row>

					<Row>
						<Col md="12" className="my-3">
							<h5>Images</h5>
						</Col>
						<MultiFileInput 
							files={formData.images}
							accept=".png, .jpg, .jpeg, .webp"
							type="images"
							handleFileChange={handleFileChange}
							handleRemoveFile={handleRemoveFile}
						/>
            {
              formData.images.length < 10 && (
								<Col md="12">
									<Button className="mt-3 btn btn-primary" style={{maxWidth: "100px"}} type="button" onClick={() => handleAddFile("images", 10)}>Add Image</Button>
								</Col>
              )
            }
					</Row>

					<Row>
						<Col md="12" className="my-3">
							<h5>Videos</h5>
						</Col>
						<MultiFileInput 
							files={formData.videos}
							accept=".mp4"
							type="videos"
							handleFileChange={handleFileChange}
							handleRemoveFile={handleRemoveFile}
						/>
            {
              formData.videos.length < 2 && (
								<Col md="12">
									<Button className="mt-3 btn btn-primary" style={{maxWidth: "100px"}} type="button" onClick={() => handleAddFile("videos", 2)}>Add Video</Button>
								</Col>
              )
            }
					</Row>

					<Row className="mb-3">
						<Col md="12" className="my-3">
							<h5>Documents</h5>
						</Col>
						<MultiFileInput 
							files={formData.documents}
							accept=".pdf"
							type="documents"
							handleFileChange={handleFileChange}
							handleRemoveFile={handleRemoveFile}
						/>
            {
              formData.documents.length < 2 && (
								<Col md="12">
									<Button className="mt-3 btn btn-primary" style={{maxWidth: "200px"}} type="button" onClick={() => handleAddFile("documents", 2)}>Add Document</Button>
								</Col>
              )
            }
					</Row>

					<button className="btn punchred-button">Submit</button>
				</Form>
			</Card.Body>
		</Card>
	)
}

export default AccomplishmentsForm