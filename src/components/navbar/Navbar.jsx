import { Link, NavLink } from 'react-router-dom'

import { logo } from '../../constants/index'
import { useDispatch, useSelector } from 'react-redux'
import { removeItem } from '../../helpers/PersistanseStorage'
import { logoutUser } from '../../app/features/auth'

const Navbar = () => {
	const { loggedIn, user, isLoading } = useSelector(store => store.auth)
	const dispatch = useDispatch()
	const logoutHandle = () => {
		dispatch(logoutUser())
		removeItem('token')
	}

	return (
		<div className='d-flex flex-column flex-md-row align-items-center border-bottom container py-3'>
			<Link
				to='/'
				className='d-flex align-items-center link-body-emphasis text-decoration-none'
			>
				<img src={logo} alt='logo' className='logo' />
			</Link>
			<nav className='navbar navbar-expand-lg justify-content-center align'>
				<div className='container-fluid'>
					<div className='collapse navbar-collapse' id='navbarNav'>
						<ul className='navbar-nav'>
							<li className='nav-item'>
								<NavLink to='/' className='nav-link' aria-current='page'>
									Home
								</NavLink>
							</li>
							<li className='nav-item'>
								<NavLink
									to='/create-article'
									className='nav-link'
									aria-current='page'
								>
									Create Article
								</NavLink>
							</li>
						</ul>
					</div>
				</div>
			</nav>
			<nav className='d-inline-flex mt-2 mt-md-0 ms-md-auto'>
				{loggedIn ? (
					<>
						<Link
							to='#'
							className='d-flex align-items-center text-white text-decoration-none dropdown-toggle'
							data-bs-toggle='dropdown'
							aria-expanded='false'
						>
							<img
								src={user.image}
								alt=''
								width='32'
								height='32'
								className='rounded-circle me-2'
							/>
							<strong className='me-3 py-2 text-dark text-decaration-none'>
								{user.username}
							</strong>
						</Link>
						<Link
							to='/login'
							className='me-3 btn btn-dark'
							onClick={logoutHandle}
						>
							Logout
						</Link>
					</>
				) : (
					<>
						<Link to='/login' className='me-3 btn btn-dark'>
							Login
						</Link>
						<Link to='/register' className='me-3 btn btn-dark'>
							Register
						</Link>
					</>
				)}
			</nav>
		</div>
	)
}
export default Navbar
