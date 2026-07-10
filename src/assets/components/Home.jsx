import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const Home = () => {
	const navigate = useNavigate();

	return (
		<Container className='text-center d-flex justify-content-center align-items-center mt-5 flex-grow-1'>
			<Card className='glass-panel p-5 w-100' style={{ maxWidth: '700px' }}>
				<Card.Body>
					<h1 className='display-4 fw-normal text-white mb-3'>
						MeteOracolo
					</h1>
					<p className='lead text-white-50 mb-4 fw-light'>
						Monitorate le condizioni meteorologiche in tempo reale per qualsiasi città del mondo con dati affidabili e panoramiche dettagliate.
					</p>
					<hr className='my-4 border-white opacity-25' />
					<Button 
						size='lg' 
						className='btn-neon rounded-pill px-5 py-3'
						onClick={() => navigate('/search')}
					>
						Inizia la Ricerca
					</Button>
				</Card.Body>
			</Card>
		</Container>
	);
};

export default Home;