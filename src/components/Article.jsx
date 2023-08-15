import { useNavigate } from 'react-router-dom'
import { articleImage } from '../constants'
import { useSelector } from 'react-redux'

const Article = ({
	title,
	slug,
	description,
	author,
	descriptionStr,
	deleteArticle,
}) => {
	const navigate = useNavigate()
	const { user, loggedIn } = useSelector(state => state.auth)

	return (
		<div className='col'>
			<div className='card h-100 shadow-sm'>
				<img src={articleImage} alt='' />
				<div className='card-body'>
					<p className='card-text fw-bold text-capitalize m-0'>{title}</p>
					<p className='card-text text-capitalize'>
						{descriptionStr(description)}
					</p>
				</div>
				<div className='card-footer d-flex justify-content-between align-items-center'>
					<div className='btn-group'>
						<button
							onClick={() => navigate(`/article/${slug}`)}
							className='btn btn-sm btn-outline-success'
						>
							View
						</button>
						{loggedIn && user.username === author ? (
							<>
								<button
									className='btn btn-sm btn-outline-dark'
									onClick={() => navigate(`/edit-article/${slug}`)}
								>
									Edit
								</button>
								<button
									className='btn btn-sm btn-outline-danger'
									onClick={() => deleteArticle(slug)}
								>
									Delete
								</button>
							</>
						) : null}
					</div>
					<small className='text-body-secondary\'>{author}</small>
				</div>
			</div>
		</div>
	)
}

export default Article
