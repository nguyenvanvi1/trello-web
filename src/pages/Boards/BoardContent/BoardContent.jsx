import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import { DndContext,PointerSensor,useSensor,useSensors,MouseSensor,TouchSensor,DragOverlay, defaultDropAnimationSideEffects, closestCorners } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import TrelloCard from './ListColumns/Column/ListCards/Card/TrelloCard'
import { cloneDeep } from 'lodash'
const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD:'ACTIVE_DRAG_ITEM_TYPE_CARD'
}
function BoardContent({ board }) {
  const pointerSensor = useSensor(PointerSensor, {activationConstraint: {distance:10}})
  const mouseSensor = useSensor(MouseSensor, {activationConstraint: {distance:10}})
  const touchSensor = useSensor(TouchSensor, {activationConstraint: {delay:250,tolerance:5}})
  const sensors = useSensors(pointerSensor)
  const [orderedColumns, setOrderedColumns] = useState([])
  const [activeDragItemId,setActiveDragItemId] = useState(null)
  const [activeDragItemType,setActiveDragItemType] = useState(null)
  const [activeDragItemData,setActiveDragItemData] = useState(null)
  useEffect(() => {
    const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
    setOrderedColumns(orderedColumns)
  }, [board])
  const findColumnByCardId = (cardId)=>{
    return orderedColumns.find(column=>column.cards.map(card=>card._id)?.includes(cardId))
  }
  const handleDragStart = (event)=>{
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
  }
  const handleDragOver = (event)=>{
    const {active,over} = event
    if(!over) return
    const {id:activeDraggingCardId, data:{current:activeDraggingCardData}} = active
    const {id:overCardId} = over
    const activeColumn =findColumnByCardId(activeDragItemId)
    const overColumn = findColumnByCardId(overCardId)
    if(!activeColumn || !overColumn) return 
    if(activeColumn._id !== overColumn._id) {
      setOrderedColumns(prevColumns=>{
        const overCardIndex = overColumn?.cards?.findIndex(card=>card._id ===overCardId)
        let newCardIndex
        const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top +over.rect.height
        const modifier = isBelowOverItem ? 1:0
        newCardIndex =overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1
        const nextColumns =cloneDeep(prevColumns)
        const nextActiveColumn = nextColumns.find(column=>column._id === activeColumn._id)
        const nextOverColumn = nextColumns.find(column=>column._id === overColumn._id)
        if(nextActiveColumn) {
          nextActiveColumn.cards = nextActiveColumn.cards.filter(card=>card._id !== activeDraggingCardId)
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(car=>car._id)
        }
        if(nextOverColumn) {
          nextOverColumn.cards = nextOverColumn.cards.filter(card=>card._id !== activeDraggingCardId)
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex,0,activeDraggingCardData)
          nextOverColumn.cardOrderIds = nextOverColumn.cards.map(car=>car._id)
        }
        return nextColumns
      })
      console.log('hihi')
    }
  }
  const handleDragEnd = (event) => {
    console.log('hello', event)
    if (activeDragItemType ==ACTIVE_DRAG_ITEM_TYPE.CARD) {
      return
    }
    const { active, over } = event
    if (!over) return
    if (active.id !== over.id) {
      const oldIndex = orderedColumns.findIndex(c => c._id ===active.id)
      const newIndex = orderedColumns.findIndex( c => c._id === over.id)
      const dndorderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
      //const dndorderedColumnsIds = dndorderedColumns.map(c=>c._id) 
      setOrderedColumns(dndorderedColumns)
    }
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
  }
  const customDropAnimation = {
    sideEffects:defaultDropAnimationSideEffects({
      styles:{
        active:{
          opacity:'0.5'
        }
      }
    })
  }
  return (

    <DndContext onDragEnd={handleDragEnd} onDragOver={handleDragOver} sensors={sensors} collisionDetection={closestCorners} onDragStart={handleDragStart}>
      <Box sx={{
        bgcolor:(theme ) => (theme.palette.mode ==='dark'?'#34495e':'#1976d2'),
        width:'100%',
        height:(theme) => theme.trello.boardContentHeight,
        p:'10px 0'

      }}>
        <ListColumns columns={orderedColumns}/>
        <DragOverlay dropAnimation={customDropAnimation}>
          {!activeDragItemType && null}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData}/>}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <TrelloCard card={activeDragItemData}/>}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
