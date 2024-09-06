import { Col, Form } from 'react-bootstrap';
import { ReactComponent as DeleteIcon } from '../../assets/images/delete.svg';
import PDFImage from '../../assets/images/pdf.png';

const MultiFileInput = ({files, accept, type, handleRemoveFile, handleFileChange}) => {
	return files.map((file, index) => (
			<Col md="6" key={index} className="my-2">
				<Form.Label>Upload and preview {type.replace("s", "")}</Form.Label>
				<div className="position-relative">
					<input
						type="file"
						value=""
						accept={accept}
						id={`${type.replace("s", "")}Input-${index}`}
						className="position-absolute w-100 h-100 opacity-0"
						onChange={(e) => {
							handleFileChange(e, index, type);
						}}
					/>
				</div>
				{file ? (
					<div
						className="position-relative"
						style={{
							width: "100%",
							height: "300px",
						}}
					>
						<div className="position-absolute h-100 d-flex flex-column justify-content-start" style={{right: "10px", top: "10px", zIndex: '10'}}>
							<button className="btn btn-danger rounded-circle" style={{width: "40px", height: "40px"}} onClick={() => handleRemoveFile(type, index)} type="button">
								<DeleteIcon className="w-100 h-100" style={{fill: "white"}}/>
							</button>
						</div>
						{
							type === "images" && (
								<Image image={file} index={index}/>
							)
						}
						{
							type === "videos" && (
								<Video video={file} index={index}/>
							)
						}
						{
							type === "documents" && (
								<Document doc={file} index={index}/>
							)
						}
					</div>
				) : (
					<div
						className=" d-flex justify-content-center align-items-center border border rounded p-3 text-center cursor-pointer"
						style={{
							width: "100%",
							height: "270px",
						}}
						onClick={() => {
							const fileInput =
								document.getElementById(
									`${type.replace("s", "")}Input-${index}`
								);
							fileInput.click();
						}}
					>
							<p className=""> 
							 + Click here to upload {type.replace("s", "")}
							</p>
					</div>
				)}
			</Col>
		))
}

const Video = ({video, index}) => {
	return (
		<video 
		  src={URL.createObjectURL(video)}
			style={{
        width: "100%",
        height: "300px",
        objectFit: "contain",
      }}
      className="border border-primary rounded text-center cursor-pointer"
			onClick={() => {
				const fileInput =
					document.getElementById(
						`videoInput-${index}`
					);
				fileInput.click();
			}}
		/>	
	)
}

const Image = ({image, index}) => {
	return (
		<img
			style={{
				width: "100%",
				height: "300px",
				objectFit: "contain",
			}}
			className="border border-primary rounded text-center cursor-pointer"
			src={URL.createObjectURL(image)}
			alt="Preview"
			onClick={() => {
				const fileInput =
					document.getElementById(
						`imageInput-${index}`
					);
				fileInput.click();
			}}
		/>	
	)
}

const Document = ({doc, index}) => {
	console.log(doc)
	return doc && (doc.type === "application/pdf") && (
		<object 
			data={URL.createObjectURL(doc)} 
			type="application/pdf" 
			width="100%" 
			height="300px"
			className="border border-primary rounded text-center cursor-pointer"
			style={{border: "none"}}
			onClick={() => {
				const fileInput =
					document.getElementById(
						`documentInput-${index}`
					);
				fileInput.click();
			}}
		/>
	)
}

export default MultiFileInput