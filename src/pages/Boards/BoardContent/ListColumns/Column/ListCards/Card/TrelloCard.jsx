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
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import theme from '~/theme'
function TrelloCard({card}) {
  const {
    attributes, listeners, setNodeRef, transform, transition,isDragging } = useSortable({
    id: card._id,
    data:{ ...card }
  })

  const dndKitCardStyles = {
    touchAction:'none',
    transform: CSS.Translate.toString(transform),
    transition,
    opacity:isDragging ? 0.5 :undefined,
    border:isDragging ? '1px solid #2ecc71' :undefined
  }
  const shouldShowCardActions = ()=>{
    return !!card?.memberIds?.length || !!card?.memberIds?.length || !!card?.memberIds?.length
  }
  return (
    <Card
    ref={setNodeRef}
      style = {dndKitCardStyles}
      {...attributes}
      {...listeners}
    sx={{
      cursor:'pointer',
      boxShadow:'0 1px 1px rgba(0, 0, 0, 0.2)',
      overflow:'unset',
      display:card?.FE_PlaceholderCard ?'none':'block',
      border:'1px solid transparent',
      '&:hover':{borderColor:(theme=>theme.palette.primary.main)}
    }}>
      {card?.cover &&
      <CardMedia
      sx={{ height: 140 }}
      image={card?.cover}
    />
      }
      <CardContent sx={{
        p:1.5, '&:last-child':{ p:1.5 }
      }}>
        <Typography>
            {card?.title}
        </Typography>
      </CardContent>
      {
        shouldShowCardActions() &&
        <CardActions sx={{
          p:'0 4px 8px 4px'
        }}>
          {
            !!card?.memberIds?.length && <Button size="small" startIcon={<GroupIcon/>}>{card?.memberIds?.length}</Button>
          }
          {
            !!card?.memberIds?.length && <Button size="small" startIcon={<ModeCommentIcon/>}>{card?.comments?.length}</Button>
          }
          {
            !!card?.memberIds?.length && <Button size="small" startIcon={<AttachmentIcon/>}>{card?.attachments?.length}</Button>
          }
        </CardActions>
      }

    </Card>
  )
}

export default TrelloCard
