import { Routes, Route } from 'react-router-dom'
import {
	Main,
	ArticleDetail,
	Login,
	Register,
	Layout,
	CreateArticle,
	EditArticle,
} from '../index'
import { useDispatch } from 'react-redux'
import AuthService from '../services/auth'
import { signUserSuccess } from './features/auth'
import { useEffect } from 'react'
import { getItem } from '../helpers/PersistanseStorage'

function App() {
	const dispatch = useDispatch()
	const getUser = async () => {
		try {
			const response = await AuthService.getUser()
			dispatch(signUserSuccess(response.user))
		} catch (error) {
			console.log('Error user')
		}
	}

	useEffect(() => {
		const token = getItem('token')
		if (token) {
			getUser()
		}
	}, [])

	return (
		<div className='container'>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Main />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/article/:slug' element={<ArticleDetail />} />
					<Route path='/create-article' element={<CreateArticle />} />
					<Route path='/edit-article/:slug' element={<EditArticle />} />
				</Route>
			</Routes>
		</div>
	)
}

export default App
