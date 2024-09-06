export const types = [
	"email",
	"alphabets",
	"alphanumeric",
	"integer",
	"float",
	"number",
	"phone_number",
	"pincode",
	"text",
	"address",
]

export const errorMessages = {
	email: "Please Enter a Valid Email",
	alphabets: "Only alphabets are allowed",
	alphanumeric: "Only alphabets and numbers are allowed",
	integer: "Only Integers are allowed",
	float: "Only Decimal numbers are allowed",
	phone_number: "Please Enter a Valid Phone Number",
	pincode: "Please Enter a Valid Pincode",
	text: "Only text and spaces are allowed",
	address: "Please Enter a Valid Address"
}

const regexes = {
	email: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
	alphabets: /^[A-Za-z]+$/,
	alphanumeric: /^[a-zA-Z0-9]*$/,
	integer: /^-?\d*\.{0,1}\d+$/,
	float: /[+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*)(?:[eE][+-]?\d+)?/,
	phone_number: /(?:([+]\d{1,4})[-.\s]?)?(?:[(](\d{1,3})[)][-.\s]?)?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})/g,
	pincode: /^[1-9][0-9]{5}$/,
	text: /^[a-zA-Z]+[a-zA-Z0-9_ ]*$/,
	address: /[A-Za-z0-9'\.\-\s\,]/
}

export const validate = (value, type, customError) => {
	if(types.includes(type)) {
		if(!regexes[type].test(value)) return (customError)?customError:errorMessages[type]
		return ""
	}
}