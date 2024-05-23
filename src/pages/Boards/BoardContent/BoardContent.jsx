import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Box, Typography } from '@mui/material'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import { DndContext,PointerSensor,useSensor,useSensors,DragOverlay,TouchSensor, defaultDropAnimationSideEffects, closestCorners, pointerWithin, getFirstCollision, closestCenter } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import { MouseSensor } from '~/customerLibraries/DndKitSensors'
import TrelloCard from './ListColumns/Column/ListCards/Card/TrelloCard'
import { cloneDeep, isEmpty, over } from 'lodash'
import { generatePlaceholder } from '~/utils/formatters'
const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD:'ACTIVE_DRAG_ITEM_TYPE_CARD'
}
function BoardContent({ board,createNewColumn,createNewCard,moveColumns,moveCardInTheSameColumn}) {
  const pointerSensor = useSensor(PointerSensor, {activationConstraint: {distance:10}})
  const mouseSensor = useSensor(MouseSensor, {activationConstraint: {distance:10}})
  const touchSensor = useSensor(TouchSensor, {activationConstraint: {delay:250,tolerance:5}})
  const sensors = useSensors(pointerSensor)
  const [orderedColumns, setOrderedColumns] = useState([])
  const [activeDragItemId,setActiveDragItemId] = useState(null)
  const [activeDragItemType,setActiveDragItemType] = useState(null)
  const [activeDragItemData,setActiveDragItemData] = useState(null)
  const [oldColumnWhenDraggingCard,setOldColumnWhenDraggingCard] = useState(null)
  const lastOverId = useRef(null)
  useEffect(() => {
    setOrderedColumns(board.columns)
  }, [board])
  const findColumnByCardId = (cardId)=>{
    return orderedColumns.find(column=>column.cards.map(card=>card._id)?.includes(cardId))
  }
  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData

  )=>{
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
        if(isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceholder(nextActiveColumn)]
        }
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(car=>car._id)
      }
      if(nextOverColumn) {
        nextOverColumn.cards = nextOverColumn.cards.filter(card=>card._id !== activeDraggingCardId)
        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId:nextOverColumn._id
        }
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex,0,rebuild_activeDraggingCardData)
        nextOverColumn.cards = nextOverColumn.cards.filter(card=>!card.FE_PlaceholderCard)
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(car=>car._id)
      }
      return nextColumns
    })
  }
  const handleDragStart = (event)=>{
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
    if(event?.active?.data?.current?.columnId ) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
    }
  }
  const handleDragOver = (event)=>{
    const {active,over} = event
    if(!active || !over) return
    const {id:activeDraggingCardId, data:{current:activeDraggingCardData}} = active
    const {id:overCardId} = over
    const activeColumn =findColumnByCardId(activeDragItemId)
    const overColumn = findColumnByCardId(overCardId)
    if(!activeColumn || !overColumn) return 
    if(activeColumn._id !== overColumn._id) {
      moveCardBetweenDifferentColumns(overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData)
    }
  }
  const handleDragEnd = (event) => {
    const { active, over } = event
    if(!active || !over) return
    console.log('hello', event)
    if (activeDragItemType ==ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const {id:activeDraggingCardId, data:{current:activeDraggingCardData}} = active
      const {id:overCardId} = over
      const activeColumn =findColumnByCardId(activeDragItemId)
      const overColumn = findColumnByCardId(overCardId)
      if(!activeColumn || !overColumn) return 
      if(oldColumnWhenDraggingCard._id !== overColumn._id) {
        moveCardBetweenDifferentColumns(overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData)
      }else{
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(c => c._id ===activeDragItemId)
        const newCardIndex = overColumn?.cards?.findIndex( c => c._id === overCardId)
        const dndorderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex)
        const dndOrderedCardIds = dndorderedCards.map(car=>car._id)
        setOrderedColumns(prevColumns=>{
          const nextColumns =cloneDeep(prevColumns)
          const targetColumn = nextColumns.find(c=>c._id === overColumn._id)
          targetColumn.cards = dndorderedCards
          targetColumn.cardOrderIds = dndOrderedCardIds
          return nextColumns
        })
        moveCardInTheSameColumn(dndorderedCards,dndOrderedCardIds,oldColumnWhenDraggingCard._id)
      }
    }
    if (activeDragItemType ==ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        const oldColumnIndex = orderedColumns.findIndex(c => c._id ===active.id)
        const newColumnIndex = orderedColumns.findIndex( c => c._id === over.id)
        const dndorderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)
        setOrderedColumns(dndorderedColumns)
        moveColumns(dndorderedColumns)
        //const dndorderedColumnsIds = dndorderedColumns.map(c=>c._id) 
        
      }
    }
    // những dữ liệu sau khi kéo thả này luôn phải đưa về giá trị ban đầu
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)
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
  const collisionDetectionStrantegy = useCallback((args)=>{
    if(activeDragItemType  === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      return closestCorners({...args})
    } 
    // thuat toan phat hien va cham
    const pointerIntersection = pointerWithin(args)
    if (!pointerIntersection?.length) return
    // const intersection = pointerIntersection?.length
    // ? pointerIntersection : rectIntersection(args)
    let overId = getFirstCollision(pointerIntersection,'id')
    if(overId) {
      const checkColumn = orderedColumns.find(column =>column._id ===overId)
      if(checkColumn) {
        overId = closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(container =>{
            return container.id !== overId &&  checkColumn?.cardOrderIds?.includes(container.id)
          })
        })[0]?.id
      }
      lastOverId.current = overId
      return [{id:overId}]
    }
    return lastOverId.current ? [{id:lastOverId.current}] : []
  },[activeDragItemType,orderedColumns])
  return (

    <DndContext onDragEnd={handleDragEnd}
     onDragOver={handleDragOver}
      sensors={sensors}
      //  collisionDetection={closestCorners}
       collisionDetection={collisionDetectionStrantegy}

        onDragStart={handleDragStart}>
      <Box sx={{
        bgcolor:(theme ) => (theme.palette.mode ==='dark'?'#34495e':'#1976d2'),
        width:'100%',
        height:(theme) => theme.trello.boardContentHeight,
        p:'10px 0'

      }}>
        <ListColumns columns={orderedColumns} createNewColumn={createNewColumn} createNewCard={createNewCard}/>
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
