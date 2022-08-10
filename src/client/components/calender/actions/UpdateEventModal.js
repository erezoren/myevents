import {Button, DatePicker, Divider, Input, Modal, Space} from 'antd';
import React, {useState} from "react";
import {updateEvent} from "../../services/events_service";
import {isEmpty, isNull, isUndefined} from "lodash";
import moment from 'moment';
import {errAlert} from "../../common/utils";

const {RangePicker} = DatePicker;

export const UpdateEventModal = ({
  event,
  updateModalOpen,
  isUpdateModalOpen,
  onEventUpdate
}) => {
  const [eventName, setEventName] = useState(event.name);
  const [eventStart, setEventStart] = useState(event.start);
  const [eventEnd, setEventEnd] = useState(event.end);
  const [updating, setUpdating] = useState(false);
  const dateFormat = 'YYYY-MM-DD HH:mm:ss';
  const update = async (id) => {
    setUpdating(true)
    await updateEvent(id, new Date(eventStart), new Date(eventEnd),
        eventName).catch((e) => {
      errAlert(e.toString());
    });
    setUpdating(false);
    isUpdateModalOpen(false);
    onEventUpdate(eventStart);

  }

  function updateDisabled() {
    return isEmpty(eventName) || isUndefined(eventStart)
        || isUndefined(
            eventEnd);
  }

  function updateRange(e) {
    setEventStart(!isNull(e) ? e[0]._d : undefined);
    setEventEnd(!isNull(e) ? e[1]._d : undefined)
  }

  return (
      <Modal title="Update Event" visible={updateModalOpen}
             footer={[
               <Button key="back" onClick={() => isUpdateModalOpen(false)}>
                 Cancel
               </Button>,
               <Button type="primary" loading={updating}
                       onClick={() => update(event._id)}
                       disabled={updateDisabled()}>
                 Update
               </Button>,
             ]}
      >
        <Space>
          <RangePicker showTime onChange={(e) => updateRange(e)}
                       defaultValue={[moment(new Date(eventStart),
                           dateFormat),
                         moment(new Date(eventEnd), dateFormat)]}
                       format={dateFormat}/>
          <Divider plain/>
          <Input placeholder="Event description"
                 value={eventName}
                 onChange={(e) => setEventName(e.target.value)}/>
        </Space>
      </Modal>

  )

}