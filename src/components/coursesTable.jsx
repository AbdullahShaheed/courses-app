import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CoursesTable = ({ courses, onDelete }) => {
  const [label, setLabel] = useState("Delete");
  const [rowIndex, setRowIndex] = useState(null);

  const handleDelete = (course) => {
    if (label === "Confirm") {
      onDelete(course);
      setLabel("Delete");
    } else setLabel("Confirm");
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>_id</th>
          <th>Title</th>
          <th>Author</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {courses.map((c, index) => (
          <tr
            key={c._id}
            onMouseOver={() => setRowIndex(index)}
            onMouseOut={() => setRowIndex(null)}
          >
            <td>{c._id}</td>
            <td>{c.title}</td>
            <td>{c.author.name}</td>
            <td>
              <ul>
                {c.chapters.map((ch) => (
                  <li key={ch.name}>
                    {ch.name}
                    <ul>
                      {ch.lessons.map((l) => (
                        <li key={l.name}>
                          name: {l.name} length: {l.length}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </td>

            <td>
              <Link
                hidden={rowIndex !== index}
                className="btn btn-primary btn-sm mr-2"
                to={`/courseForm/${c._id}`}
              >
                Edit
              </Link>

              <button
                hidden={rowIndex !== index}
                className={
                  label === "Delete"
                    ? "btn btn-sm btn-warning"
                    : "btn btn-sm btn-danger"
                }
                onClick={(rowIndex, index) => handleDelete(c, rowIndex, index)}
              >
                {label}
              </button>
              <button
                hidden={rowIndex !== index || label === "Delete"}
                className="btn btn-secondary btn-sm"
                onClick={() => setLabel("Delete")}
              >
                Cancel
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CoursesTable;
