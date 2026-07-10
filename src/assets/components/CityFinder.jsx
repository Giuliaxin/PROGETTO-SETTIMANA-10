import { useState, useEffect } from 'react';
import { Container, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const API_KEY = 'a53447e0b49c4a295b7bf5f43d2584ef';

const PRESET_CITIES = [
	{ label: 'Roma', value: 'Roma' },
	{ label: 'Londra', value: 'London' },
	{ label: 'Parigi', value: 'Paris' },
	{ label: 'Berlino', value: 'Berlin' },
	{ label: 'Madrid', value: 'Madrid' },
	{ label: 'New York', value: 'New York' },
	{ label: 'Tokyo', value: 'Tokyo' }
];

const CityFinder = ({ onWeatherSelect }) => {
	const [searchInput, setSearchInput] = useState('');
	const [isFetching, setIsFetching] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [recentSearches, setRecentSearches] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const saved = localStorage.getItem('recentWeatherSearches');
		if (saved) {
			setRecentSearches(JSON.parse(saved));
		}
	}, []);

	const executeSearch = async (e, directCity = null) => {
		if (e) e.preventDefault();
		const city = directCity || searchInput;

		if (!city || city.trim() === '') {
			setErrorMessage('Si prega di inserire o selezionare una località valida.');
			return;
		}
		
		setErrorMessage('');
		setIsFetching(true);

		try {
			const res = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&appid=${API_KEY}&units=metric&lang=it`
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

	const currentSelectValue = PRESET_CITIES.some(city => city.value.toLowerCase() === searchInput.trim().toLowerCase()) 
		? PRESET_CITIES.find(city => city.value.toLowerCase() === searchInput.trim().toLowerCase()).value 
		: '';

	return (
		<Container className='mt-5 d-flex justify-content-center align-items-center flex-grow-1'>
			<Card className='glass-panel p-4 w-100' style={{ maxWidth: '480px' }}>
				<h3 className='text-center text-white fw-normal mb-2 fs-4'>Meteo in Tempo Reale</h3>
				<p className='text-center text-white-50 mb-4 fw-light' style={{ fontSize: '0.9rem' }}>
					Inserire il nome di una città oppure selezionarne una dall'elenco delle principali località.
				</p>
				
				{errorMessage && <Alert variant='danger' className='bg-danger bg-opacity-25 text-white border-0 text-center'>{errorMessage}</Alert>}

				<Form onSubmit={executeSearch}>
					<Form.Group className='mb-3'>
						<Form.Label className='text-white-50 small mb-1 ps-1'>Ricerca manuale</Form.Label>
						<Form.Control
							type='text'
							placeholder='Es. Roma, London, Tokyo...'
							value={searchInput}
							onChange={(e) => setSearchInput(e.target.value)}
							className='form-glass text-center fs-5 py-2'
							disabled={isFetching}
						/>
					</Form.Group>

					<Form.Group className='mb-4'>
						<Form.Label className='text-white-50 small mb-1 ps-1'>Selezione rapida capitali</Form.Label>
						<Form.Select
							value={currentSelectValue}
							onChange={(e) => setSearchInput(e.target.value)}
							className='form-glass text-center fs-6 py-2'
							disabled={isFetching}
							style={{ color: currentSelectValue ? '#ffffff' : 'rgba(255, 255, 255, 0.5)' }}
						>
							<option value=''>-- Seleziona una città predefinita --</option>
							{PRESET_CITIES.map((city) => (
								<option key={city.value} value={city.value} style={{ background: '#212529', color: '#ffffff' }}>
									{city.label}
								</option>
							))}
						</Form.Select>
					</Form.Group>

					<Button 
						type='submit' 
						className='btn-neon w-100 py-3 rounded-pill text-white mb-4' 
						disabled={isFetching}
					>
						{isFetching ? (
							<>
								<Spinner as='span' animation='border' size='sm' role='status' className='me-2' />
								Caricamento in corso...
							</>
						) : (
							'Visualizza Meteo'
						)}
					</Button>
				</Form>

				{recentSearches.length > 0 && (
					<div className='border-top border-white border-opacity-10 pt-3 text-center'>
						<span className='text-white-50 small d-block mb-2'>Ricerche recenti</span>
						<div className='d-flex flex-wrap gap-2 justify-content-center'>
							{recentSearches.map((city, index) => (
								<button
									key={index}
									className='recent-tag'
									type='button'
									onClick={() => executeSearch(null, city)}
								>
									{city}
								</button>
							))}
						</div>
					</div>
				)}
			</Card>
		</Container>
	);
};

export default CityFinder;