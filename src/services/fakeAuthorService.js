export const authors = [
  { _id: "1", name: "Mosh" },
  { _id: "2", name: "John" },
];

export function getAuthors() {
  return authors;
}

export function getAuthor(id) {
  return authors.find((author) => author._id === id);
}
