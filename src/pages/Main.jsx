import { useSelector } from 'react-redux'
import { Loading } from '../index'
import { Article } from '../components'
import ArticleService from '../services/article'

const Main = ({ getArticles }) => {
	const { articles, isLoading } = useSelector(state => state.article)

	const descriptionStr = str => {
		if (str.length > 122) {
			return str.slice(0, 122) + '...'
		} else {
			return str
		}
	}

	const deleteArticle = async slug => {
		try {
			await ArticleService.deleteArticle(slug)
			getArticles()
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			{isLoading && <Loading />}
			<div className='album py-5'>
				<div>
					<div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>
						{articles &&
							articles.map(item => {
								return (
									<Article
										key={item.title}
										title={item.title}
										slug={item.slug}
										description={item.description}
										author={item.author.username}
										descriptionStr={descriptionStr}
										deleteArticle={deleteArticle}
									/>
								)
							})}
					</div>
				</div>
			</div>
		</>
	)
}

export default Main
