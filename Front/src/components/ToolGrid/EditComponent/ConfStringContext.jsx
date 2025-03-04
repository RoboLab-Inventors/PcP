/**
 * Contesto per la gestione della stringa di configurazione.
 *
 * @module ConfStringContext
 */

import { createContext, useState } from "react";
import PropTypes from "prop-types";

/**
 * Crea un contesto per la stringa di configurazione.
 * @type {React.Context}
 */
export const ConfStringContext = createContext();

/**
 * Provider per il contesto della stringa di configurazione.
 *
 * @param {Object} props - Le proprietà del componente.
 * @param {React.ReactNode} props.children - I componenti figli che avranno accesso al contesto.
 * @returns {JSX.Element} Il provider del contesto della stringa di configurazione.
 */
export const ConfStringProvider = ({ children }) => {
  const [confString, setConfString] = useState([]);

  return (
    <ConfStringContext.Provider value={{ confString, setConfString }}>
      {children}
    </ConfStringContext.Provider>
  );
};

ConfStringProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
