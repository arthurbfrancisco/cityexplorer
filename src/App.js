import React from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'

// Here, we are defining a class named "App" which is a React component. The "extends React.Component" part 
// means that App is a subclass of React.Component, thus it inherits functionality from React.Component.
class App extends React.Component {
  // The "constructor" is a special method for creating and initializing objects created within a class.
  constructor(props) {
    // "super" keyword is used to call the constructor of the parent class (React.Component in this case). 
    // This is necessary before we can use the "this" keyword within our class. If "super" was not called, 
    // a reference error would occur.
    super(props);
    // "this.state" is a special property in React components. It contains data that may change over the 
    // lifetime of the component. When the state changes, the component re-renders.
    this.state = {
      cityName: '', // This will hold the name of the city input by the user.
      cityData: {}, // This will hold the data about the city retrieved from the API.
      haveCityData: false, // This flag indicates if we have city data or not. It can be used to conditionally render parts of the UI.
      error: false, // This flag indicates if an error occurred during the data fetching.
      errorMessage: '' // 
    }
  }
  // WHEN DEALING WITH AXIOS YOU NEED 3 things:
  // - 1) async
  // - 2) await
  // - 3) .data
  // This is an asynchronous event handler function for the city submission form. It is asynchronous because it 
  // will make a call to an API, which is an operation that takes an unknown amount of time to complete.
  handleCitySubmit = async (event) => {
    // This line prevents the default form submission behavior, which is to refresh the page.
    event.preventDefault();
    try {
      // Construct the URL for the API call. It includes the city name from the component's state.
      let cityUrl = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_API_KEY}&q=${this.state.cityName}&format=json`;
      // Make the API call using axios and wait for the response. This is why the function needs to be async.
      let city = await axios.get(cityUrl);
      // console.log(city);
      // Once the response is received, update the component's state with the received data and set the error flag to false.
      this.setState({
        Data1: city.data[0], //Very first data 
        error: false,
        haveCityData: true
      });
    }
    catch (error) {
      // If there is an error in the try block (for example, the API call failed), log the error to the console
      console.log('error: ', error);
      console.log('error.message: ', error.message);
      // And update the component's state to reflect that an error occurred.
      this.setState({
        error: true,
        errorMessage: `An error Occured: ${error.response.status}`
      });
    }
  }

  // This function is an event handler for the onChange event of the input field. It will be triggered every time 
  // the user types something into the input field.
  changeCityInput = (e) => {
    // It updates the cityName in the component's state with the current value of the input field.
    this.setState({
      cityName: e.target.value
    });
  }
  // The render method is called every time the state or props of the component change. It returns the JSX that 
  // should be rendered for this component.
  render() {
    // console.log(this.state)
    // This is a comment. It would log the current state of the component to the console every time render is called.
    // The return statement defines what should be rendered by the component.
    return (
      <>
        <header>
          <h1>Data from an API</h1>
           {/* This is a form element. The onSubmit prop is set to a method in the class named handleCitySubmit. 
       This method will be called when the form is submitted. */}
          <form onSubmit={this.handleCitySubmit}>
                  {/* The <label> tag defines a label for an <input> element. */}
                <label>
                   {/* This is an input field. The onChange prop is set to a method in the class named changeCityInput.
           This method will be called every time the value of the input field changes. */}
              <input name="city" onChange={this.changeCityInput} />
            </label>
             {/* The Button is a component from the react-bootstrap library. It's used here as the submit button for the form. */}
           <Button type="submit" className="button">Explore!</Button>
          </form>
        </header>
         {/* The code in curly braces {} is a JavaScript expression in JSX. Here, it's using a ternary operator 
           to conditionally render different JSX based on the state of the component. */}
        {/* If this.state.error is true, a paragraph (<p>) element is rendered with the error message from the state. */}
        {/* If this.state.error is false, it checks if this.state.haveCityData is true. If it is, a <main> element is rendered. */}
       {this.state.error ? <p>{this.state.errorMessage}</p> :
          this.state.haveCityData &&
          <main>
            
            <Card className='City p-2 h-100%' style={{ width: '75%' }}>
              <Card.Body>
                <Card.Img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_API_KEY}&center=${this.state.Data1.lat},${this.state.Data1.lon}&zoom=12`} alt="" />
                <Card.Title>{this.state.Data1.display_name}</Card.Title>
                <Card.Text>Lat: {this.state.Data1.lat}</Card.Text>
                <Card.Text>Lon: {this.state.Data1.lon}</Card.Text>
              </Card.Body>
            </Card>
          </main>
        }
      </>
    );
  }
}

export default App;

//{/* The Card.Img is a component from the react-bootstrap library. It's used here to display a map centered on the city.
//{/* The Card.Title is a component from the react-bootstrap library. It's used here to display the city name from the state. */}
//{/* The Card.Text is a component from the react-bootstrap library. It's used here twice to display the latitude and longitude from the city data in the state. */}

