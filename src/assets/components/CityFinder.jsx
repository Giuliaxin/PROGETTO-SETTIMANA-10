import { useState } from 'react';
import { Container, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const API_KEY = 'a53447e0b49c4a295b7bf5f43d2584ef';

const CityFinder = ({ onWeatherSelect }) => {
	const [searchInput, setSearchInput] = useState('');
	const [isFetching, setIsFetching] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();

	const executeSearch = async (e) => {
		e.preventDefault();
		if (searchInput.trim() === '') {
			setErrorMessage('Inserisci una località valida.');
			return;
		}
		
		setErrorMessage('');
		setIsFetching(true);

		try {
			const res = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?q=${searchInput.trim()}&appid=${API_KEY}&units=metric&lang=it`
			);
			
			if (!res.ok) {
				throw new Error('Località non trovata. Verificare il nome inserito.');
			}

			const data = await res.json();
			onWeatherSelect(data); 
			navigate(`/${data.name.toLowerCase()}`);
		} catch (err) {
			setErrorMessage(err.message);
		} finally {
			setIsFetching(false);
		}
	};

	return (
		<Container className='mt-5 d-flex justify-content-center align-items-center flex-grow-1'>
			<Card className='glass-panel p-4 w-100' style={{ maxWidth: '480px' }}>
				<h3 className='text-center text-white fw-normal mb-2 fs-4'>Meteo in Tempo Reale</h3>
				<p className='text-center text-white-50 mb-4 fw-light' style={{ fontSize: '0.9rem' }}>
					Inserire il nome della città per visualizzare il report meteorologico completo.
				</p>
				
				{errorMessage && <Alert variant='danger' className='bg-danger bg-opacity-25 text-white border-0 text-center'>{errorMessage}</Alert>}

				<Form onSubmit={executeSearch}>
					<Form.Group className='mb-4'>
						<Form.Control
							type='text'
							placeholder='Es. Roma, London, Tokyo...'
							value={searchInput}
							onChange={(e) => setSearchInput(e.target.value)}
							className='form-glass text-center fs-5 py-2'
							disabled={isFetching}
						/>
					</Form.Group>

					<Button 
						type='submit' 
						className='btn-neon w-100 py-3 rounded-pill text-white' 
						disabled={isFetching}
					>
						{isFetching ? (
							<>
								<Spinner as='span' animation='border' size='sm' role='status' className='me-2' />
								Caricamento in corso...
							</>
						) : (
							'Cerca Località'
						)}
					</Button>
				</Form>
			</Card>
		</Container>
	);
};

export default CityFinder;