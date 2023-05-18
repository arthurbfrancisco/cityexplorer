// Import React library which lets us create React components.
import React from 'react';
// Import Axios library which is used for making HTTP requests from our application.
import axios from 'axios';
// Import Card component from React Bootstrap library. This will be used for styling purposes.
import { Card } from 'react-bootstrap';
// Import the CSS file for the application.
import './App.css';
// Import bootstrap CSS file which provides base styling for bootstrap components.
import 'bootstrap/dist/css/bootstrap.min.css'
// Import Button component from React Bootstrap library for UI purposes.
import Button from 'react-bootstrap/Button'
// Import Weather component which presumably displays weather data.
import Weather from './Weather.js'
// Import Movie component which presumably displays movie data.
import Movie from './Movie.js'

// Define the App class component which extends React's Component class.
class App extends React.Component {
    // Define the constructor of the App class which accepts props and calls super(props) to call the constructor of the parent class.
constructor(props) {
    super(props);
        // Initial state of the App component is defined in this.state.
      this.state = {
      cityName: '',
      cityData: {},
      haveCityData: false,
      error: false,
      errorMessage: '',
      weatherData: [],
      movieData: [],
      lat: '',
      lon: ''
    }
  }

  // WHEN DEALING WITH AXIOS YOU NEED 3 things:
  // - 1) async
  // - 2) await
  // - 3) .data
    // handleCitySubmit is an async function that is used when a city is submitted.
handleCitySubmit = async (event) => {
        // preventDefault is called to prevent the page from reloading when the form is submitted.
event.preventDefault();
    try {
      // Define the URL that will be used to get city data.
      let cityUrl = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.cityName}&format=json`;
      // Make a GET request to the URL and await for the response.
      let city = await axios.get(cityUrl);
      // Set the state with the response data.
        this.setState({
        Data1: city.data[0],
        error: false,
        haveCityData: true,
        lat: city.data[0].lat,
        lon: city.data[0].lon
      });
      // Call getWeather and getMovie functions with updated state.
      this.getWeather(city.data[0].lat, city.data[0].lon);
      this.getMovie();
    }
    catch (error) {
      // If there's an error, log it and update the state.
      console.log('error: ', error);
      console.log('error.message: ', error.message);
      this.setState({
        error: true,
        errorMessage: `An error Occured: ${error.response.status}`
      });
    }
  }

    // getWeather is an async function that fetches weather data for given lat and lon.
    getWeather = async (lat, lon) => {
    try {
      // let { lat, lon } = this.state.Data1;
      // Define the URL that will be used to get weather data.
      let weatherUrl = `${process.env.REACT_APP_SERVER}/weather?cityData=${this.state.cityName}&lat=${lat}&lon=${lon}`;
      // Make a GET request to the URL and await for the response.
      let weatherResponse = await axios.get(weatherUrl);
      // console.log(weatherResponse.data)
      let weatherData = weatherResponse.data;
      // let date = new Date(weatherData.dt * 1000).toLocaleDateString();
      // let description = weatherData[0].description;
      // Set the state with the response data.
        this.setState({
        weatherData
      })
      // console.log('Date:', date);
      // console.log('Description:', description);
    } catch (error) {
      // If there's an error, log it.
      console.log('Error getting weather: ', error);
    }
  };

  getMovie = async () => {
    let movieURL = `${process.env.REACT_APP_SERVER}/movies?cityName=${this.state.cityName}`;
    console.log(movieURL);
    try {
      let movieResponse = await axios.get(movieURL);
      console.log(movieResponse.data)

      this.setState({
        movieData: movieResponse.data
      })

    } catch (error) {
      console.log('Error getting movie: ', error);
    }
  };



  changeCityInput = (e) => {
    this.setState({
      cityName: e.target.value
    });
  }
  render() {
    // console.log(this.state.weatherData)
    return (
      <>
        <header>
          <h1>Data from an API</h1>
          <form onSubmit={this.handleCitySubmit}>
            <label>
              <input name="city" onChange={this.changeCityInput} />
            </label>
            <Button type="submit" className="button">Explore!</Button>
          </form>
        </header>
        {this.state.error ? <p>{this.state.errorMessage}</p> :
          this.state.haveCityData &&
          <main>
            <Card className='City p-2 h-100%' style={{ width: '75%' }}>
              <Card.Body>
                <Card.Img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.Data1.lat},${this.state.Data1.lon}&zoom=12`} alt="" />
                <Card.Title>{this.state.cityName}</Card.Title>
                <Card.Text>Lat: {this.state.Data1.lat}</Card.Text>
                <Card.Text>Lon: {this.state.Data1.lon}</Card.Text>
                {this.state.weatherData.length > 0 && <Weather
                  weatherData={this.state.weatherData}
                  cityName={this.state.cityName}
                />}
                {this.state.movieData.length > 0 && <Movie
                  movieData={this.state.movieData}

                />}
              </Card.Body>
            </Card>
            {/* {this.state.weatherData ? (
              this.state.weatherData.map(day => (
                <h1>{day.date}</h1>
              ))
            ) : (
              <p>loading weather data</p>
            )
            } */}
          </main>
        }
      </>
    );
  }
}

export default App;