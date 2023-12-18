import { useState } from "react";

const useLocalStorage = (commentID) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem("likes");
    return storedValue ? JSON.parse(storedValue)[commentID] : false;
  });

  const updateValue = (newValue) => {
    setValue(newValue);

    localStorage.setItem(
      "likes",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("likes")),
        [commentID]: newValue,
      })
    );
  };

  return [value, updateValue];
};

export default useLocalStorage;
