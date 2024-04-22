import React from 'react'
import { Box, Container, Tooltip } from '@mui/material'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import AvatarGroup from '@mui/material/AvatarGroup'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { capitalizeFirstLetter } from '~/utils/formatters'
function BoardBar({board}) {

  return (
    <Box sx={{
      width:'100%',
      height:(theme) => theme.trello.boardHeight,
      display:'flex',
      alignItems:'center',
      justifyContent:'space-between',
      gap:2,
      overflowX:'auto',
      bgcolor:(theme ) => (theme.palette.mode ==='dark'?'#34495e':'#1976d2'),
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
        label={board?.title}
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
        label={capitalizeFirstLetter(board?.type)}
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
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon/>}
          sx={{ color:'white', borderColor:'white', '&:hover':{ borderColor:'white' } }}
        >Invite</Button>

        <AvatarGroup max={3}
          sx={{
            gap:'10px',
            '& .MuiAvatar-root':{
              width:34,
              height:34,
              fontSize:16,
              border:'none',
              color:'white',
              cursor:'pointer',
              '&:first-of-type':{ bgcolor:'#a4b0be' }
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
