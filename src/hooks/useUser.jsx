import { useState } from "react";

const useUser = () => {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem("user");
      return storedValue
        ? JSON.parse(storedValue)
        : { loggedIn: false, userId: 0, userName: "", userAvatar: "" };
    } catch (error) {
      console.error("Error parsing user from local storage:", error);
      return { loggedIn: false, userId: 0, userName: "", userAvatar: "" };
    }
  });

  const updateValue = (newValue) => {
    setValue(newValue);
    localStorage.setItem("user", JSON.stringify(newValue));
  };

  return [value, updateValue];
};

export default useUser;
