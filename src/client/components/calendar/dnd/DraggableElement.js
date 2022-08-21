import {Droppable} from "react-beautiful-dnd";
import React from "react";
import styled from "styled-components";
import {ListItem} from "./ListItem";

const ColumnHeader = styled.div`
  text-transform: uppercase;
  margin-bottom: 20px;
`;

const DroppableStyles = styled.div`
  padding: 10px;
  border-radius: 6px;
  background: #d4d4d4;
  width: 100%%;
`;

export const DraggableElement = ({dateColumnHeader, eventElements,onEventUpdate}) => (
    <div>
      {eventElements && <DroppableStyles>
        <ColumnHeader>{dateColumnHeader}</ColumnHeader>
        <Droppable droppableId={`${dateColumnHeader}`}>
          {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {eventElements.map((event, index) => (
                    <ListItem key={event.id} eventItem={event} index={index} onEventUpdate={onEventUpdate}/>
                ))}
                {provided.placeholder}
              </div>
          )}
        </Droppable>
      </DroppableStyles>}
    </div>
);

