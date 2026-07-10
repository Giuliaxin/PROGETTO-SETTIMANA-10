import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router';

const MyNavbar = () => {
	const location = useLocation();
	const checkActive = (path) => location.pathname === path;

	return (
		<Container>
			<Navbar expand='md' className='navbar-custom'>
				<Navbar.Brand as={Link} to='/' className='fw-bold text-white fs-4 d-flex align-items-center gap-2'>
					🔮 MeteOracolo
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='main-navigation' className='border-0 bg-light opacity-75' />
				<Navbar.Collapse id='main-navigation'>
					<Nav className='ms-auto align-items-center'>
						<Nav.Link as={Link} to='/' className={`mx-2 fw-medium transition-all ${checkActive('/') ? 'text-white border-bottom border-white' : 'text-white-50'}`}>
							Home
						</Nav.Link>
						<Nav.Link as={Link} to='/search' className={`mx-2 fw-medium transition-all ${checkActive('/search') ? 'text-white border-bottom border-white' : 'text-white-50'}`}>
							Ricerca Meteo
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</Container>
	);
};

export default MyNavbar;