import {Button, DatePicker, Divider, Input, Modal, Space} from 'antd';
import React, {useEffect, useState} from "react";
import {updateEvent} from "../services/events_service";
import {isEmpty, isNull, isUndefined} from "lodash";
import moment from 'moment';
import {errAlert} from "../common/utils";

const {RangePicker} = DatePicker;

export const UpdateEventModal = ({
  event,
  updateModalOpen,
  isUpdateModalOpen,
  onEventUpdate,
  showRange
}) => {
  const [eventTitle, setEventTitle] = useState();
  const [eventStart, setEventStart] = useState();
  const [eventEnd, setEventEnd] = useState();
  const [updating, setUpdating] = useState(false);
  const dateFormat = 'YYYY-MM-DD HH:mm:ss';

  useEffect(() => {
    setEventTitle(event.title);
    setEventStart(event.start);
    setEventEnd(event.end)
  }, [event])

  const update = async (id) => {
    setUpdating(true)
    const start = new Date(eventStart);
    const end = new Date(eventEnd);

    let updateResponse =  await updateEvent(id, start, end,
        eventTitle).catch((e) => {
      errAlert(e.toString());
    });
    setUpdating(false);
    isUpdateModalOpen(false);
    onEventUpdate({_id:id,start,end,title:eventTitle});

  }

  function updateDisabled() {
    return isEmpty(eventTitle) || isUndefined(eventStart)
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
          {showRange && <RangePicker showTime onChange={(e) => updateRange(e)}
                                     defaultValue={[moment(new Date(eventStart),
                                         dateFormat),
                                       moment(new Date(eventEnd), dateFormat)]}
                                     format={dateFormat}/>}
          <Divider plain/>
          <Input placeholder="Event description"
                 value={eventTitle}
                 onChange={(e) => setEventTitle(e.target.value)}/>
        </Space>
      </Modal>

  )

}