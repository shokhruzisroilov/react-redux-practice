import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { logo } from '../../constants'
import { Input, ValidationError } from '../../components/index'
import { useDispatch, useSelector } from 'react-redux'
import { signUserFailure, signUserStart, signUserSuccess } from '../../app/features/auth'
import AuthService from '../../services/auth'

const Register = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const dispatch = useDispatch()
	const {isLoading, loggedIn} = useSelector((store) => store.auth)
	const navigate = useNavigate()

	const registerHandler = async (e) => {
		e.preventDefault()
		dispatch(signUserStart())
		const user = {username: name, email, password}
		try {
			const response = await AuthService.userRegister(user)
			dispatch(signUserSuccess(response.user))
			navigate('/')
		}catch (error) {
			dispatch(signUserFailure(error.response.data.errors))
		}
	}
	useEffect(() => {
		if(loggedIn){
			navigate('/')
		}
	},[loggedIn])

	return (
		<div className='d-flex align-content-center justify-content-center mt-5'>
			<main className='form-signin w-25 m-auto text-center'>
				<form>
					<img
						className='mb-4'
						src={logo}
						alt='logo login'
						width={72}
						height={57}
					/>
					<h1 className='h3 mb-3 fw-normal'>Please register</h1>
					<ValidationError />
					<Input
						label={'UserName'}
						type={'text'}
						state={name}
						setState={setName}
					/>
					<Input
						label={'Email address'}
						type={'email'}
						state={email}
						setState={setEmail}
					/>
					<Input
						label={'Password'}
						type={'password'}
						state={password}
						setState={setPassword}
					/>
					<button className='btn btn-dark w-100 py-2 mt-2' type='submit' disabled={isLoading} onClick={registerHandler}>
						{isLoading ? "Loading..." : "Register"}
					</button>
				</form>
			</main>
		</div>
	)
}
export default Register
