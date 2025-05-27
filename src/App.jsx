import './index.css';
import 'boxicons/css/boxicons.min.css';
import { getWeather } from './Backened/theWeather';
import { useEffect, useState } from 'react';

function App() {
  const [city, setCity] = useState('Sweden');
  const [weather, setWeather] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await getWeather(city);
      setWeather(data);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    const fetchDefault = async () => {
        const data = await getWeather(city);
        setWeather(data)
    }
    fetchDefault()
  },[])

  return (
    <div className="background h-screen bg-gray-900 flex justify-center items-center">
      <div className="wrapper bg-linear-to-b from-blue-500 to-blue-400 w-[35rem] h-[35rem] rounded-3xl">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-5 items-center mt-5 ">
          <label className="text-2xl text-white font-bold color" htmlFor="country-name">
            Search the weather for many countries!
          </label>
          <div className="flex hover:border-gray-100 text-white border-3 border-white rounded-2xl w-3xs">
            <input
              type="search"
              onChange={(e) => setCity(e.target.value)}
              maxLength="30"
              placeholder="Type the country name"
              className="text-center text-[1.2rem] rounded-2xl w-3xs outline-0 [&::-webkit-search-cancel-button]:hidden"
            />
            <button type="submit" className="cursor-pointer">
              <i className="bx bx-search relative transition-transform duration-100 ease-in-out hover:text-gray-100 hover:scale-150 right-2/5"></i>
            </button>
          </div>
        </form>

        {!weather ? (
            <div className="relative text-white text-center text-4xl top-[30%] animate-pulse">Loading...</div>
        ) : (
          <div className="flex flex-col text-center relative top-[5%]">
            <i className="bx bxs-sun text-9xl text-yellow-300"></i>
            <div className="text-3xl text-white mt-5">
              <p>{Math.floor(weather.main.temp)}&deg; C</p>
              <h1>{weather.name}</h1>
            </div>

            <div className="flex flex-row columns-4 space-x-20 mt-[15%] justify-center">
              <div className="text-white">
                <i className="bx bxs-droplet text-4xl"></i>
                <label className="text-2xl">Humidity: {weather.main.humidity}%</label>
              </div>
              <div className="text-white">
                <i className="bx bx-wind text-4xl"></i>
                <label className="text-2xl">Wind: {weather.wind.speed} km/h</label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
