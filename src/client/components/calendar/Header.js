import React from "react";
import {Controls} from "./Controls";
import {PageHeader} from "antd";
import date from "date-and-time";

import {
  calcEndDateByStartDateAndDisplayMode,
  resetDateToDayEnd
} from "../common/utils";

export const Header = ({
  startDate,
  displayMode,
  setDisplayMode,
  changeDate
}) => {

  function byDisplayMode() {
    let endDate = calcEndDateByStartDateAndDisplayMode(startDate, displayMode);
    endDate = resetDateToDayEnd(endDate);
    return startDate.toDateString() + (!date.isSameDay(startDate, endDate)
        ? ' - ' + endDate.toDateString() : '');
  }

  return (
      <PageHeader
          title={byDisplayMode()}
          className="site-page-header"
          subTitle="navigate or add events"
          extra={[
            <Controls
                displayMode={displayMode}
                setDisplayMode={setDisplayMode}
                changeDate={changeDate}
                startDate={startDate}
            />
          ]}
      >
      </PageHeader>
  )
}