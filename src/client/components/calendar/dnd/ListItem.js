import {Draggable} from "react-beautiful-dnd";
import React, {useMemo, useState} from "react";
import styled from "styled-components";
import date from 'date-and-time';
import {Button, Card, Tooltip} from "antd";
import {ClockCircleOutlined} from "@ant-design/icons";
import {UpdateEventModal} from "../../actions/UpdateEventModal";

const DragItem = styled.div`
  padding: 10px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background: white;
  margin: 0 0 8px 0;
  display: grid;
  grid-gap: 20px;
  flex-direction: column;
  width: 100%;
`;

export const ListItem = ({eventItem, index,onEventUpdate}) => {
  const [updateModalOpen, isUpdateModalOpen] = useState(false);
  const baseCardHeight=200;
  const header = useMemo(() => {
    if (eventItem.allDay) {
      return <b>All Day Event</b>;
    }
    let s = date.format(new Date(eventItem.start), 'HH:mm:ss');
    let e = date.format(new Date(eventItem.end), 'HH:mm:ss');
    return `${s} - ${e}`;
  }, [eventItem]);

  function calculateCardHeight(eventItem) {
    if (eventItem.allDay) {
      return "500px";
    }
    let duration = new Date(eventItem.end).getTime() - new Date(eventItem.start).getTime();
    return baseCardHeight + (duration /60/60/100) + "px"
  }

  return (
      <div>
        <Draggable draggableId={eventItem.id} index={index}>
          {(provided, snapshot) => {
            return (
                <DragItem
                    ref={provided.innerRef}
                    snapshot={snapshot}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >

                  <Card
                      title={header}
                      style={{
                        fontWeight: 10,
                        height:calculateCardHeight(eventItem),
                        backgroundColor:eventItem.allDay?"#F1C651":"#C2DFF8"
                      }}
                      actions={[
                        <Tooltip title="Update meeting">
                          <Button style={{backgroundColor:"#C2F8C4"}} shape="circle" icon={<ClockCircleOutlined/>}
                                  size="large"
                                  onClick={() => isUpdateModalOpen((true))}/>
                        </Tooltip>
                      ]}
                  >
                    <span>{eventItem.title}</span>
                  </Card>

                </DragItem>
            );
          }}
        </Draggable>
        <UpdateEventModal event={eventItem}
                          isUpdateModalOpen={isUpdateModalOpen}
                          updateModalOpen={updateModalOpen}
                          showRange={true}
                          onEventUpdate={onEventUpdate}
        />
      </div>
  );
};

