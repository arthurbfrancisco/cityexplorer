import React from "react";
import Card from 'react-bootstrap/Card'


// Define the Weather class component which extends React's Component class.
class Weather extends React.Component {
    // The render method returns the JSX that should be rendered for this component.
    render() {
        // Return statement contains the JSX to render.
        return (
            // React fragments allow us to return multiple elements from a component without having to wrap them in a div or other container element.
            <>
                <Card.Title>Weather in {this.props.cityName}</Card.Title>
                <hr></hr>
                {
                    this.props.weatherData.map((forecast, idx) =>
                        <div key={idx}>
                            <Card.Text>Date: {forecast.date}</Card.Text>
                            <Card.Text>Forecast: {forecast.description}</Card.Text>
                            <Card.Text>High of: {forecast.high}</Card.Text>
                            <Card.Text>Low of: {forecast.low}</Card.Text>
                            <hr></hr>
                        </div>
                    )
                }
            </>


        )
    }
}


export default Weather;


        // {/* Card.Title is a sub-component of Card which is styled to be a title. The title is obtained from this component's props. */}
        // <Card.Title>Weather in {this.props.cityName}</Card.Title>

        // {/* hr tag is used to create a thematic break in the content. */}
        // <hr></hr>

        // {
        //   // Here we're mapping over the weatherData array which is passed in via props.
        //   // For each forecast in the array, we render a div with weather information.
        //   this.props.weatherData.map((forecast, idx) =>
        //     <div key={idx}>

        //       {/* Card.Text is a sub-component of Card which is styled to contain text. Here it's used to display the forecast's date. */}
        //       <Card.Text>Date: {forecast.date}</Card.Text>

        //       {/* Card.Text is used to display the forecast's description. */}
        //       <Card.Text>Forecast: {forecast.description}</Card.Text>

        //       {/* Card.Text is used to display the forecast's high temperature. */}
        //       <Card.Text>High of: {forecast.high}</Card.Text>

        //       {/* Card.Text is used to display the forecast's low temperature. */}
        //       <Card.Text>Low of: {forecast.low}</Card.Text>