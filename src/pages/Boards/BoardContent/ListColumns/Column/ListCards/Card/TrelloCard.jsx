import React from 'react'
import  Card  from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import ModeCommentIcon from '@mui/icons-material/ModeComment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import { Box, Typography } from '@mui/material'
import Button from '@mui/material/Button'

function TrelloCard() {
  return (
    <Card sx={{
      cursor:'pointer',
      boxShadow:'0 1px 1px rgba(0, 0, 0, 0.2)'
    }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT27iH4kG1h3RF37xccQY2iPYG4lJK-I6SDrw&usqp=CAU"
        title="green iguana"
      />
      <CardContent sx={{
        p:1.5, '&:last-child':{ p:1.5 }
      }}>
        <Typography>
            Nguyen Van Vi
        </Typography>
      </CardContent>
      <CardActions sx={{
        p:'0 4px 8px 4px'
      }}>
        <Button size="small" startIcon={<GroupIcon/>}>20</Button>
        <Button size="small" startIcon={<ModeCommentIcon/>}>20</Button>
        <Button size="small" startIcon={<AttachmentIcon/>}>20</Button>
      </CardActions>
    </Card>
  )
}

export default TrelloCard
