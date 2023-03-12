import React, { useRef, useEffect } from "react";
import FlipClock from "flipclock";
import '../Time/countdown'

const Countdown = ({ minutes, start }) => {
  const clockRef = useRef(null);

  useEffect(() => {
    const clock = new FlipClock(clockRef.current, {
      clockFace: "MinuteCounter",
      language: "en",
      autoStart: false,
      countdown: true,
      showSeconds: true,
      callbacks: {
        start: () => console.log("The clock has started!"),
        stop: () => console.log("The clock has stopped!"),
        interval: function () {
          const time = this.factory.getTime().time;
          if (time) {
            console.log("Clock interval", time);
          }
        },
      },
    });

    const setCountdown = (minutes, start) => {
      if (clock.running) {
        return;
      }
      const seconds = minutes * 60;
      const now = new Date();
      start = new Date(start);
      const end = start.getTime() + seconds * 1000;
      let leftSecs = Math.round((end - now.getTime()) / 1000);
      let elapsed = false;
      if (leftSecs < 0) {
        leftSecs *= -1;
        elapsed = true;
      }
      clock.setTime(leftSecs);
      clock.start();
    };

    setCountdown(minutes, start);

    return () => {
      clock.stop();
    };
  }, [minutes, start]);

  return <div ref={clockRef} />;
};

export default Countdown;
