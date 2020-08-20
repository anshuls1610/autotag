import React, {useState, useEffect} from 'react';
import './app.css';
import Auth from './Auth';
import Autocomplete from './Autocomplete';

function App() {
  const [countries, setCountries] = useState([]);
  let suggestion= [];

  useEffect(() => {
    const getCountriesData = async() => {
      await fetch("https://restcountries-v1.p.rapidapi.com/all", {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
          "x-rapidapi-key": "f49135e265msh9fbcdca6b28f8c8p1d5c06jsn6ec21594b9d9"
        }
      })
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
             name: country.name,
          }));

          setCountries(countries);

        });
      }
        getCountriesData();
    },[])

  return (
   <div className="app">
     <Auth />
    <Autocomplete
      suggestions = {countries.map((country) => (
                      suggestion = country.name
                    ))}
    ></Autocomplete> 
   </div>
  );
}

export default App;
