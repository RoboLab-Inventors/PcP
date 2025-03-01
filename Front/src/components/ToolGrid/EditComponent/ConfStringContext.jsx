import { createContext, useState } from 'react';

export const ConfStringContext = createContext();

export const ConfStringProvider = ({ children }) => {
  const [confString, setConfString] = useState([]);

  return (
    <ConfStringContext.Provider value={{ confString, setConfString }}>
      {children}
    </ConfStringContext.Provider>
  );
};