import React, { useEffect, useState } from "react";
import axios from "axios";

export const WeatherApp = () => {
  const [city, setCity] = useState("São Paulo");
  const [weatherData, setWeatherData] = useState(null);
  const [temp, setTemp] = useState("");
  const [valueWeather, setValueWeather] = useState("");
  const [titleWeather, setTitleWeather] = useState("");

  useEffect(() => {
    const loadWeather = async () => {
      try {
        const apiKey = "cc6f4d99484a6bec9bd12e331fbc9b88";
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        );
        setWeatherData(response.data);

        const converterTempKelvin = response.data.main.temp; // aqui eu pego direto do response por conta do sistema nao atualizar rapido o suficiente, entao pegar do response diretamente é melhor
        const tempConverted = converterTempKelvin - 273.15;
        setTemp(tempConverted.toFixed(0));

        switch (response.data.weather[0].description) {
          case "clear sky":
            setTitleWeather("CÉU LIMPO");
            break;
          case "few clouds":
            setTitleWeather("ALGUMAS NÚVENS");
            break;
          case "scattered clouds":
            setTitleWeather("NUVENS DISPERSAS");
            break;
          case "broken clouds":
            setTitleWeather("NUVENS QUEBRADAS");
            break;
          case "shower rain":
            setTitleWeather("CHUVA DE CHUVEIRO");
            break;
          case "rain":
            setTitleWeather("CHUVA");
            break;
          case "thunderstorm":
            setTitleWeather("TEMPESTADE");
            break;
          case "snow":
            setTitleWeather("NEVE");
            break;
          case "mist":
            setTitleWeather("NEBLINA");
            break;
        }
      } catch (error) {
        if (axios.AxiosError.ERR_INVALID_URL) {
          alert("Parece que você não escreveu a cidade corretamente");
        }
      }
    };

    loadWeather();
  }, [city]);

  const handleSearch = (e) => {
    e.preventDefault();

    if (valueWeather.trim() !== "") {
      setCity(valueWeather);
      setValueWeather("");
    } else {
      alert("Digite algum cidade");
    }
  };

  return (
    <div>
      <div>
        {weatherData ? (
          <div className="container">
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
              alt="tem algo.png"
            />
            <h1>{titleWeather}</h1>
            <form>
              <input
                type="search"
                value={valueWeather}
                onChange={(e) => setValueWeather(e.target.value)}
              />
              <button onClick={handleSearch}>Buscar</button>
            </form>

            <h2>
              {weatherData.name}, {weatherData.sys.country}
            </h2>
            <p>Temperatura: {temp}°C</p>
            <p>Umidade: {weatherData.main.humidity}</p>
            <p>Visibilidade: {weatherData.visibility}</p>
            <p>Velocidade Vento: {weatherData.wind.speed} Km/H</p>
          </div>
        ) : (
          <p>Carregando...</p>
        )}
      </div>
    </div>
  );
};
