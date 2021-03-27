import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";
import Like from "./common/like";

class MoviesTable extends Component {
  //Note that we are iitializing columns here. It doesn't have to be part of the state
  //because it's not going to change through out the lifecycle of this component. So, a simple property is sufficient
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like
          onClick={() => this.props.onLike(movie)} //bubbling from my child Like to my parent MoviesTable, but the parameter provided here not in my child.
          liked={movie.liked}
        ></Like>
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          onClick={() => this.props.onDelete(movie)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { movies, sortColumn, onSort } = this.props;

    return (
      <Table
        data={movies}
        sortColumn={sortColumn}
        columns={this.columns}
        onSort={onSort}
      ></Table>
    );
  }
}

export default MoviesTable;
