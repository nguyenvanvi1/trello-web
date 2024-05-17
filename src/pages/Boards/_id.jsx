import React, { useEffect, useState } from 'react'
import { Box, Container} from '@mui/material'
import BoardContent from './BoardContent/BoardContent'
import BoardBar from './BoardBar/BoardBar'
import AppBar from '~/components/AppBar/AppBar'
import { mockData } from '~/apis/mock-data'
import { fetchBoardDetailsAPI } from '~/apis'
function Board() {
  const [board,setBoard] = useState(null)
  useEffect(()=>{
    const boardId = '6644ef638e67c6e75a85d08e'
    fetchBoardDetailsAPI(boardId).then(board=>{
      setBoard(board)
    })
  },[])
  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height:'100vh', backgroundColor:'primary.main' }}>
        <AppBar/>
        <BoardBar board = {board} />
        <BoardContent board = {board}/>
      </Container>
    </>
  )
}

export default Board
