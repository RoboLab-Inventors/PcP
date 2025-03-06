/**
 * Componente EditComponent
 *
 * Questo componente permette di modificare le configurazioni di un elemento selezionato.
 *
 * @component
 * @param {Object} props - Le proprietà passate al componente.
 * @param {Array} props.items - Lista degli elementi disponibili.
 * @param {Object} props.chartData - Dati del grafico corrente.
 *
 * @returns {JSX.Element} Il componente EditComponent.
 *
 * @example
 * <EditComponent items={items} chartData={chartData} />
 *
 * @description
 * Il componente utilizza vari hook di stato e di effetto per gestire e aggiornare le configurazioni locali e globali.
 *
 * - `useContext(ConfStringContext)`: Recupera e imposta la stringa di configurazione globale.
 * - `useState`: Gestisce vari stati locali come `currentItem`, `selectedValue`, `type`, `selectConversion`, `selectFilter`, e `localConfString`.
 * - `useEffect`: Effetti per recuperare dati dal localStorage e aggiornare gli stati in base alle modifiche.
 *
 * @function handleChange
 * Gestisce il cambiamento del valore selezionato nel Select di selezione del pulsante di arrivo.
 *
 * @function handleConversion
 * Gestisce il cambiamento del valore selezionato nel Select di selezione del tipo di conversione.
 *
 * @function handleSave
 * Gestisce il salvataggio delle configurazioni aggiornate.
 */
import { useState, useEffect, useContext } from "react";
import { Select, MenuItem, Typography } from "@mui/material";
import PropTypes from "prop-types";
import CustomButton from "../../CustomButton/CustomButton";
import { ConfStringContext } from "./ConfStringContext";
import theme from "../../../utils/theme";
import "./EditComponent.css";

const EditComponent = ({ items, chartData }) => {
  const { confString, setConfString } = useContext(ConfStringContext);
  const [currentItem, setCurrentItem] = useState(
    items.find((item) => item.label === chartData.label)
  );
  const [selectedValue, setSelectedValue] = useState(currentItem.label);
  const [type, setType] = useState("");
  const [selectConversion, setSelectConversion] = useState("");
  const [selectFilter, setSelectFilter] = useState(
    currentItem.label.split(" ")[0]
  );
  const [localConfString, setLocalConfString] = useState(
    items.map((item) => ({
      key: item.label,
      value: ["", ""],
    }))
  );

  // Effetto per recuperare la stringa di configurazione locale dal localStorage
  useEffect(() => {
    if (localStorage.getItem("str")) {
      setLocalConfString(JSON.parse(localStorage.getItem("str")));
    }
  }, [localStorage.getItem("str")]);

  // Definizione dei tipi di dati disponibili
  const dataType = [
    { key: "AX", value: "Asse" },
    { key: "BTN", value: "Pulsante" },
    { key: "DIR", value: "Direzionale" },
    { key: "T", value: "Trigger" },
  ];
  // Gestore per il cambiamento del valore selezionato nel Select di selezione del pulsante di arrivo
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  // Gestore per il cambiamento del valore selezionato nel Select di selezione del tipo di conversione
  const handleConversion = (event) => {
    const selectedOption = event.target.value;
    if (selectedOption !== "") {
      // Trova la chiave corrispondente al valore selezionato
      const selectedKey = dataType.find(
        (item) => item.value === event.target.value
      ).key;
      setSelectConversion(event.target.value);
      setSelectFilter(selectedKey);
    } else {
      setSelectConversion(type);
      setSelectFilter(currentItem.label.split(" ")[0]);
    }
  };

  useEffect(() => {
    setSelectConversion(type);
  }, [type]);

  //Aggiornamento del CurrentItem in base alla selezione nella item list
  useEffect(() => {
    setCurrentItem(items.find((item) => item.label === chartData.label));
  }, [chartData]);

  useEffect(() => {
    const handleType = () => {
      const firstWord = currentItem.label.split(" ")[0];
      const typeItem = dataType.find((item) => item.key === firstWord);

      if (!typeItem) return; // Evita errori se il tipo non viene trovato

      setType(typeItem.value);

      const savedConfig = localConfString.find(
        (item) => item.key === currentItem.label
      );

      if (savedConfig) {
        // Se ci sono valori salvati in localConfString, ripristinali
        setSelectConversion(savedConfig.value[0] || typeItem.value);
        setSelectedValue(savedConfig.value[1] || currentItem.label);

        // Seleziona il filtro corretto basandosi sul valore salvato
        const foundKey =
          dataType.find((item) => item.value === savedConfig.value[0])?.key ||
          firstWord;
        setSelectFilter(foundKey);
      } else {
        // Se non ci sono valori salvati, imposta i valori di default
        setSelectConversion(typeItem.value);
        setSelectFilter(firstWord);
        setSelectedValue(currentItem.label);
      }
    };

    handleType();
  }, [currentItem, localConfString]);

  // Funzione per gestire il salvataggio delle configurazioni
  const handleSave = () => {
    const currentConf = localConfString.find(
      (item) => item.key === currentItem.label
    );
    currentConf.value = [selectConversion, selectedValue];
    setLocalConfString([...localConfString]);
    setConfString([...localConfString]);
  };

  return (
    <div className="editContainer">
      <div className="button-container">
        <CustomButton label="Salva Modifiche" onClick={handleSave} />
      </div>
      <>
        <Typography variant="h6" color={theme.palette.secondary.main}>
          TIPO
        </Typography>
        <div className="input-container">
          <input
            type="text"
            id="type"
            name="type"
            required
            placeholder=" "
            className="input-insert"
            disabled
            value={type}
          />
        </div>
      </>
      <>
        <Typography variant="h6" color={theme.palette.secondary.main}>
          INPUT
        </Typography>
        <div className="input-container">
          <input
            type="text"
            id="Input"
            name="Input"
            required
            placeholder=" "
            className="input-insert"
            disabled
            value={currentItem.label}
          />
        </div>
      </>
      <>
        <Typography variant="h6" color={theme.palette.secondary.main}>
          CONVERSIONE
        </Typography>
        <Select
          value={selectConversion}
          onChange={handleConversion}
          sx={{
            width: "100%",
            height: "40px",
            backgroundColor: "transparent",
            border: "1px solid var(--text)!important",
            color: "var(--background)!important",
            "& .MuiSelect-icon": {
              // Targeting the dropdown arrow icon
              color: "var(--background)!important", // Set the color of the arrow icon here
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200,
                overflowY: "auto",
                backgroundColor: "var(--text)",
                color: "var(--darkgrey)",
              },
            },
          }}
        >
          <MenuItem
            key={currentItem.label.split(" ")[0]}
            value=""
            data-key={currentItem.label.split(" ")[0]}
          >
            Seleziona un&apos;opzione
          </MenuItem>
          {dataType.map((valueType) => (
            <MenuItem
              key={valueType.key}
              value={valueType.value}
              data-key={valueType.key}
            >
              {valueType.value}
            </MenuItem>
          ))}
        </Select>
      </>
      <>
        <Typography variant="h6" color={theme.palette.secondary.main}>
          PULSANTE DI ARRIVO
        </Typography>
        <Select
          value={selectedValue}
          onChange={handleChange}
          sx={{
            width: "100%",
            height: "40px",
            backgroundColor: "transparent",
            border: "1px solid var(--text)!important",
            color: "var(--background)!important",
            "& .MuiSelect-icon": {
              // Targeting the dropdown arrow icon
              color: "var(--background)!important", // Set the color of the arrow icon here
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200,
                overflowY: "auto",
                backgroundColor: "var(--text)",
                color: "var(--darkgrey)",
              },
            },
          }}
        >
          <MenuItem value="">Seleziona un&apos;opzione</MenuItem>
          {items
            .filter((item) => item.label.split(" ")[0] === selectFilter)
            .map((item) => (
              <MenuItem key={item.label} value={item.label}>
                {item.label}
              </MenuItem>
            ))}
        </Select>
      </>
    </div>
  );
};

EditComponent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  chartData: PropTypes.shape({
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default EditComponent;
