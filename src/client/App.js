import './style/App.css';
import React, {useState} from "react";
import {Switch} from 'antd';
import {Calendar2} from "./components/calendar2/Calendar2";
import {Calendar} from "./components/calendar/Calendar";

function App() {
  const [oldCalendar, setOldCalendar] = useState(false);

  function toggleCalendar() {
    setOldCalendar(!oldCalendar)
  }

  return (
      <div className="App">
        <div className={"cal-switch"}>
          <Switch
              checkedChildren="Old Calendar" unCheckedChildren="New Calendar"
              onChange={toggleCalendar}
              defaultChecked
          />
        </div>
        <div>
          {!oldCalendar && <Calendar2/>}
          {oldCalendar && <Calendar/>}
        </div>
      </div>
  );
}

export default App;
