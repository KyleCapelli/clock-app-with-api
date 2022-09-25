import React from "react";
import "./Information.css";

const Information = ({
  toggle,
  timeZone,
  dayYear,
  dayWeek,
  weekNum,
  isMorning,
}) => {
  return (
    <div
      className={`info__container ${toggle ? "info-active" : "info-hidden"} ${
        isMorning ? "info-morning" : "info-evening"
      }`}
    >
      <div className="info__content">
        <div className="info__timezone">
          <p>CURRENT TIMEZONE</p>
          <h4>{timeZone}</h4>
        </div>
        <div className="info__day-year">
          <p>DAY OF THE YEAR</p>
          <h4>{dayYear}</h4>
        </div>
        <div className="info__day-week">
          <p>DAY OF THE WEEK</p>
          <h4>{dayWeek}</h4>
        </div>
        <div className="info__week-num">
          <p>WEEK NUMBER</p>
          <h4>{weekNum}</h4>
        </div>
      </div>
    </div>
  );
};

export default Information;
