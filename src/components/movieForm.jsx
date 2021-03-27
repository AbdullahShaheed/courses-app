import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie } from "./../services/fakeMovieService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "", //when the user select genre, all we car about is genreId not the entire genre object
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [], //in componentDidMount we will get it from our immaginary server
    errors: {},
  };

  //schema doesn't have to be part of the state because it's not supposed to change
  schema = {
    _id: Joi.string(), //we didn't make it required because when creating a new moview, we don't have the id property
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate"),
  };

  componentDidMount() {
    //First, the get genres and update the state
    const genres = getGenres();
    this.setState({ genres });

    //next read the id parameter from the route. If it is new, return immediately because we don't have an existing movie to poulate the form
    const movieId = this.props.match.params.id;
    if (movieId === "new") return;

    //otherwise get the movie and populate the form by updating the state
    const movie = getMovie(movieId);
    //chances are that movie does not exist, we need to check for that. Note that we've used the return keyword here so the rest of this code will not be executed. Becasue redirecting the user to another page does not will not stop the execution of the rest code
    if (!movie) return this.props.history.replace("/not-found");

    // update the state. Note we're not setting the data property directly to the movie object we get from the server although it's ok
    //but this is very typical real world scenario because the RESTful APIs that we have on the server are general purpose, they are not built
    //for a specific page. So, the data they return is often used on several pages, each page needs a piece of that data and it is also
    //possible that what we want to display on the page is a little bit different from the structure of that data. So, that's why we have
    //defined this method here mapToViewModel.
    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = () => {
    saveMovie(this.state.data);

    this.props.history.push("/movies");
  };

  render() {
    const { genres } = this.state;
    return (
      <div>
        <h1>Movie Form - {this.props.match.params.id}</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Movie Title")}
          {this.renderSelect("genreId", "Genre", genres)}
          {this.renderInput("numberInStock", "Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
