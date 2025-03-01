import React, { useState, useEffect, useContext } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import CustomButton from '../../CustomButton/CustomButton';
import { ConfStringContext } from './ConfStringContext';
import theme from '../../../utils/theme';
import './EditComponent.css';

const EditComponent = ({ items, chartData }) => {
  const { confString, setConfString } = useContext(ConfStringContext);
  const [currentItem, setCurrentItem] = useState(items.find(item => item.label === chartData.label));
  const [selectedValue, setSelectedValue] = useState(currentItem.label);
  const [type, setType] = useState('');
  const [selectConversion, setSelectConversion] = useState('');
  const [selectFilter, setSelectFilter] = useState(currentItem.label.split(' ')[0]);
  const [localConfString, setLocalConfString] = useState(items.map(item => ({
    key: item.label,
    value: ['', '']
  })));

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
  
  //Aggiornamento del CurrentItem in base alla selezione nella item list
  useEffect(() => {setCurrentItem(items.find(item => item.label === chartData.label))}, [chartData]);
  useEffect(() => {
    const handleType = () => {
      const firstWord = currentItem.label.split(' ')[0];
      const typeItem = dataType.find(item => item.key === firstWord);
      
      if (!typeItem) return; // Evita errori se il tipo non viene trovato
      
      setType(typeItem.value);
  
      const savedConfig = localConfString.find(item => item.key === currentItem.label);
      console.log(savedConfig.value);
      
      if (savedConfig) {
        // Se ci sono valori salvati in localConfString, ripristinali
        setSelectConversion(savedConfig.value[0] || typeItem.value);
        setSelectedValue(savedConfig.value[1] || '');
        
        // Seleziona il filtro corretto basandosi sul valore salvato
        const foundKey = dataType.find(item => item.value === savedConfig.value[0])?.key || firstWord;
        setSelectFilter(foundKey);
      } else {
        // Se non ci sono valori salvati, imposta i valori di default
        setSelectConversion(typeItem.value);
        setSelectFilter(firstWord);
        setSelectedValue('');
      }
    };
  
    handleType();
  }, [currentItem, localConfString]); 

  const handleSave = () => {
    const currentConf = localConfString.find(item => item.key === currentItem.label);
    currentConf.value = [selectConversion, selectedValue];
    setLocalConfString([...localConfString]);
    setConfString([...localConfString]);
    console.log(currentConf.value);
  };
  
  return (
      <div className="editContainer">
        <div className="button-container">
          <CustomButton label="Salva Modifiche" backgroundColor = "var(--primary-color-secondary)" 
          bgColor = "var(--secondary-color-secondary)" borderColor = "var(--background-primary)"
          onClick={handleSave}/>
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