import React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useColorScheme } from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
function ModeSelect() {
  const { mode, setMode } = useColorScheme()
  const handleChange = (event) => {
        const selectedMode = event.target.value
        setMode(selectedMode)
  };
  return (
    <FormControl fullWidth>
      <InputLabel id="label-select-dark-light-mode">Mode</InputLabel>
      <Select
        labelId="label-select-dark-light-mode"
        id="select-dark-light-mode"
        value={mode}
        label="Age"
        onChange={handleChange}
      >
        <MenuItem value='light'>
            <div style={{ display:'flex', alignItems:'center',gap:'8px' }}>
            <LightModeIcon fontSize='small'/>Light
            </div>
        </MenuItem>
        <MenuItem value='dark'>
            <div style={{ display:'flex', alignItems:'center' }}>
            <DarkModeIcon fontSize='small'/>Dark
            </div>
        </MenuItem>
        <MenuItem value='system'>           
            <div style={{ display:'flex', alignItems:'center' }}>
            <SettingsBrightnessIcon fontSize='small'/>  System
            </div>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

export default ModeSelect
