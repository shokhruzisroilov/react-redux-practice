import { useCallback } from "react"
import { useSelector } from "react-redux"

const ValidationError = () => {
	const {error} = useSelector(state => state.auth)

	const errorMessage = useCallback(() => {
		return Object.keys(error).map(name => {
			const msg = error[name].join(', ')
			return `${name}-${msg}`
		})
	},[error])

	return (
		error !== null &&
		errorMessage().map(error => {
			return (
				<div class='alert alert-danger p-1 m-1 text-start' role='alert' key={error}>
					{error}
				</div>
			)
		})
	)
}

export default ValidationError