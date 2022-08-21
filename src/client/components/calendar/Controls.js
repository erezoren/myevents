import React, {useState} from "react";
import {Button, Radio, Space} from 'antd';
import 'antd/dist/antd.css'
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import {AddEventModal} from "../actions/AddEventModal";
import {calculateDaysDiff} from "../common/utils";

export const Controls = ({
  displayMode,
  setDisplayMode,
  changeDate,
  startDate
}) => {
  const [addModalOpen, isAddModalOpen] = useState(false);



  return (
      <>
        <Space size={100}>
          <div>
            <Button type="primary" danger onClick={() => isAddModalOpen(true)}>Add
              new Event</Button>
          </div>

          <div>
            <Button danger onClick={() => location.reload()}>Today</Button>
          </div>
          <div>
            <Button
                type="primary"
                icon={<LeftOutlined/>}
                onClick={() => changeDate(-1)}
            />
            <Button
                type="primary"
                icon={<RightOutlined/>}
                onClick={() => changeDate(1)}
            />
          </div>

          <Radio.Group value={displayMode}
                       onChange={(e) => setDisplayMode(e.target.value)}>
            <Radio.Button value="month">Month</Radio.Button>
            <Radio.Button value="week">Week</Radio.Button>
            <Radio.Button value="day">Day</Radio.Button>
          </Radio.Group>
        </Space>
        <AddEventModal addModalOpen={addModalOpen}
                       isAddModalOpen={isAddModalOpen}
                       onAddEvent={(newEventStartDate) => changeDate(
                           calculateDaysDiff(startDate,
                               newEventStartDate))}/>
      </>
  )
}