import React, { useEffect, useState } from 'react'
import { Box, Container} from '@mui/material'
import BoardContent from './BoardContent/BoardContent'
import BoardBar from './BoardBar/BoardBar'
import AppBar from '~/components/AppBar/AppBar'
import { fetchBoardDetailsAPI } from '~/apis'
import { mockData } from '~/apis/mock-data'
function Board() {
  const [board,setBoard] = useState(null)
  useEffect(()=>{
    const boardId = '66479c87a6c2d28141b9306f'
    fetchBoardDetailsAPI(boardId).then(board=>{
      setBoard(board)
    })
  },[])
  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height:'100vh', backgroundColor:'primary.main' }}>
        <AppBar/>
        <BoardBar board = {mockData.board} />
        <BoardContent board = {mockData.board}/>
      </Container>
    </>
  )
}

export default Board
