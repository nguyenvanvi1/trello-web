import React, { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import Column from './Column/Column'
import {toast} from 'react-toastify'
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
function ListColumns({ columns,createNewColumn,createNewCard }) {
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)
  const [newColumnTitle,setNewColumnTitle] = useState('')
  const addNewColumn = () => {
    if(!newColumnTitle) {
      toast.error('loi')
      return
    }
    const newColumnData = {
      title: newColumnTitle
    }
   createNewColumn(newColumnData)
    toggleOpenNewColumnForm()
    setNewColumnTitle('')
  }
  return (
    <SortableContext items={columns?.map(c => c._id)} strategy={horizontalListSortingStrategy}>
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
        {
          columns?.map( column => <Column key={column._id} column={column} createNewCard= {createNewCard}/>)
        }
        {!openNewColumnForm
          ? <Box onClick={toggleOpenNewColumnForm} sx={{
            minWidth:'250px',
            maxWidth:'250px',
            mx:2,
            borderRadius:'6px',
            height:'fit-content',
            bgcolor:'#ffffff3d'
          }}>
            <Button sx={{ color:'white', width:'100%', justifyContent:'flex-start' }} startIcon={<AddIcon/>}>Add new column</Button>
          </Box>
          : <Box sx={{
            minWidth:'250px',
            maxWidth:'250px',
            mx:2,
            p:1,
            borderRadius:'6px',
            height:'fit-content',
            bgcolor:'#fffff3d',
            display:'flex',
            flexDirection:'column',
            gap:1
          }}>
            <TextField
              label="Enter column title"
              type="text"
              size='small'
              variant="outlined"
              autoFocus
              data-no-dnd="true"
              value={newColumnTitle}
              onChange={(e)=>setNewColumnTitle(e.target.value)}
              sx={{
                '& label':{ color:'white' },
                '& input':{ color:'white' },
                '& label.Mui-focused':{ color:'white' },
                '& .MuiOutlinedInput-root':{
                  '& fieldset':{
                    borderColor:'white'
                  },
                  '&:hover fieldset':{
                    borderColor:'white'
                  },
                  '&.Mui-focused fieldset':{
                    borderColor:'white'
                  }
                }
              }} />
            <Box sx={{display:'flex',alignItems:'center',gap:1}}>
              <Button onClick={addNewColumn}
                variant='contained' color='success' size='small'
                sx={{
                  boxShadow:'none',
                  border:'0.5px solid',
                  borderColor:(theme)=>theme.palette.success.main,
                  '&:hover':{bgcolor:(theme)=>theme.palette.success.main}
                }}
              >Add column</Button>
              <CloseIcon
                fontSize='small' sx={{color:'red', cursor:'pointer'}}
                onClick ={toggleOpenNewColumnForm}
              />
            </Box>
        </Box>
      }
      </Box>
    </SortableContext>
  )
}

export default ListColumns
