import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArticleForm } from '../components'
import { useDispatch } from 'react-redux'
import ArticleService from '../services/article'
import {
	getArticleDetailStart,
	getArticleDetailSuccess,
	getArticleDetailFailure,
	postArticleSuccess,
	postArticleStart,
	postArticleFailure,
} from '../app/features/article'

const EditArticle = () => {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [body, setBody] = useState('')
	const dispatch = useDispatch()
	const { slug } = useParams()
	const navigate = useNavigate()

	const getArticleDetail = async () => {
		dispatch(getArticleDetailStart())
		try {
			const response = await ArticleService.getArticleDetail(slug)
			setTitle(response.article.title)
			setDescription(response.article.description)	
			setBody(response.article.body)
			dispatch(getArticleDetailSuccess(response.article))
		} catch (error) {
			dispatch(getArticleDetailFailure(error))
		}
	}

	useEffect(() => {
		getArticleDetail()
	}, [])

	const formSubmit = async e => {
		e.preventDefault()
		dispatch(postArticleStart())
		const article = { title, description, body }		
		try {
			 await ArticleService.editArticle(slug, article)
			dispatch(postArticleSuccess())
			navigate('/')
		} catch (error) {
			dispatch(postArticleFailure())
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
			<h2 className='text-center'>Edit Article</h2>
			<ArticleForm {...formProps} button={'Edit article'} />
		</div>
	)
}

export default EditArticle
