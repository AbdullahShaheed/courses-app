import React, { Component } from "react";
import { getAuthors } from "../services/fakeAuthorService";
import { getCourse } from "../services/fakeCoursesService";
import { saveCourse } from "./../services/fakeCoursesService";
import Input from "./common/input";
import Select from "./common/select";
import Chapters from "./chapters";

class CourseForm extends Component {
  state = {
    data: {
      title: "",
      authorId: "",
      chapters: [{ name: "", lessons: [{ name: "", length: "" }] }],
    },
    authors: [],
  };

  componentDidMount() {
    this.setState({ authors: getAuthors() });

    const courseId = this.props.match.params.id;
    if (courseId === "new") return;

    const course = getCourse(courseId);
    if (!course) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(course) });
  }

  mapToViewModel(course) {
    return {
      _id: course._id,
      title: course.title,
      authorId: course.author._id,
      chapters: course.chapters,
    };
  }

  handleChange = ({ name, value }) => {
    const data = { ...this.state.data };
    data[name] = value;
    this.setState({ data });
  };

  handleChapterChange = ({ value }, index) => {
    const data = { ...this.state.data };
    const chapters = [...data.chapters];

    chapters[index] = { ...data.chapters[index] };
    chapters[index].name = value;
    data.chapters = chapters;

    this.setState({ data });
  };

  handleLessonChange = ({ name, value }, chIndex, lsnIndex) => {
    const course = { ...this.state.data };
    const chapters = [...course.chapters];
    const lessons = [...chapters[chIndex].lessons];

    lessons[lsnIndex] = { ...course.chapters[chIndex].lessons[lsnIndex] };

    lessons[lsnIndex][name] = value;

    course.chapters[chIndex].lessons = lessons;
    this.setState({ data: course });
  };

  handleAddChapter = (course) => {
    const chapters = [...course.chapters];

    chapters.push({ name: "", lessons: [{ name: "", length: "" }] });
    course.chapters = chapters;
    this.setState({ data: course });
  };

  handleAddLesson = (chIndex) => {
    const data = { ...this.state.data };
    const chapters = [...data.chapters];

    chapters[chIndex].lessons.push({ name: "", length: "" });
    data.chapters = chapters;
    this.setState({ data });
  };
  handleAddLsnBefore = (chIndex, lsnIndex) => {
    const data = { ...this.state.data };
    const chapters = [...data.chapters];

    chapters[chIndex].lessons.splice(lsnIndex, 0, { name: "", length: "" });
    data.chapters = chapters;
    this.setState({ data });
  };
  handleDeleteLsn = (chIndex, lsnIndex) => {
    const data = { ...this.state.data };
    const chapters = [...data.chapters];

    chapters[chIndex].lessons.splice(lsnIndex, 1);
    data.chapters = chapters;
    this.setState({ data });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    saveCourse(this.state.data);
    this.props.history.push("/courses");
  };

  render() {
    const { data: course, authors } = this.state;
    return (
      <>
        <h1>Course - {this.props.match.params.id}</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="col-4">
            <Input
              name="title"
              value={course.title}
              label="Course Title"
              onChange={(e) => this.handleChange(e.target)}
            />
            <Select
              name="authorId"
              value={course.authorId}
              label="Author"
              options={authors}
              error={null}
              onChange={(e) => this.handleChange(e.target)}
            ></Select>
          </div>
          <div>
            <Chapters
              course={course}
              onChapterChange={this.handleChapterChange}
              onLessonChange={this.handleLessonChange}
              onAddChapter={this.handleAddChapter}
              onAddLesson={this.handleAddLesson}
              onAddLsnBefore={this.handleAddLsnBefore}
              onDeleteLsn={this.handleDeleteLsn}
            />
          </div>

          <button className="btn btn-primary">Save</button>
        </form>
      </>
    );
  }
}

export default CourseForm;
