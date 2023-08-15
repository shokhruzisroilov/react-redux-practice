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
import ArticleService from '../services/article'
import { signUserSuccess } from './features/auth'
import { useEffect } from 'react'
import { getItem } from '../helpers/PersistanseStorage'
import {
	getArticleFailure,
	getArticleStart,
	getArticleSuccess,
} from './features/article'

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

	const getArticles = async () => {
		dispatch(getArticleStart())
		try {
			const response = await ArticleService.getArticles()
			dispatch(getArticleSuccess(response.articles))
		} catch (error) {
			dispatch(getArticleFailure(error))
		}
	}

	useEffect(() => {
		const token = getItem('token')
		if (token) {
			getUser()
		}
	}, [])
	getArticles()
	return (
		<div className='container'>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Main getArticles={getArticles} />} />
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
