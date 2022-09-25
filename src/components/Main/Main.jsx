import React from "react";
import "./Main.css";

const Main = ({
  toggle,
  setToggle,
  author,
  quote,
  city,
  country,
  timeCode,
  time,
  isMorning,
  getQuote,
  getInfoData,
  getMainData,
  getTimeOfDay,
  width,
}) => {
  const handleRefresh = () => {
    getQuote();
    getInfoData();
    getTimeOfDay();
    // getMainData();
  };

  return (
    <div className="main__container">
      <div
        className={`main__quote-container ${
          toggle ? "quote-hidden" : "quote-active"
        }`}
      >
        <p>
          {quote}
          <strong>{author}</strong>
        </p>
        <img
          onClick={() => handleRefresh()}
          src={`${process.env.PUBLIC_URL}/desktop/icon-refresh.svg`}
          alt="refresh"
        />
      </div>
      <div
        className={`main__clock-container ${
          toggle ? "clock-up" : "clock-down"
        }`}
      >
        <div className="main__day-night">
          <img
            src={`${process.env.PUBLIC_URL}/desktop/icon-${
              isMorning ? "sun" : "moon"
            }.svg`}
            alt="sun"
          />
          <p>
            GOOD {isMorning ? "MORNING" : "EVENING"}
            {width >= 768 && ", IT'S CURRENTLY"}
          </p>
        </div>
        <div className="main__clock">
          <h1>{time}</h1>
          <p>{timeCode}</p>
        </div>
        <p className="main__clock-country">
          IN {city}, {country}
        </p>
        {/* <div className="main__button-flex"> */}
        <div
          onClick={() => setToggle(!toggle)}
          className="main__button-container"
        >
          <p>{toggle ? "LESS" : "MORE"}</p>
          <div className="main__arrow-container">
            {toggle ? (
              <img
                className="main__arrow-up"
                src={`${process.env.PUBLIC_URL}/desktop/icon-arrow-down.svg`}
                alt="arrow-up"
              />
            ) : (
              <img
                className="main__arrow-down"
                src={`${process.env.PUBLIC_URL}/desktop/icon-arrow-down.svg`}
                alt="arrow-down"
              />
            )}
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Main;
