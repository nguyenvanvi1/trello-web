import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import Column from './Column/Column'
import AddIcon from '@mui/icons-material/Add';
function ListColumns() {
  
  return (
    <Box sx={{
      bgcolor:'inherit',
      width:'100%',
      height:'100%',
      display:'flex',
      overflowX:'auto',
      overflowY:'hidden',
      '&::-webkit-scrollbar-track':{ m:2 }
    }}>
      {/* box column 1*/}
      <Column/>
      <Column/>
      <Box sx={{
        minWidth:'200px',
        maxWidth:'200px',
        mx:2,
        borderRadius:'6px',
        height:'fit-content',
        bgcolor:'#ffffff3d'
      }}>
        <Button sx={{color:'white',width:'100%', justifyContent:'flex-start'}} startIcon={<AddIcon/>}>Add new column</Button>
      </Box>
    </Box>
  )
}

export default ListColumns
