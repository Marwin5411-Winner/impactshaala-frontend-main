import { Modal } from 'react-bootstrap';

const WarningPopup = ({
	show,
	close = () => {},
	handleAccept = () => {},
	handleReject = () => {},
}) => {
	return (
		<Modal show={show} backdrop="static" centered onHide={() => close()}>
        <Modal.Header closeButton>
          <Modal.Title className="" style={{}}>
						<h2 className="" style={{color: "red", fontWeight: "bold"}}>
            	Warning!!
						</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Make sure to verify users while collaborating. Impactshaala is not responsible for any fraudulent activity on this site.
        </Modal.Body>
        <Modal.Footer className="d-flex flex-row justify-content-center">
          <button 
            onClick={() => {
							handleAccept();
							close();
						}}
            className="btn btn-primary rounded-pill"

          >
            Continue
          </button>
          <button 
            onClick={() => {
							handleReject();
							close();
						}}
            className="btn btn-outline-primary rounded-pill"
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
	)
}

export default WarningPopup;