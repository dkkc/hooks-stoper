import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./App.css";

const App = () => {

  const [time, setTime] = useState({
    hour: 0,
    min: 0,
    sec: 0,
    mili: 0
  });

  const [isRuning, setIsRuning] = useState(false);
  const [delay, setDelay] = useState(10);
  const [chronograf, setChronograf] = useState();
  const [timeList, setTimeList] = useState([]);

  const formatStoperValue = value => {
    let stoperValue = value.toString();
    if (stoperValue.length < 2) {
      stoperValue = "0" + stoperValue;
    }
    return stoperValue;
  };

  const initialCalulation = () => {
    setTime({ ...time, mili: time.mili += 1 })
    if (time.mili >= 100) {
      setTime({ ...time, mili: time.mili = 0 })
      setTime({ ...time, sec: time.sec += 1 })
    }
    if (time.sec >= 60) {
      setTime({ ...time, sec: time.sec = 0 })
      setTime({ ...time, min: time.min += 1 })
    }
    if (time.min >= 60) {
      setTime({ ...time, min: time.min = 0 })
      setTime({ ...time, hour: time.hour += 1 })
    }
    const timer = {
      hour: time.hour,
      min: time.min,
      sec: time.min,
      mili: time.mili
    }
    setTime({ ...time, timer });
  };

  const handleStartClick = e => {
    if (!isRuning) {
      setIsRuning(true);
      setDelay(10);
      setChronograf(setInterval(() => initialCalulation(), delay));
      return () => clearInterval(chronograf);
    }
    if (isRuning) {

      setIsRuning(false);
      clearInterval(chronograf);
    }
  };

  const handleRestClick = e => {
    if (!isRuning) {
      setTime({
        hour: 0,
        min: 0,
        sec: 0,
        mili: 0
      });
    }
  };

  const handleDeleteItem = (item) => {
    console.log('id', item);
    let listItems = [...timeList];
    listItems = listItems.filter(listItem => item !== listItem)
    setTimeList(listItems);
  }
  const stoper = `${formatStoperValue(time.hour)}:${formatStoperValue(
    time.min
  )}:${formatStoperValue(time.sec)},${formatStoperValue(time.mili)}`;

  return (
    <div className="app">
      <p>{stoper}</p>
      <ul>
        {timeList.map((item, index) => (
          <li
            key={index}>{item}<button onClick={() => handleDeleteItem(item)}><i class="fas fa-trash-alt"></i></button></li>
        ))}
      </ul>
      <button onClick={handleStartClick}>{isRuning ? "Pauza" : "Start"}</button>
      <button onClick={handleRestClick}>Resetuj</button>
      <button onClick={() => setTimeList([...timeList, stoper])}>Dodaj</button>
      {timeList.length > 0 ? <button onClick={() => setTimeList([])}>Usuń listę</button> : ""}
    </div>
  );
};

export default App;