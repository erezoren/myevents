import React, {useRef} from 'react';
import date from 'date-and-time';
import {resetDateToDayBeginning} from "../../common/utils";

export const TimeLine = ({chosenDate}) => {
  const dayFragments = useRef([]);
  const dayStart = useRef(resetDateToDayBeginning(chosenDate));
  const mouseDown = useRef(false);
  const dayParts = 48;

  document.body.onmousedown = function () {
    mouseDown.current = true;
  }
  document.body.onmouseup = function () {
    mouseDown.current = false;
  }

  function selectPart(element, time) {
    if (mouseDown.current) {
      if (true) {
        element.target.style.color = "blue";
      } else {
        element.target.style.color = "red"
      }
    }

  }

  for (let i = 0; i < dayParts; i++) {
    let part = date.addMinutes(dayStart.current, 30);
    dayFragments.current.push(dayStart.current);
    dayStart.current = part;
  }

  return (
      <div>
        {
          dayFragments.current.map(df => {
            return <div onMouseOver={(e) => selectPart(e, "dddd")}
                        className={df.toDateString()}>{`${df.getHours()}:${df.getMinutes()}`}</div>
          })
        }

      </div>

  );

}
