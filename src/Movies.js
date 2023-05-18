import React from "react";
import Card from 'react-bootstrap/Card'

class Movie extends React.Component {
    // The render method returns the JSX that should be rendered for this component.
    render() {
        // Return statement contains the JSX to render.
        return (
            // React fragments allow us to return multiple elements from a component without having to wrap them in a div or other container element.
            <>
                <Card.Title>{this.props.cityName} Movies</Card.Title>
                <hr></hr>
                {
                    this.props.movieData.map((movie, index) =>
                        <div key={index}>
                            <Card.Text>Title: {movie.title}</Card.Text>
                            <Card.Text>Overview: {movie.overview}</Card.Text>
                            <Card.Text>Average # of Votes: {movie.averageVotes}</Card.Text>
                            <Card.Text>Total # of Votes: {movie.totalVotes}</Card.Text>
                            {movie.image_url
                                ?
                                <Card.Img
                                    src={`https://image.tmdb.org/t/p/w500${movie.image_url}`}
                                /> : ''
                            }
                            <Card.Text>Popularity Level: {movie.popularity}</Card.Text>
                            <Card.Text>Release Date: {movie.releaseDate}</Card.Text>
                            <hr></hr>
                        </div>
                    )
                }
            </>


        )
    }
}


export default Movie;


        // {/* Card.Title is a sub-component of Card which is styled to be a title. The title is obtained from this component's props. */}
        // <Card.Title>{this.props.cityName} Movies</Card.Title>

        // {/* hr tag is used to create a thematic break in the content. */}
        // <hr></hr>

        // {
        //   // Here we're mapping over the movieData array which is passed in via props.
        //   // For each movie in the array, we render a div with movie information.
        //   this.props.movieData.map((movie, index) =>
        //     <div key={index}>

        //       {/* Card.Text is a sub-component of Card which is styled to contain text. Here it's used to display the movie's title. */}
        //       <Card.Text>Title: {movie.title}</Card.Text>

        //       {/* Card.Text is used to display the movie's overview. */}
        //       <Card.Text>Overview: {movie.overview}</Card.Text>

        //       {/* Card.Text is used to display the movie's average votes. */}
        //       <Card.Text>Average # of Votes: {movie.averageVotes}</Card.Text>

        //       {/* Card.Text is used to display the movie's total votes. */}
        //       <Card.Text>Total # of Votes: {movie.totalVotes}</Card.Text>

        //       {
        //         // Conditional rendering is used here to display an image if the image_url is truthy.
        //         movie.image_url
        //           ?
        //           // Card.Img is a sub-component of Card which is styled to contain an image. Here it's used to display the movie's image.
        //           <Card.Img
        //             src={`https://image.tmdb.org/t/p/w500${movie.image_url}`}
        //           /> : ''
        //       }

        //       {/* Card.Text is used to display the movie's popularity level. */}
        //       <Card.Text>Popularity Level: {movie.popularity}</Card.Text>

        //       {/* Card.Text is used to display the movie's release date. */}
        //       <Card.Text>Release Date: {movie.releaseDate}</Card.Text>

        //       {/* Another hr tag is used here to create a thematic break after each movie. */}
        //       <hr></hr>
        //     </div>
    
