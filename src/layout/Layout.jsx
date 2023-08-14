import { Navbar } from '../components/index'
import { Outlet } from 'react-router-dom'

const Layout = () => {
	return (
		<>
			<Navbar />
			<Outlet />
		</>
	)
}

export default Layout
