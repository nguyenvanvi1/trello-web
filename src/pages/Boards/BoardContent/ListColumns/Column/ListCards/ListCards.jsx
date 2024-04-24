import React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import ModeCommentIcon from '@mui/icons-material/ModeComment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import { Box, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import TrelloCard from './Card/TrelloCard'  
import AddIcon from '@mui/icons-material/Add';
import {SortableContext,verticalListSortingStrategy} from '@dnd-kit/sortable';

function ListCards({cards}) {
  return (
    <SortableContext items={cards?.map(c=>c._id)} strategy={verticalListSortingStrategy}>
      <Box sx={{
        p:'0 5px',
        m:'0 5px',
        display:'flex',
        flexDirection:'column',
        gap:1,
        overflowX:'hidden',
        overflowY:'auto',
        maxHeight:(theme ) => (`calc(
                  ${theme.trello.boardContentHeight} -
                  ${theme.spacing(5)} -
                  ${theme.trello.columnHeaderHeight} -
                  ${theme.trello.columnFooterHeight}
              )`),
        '&::-webkit-scrollbar-thumb': {
          backgroundColor:'#ced0da'

        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor:'#bfc2cf'
        }
      }}>
      {
        cards.map(card=> <TrelloCard key={card._id} card={card}/>)
      }
      </Box>
      </SortableContext>
  )
}

export default ListCards
