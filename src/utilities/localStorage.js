export const getLocalStorage = (key) => {
	const item = localStorage.getItem(key)
	return (item)? JSON.parse(item):item
}

export const setLocalStorage = (key, value) => {
	localStorage.setItem(key, JSON.stringify(value))
}