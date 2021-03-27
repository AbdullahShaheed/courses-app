import { getAuthor } from "./fakeAuthorService";

const courses = [
  {
    _id: "1",
    title: "Mastering React",
    author: { _id: "1", name: "Mosh" },
    chapters: [
      {
        name: "chapter 1",
        lessons: [
          { name: "lsn 1", length: "3: 20" },
          { name: "lsn 2", length: "4:00" },
        ],
      },
      {
        name: "chapter 2",
        lessons: [
          { name: "lsn 1", length: "4: 30" },
          { name: "lsn 2", length: "5: 00" },
        ],
      },
    ],
  },
  {
    _id: "2",
    title: "The Complete Node.js Course",
    author: { _id: "2", name: "John" },
    chapters: [
      {
        name: "chapter 1",
        lessons: [
          { name: "lsn 1", length: "3: 10" },
          { name: "lsn 2", length: "3: 15" },
        ],
      },
      {
        name: "chapter 2",
        lessons: [
          { name: "J-lsn 21", length: "4: 50" },
          { name: "J-lsn 22", length: "4: 00" },
        ],
      },
    ],
  },
];

export function getCourses() {
  return courses;
}

export function getCourse(id) {
  return courses.find((c) => c._id === id);
}

export function saveCourse(course) {
  const courseInDb = courses.find((c) => c._id === course._id) || {};
  courseInDb.title = course.title;
  courseInDb.author = getAuthor(course.authorId);
  courseInDb.chapters = course.chapters;

  if (!course._id) {
    courseInDb._id = (courses.length + 1).toString();
    courses.push(courseInDb);
  }

  return courseInDb;
}
