import React, { useState, useEffect } from "react";
import { Col, Card, Container, Row, Form, Button } from "react-bootstrap";
import Select from "react-select";
import { BsEyeSlash, BsEye, BsPlus, BsDash } from 'react-icons/bs';
import Header from "../../../components/partials/dashboard/HeaderStyle/header";
import Sidebar from "../../../components/partials/dashboard/SidebarStyle/sidebar";
import { getCollabKeywords } from "../../../api/collaboration";
import { createPoll, editPoll } from "../../../api/polls";
import { useNavigate, useLocation } from "react-router-dom";

function EditPoll() {
	const location = useLocation()
  const navigate = useNavigate()
  const [keywords, setKeywords] = useState([])
  const [formData, setFormData] = useState({
    question: "",
    keywords: [],
    caption: "",
    duration: "1day",
    options: []
  })
  const [errors, setErrors] = useState({
    question: "",
    caption: "",
    misc: "",
    keywords: "",
    options: ["", "", "", ""]
  })
  const [selected, setSelected] = useState("SUBJECTIVE");
  const [showPopup, setShowPopup] = useState(false)


  // set value for default selection

  // handle onChange event of the dropdown
  const handleSelectCollabKeywords = (e) => {
    setFormData(state => ({
      ...state,
      keywords: Array.isArray(e) ? e.map((x) => x.value) : []
    }))
    if(e.length > 0 && e.length < 3) {
      setErrors(state => ({...state, keywords: "Please Select Atleast 3 keywords"}))
    }
    if(e.length > 5) {
      setErrors(state => ({...state, keywords: "Please Select Only 5 Keywords"}))
    }
    if(e.length >= 3 && e.length <= 5) {
      setErrors(state => ({...state, keywords: ""}))
    }
  };

  const handleChange = (e) => {
    if(e.target.name === "question" && !e.target.value) setErrors(state => ({...state, question: "Question is mandatory"}))
    if(e.target.name === "question" && e.target.value.length > 150) return
    if(e.target.name === "question" && e.target.value) setErrors(state => ({...state, question: ""}))
    setFormData(state => ({...state, [e.target.name]: e.target.value}))
  }

  // Function to handle adding an option
  const handleAddOption = () => {
    if (formData.options.length < 4) {
      setFormData(state => ({
        ...state,
        options: [...state.options, {label: "", value: ""}]
      }))
    }
  };

  // Function to handle removing an option
  const handleRemoveOption = (index) => {
    setFormData(state => ({
      ...state,
      options: [...state.options.slice(0, index), ...state.options.slice(index + 1)]
    }))
  };

  // Function to handle changing an option
  const handleOptionChange = (value, index) => {
    if(value && value.trim().length !== value.length) setErrors(state => ({...state, options: state.options.map((option, ind) => (ind === index)?"Please Remove Leading and Trailing Spaces":option)}))
    if((!!value || value.length === 0) && value.trim().length === value.length) setErrors(state => ({...state, options: state.options.map((option, ind) => (ind === index)?"":option)}))
    setFormData(state => ({
      ...state,
      options: [...state.options.slice(0, index), {labeL: value, value}, ...state.options.slice(index + 1)]
    }))
  };

  const fetchCollabKeywords = async () => {
    const resp = await getCollabKeywords()
    if(resp.errRes) {
      if(resp.errRes.response) {
        window.alert(resp.errRes.response.data.message)
        return
      }
      if(resp.errRes.message)  {
        window.alert(resp.errRes.message)
        return
      }
      console.log(resp)
      return
    }
    setKeywords(resp.data.data)
  }

  const handleUpdatePoll = async (e) => {
    e.preventDefault()
    const data = {...formData}
    data.text = formData.options?formData.options.map(item => item.value):[]

    const emptyIndex = data.text.findIndex((item) => !item.trim())

    if(data.text.length > 0 && emptyIndex !== -1) {
      setErrors(state => ({...state, options: state.options.map((option, index) => (emptyIndex === index)?"Enter A Valid Option":option)}))
      setShowPopup(false)
      return
    }
    if(!data.question || !data.question.trim()) {
      window.alert("Please Enter Valid Question")
      setErrors(state => ({...state, question: "Please Enter A Valid Question"}))
      setShowPopup(false)
      return
    }
    if(data.keywords.length < 3) {
      setErrors(state => ({...state, keywords: "Please Select Atleast 3 Keywords"}))
      setShowPopup(false)
      return;
    }

    const error = Object.keys(errors).find(key => {
      if(key === "options") return false
      else return !!errors[key]
    })
    if(error) {
      window.alert("Please resolve all errors")
      return
    }

		const id = formData._id
		delete data._id

    try {
      const resp = await editPoll(id, data)
      if(resp.errRes) {
        if(resp.errRes.response) {
          setErrors(state => ({...state, misc: resp.errRes.response.data.message}))
          return
        }
        console.log(resp)
        return
      }
      if(resp.data.success) {
        navigate("/dashboard/success", {
          state: {
            prompt: resp.data.message,
            path: "/dashboard/app/profile#polls-tab"
          }
        })	        
      }
    } catch(err) {
      console.log(err)
    }

  }

  useEffect(() => {
    fetchCollabKeywords()
		if(!location.state) navigate(-1)
			console.log(location.state)
		
		let tempData = {}
		tempData._id = location.state._id
		tempData.question = location.state.question
		tempData.caption = location.state.caption
		tempData.keywords = location.state.keywords
		
		if(location.state.options && location.state.options.length > 0) {
			tempData.options = location.state.options.map((item) => ({label: item.text, value: item.text}))
			setSelected("POLL")
		} 

		const createdDate = new Date(location.state.createdAt)
		const endDate = new Date(location.state.duration)
		const duration = Math.round((endDate - createdDate) / (24 * 60 * 60 * 1000))
		
		if(duration === 1) tempData.duration = "1day"
		if(duration === 3) tempData.duration = "3day"
		if(duration === 7) tempData.duration = "1week"
		if(duration === 14) tempData.duration = "2weeks"
		if(duration === 21) tempData.duration = "3weeks"

		setFormData(tempData)
  }, [])

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="main-content">
        <Container fluid className="p-5">
          <Card style={{ minHeight: "80vh" }}>
            <Card.Header>
              <h3 className="">
                Create post /{" "}
                <span style={{ color: "#FCBF49" }}>
                  <small>Create Poll Questions</small>
                </span>
              </h3>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-center mt-5">
                <div className="w-75 ">
                  <Row>
                    <Col md="12">
                      <Form id="form-wizard3" className="text-start">
                        <fieldset>
                          <div className=" ">
                            <Row>
                              <Col md="12" className="my-2">
                                <Form.Label> Question Type</Form.Label>
                                <Form.Select
                                  onChange={(e) => {
                                    setSelected(e.target.value);
                                    if (e.target.value === "POLL") {
                                      setFormData(state => ({
                                        ...state,
                                        options: [{label: "", value: ""}]
                                      }))
                                    }
                                  }}
																	value={selected}
                                >
                                  <option value="SUBJECTIVE">
                                    Subjective Question
                                  </option>
                                  <option value="POLL">Poll</option>
                                </Form.Select>
                              </Col>
                              <Col md="12" className="my-2">
                                <Form.Group className="form-group">
                                  <Form.Label>
                                    Mention about your question
                                  </Form.Label>
                                  <Form.Control
                                    as="textarea"
                                    placeholder="Enter Question (max 150 words)"
                                    style={{ minHeight: "100px" }}
                                    value={formData.question}
                                    onChange={handleChange}
                                    name="question"
                                  />
                                  {
                                    errors.question && (
                                      <p className="text-danger">{errors.question}</p>
                                    )
                                  }
                                </Form.Group>
                              </Col>
                              {selected === "POLL" && (
                                <>
                                  {formData.options.map((option, index) => (
                                    <Row key={index} className="align-items-center">
                                      <Col md="11" className="my-2">
                                        <Form.Group className="form-group">
                                          <Form.Label>
                                            Option {String.fromCharCode(65 + index)}
                                          </Form.Label>
                                          <Form.Control
                                            type="text"
                                            placeholder={`Enter Option ${String.fromCharCode(65 + index)}`}
                                            value={option.label}
                                            onChange={(e) =>
                                              handleOptionChange(e.target.value, index)
                                            }
                                          />
                                          {
                                            errors.options[index] && (
                                              <p className="text-danger">{errors.options[index]}</p>
                                            )
                                          }
                                        </Form.Group>
                                     </Col>
                                      <Col md="1" className="mt-3">
                                        <Button
                                          variant="outline-danger"
                                          onClick={() => handleRemoveOption(index)}
                                        >
                                          <BsDash />
                                        </Button>
                                      </Col>
                                    </Row>
                                  ))}
                                  {formData.options.length < 4 && (
                                    <Col md="12" className="my-2">
                                      <Button variant="primary" onClick={handleAddOption}>
                                        <BsPlus /> Add Option
                                      </Button>
                                    </Col>
                                  )}
                                </>
                              )}
                              <Col md="12" className="my-2">
                                <Form.Group className="form-group">
                                  <Form.Label>Provide Caption (optional)</Form.Label>
                                  <Form.Control
                                    as="textarea"
                                    placeholder="Provide a caption"
                                    style={{ minHeight: "50px" }}
                                    onChange={handleChange}
                                    name="caption"
																		value={formData.caption}
                                  />
                                  {
                                    errors.caption && (
                                      <p className="text-danger">{errors.caption}</p>
                                    )
                                  }
                                </Form.Group>
                              </Col>
                              <Col md="12" className="my-2">
                                <Form.Group className="form-group">
                                  <Form.Label>Keywords</Form.Label>
                                  <Select
                                    className="dropdown"
                                    placeholder="Select upto 5 keywords"
                                    value={keywords.filter((obj) => formData.keywords.includes(obj._id)).map(item => ({label: item.collabTag, value: item._id}))} // set selected values
                                    options={keywords.map(item => ({label: item.collabTag, value: item._id}))} // set list of the data
                                    onChange={handleSelectCollabKeywords} // assign onChange function
                                    isMulti
                                    isClearable
                                  />
                                  {
                                    errors.keywords && (
                                      <p className="text-danger">{errors.keywords}</p>
                                    )
                                  }
                                </Form.Group>
                                <Col md="12" className="my-2">
                                <Form.Label>Poll Duration</Form.Label>
                                <Form.Select
                                  onChange={handleChange}
                                  value={formData.duration}
                                  name="duration"
                                >
                                  <option value="1day">1 day</option>
                                  <option value="3day">3 days</option>
                                  <option value="1week">1 week</option>
                                  <option value="2week">2 weeks</option>
                                </Form.Select>
                              </Col>
                              </Col>
                            </Row>
                          </div>
                          <button className="mt-1 punchred-button" onClick={(e) => {
                            e.preventDefault()
                            setShowPopup(true)
                          }}>
                            Update
                          </button>
                        </fieldset>
                      </Form>
                    </Col>
                  </Row>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </div>
      <ConfirmUpdatePopup show={showPopup} handleSuccess={(e) => handleUpdatePoll(e)} handleCancel={() => setShowPopup(false)}/>
    </div>
  );
}

const ConfirmUpdatePopup = ({
  show = false,
  handleSuccess,
  handleCancel,
}) => {
  return show?(
    <div style={{
			position: "fixed",
			top: "0px",
			left: "0px",
			zIndex: "1112",
			width: "100%",
			height: "100%",
		}}>
			<div style={{
				background: "black",
				opacity: "0.5",
				position: "absolute",
				width: "100vw",
				height: "100vh",
				top: "0px",
				left: "0px",
			}}
				onClick={handleCancel}
			></div>

			<div style={{
				position: "absolute",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)",
				maxWidth: "300px",
				background: "white",
				padding: "20px",
				boxShadow: "2px 2px 10px #ccc",
				borderRadius: "10px",
			}}>
				<h4 className="text-center">
					Are you sure you want to update the poll?
				</h4>
				<div className="d-flex flex-row justify-content-evenly mt-4">
					<button onClick={handleSuccess} className="btn btn-outline-primary bg-primary text-white" style={{width: "100px", borderRadius: "100px", fontWeight: "700"}}>
						Yes
					</button>
					<button onClick={handleCancel} className="btn-outline-primary bg-white" style={{width: "100px", fontWeight: "700", borderRadius: "100px", borderWidth: "1px"}}>
						No
					</button>
				</div>
			</div>
		</div>
  ):null
}

export default EditPoll;
