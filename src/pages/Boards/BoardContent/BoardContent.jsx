import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import { DndContext,PointerSensor,useSensor,useSensors,MouseSensor,TouchSensor } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
function BoardContent({ board }) {
  const pointerSensor = useSensor(PointerSensor, {activationConstraint: {distance:10}})
  const mouseSensor = useSensor(MouseSensor, {activationConstraint: {distance:10}})
  const touchSensor = useSensor(TouchSensor, {activationConstraint: {delay:250,tolerance:5}})
  const sensors = useSensors(pointerSensor)
  const [orderedColumns, setOrderedColumns] = useState([])
  useEffect(() => {
    const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
    setOrderedColumns(orderedColumns)
  }, [board])
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
  }
  return (

    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <Box sx={{
        bgcolor:(theme ) => (theme.palette.mode ==='dark'?'#34495e':'#1976d2'),
        width:'100%',
        height:(theme) => theme.trello.boardContentHeight,
        p:'10px 0'

      }}>
        <ListColumns columns={orderedColumns}/>
      </Box>
    </DndContext>
  )
}

export default BoardContent
