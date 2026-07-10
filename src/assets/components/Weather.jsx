import { useEffect } from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const Weather = ({ details, onReset }) => {
	const navigate = useNavigate();

	useEffect(() => {
		if (!details) {
			navigate('/search');
		}
	}, [details, navigate]);

	if (!details) return null;

	const handleBack = () => {
		onReset();
		navigate('/search');
	};

	return (
		<Container className='mt-4 d-flex justify-content-center align-items-center flex-grow-1'>
			<Card className='glass-panel w-100' style={{ maxWidth: '560px' }}>
				<Card.Header className='bg-transparent text-center pt-4 pb-0 border-0'>
					<h2 className='mb-0 fw-normal text-white fs-1 tracking-wide'>
						{details.name}, {details.sys.country}
					</h2>
				</Card.Header>
				
				<Card.Body className='text-center px-4 pb-4 pt-2'>
					<div className="ampolla-wrapper">
						<div className="ampolla">
							<img 
								src={`https://openweathermap.org/img/wn/${details.weather[0].icon}@4x.png`} 
								alt="Condizioni meteorologiche" 
								style={{ width: '120px', height: '120px', filter: 'drop-shadow(0 8px 12px rgba(255,255,255,0.15))' }}
							/>
						</div>
					</div>

					<h1 className='display-1 fw-normal text-white mb-2' style={{ fontSize: '5rem', letterSpacing: '-2px' }}>
						{Math.round(details.main.temp)}°C
					</h1>

					<div className='text-capitalize text-white-50 fs-5 mb-4 fw-light'>
						{details.weather[0].description}
					</div>
					
					<Row className='g-3 text-start mx-1'>
						<Col xs={6}>
							<div className="weather-sub-card d-flex flex-column justify-content-center h-100">
								<span className='text-white-50 text-uppercase tracking-wider' style={{ fontSize: '0.75rem' }}>Percepita</span>
								<strong className='fs-4 text-white mt-1'>{Math.round(details.main.feels_like)}°C</strong>
							</div>
						</Col>
						<Col xs={6}>
							<div className="weather-sub-card d-flex flex-column justify-content-center h-100">
								<span className='text-white-50 text-uppercase tracking-wider' style={{ fontSize: '0.75rem' }}>Umidità</span>
								<strong className='fs-4 text-white mt-1'>{details.main.humidity}%</strong>
							</div>
						</Col>
						<Col xs={6}>
							<div className="weather-sub-card d-flex flex-column justify-content-center h-100">
								<span className='text-white-50 text-uppercase tracking-wider' style={{ fontSize: '0.75rem' }}>Min / Max</span>
								<strong className='fs-5 text-white mt-1'>{Math.round(details.main.temp_min)}° / {Math.round(details.main.temp_max)}°</strong>
							</div>
						</Col>
						<Col xs={6}>
							<div className="weather-sub-card d-flex flex-column justify-content-center h-100">
								<span className='text-white-50 text-uppercase tracking-wider' style={{ fontSize: '0.75rem' }}>Vento</span>
								<strong className='fs-4 text-white mt-1'>{details.wind.speed} km/h</strong>
							</div>
						</Col>
					</Row>

					<Button className='btn-neon mt-4 w-100 py-3 rounded-pill' onClick={handleBack}>
						Effettua una nuova ricerca
					</Button>
				</Card.Body>
			</Card>
		</Container>
	);
};

export default Weather;