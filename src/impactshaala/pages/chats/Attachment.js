import pdf from '../../../assets/images/pdf.png';
import downloadIcon from '../../../assets/images/download.svg';

const Attachment = ({attachment}) => {
	const getFileType = (str) => {
		const extension = str.split(".").slice(-1)[0]
		switch(extension) {
			case "mp4": return "video"
			case "doc": return "document"
			case "pdf": return "document"
			default: return "image"
		}
	}
	
	if(!attachment) return null;
	const type = (typeof attachment === "string")?getFileType(attachment):getFileType(attachment.extension)
	switch(type) {
		case "video": return (
			<div>
					<video 
						src={attachment}
						style={{
							width: "300px",
							height: "300px",
							objectFit: "contain",
							borderRadius: "10px",
							background: "#f9f9f9",
							boxShadow: "0 0 20px #eee inset"
						}}
						controls
						muted
					></video>			
			</div>
		);
		case "document":	return (
			<div className="p-2 mb-2 text-left d-flex flex-row justify-content-between" style={{minWidth: "200px", background: "rgba(255, 255, 255, 0.1)", borderRadius: "10px"}}>
				<div className="d-flex flex-row">
					<img src={pdf} alt="Attachment" style={{maxHeight: "50px", transform: "translateX(-5px)", marginBottom: "5px"}}/>
					<p>PDF File</p>
				</div>
				<a href={attachment} target="_blank" className="d-flex flex-column justify-content-center">
					<img 
						src={downloadIcon} 
						alt="Download" 
						style={{border: "2px solid white", borderRadius: "100px"}}
						className="p-1"
					/>
				</a>
			</div>
		);
		case "image": 	return (
			<div className="mb-2">
				<a href={attachment} target="_blank">
					<img src={attachment} alt="Attachment" style={{width: "300px", height: "300px", borderRadius: "10px", objectFit: "cover"}}/>
				</a>
			</div>
		);
		default: return null;
	}
}

export default Attachment