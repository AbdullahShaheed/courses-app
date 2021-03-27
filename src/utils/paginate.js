import _ from "lodash";

// Implement pagination on client side
export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();

  //or shorter code
  // return _.slice(items, startIndex, startIndex + pageSize);
  //or shorter without lodash
  // return items.slice(startIndex, startIndex + pageSize);
}
