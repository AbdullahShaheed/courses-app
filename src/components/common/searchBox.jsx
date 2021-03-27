import React from "react";
import Input from "./input";

const SearchBox = ({ value, onChange }) => {
  return (
    <Input
      value={value}
      placeholder="Search..."
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBox;
