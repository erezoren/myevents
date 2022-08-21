import React, {useState} from "react";
import {Button, DatePicker, Divider, Input, Modal, Space} from 'antd';
import {isEmpty, isNull, isUndefined} from "lodash";
import {createNewEvent} from "../services/events_service";
import {
  errAlert,
  resetDateToDayBeginning,
  resetDateToDayEnd
} from "../common/utils";
import date from "date-and-time";

const {RangePicker} = DatePicker;

export const AddEventModal = ({addModalOpen, isAddModalOpen, onAddEvent}) => {
  const [eventTitle, setEventTitle] = useState();
  const [eventStart, setEventStart] = useState();
  const [eventEnd, setEventEnd] = useState();
  const [adding, setAdding] = useState(false);
  async function callService(start, end, title) {
    await createNewEvent(start, end, title)
    .catch((e) => {
      errAlert(e.toString());
    });
  }

  const addEvent = async () => {
    setAdding(true);
    if (date.isSameDay(eventStart, eventEnd)) {
      await callService(eventStart, eventEnd, eventTitle);
    } else {
      let eventStartCopy = new Date(eventStart);
      for (let dayOfPeriod = eventStartCopy;
          dayOfPeriod <= eventEnd;
          dayOfPeriod = date.addDays(dayOfPeriod, 1)) {
        await callService(eventStartCopy, resetDateToDayEnd(dayOfPeriod),
            eventTitle);
        eventStartCopy = resetDateToDayBeginning(
            date.addDays(eventStartCopy, 1));

      }
      await callService(eventStartCopy, eventEnd, eventTitle);
    }

    setAdding(false);
    isAddModalOpen(false);
    onAddEvent(eventStart);
  }

  const updateRange = (e) => {
    setEventStart(!isNull(e) ? e[0]._d : undefined);
    setEventEnd(!isNull(e) ? e[1]._d : undefined)
  }

  function addDisabled() {
    return isEmpty(eventTitle) || isUndefined(eventStart)
        || isUndefined(
            eventEnd);
  }

  return (
      <Modal title="Add Event" visible={addModalOpen}
             footer={[
               <Button key="back" onClick={() => isAddModalOpen(false)}>
                 Cancel
               </Button>,
               <Button type="primary" loading={adding}
                       onClick={() => addEvent()}
                       disabled={addDisabled()}>
                 Add
               </Button>,
             ]}
      >
        <Space>
          <RangePicker showTime onChange={(e) => updateRange(e)}/>
          <Divider plain/>
          <Input placeholder="Event description"
                 onChange={(e) => setEventTitle(e.target.value)}/>
        </Space>
      </Modal>

  )

}