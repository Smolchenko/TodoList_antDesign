import React, { createContext, useContext } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const getColor = (text) => {
    switch (text) {
      case "Add":
        return "#BF9270";
      case "Edit":
        return "#FFD3B4";
      case "Delete":
        return "#FFAAA7";
      case "Save":
        return "#BBD6B8";
      default:
        return "#BF9270";
    }
  };

  return (
    <ThemeContext.Provider value={{ getColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

export { ThemeProvider, useTheme };
