import React from 'react'
import { Box, Container} from '@mui/material'
import BoardContent from './BoardContent/BoardContent'
import BoardBar from './BoardBar/BoardBar'
import AppBar from '~/components/AppBar/AppBar'
import { mockData } from '~/apis/mock-data'
function Board() {
  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height:'100vh', backgroundColor:'primary.main' }}>
        <AppBar/>
        <BoardBar board = {mockData?.board} />
        <BoardContent board = {mockData?.board}/>
      </Container>
    </>
  )
}

export default Board
