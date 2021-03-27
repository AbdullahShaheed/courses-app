import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getCourses } from "./../services/fakeCoursesService";
import CoursesTable from "./coursesTable";

class Courses extends Component {
  state = {
    courses: [],
  };

  componentDidMount() {
    this.setState({ courses: getCourses() });
  }

  handleDelete = (course) => {
    const courses = this.state.courses.filter((c) => c._id !== course._id);
    this.setState({ courses });
  };

  render() {
    const { courses, deleteLabel } = this.state;
    return (
      <>
        <h1>Courses</h1>
        <Link className="btn btn-primary" to="/courseForm/new">
          New Course
        </Link>
        <CoursesTable courses={courses} onDelete={this.handleDelete} />
      </>
    );
  }
}

export default Courses;
