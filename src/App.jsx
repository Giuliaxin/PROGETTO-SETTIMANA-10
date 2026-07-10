import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router';

import MyNavbar from './assets/components/MyNavbar';
import MyFooter from './assets/components/MyFooter';
import Home from './assets/components/Home';
import CityFinder from './assets/components/CityFinder';
import Weather from './assets/components/Weather';
import NotFound from './assets/components/NotFound';

function App() {
	const [activeWeather, setActiveWeather] = useState(null);

	return (
		<BrowserRouter>
			<MyNavbar />
			
			<main className='flex-grow-1 py-4 d-flex align-items-center'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route 
						path='/search' 
						element={<CityFinder onWeatherSelect={(data) => setActiveWeather(data)} />} 
					/>
					<Route 
						path='/:cityName' 
						element={<Weather details={activeWeather} onReset={() => setActiveWeather(null)} />} 
					/>
					<Route path='*' element={<NotFound />} />
				</Routes>
			</main>

			<MyFooter />
		</BrowserRouter>
	);
}

export default App;