import React, { useEffect, useState } from 'react';

const WeatherForecast = () => {
  const [location, setLocation] = useState('Detecting location...');
  const [weatherData, setWeatherData] = useState('Fetching weather data...');
  const apiKey = 'c4e05cc14e47fa35f2194b5aceea6a4b'; // Replace with your real API key

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      setLocation('❌ Geolocation not supported.');
      setWeatherData('Weather not available.');
    }
  }, []);

  const success = (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    setLocation(`📍 Latitude: ${lat.toFixed(2)}, Longitude: ${lon.toFixed(2)}`);

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        const weather = data.weather[0].description;
        const temp = data.main.temp;
        const city = data.name;

        setWeatherData(`🌆 ${city}: ${weather}, 🌡 ${temp}°C`);
      })
      .catch(() => {
        setWeatherData('❌ Failed to fetch weather data.');
      });
  };

  const error = () => {
    setLocation('❌ Could not get location.');
    setWeatherData('Weather not available.');
  };

  const styles = {
    body: {
      margin: 0,
      fontFamily: 'Arial, sans-serif',
      color: 'white',
      backgroundImage: 'url("https://wallpaperaccess.com/full/1540049.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
    },
    container: {
      fontSize: '30px',
      padding: '20px',
      margin: '50px auto',
      maxWidth: '600px',
      borderRadius: '12px',
      textAlign: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.6)', // Optional readability overlay
    },
    header: {
      textAlign: 'center',
      paddingTop: '20px',
    },
  };

  return (
    <div style={styles.body}>
      <header style={styles.header}>
        <h1>🌦 Your Local Weather</h1>
      </header>

      <main style={styles.container}>
        <p>{location}</p>
        <p>{weatherData}</p>
      </main>
    </div>
  );
};

export default WeatherForecast;
