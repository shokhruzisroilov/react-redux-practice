import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArticleForm } from '../components'
import ArticleService from '../services/article'
import { useDispatch, useSelector } from 'react-redux'
import {
	getArticleSuccess,
	postArticleFailure,
	postArticleSuccess,
	postArticlestart,
} from '../app/features/article'

const CreateArticle = () => {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [body, setBody] = useState('')
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { articles } = useSelector(state => state.article)

	const formSubmit = async e => {
		e.preventDefault()
		dispatch(postArticlestart())
		const article = { title, description, body }
		try {
			const response = await ArticleService.postArticle(article)
			const arr = [response.article, ...articles]
			dispatch(postArticleSuccess(response.article))
			dispatch(getArticleSuccess(arr))
			navigate('/')
		} catch (error) {
			dispatch(postArticleFailure(error))
		}
	}
	const formProps = {
		title,
		setTitle,
		description,
		setDescription,
		body,
		setBody,
		formSubmit,
	}

	return (
		<div className='my-2 w-75 m-auto'>
			<h2 className='text-center'>Create Article</h2>
			<ArticleForm {...formProps} />
		</div>
	)
}

export default CreateArticle
