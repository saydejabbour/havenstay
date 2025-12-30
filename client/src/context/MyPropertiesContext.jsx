// src/context/MyPropertiesContext.jsx
import { createContext, useContext, useState } from "react";
import { properties as initialProperties } from "../data/properties";

// Holds ALL properties (the 8 default + any new ones)
const MyPropertiesContext = createContext(null);

export function MyPropertiesProvider({ children }) {
  const [properties, setProperties] = useState(initialProperties);

  const addProperty = (property) => {
    setProperties((prev) => [...prev, property]);
  };

  return (
    <MyPropertiesContext.Provider value={{ properties, addProperty }}>
      {children}
    </MyPropertiesContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useMyProperties() {
  const ctx = useContext(MyPropertiesContext);
  if (!ctx) {
    throw new Error("useMyProperties must be used inside MyPropertiesProvider");
  }
  return ctx;
}
