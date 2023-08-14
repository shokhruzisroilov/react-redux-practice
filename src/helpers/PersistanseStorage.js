export const setItem = (key, data) => {
	try {
		localStorage.setItem(key, data)
	} catch (error) {
		console.log('Error localStorage')
	}
}

export const getItem = (key => {
	try {
		return localStorage.getItem(key)
	} catch (error) {
		console.log('Error get data')
	}
})

export const removeItem = (key) => {
	try {
		return localStorage.removeItem(key)
	} catch (error) {
		console.log('Error removing data')
	}
}