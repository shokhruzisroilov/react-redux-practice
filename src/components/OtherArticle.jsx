import { Link } from 'react-router-dom'
import moment from 'moment'
const OtherArticle = ({ title, createdAt }) => {
	const descriptionStr = (str, num) => {
		if (str.length > num) {
			return str.slice(0, num) + '...'
		} else {
			return str
		}
	}

	return (
		<li>
			<Link
				className='d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top'
				to='#'
			>
				<svg
					className='bd-placeholder-img'
					width='100%'
					height={96}
					xmlns='http://www.w3.org/2000/svg'
					aria-hidden='true'
					preserveAspectRatio='xMidYMid slice'
					focusable='false'
				>
					<rect width='100%' height='100%' fill='#777' />
				</svg>
				<div className='col-lg-8'>
					<h6 className='mb-0'>{descriptionStr(title, 20)}</h6>
					<small className='text-body-secondary'>
						{moment(createdAt).format('DD MMM YYYY')}
					</small>
				</div>
			</Link>
		</li>
	)
}

export default OtherArticle
