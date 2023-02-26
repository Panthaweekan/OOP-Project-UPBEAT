document.addEventListener("DOMContentLoaded", function() {
    let countdown;
  
    const init_countdown = () => {
      return new FlipClock($('.countdown'), {
        clockFace: 'MinuteCounter',
        language: 'en',
        autoStart: false,
        countdown: true,
        showSeconds: true,
        callbacks: {
          start: () => {
            console.log('The clock has started!');
          },
          stop: () => {
            console.log('The clock has stopped!');
          },
          interval: () => {
            const time = countdown.getTime().time; // replace "this" with "countdown"
            if (time) {
              console.log('Clock interval', time);
            }
          }
        }
      });
    };
  
    const set_countdown = (minutes, start) => {
      countdown = init_countdown(); // create a new countdown object each time
  
      const seconds = minutes * 300;  //แก้เวลาที่ตรงนี้
  
      const now = new Date();
      start = new Date(start);
      const end = start.getTime() + seconds * 1000;
  
      let left_secs = Math.round((end - now.getTime()) / 1000);
  
      let elapsed = false;
      if (left_secs < 0) {
        left_secs *= -1;
        elapsed = true;
      }
  
      countdown.setTime(left_secs);
      countdown.start();
    };
  
    set_countdown(1, new Date());
  });
  