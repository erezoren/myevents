import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {DragDropContext} from "react-beautiful-dnd";
import {DraggableElement} from "./DraggableElement";

const DragDropContextContainer = styled.div`
  padding: 20px;
  border: 4px solid indianred;
  border-radius: 6px;
  white-space:nowrap;
`;

const ListGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 8px;
  width: 44%;
`;

const removeFromList = (list, index) => {
  const result = Array.from(list);
  const [removed] = result.splice(index, 1);
  return [removed, result];
};

const addToList = (list, index, element) => {
  const result = Array.from(list);
  result.splice(index, 0, element);
  return result;
};

export const DragList = ({datedEvents, onEventUpdate}) => {
  const [elements, setElements] = useState([]);

  const generateDatedLists = () =>
      Object.keys(datedEvents).reduce(
          (acc, date) => ({...acc, [date]: generateEvents(date)}),
          {}
      );

  const generateEvents = (date) => datedEvents[date].map(e => {
    return Object.assign(e, {prefix: date});
  });

  useEffect(() => {
    setElements(generateDatedLists());
  }, [datedEvents]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const listCopy = {...elements};

    const sourceList = listCopy[result.source.droppableId];
    const [removedElement, newSourceList] = removeFromList(
        sourceList,
        result.source.index
    );
    listCopy[result.source.droppableId] = newSourceList;
    const destinationList = listCopy[result.destination.droppableId];
    listCopy[result.destination.droppableId] = addToList(
        destinationList,
        result.destination.index,
        removedElement
    );

    setElements(listCopy);
  };

  return (
      <div>
        {elements[Object.keys(datedEvents)[0]] && <DragDropContextContainer>
          <DragDropContext onDragEnd={onDragEnd}>
            <ListGrid>
              {Object.keys(datedEvents).map((listKey) => (
                  <DraggableElement
                      eventElements={elements[listKey]}
                      key={listKey}
                      dateColumnHeader={listKey}
                      onEventUpdate={onEventUpdate}
                  />
              ))}
            </ListGrid>
          </DragDropContext>
        </DragDropContextContainer>}
      </div>
  );
}

