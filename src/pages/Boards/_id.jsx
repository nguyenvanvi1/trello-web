import React, { useEffect, useState } from 'react'
import { Box, Container} from '@mui/material'
import BoardContent from './BoardContent/BoardContent'
import BoardBar from './BoardBar/BoardBar'
import AppBar from '~/components/AppBar/AppBar'
import { fetchBoardDetailsAPI,createNewCardAPI,createNewColumnAPI,updateBoardDetailsAPI } from '~/apis'
import { generatePlaceholder } from '~/utils/formatters'
import { isEmpty } from 'lodash'
function Board() {
  const [board,setBoard] = useState(null)
  useEffect(()=>{
    const boardId = '664b331d5aab4fd791ded62a'
    fetchBoardDetailsAPI(boardId).then(board=>{
      board.columns.forEach(column=>{
        if(isEmpty(column.cards)) {
          column.cards = [generatePlaceholder(column)]
          column.cardOrderIds= [generatePlaceholder(column)._id]
        }
      })
      setBoard(board)
    })
  },[])
  const createNewColumn = async (newColumData)=>{
    const createdColumn = await createNewColumnAPI({
      ...newColumData,
      boardId : board._id
    })
    // cap nhat state board
    createdColumn.cards = [generatePlaceholder(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholder(createdColumn)._id]
    const newBoard = {...board}
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)

  }
  const createNewCard = async (newCardData)=>{
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId : board._id
    })
    const newBoard = {...board}
    const columnToUpdate = newBoard.columns.find(column=>column._id===createdCard.columnId)
    if(columnToUpdate) {
      columnToUpdate.cards.push(createdCard)
      columnToUpdate.cardOrderIds.push(createdCard._id)
    }
    setBoard(newBoard)
  }
  const moveColumns = async(dndorderedColumns)=>{
    const dndorderedColumnsIds = dndorderedColumns.map(c=>c._id)
    const newBoard = {...board}
    newBoard.columns = dndorderedColumns
    newBoard.columnOrderIds= dndorderedColumnsIds
    setBoard(newBoard)
    // goi api update board
    await updateBoardDetailsAPI(newBoard._id,{columnOrderIds:newBoard.columnOrderIds})
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
         />
      </Container>
    </>
  )
}

export default Board
