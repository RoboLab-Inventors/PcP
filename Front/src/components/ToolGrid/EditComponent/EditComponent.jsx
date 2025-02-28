import React, { useState, useEffect } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import CustomButton from '../../CustomButton/CustomButton'; // Importa il tuo CustomButton
import theme from '../../../utils/theme';
import './EditComponent.css';

const EditComponent = ({ items, chartData }) => {
  const currentItem = items.find(item => item.label === chartData.label);
  const [selectedValue, setSelectedValue] = useState(currentItem.label);
  const [type, setType] = useState('');
  const [selectConversion, setSelectConversion] = useState(type);
  const [selectFilter, setSelectFilter] = useState(currentItem.label.split(' ')[0]);
  
  const dataType = [
    { key: 'AX', value: 'Asse' },
    { key: 'BTN', value: 'Pulsante' },
    { key: 'DIR', value: 'Direzionale' },
    { key: 'T', value: 'Trigger' }
  ];
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const handleConversion = (event) =>{
    const selectedOption = event.target.value;
    if (selectedOption !== "") {
      const selectedKey = dataType.find(item => item.value === event.target.value).key;
      setSelectConversion(event.target.value);
      setSelectFilter(selectedKey);
    } else {
      setSelectConversion(type);
      setSelectFilter(currentItem.label.split(' ')[0]);
    }
  }

  useEffect(()=>{
    setSelectConversion(type);
  },[type])

  useEffect(() => {
    setSelectedValue('');
  }, [selectConversion]);
  
  useEffect(() => {
    const handleType = () => {
      const firstWord = currentItem.label.split(' ')[0];
      const typeItem = dataType.find(item => item.key === firstWord);
      setType(typeItem ? typeItem.value : 'Asse');
    };
    handleType();
  }, [currentItem]);
        
  return (
      <div className="editContainer">
        <div className="button-container">
          <CustomButton label="Salva Modifiche" onClick backgroundColor = "var(--primary-color-secondary)" bgColor = "var(--secondary-color-secondary)" borderColor = "var(--background-primary)"/>
        </div>
        <>
          <Typography variant = "h6" color = {theme.palette.primary.secondary}>TIPO</Typography>
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
          <Typography variant = "h6" color = {theme.palette.primary.secondary}>INPUT</Typography>
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
          <Typography variant = "h6" color = {theme.palette.primary.secondary}>CONVERSIONE</Typography>
          <Select
            value={selectConversion}
            onChange={handleConversion}
            sx={{
              width: "100%",
              height: "40px",
              backgroundColor: "transparent",
              border: "1px solid var(--fontColor-main)",
              color: "var(--fontColor-main)",
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "none",
              }
            }}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 200,
                  overflowY: 'auto',
                },
              },
            }}>
              <MenuItem key={currentItem.label.split(' ')[0]} value="" data-key={currentItem.label.split(' ')[0]}>
                Seleziona un'opzione
              </MenuItem>
            {dataType.map(valueType => (
              <MenuItem key={valueType.key} value={valueType.value} data-key={valueType.key}>
                {valueType.value}
              </MenuItem>
            ))}
          </Select>
          
        </>
        <>       
          <Typography variant = "h6" color = {theme.palette.primary.secondary}>PULSANTE DI ARRIVO</Typography>
          <Select
            value={selectedValue}
            onChange={handleChange}
            sx={{
              width: "100%",
              height: "40px",
              backgroundColor: "transparent",
              border: "1px solid var(--fontColor-main)",
              color: "var(--fontColor-main)",
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "none",
              }
            }}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 200,
                  overflowY: 'auto',
                },
              },
            }}>
              <MenuItem value="">
                Seleziona un'opzione
              </MenuItem>
            {items
            .filter(item => item.label.split(' ')[0] === selectFilter)
              .map(item => (
                <MenuItem key={item.label} value={item.label}>
                  {item.label}
                </MenuItem>
              ))}
          </Select>
        </>
      </div>
  );
};

export default EditComponent;