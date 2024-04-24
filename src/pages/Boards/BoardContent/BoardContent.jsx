import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import { DndContext,PointerSensor,useSensor,useSensors,MouseSensor,TouchSensor,DragOverlay, defaultDropAnimationSideEffects } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import TrelloCard from './ListColumns/Column/ListCards/Card/TrelloCard'
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
  const handleDragStart = (event)=>{
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
  }
  const handleDragEnd = (event) => {
    console.log('hello', event)
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

    <DndContext onDragEnd={handleDragEnd} sensors={sensors} onDragStart={handleDragStart}>
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
