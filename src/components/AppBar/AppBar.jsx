import React, { useState } from 'react'
import { Box, Container, Typography, colors } from '@mui/material'
import AppsIcon from '@mui/icons-material/Apps'
import { ReactComponent as TrelloIcon } from '../../assets/trello.svg'
import {SvgIcon} from '@mui/material'
import Workspaces from './Menus/Workspaces'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Templates from './Menus/Templates'
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Profiles from './Menus/Profiles'
import ModeSelect from '../ModeSelect/ModeSelect'

function AppBar() {
  const [searchValue,setSearchValue] = useState('')
  return (
    <Box px={2} sx={{
      backgroundColor:'primary.light',
      width:'100%',
      height:(theme) => theme.trello.appBarHeight,
      display:'flex',
      alignItems:'center',
      justifyContent:'space-between',
      gap:2,
      overflowX:'auto',
      bgcolor:(theme )=>(theme.palette.mode ==='dark'?'#2c3e50':'#1565c0')
    }}>
      <Box sx={{display:'flex',alignItems:'center',gap:2}}>
        <AppsIcon sx={{color: 'white' }}/>
        <Box sx={{display:'flex',alignItems:'center',gap:0.5}}>
          <SvgIcon component={TrelloIcon} inheritViewBox sx={{color: 'white' }} />
          <Typography variant='span' sx={{fontSize:'1.2rem', fontWeight:'bold', color:'white'}}>Trello</Typography>
        </Box>
        <Box sx={{display:{xs:'none',md:'flex'},gap:1}}>
          <Workspaces/>
          <Recent/>
          <Starred/>
          <Templates/>
        </Box>
        <Button sx={{color:'white',border:'none'}} variant="outlined">Create</Button>
      </Box>
      <Box sx={{display:'flex',alignItems:'center',gap:2}}>
        <TextField 
        id="outlined-search" 
        label="Search..." 
        type="text" 
        size='small'
        value={searchValue}
        onChange={(e)=>setSearchValue(e.target.value)}
        InputProps={{
          startAdornment:(
            <InputAdornment position="start">
            <SearchIcon sx={{color:'white'}}/>
          </InputAdornment>
          ),
          endAdornment:(
            <CloseIcon 
              fontSize='small' sx={{color:searchValue ?'white':'transparent',cursor:'pointer'}}
              onClick ={()=>setSearchValue('')}
            />
          )
        }}
        sx={{
          minWidth:'120px',
          maxWidth:'180px',
          '& label':{color:'white'},
          '& input':{color:'white'},
          '& label.Mui-focused':{color:'white'},
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
        <ModeSelect/>
        <Tooltip title='Notification'>
          <Badge color="secondary" variant="dot" sx={{cursor:'pointer'}}>
            <NotificationsNoneIcon sx={{color:'white'}}/>
          </Badge>
        </Tooltip>
        <Tooltip title='Help'>
          <Badge color="secondary" variant="dot" sx={{cursor:'pointer'}}>
            <HelpOutlineIcon sx={{color:'white'}} />
          </Badge>
        </Tooltip>
        <Profiles/>
      </Box>
    </Box>
  )
}

export default AppBar
