import React, { useState } from "react";
import Input from "./common/input";
import { Collapse } from "reactstrap";

const Lessons = ({
  chapter,
  chapterIndex,
  onLessonChange,
  onAddLesson,
  onAddLsnBefore,
  onDeleteLsn,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [label, setLabel] = useState("Expand");

  const toggle = () => {
    setIsOpen(!isOpen);
    label === "Expand" ? setLabel("Collapse") : setLabel("Expand");
  };

  return (
    <>
      <button className="btn btn-link btn-sm" type="button" onClick={toggle}>
        {label}
      </button>
      <Collapse isOpen={isOpen}>
        <div>
          {chapter.lessons.map((l, lsnIndex) => (
            <div key={lsnIndex} className="row">
              <div className="col-4">
                <Input
                  name="name"
                  value={l.name}
                  onChange={(e) =>
                    onLessonChange(e.target, chapterIndex, lsnIndex)
                  }
                />
              </div>
              <div className="col-4">
                <Input
                  name="length"
                  value={l.length}
                  onChange={(e) =>
                    onLessonChange(e.target, chapterIndex, lsnIndex)
                  }
                />
              </div>
              <div className="col">
                <button
                  className="btn btn-link btn-sm"
                  type="button"
                  onClick={() => onAddLsnBefore(chapterIndex, lsnIndex)}
                >
                  Add before
                </button>
                <button
                  className="btn btn-link del btn-sm"
                  type="button"
                  onClick={() => onDeleteLsn(chapterIndex, lsnIndex)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          className="btn btn-link btn-sm"
          type="button"
          onClick={() => onAddLesson(chapterIndex)}
        >
          Add Lesson
        </button>
      </Collapse>
    </>
  );
};

export default Lessons;
