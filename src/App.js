import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Main from "./components/Main/Main";
import Information from "./components/Information/Information";

function App() {
  const [toggle, setToggle] = useState(false);
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [time, setTime] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [timeCode, setTimeCode] = useState("");
  const [ip, setIP] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [dayYear, setDayYear] = useState("");
  const [dayWeek, setDayWeek] = useState("");
  const [weekNum, setWeekNum] = useState("");
  const [isMorning, setIsMorning] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };

  const getQuote = () => {
    axios
      .get("https://programming-quotes-api.herokuapp.com/Quotes/random")
      .then((res) => {
        setQuote(res.data.en);
        setAuthor(res.data.author);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMainData = () => {
    axios
      .get(
        `https://api.ipbase.com/v2/info?apikey=${process.env.REACT_APP_API_KEY}&ip=${ip}`
      )
      .then((res) => {
        setCountry(res.data.data.location.country.name);
        setCity(res.data.data.location.city.name);
        setTimeCode(res.data.data.timezone.code);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getIP = () => {
    axios
      .get("https://geolocation-db.com/json/")
      .then((res) => {
        setIP(res.data.IPv4);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getInfoData = () => {
    axios
      .get(`http://worldtimeapi.org/api/ip/${ip}`)
      .then((res) => {
        setTimeZone(res.data.timezone);
        setDayYear(res.data.day_of_year);
        setDayWeek(res.data.day_of_week);
        setWeekNum(res.data.week_number);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTimeOfDay = () => {
    const date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();

    if (minute >= 0 && minute <= 9) minute = `0${minute}`;
    if (hour === 0) hour = "12";

    setTime(`${hour}:${minute}`);
    hour < 12 ? setIsMorning(true) : setIsMorning(false);
  };

  useEffect(() => {
    getQuote();
    getIP();
    // getMainData();

    // Hard coding this for now as limited requests per month for API
    setCity("Perth");
    setCountry("Australia");
    setTimeCode("AWST");

    getTimeOfDay();
    getInfoData();

    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <div className={`App ${isMorning ? "" : "night-mode"}`}>
      <Main
        toggle={toggle}
        setToggle={setToggle}
        quote={quote}
        author={author}
        city={city}
        country={country}
        timeCode={timeCode}
        time={time}
        isMorning={isMorning}
        getQuote={getQuote}
        getInfoData={getInfoData}
        getMainData={getMainData}
        getTimeOfDay={getTimeOfDay}
        width={width}
      />
      <Information
        toggle={toggle}
        timeZone={timeZone}
        dayYear={dayYear}
        dayWeek={dayWeek}
        weekNum={weekNum}
        isMorning={isMorning}
      />
    </div>
  );
}

export default App;
