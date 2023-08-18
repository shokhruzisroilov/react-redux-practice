import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import moment from 'moment'
import { OtherArticle } from '../components'
import Loading from '../animation/loading/Loading'

import ArticleService from '../services/article'
import { useDispatch, useSelector } from 'react-redux'
import {
	getArticleDetailFailure,
	getArticleDetailStart,
	getArticleDetailSuccess,
} from '../app/features/article'

const ArticleDetail = () => {
	const { slug } = useParams()
	const dispatch = useDispatch()
	const { articleDetail, articles, isLoading } = useSelector(
		state => state.article
	)

	const getArticleDetail = async () => {
		dispatch(getArticleDetailStart())
		try {
			const response = await ArticleService.getArticleDetail(slug)
			dispatch(getArticleDetailSuccess(response.article))
		} catch (error) {
			dispatch(getArticleDetailFailure(error))
		}
	}
	useEffect(() => {
		getArticleDetail()
	}, [slug])

	return isLoading ? (
		<Loading />
	) : (
		articleDetail !== null && (
			<div className='mt-3'>
				<div className='p-4 p-md-5 mb-4 rounded text-light bg-dark'>
					<div className='col-lg-6 px-0'>
						<h1 className='display-4 fst-italic'>{articleDetail.title}</h1>
						<p className='lead my-3'>{articleDetail.description}</p>
						<p className='lead mb-0'>
							<HashLink to='#article' className='text-light fw-bold'>
								Continue reading...
							</HashLink>
						</p>
					</div>
				</div>
				<div className='row g-5'>
					<div className='col-md-8'>
						<h3 className='pb-4 mb-4 fst-italic border-bottom'>Full details</h3>
						<article className='blog-post' id='article'>
							<h2 className='display-5 link-body-emphasis mb-2'>
								{articleDetail.title}
							</h2>
							<p className='blog-post-meta'>
								<span className='fw-medium'>createdAt: </span>{' '}
								{moment(articleDetail.createdAt).format('DD MMM YYYY')}
							</p>
							<p>{articleDetail.description}</p>
							<hr />
							<p>{articleDetail.body}</p>
						</article>
					</div>
					<div className='col-md-4'>
						<div className='position-sticky' style={{ top: '2rem' }}>
							<div className='p-4 mb-3 bg-body-tertiary rounded'>
								<div className='d-flex justify-content-between'>
									<h4 className='fst-italic'>
										{articleDetail.author.username}
									</h4>
									<img src={articleDetail.author.image} alt='' />
								</div>
								<p className='mb-0'>{articleDetail.description}</p>
							</div>
							<div>
								<h4 className='fst-italic'>Others</h4>
								<ul className='list-unstyled'>
									{articles &&
										articles.slice(0, 3).map((item, id) => {
											return (
												<OtherArticle
													key={item.title}
													title={articleDetail.title}
													createdAt={articleDetail.createdAt}
												/>
											)
										})}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	)
}

export default ArticleDetail
