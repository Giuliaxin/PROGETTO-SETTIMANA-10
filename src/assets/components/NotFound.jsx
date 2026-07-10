import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const NotFound = () => {
	const navigate = useNavigate();

	return (
		<Container className='text-center py-5 mt-5 flex-grow-1 d-flex flex-column justify-content-center align-items-center'>
			<h1 className='display-1 fw-bold text-neon-purple'>404</h1>
			<h3 className='text-white mt-2'>Pagina non trovata</h3>
			<p className='text-light opacity-50 mb-4'>La pagina che stai cercando non esiste o è stata spostata.</p>
			<Button variant='info' className="btn-neon rounded-pill px-4" onClick={() => navigate('/')}>
				Torna alla Home
			</Button>
		</Container>
	);
};

export default NotFound;