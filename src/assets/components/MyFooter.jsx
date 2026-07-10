import { Container } from 'react-bootstrap';

const MyFooter = () => {
	return (
		<footer className='py-4 mt-auto glass-nav-footer border-bottom-0 border-top border-secondary border-opacity-10'>
			<Container className='text-center'>
				<small className='text-white-50 fw-light tracking-wide'>
					&copy; {new Date().getFullYear()} MeteOracolo - Dati live da OpenWeather API
				</small>
			</Container>
		</footer>
	);
};

export default MyFooter;