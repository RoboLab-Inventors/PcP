<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
const EditComponent = ({ items, chartData }) => {
  const currentItem = items.find(item => item.label === chartData.label);
  const [selectedValue, setSelectedValue] = useState(currentItem.label);
  const [type, setType] = useState('');
  const [selectConversion, setSelectConversion] = useState('');
  
  const dataType = ['Asse', 'Pulsante', 'Direzionale', 'Trigger'];
  
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const handleConversion = (event) =>{
    setSelectConversion(event.target.value);
  }

  useEffect(()=>{
    setSelectConversion(type);
  },[type])
  
  useEffect(() => {
    const handleType = () => {
      const firstWord = currentItem.label.split(' ')[0];
      switch(firstWord){
        case 'BTN':
          setType('Pulsante');
          break;
          case 'DIR': 
          setType('Direzionale');
          break;
          case 'T':
            setType('Trigger');
            break;
            default:
              setType('Asse');
            }
          }
          handleType();
        }, []);
        
  return (
      <div className="content">
        <>
          <Typography variant = "h6">TIPO</Typography>
          <div className="input-container">
            <input
              type="text"
              id="tipo"
              name="tipo"
              required
              placeholder=" "
              className="input-insert"
              disabled
              value={type}
            />
          </div>
        </>
        <>
          <Typography variant = "h6">INPUT</Typography>
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
          <Typography variant = "h6">Conversione</Typography>
          <Select
            value={selectConversion}
            sx={{
              width: "100%",
              minWidth: "160px",
              height: "40px",
              backgroundColor: "transparent",
              border: "1px solid var(--fontColor-main)",
              color: "var(--fontColor-main)",
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "none",
              }
            }}
            onChange={handleConversion}
          >
            {dataType
              .map(valueType => (
                <MenuItem key={valueType} value={valueType}>
                  {valueType}
                </MenuItem>
              ))}
          </Select>
          
        </>
        <>       
          <Typography variant = "h6">Pulsante di arrivo</Typography>
          <Select
            value={selectedValue}
            sx={{
              width: "100%",
              minWidth: "160px",
              height: "40px",
              backgroundColor: "transparent",
              border: "1px solid var(--fontColor-main)",
              color: "var(--fontColor-main)",
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "none",
              }
            }}
            onChange={handleChange}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 200,
                  overflowY: 'auto',
                  backgroundColor: "transparent",
                  color: "var(--fontColor-main)", 
                },
              },
            }}
          >
            {items
              .filter(item => item.label !== currentItem.label)
              .map(item => (
                <MenuItem key={item.label} value={item.label}>
                  {item.label}
                </MenuItem>
              ))}
          </Select>
        </>
      </div>
  );
=======
import './EditComponent.css';
import '../ToolGrid.css';


const EditComponent = () => {
    return (
        <div>
            <h2>Edit Component</h2>
            <div className="content">
                <p>Edit options for the component.</p>
            </div>
        </div>
    );
>>>>>>> 0b27615a0e437445f659d75e5f87bb954c3ab230
};

export default EditComponent;