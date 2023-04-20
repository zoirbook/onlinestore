import React, { useEffect, useState } from "react";

import "../../styles/clock.css";

const Clock = () => {
  const [days, setDays] = useState();
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();

  let interval;
  const destination = new Date("May 6, 2023").getTime();
  const countDown = () => {
    interval = setInterval(() => {
      const AddZero = (item) => {
        return item > 9 ? item : `0${item}`;
      };
      const now = new Date().getTime();

      const difference = destination - now;

      const days = AddZero(Math.floor(difference / (1000 * 60 * 60 * 24)));
      const hours = AddZero(
        Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      );

      const minutes = AddZero(
        Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      );
      const seconds = AddZero(Math.floor((difference % (1000 * 60)) / 1000));

      if (destination < 0) clearInterval(interval);
      else {
        setDays(days);
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
      }
    }, [1000]);
  };

  useEffect(() => {
    countDown();
  });
  return (
    <div className="clock__wrapper d-flex align-items-center gap-5">
      <div className="clock-data d-flex align-items-center gap-3">
        <div className="text-center">
          <h1 className="fs-3 text-white mb-2">{days}</h1>
          <h5 className="fs-6 text-white">Days</h5>
        </div>
        <span className="fs-3 text-white">:</span>
      </div>
      <div className="clock-data d-flex align-items-center gap-3">
        <div className="text-center">
          <h1 className="fs-3 text-white mb-2">{hours}</h1>
          <h5 className="fs-6 text-white">Hours</h5>
        </div>
        <span className="fs-3 text-white">:</span>
      </div>
      <div className="clock-data d-flex align-items-center gap-3">
        <div className="text-center">
          <h1 className="fs-3 text-white mb-2">{minutes}</h1>
          <h5 className="fs-6 text-white">Minutes</h5>
        </div>
        <span className="fs-3 text-white">:</span>
      </div>
      <div className="clock-data d-flex align-items-center gap-3">
        <div className="text-center">
          <h1 className="fs-3 text-white mb-2">{seconds}</h1>
          <h5 className="fs-6 text-white">Seconds</h5>
        </div>
      </div>
    </div>
  );
};

export default Clock;
