import { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const API_KEY = 'a53447e0b49c4a295b7bf5f43d2584ef';

const Weather = ({ details, onReset }) => {
    const navigate = useNavigate();
    const [dailyForecast, setDailyForecast] = useState([]);
    const [hourlyForecast, setHourlyForecast] = useState([]);

    useEffect(() => {
        if (!details) {
            navigate('/search');
            return;
        }

        const saved = localStorage.getItem('recentWeatherSearches');
        const recent = saved ? JSON.parse(saved) : [];
        const filtered = recent.filter((item) => item.toLowerCase() !== details.name.toLowerCase());
        localStorage.setItem('recentWeatherSearches', JSON.stringify([details.name, ...filtered].slice(0, 3)));

        const fetchForecastData = async () => {
            try {
                const res = await fetch(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${details.name}&appid=${API_KEY}&units=metric&lang=it`
                );
                if (!res.ok) throw new Error('Impossibile caricare le previsioni.');
                
                const data = await res.json();
                
                const hourly = data.list.slice(0, 8);
                const daily = data.list.filter((item) => item.dt_txt.includes('12:00:00'));
                
                setHourlyForecast(hourly);
                setDailyForecast(daily);
            } catch (err) {
                console.error(err);
            }
        };

        fetchForecastData();
    }, [details, navigate]);

    if (!details) return null;

    const handleBack = () => {
        onReset();
        navigate('/search');
    };

    return (
        <Container className='mt-4 d-flex flex-column justify-content-center align-items-center flex-grow-1'>
            
            <Card className='glass-panel w-100 mb-4' style={{ maxWidth: '560px' }}>
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

                    {hourlyForecast.length > 0 && (
                        <div className="mt-4 border-top border-white border-opacity-10 pt-3 text-start">
                            <span className='text-white-50 text-uppercase tracking-wider d-block mb-2 ps-1' style={{ fontSize: '0.75rem' }}>
                                Previsioni Orarie (Prossime 24h)
                            </span>
                            <div className="d-flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                                {hourlyForecast.map((hour) => {
                                    const timeObj = new Date(hour.dt * 1000);
                                    const ora = timeObj.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
                                    return (
                                        <div 
                                            key={hour.dt} 
                                            className="text-center d-flex flex-column align-items-center rounded-3 py-2 px-3" 
                                            style={{ background: 'rgba(255, 255, 255, 0.05)', minWidth: '75px', border: '1px solid rgba(255, 255, 255, 0.05)' }}
                                        >
                                            <span className="text-white-50" style={{ fontSize: '0.75rem' }}>{ora}</span>
                                            <img
                                                src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                                                alt={hour.weather[0].description}
                                                style={{ width: '36px', height: '36px' }}
                                            />
                                            <strong className="text-white" style={{ fontSize: '0.9rem' }}>{Math.round(hour.main.temp)}°C</strong>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    <Button className='btn-neon mt-4 w-100 py-3 rounded-pill' onClick={handleBack}>
                        Effettua una nuova ricerca
                    </Button>
                </Card.Body>
            </Card>

            {dailyForecast.length > 0 && (
                <div className='w-100' style={{ maxWidth: '560px' }}>
                    <h5 className='text-white fw-light mb-3 ps-2 tracking-wide text-center text-sm-start'>
                        Previsioni per i prossimi giorni
                    </h5>
                    <Row className='g-2 row-cols-3 row-cols-sm-5 justify-content-center'>
                        {dailyForecast.map((day) => {
                            const dateObj = new Date(day.dt * 1000);
                            const giornoSettimana = dateObj.toLocaleDateString('it-IT', { weekday: 'short' });
                            const giornoMese = dateObj.toLocaleDateString('it-IT', { day: 'numeric', month: 'short' });

                            return (
                                <Col key={day.dt}>
                                    <div className="weather-sub-card text-center d-flex flex-column align-items-center justify-content-center h-100 py-3 px-1">
                                        <span className='text-capitalize text-white fw-semibold small'>{giornoSettimana}</span>
                                        <span className='text-white-50 x-small' style={{ fontSize: '0.75rem' }}>{giornoMese}</span>
                                        <img 
                                            src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} 
                                            alt={day.weather[0].description} 
                                            style={{ width: '42px', height: '42px', filter: 'drop-shadow(0 4px 6px rgba(255,255,255,0.1))' }}
                                        />
                                        <strong className='fs-6 text-white mt-1'>{Math.round(day.main.temp)}°C</strong>
                                    </div>
                                </Col>
                            );
                        })}
                    </Row>
                </div>
            )}

        </Container>
    );
};

export default Weather;