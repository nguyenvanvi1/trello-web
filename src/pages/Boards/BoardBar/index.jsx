import React from 'react'
import { Box, Container} from '@mui/material'

function BoardBar() {
  return (
    <Box sx={{
      backgroundColor:'primary.dark',
      width:'100%',
      height:(theme) => theme.trello.boardHeight,
      display:'flex',
      alignItems:'center'
    }}>
        Board barR
    </Box>
  )
}

export default BoardBar
