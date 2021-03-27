import React, { useState } from "react";
import Input from "./common/input";
import Lessons from "./lessons";

const Chapters = ({
  course,
  onChapterChange,
  onLessonChange,
  onAddChapter,
  onAddLesson,
  onAddLsnBefore,
  onDeleteLsn,
}) => {
  return (
    <>
      <ul>
        {course.chapters.map((ch, chIndex) => (
          <li key={chIndex}>
            <div className="col-4">
              <Input
                value={ch.name}
                onChange={(e) => onChapterChange(e.target, chIndex)}
              />
            </div>
            <div>
              <Lessons
                chapter={ch}
                chapterIndex={chIndex}
                onLessonChange={onLessonChange}
                onAddLesson={onAddLesson}
                onAddLsnBefore={onAddLsnBefore}
                onDeleteLsn={onDeleteLsn}
              />
            </div>
          </li>
        ))}
      </ul>
      <button
        className="btn btn-link btn-sm"
        type="button"
        onClick={() => onAddChapter(course)}
      >
        Add Chapter
      </button>
    </>
  );
};

export default Chapters;
