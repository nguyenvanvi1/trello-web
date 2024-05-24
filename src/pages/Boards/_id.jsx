import React, { useEffect, useState } from 'react'
import { Box, Container, Typography } from '@mui/material'
import BoardContent from './BoardContent/BoardContent'
import BoardBar from './BoardBar/BoardBar'
import AppBar from '~/components/AppBar/AppBar'
import { fetchBoardDetailsAPI, createNewCardAPI, createNewColumnAPI, updateBoardDetailsAPI, updateColumnDetailsAPI,moveCardToDifferentColumnAPI } from '~/apis'
import { generatePlaceholder } from '~/utils/formatters'
import { isEmpty } from 'lodash'
import { mapOrder } from '~/utils/sorts'
import CircularProgress from '@mui/material/CircularProgress'
function Board() {
  const [board, setBoard] = useState(null)
  useEffect(() => {
    const boardId = '664b331d5aab4fd791ded62a'
    fetchBoardDetailsAPI(boardId).then(board => {
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')


      board.columns.forEach(column => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholder(column)]
          column.cardOrderIds= [generatePlaceholder(column)._id]
        } else {
          column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
        }
      })
      setBoard(board)
    })
  }, [])
  const createNewColumn = async (newColumData) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumData,
      boardId : board._id
    })
    // cap nhat state board
    createdColumn.cards = [generatePlaceholder(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholder(createdColumn)._id]
    const newBoard = { ...board }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)

  }
  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId : board._id
    })
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id===createdCard.columnId)
    if (columnToUpdate) {
      if(columnToUpdate.cards.some(card=>card.FE_PlaceholderCard)) {
        columnToUpdate.cards = [createdCard]
        columnToUpdate.cardOrderIds = [createdCard._id]
      }else{
        columnToUpdate.cards.push(createdCard)
        columnToUpdate.cardOrderIds.push(createdCard._id)
      }
      
    }
    setBoard(newBoard)
  }
  const moveColumns = (dndorderedColumns) => {
    const dndorderedColumnsIds = dndorderedColumns.map(c => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndorderedColumns
    newBoard.columnOrderIds= dndorderedColumnsIds
    setBoard(newBoard)
    // goi api update board
    updateBoardDetailsAPI(newBoard._id, { columnOrderIds:newBoard.columnOrderIds })
  }
  const moveCardInTheSameColumn = (dndorderedCards, dndOrderedCardIds, columnId) => {
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id===columnId)
    if (columnToUpdate) {
      columnToUpdate.cards= dndorderedCards
      columnToUpdate.cardOrderIds=dndOrderedCardIds
    }
    setBoard(newBoard)
    updateColumnDetailsAPI(columnId,{cardOrderIds:dndOrderedCardIds})
  }
  const moveCardToDifferentColumn = (currentCardId,prevColumnId,nextColumnId,dndorderedColumns)=>{
    const dndorderedColumnsIds = dndorderedColumns.map(c => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndorderedColumns
    newBoard.columnOrderIds= dndorderedColumnsIds
    setBoard(newBoard)
    //GOI API PHIA BACKEND
    let prevCardOrderIds =  dndorderedColumns.find(c=>c._id === prevColumnId)?.cardOrderIds
    if(prevCardOrderIds[0].includes('placeholder-card')) prevCardOrderIds = []
    moveCardToDifferentColumnAPI(
      {
        currentCardId,
        prevColumnId,
        prevCardOrderIds,
        nextColumnId,
        nextCardOrderIds : dndorderedColumns.find(c=>c._id === nextColumnId)?.cardOrderIds
      }
    )
  }
  if (!board) {
    return (
      <Box sx={{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        gap:2,
        width:'100vw',
        height:'100vh'
      }}>
        <CircularProgress />
        <Typography>Loading.....</Typography>
      </Box>
    )
  }
  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height:'100vh', backgroundColor:'primary.main' }}>
        <AppBar/>
        <BoardBar board = {board} />
        <BoardContent board = {board}
          createNewColumn={createNewColumn}
          createNewCard = {createNewCard}
          moveColumns={moveColumns}
          moveCardInTheSameColumn = {moveCardInTheSameColumn}
          moveCardToDifferentColumn = {moveCardToDifferentColumn}
        />
      </Container>
    </>
  )
}

export default Board
