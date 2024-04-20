import React from 'react'
import { Box, Container, Tooltip } from '@mui/material'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button'
import AvatarGroup from '@mui/material/AvatarGroup';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
function BoardBar() {
  return (
    <Box sx={{
      backgroundColor:'primary.dark',
      width:'100%',
      height:(theme) => theme.trello.boardHeight,
      display:'flex',
      alignItems:'center',
      justifyContent:'space-between',
      gap:2,
      overflowX:'auto',
      borderTop:'1px solid #00bfa5'
    }}>
      <Box sx={{ display:'flex', alignItems:'center', gap:2 }}>
        <Chip sx={{
          color:'primary.main',
          bgcolor:'white',
          border:'none',
          paddingX:'5px',
          borderRadius:'4px',
          '& .MuiSvgIcon-root':{
            color:'primary.main'
          },
          '&:hover':{
            bgcolor:'primary.50'
          }
        }}
        icon={<DashboardIcon/>}
        label="NguyenVanVi FULL STACK"
        />
        <Chip sx={{
          color:'primary.main',
          bgcolor:'white',
          border:'none',
          paddingX:'5px',
          borderRadius:'4px',
          '& .MuiSvgIcon-root':{
            color:'primary.main'
          },
          '&:hover':{
            bgcolor:'primary.50'
          }
        }}
        icon={<DashboardIcon/>}
        label="Public/Private Workspace"
        />
        <Chip sx={{
          color:'primary.main',
          bgcolor:'white',
          border:'none',
          paddingX:'5px',
          borderRadius:'4px',
          '& .MuiSvgIcon-root':{
            color:'primary.main'
          },
          '&:hover':{
            bgcolor:'primary.50'
          }
        }}
        icon={<DashboardIcon/>}
        label="Add to Driver"
        />
        <Chip sx={{
          color:'primary.main',
          bgcolor:'white',
          border:'none',
          paddingX:'5px',
          borderRadius:'4px',
          '& .MuiSvgIcon-root':{
            color:'primary.main'
          },
          '&:hover':{
            bgcolor:'primary.50'
          }
        }}
        icon={<DashboardIcon/>}
        label="Automation"
        />
        <Chip sx={{
          color:'primary.main',
          bgcolor:'white',
          border:'none',
          paddingX:'5px',
          borderRadius:'4px',
          '& .MuiSvgIcon-root':{
            color:'primary.main'
          },
          '&:hover':{
            bgcolor:'primary.50'
          }
        }}
        icon={<DashboardIcon/>}
        label="Filter"
        />
      </Box>
      <Box sx={{ display:'flex', alignItems:'center', gap:2 }}>
      <Button variant="outlined" startIcon={<PersonAddIcon/>}>Invite</Button>

        <AvatarGroup max={3}
        sx={{
          '& .MuiAvatar-root':{
            widt:34,
            height:34,
            fontSize:16
          }
        }}
        >
          <Tooltip title="nguyenvanvi">
            <Avatar alt="nguyenvanvi" src="/static/images/avatar/1.jpg" />
          </Tooltip>
          <Tooltip title="nguyenvanvi">
            <Avatar alt="nguyenvanvi" src="/static/images/avatar/1.jpg" />
          </Tooltip>
          <Tooltip title="nguyenvanvi">
            <Avatar alt="nguyenvanvi" src="/static/images/avatar/1.jpg" />
          </Tooltip><Tooltip title="nguyenvanvi">
            <Avatar alt="nguyenvanvi" src="/static/images/avatar/1.jpg" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
