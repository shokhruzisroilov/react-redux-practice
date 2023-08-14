import { useNavigate } from 'react-router-dom'

const Article = ({ title, slug, description, author, descriptionStr }) => {
	const navigate = useNavigate()

	return (
		<div className='col'>
			<div className='card h-100 shadow-sm'>
				<svg
					className='bd-placeholder-img card-img-top'
					width='100%'
					height={225}
					xmlns='http://www.w3.org/2000/svg'
					role='img'
					aria-label='Placeholder: Thumbnail'
					preserveAspectRatio='xMidYMid slice'
					focusable='false'
				>
					<title>Placeholder</title>
					<rect width='100%' height='100%' fill='#55595c' />
				</svg>
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
							type='button'
							className='btn btn-sm btn-outline-success'
						>
							View
						</button>
						<button type='button' className='btn btn-sm btn-outline-dark'>
							Edit
						</button>
						<button type='button' className='btn btn-sm btn-outline-danger'>
							Delete
						</button>
					</div>
					<small className='text-body-secondary\'>{author}</small>
				</div>
			</div>
		</div>
	)
}

export default Article
