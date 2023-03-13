import React from 'react';
import './counter.css';

function Counter() {
  const countToDate = new Date().setHours(new Date().getHours() + 24);
  let previousTimeBetweenDates;

  setInterval(() => {
    const currentDate = new Date();
    const timeBetweenDates = Math.ceil((countToDate - currentDate) / 1000);
    flipAllCards(timeBetweenDates);

    previousTimeBetweenDates = timeBetweenDates;
  }, 250);

  function flipAllCards(time) {
    const seconds = time % 60;
    const minutes = Math.floor(time / 60) % 60;
    const hours = Math.floor(time / 3600);

    flip(document.querySelector("[data-hours-tens]"), Math.floor(hours / 10));
    flip(document.querySelector("[data-hours-ones]"), hours % 10);
    flip(document.querySelector("[data-minutes-tens]"), Math.floor(minutes / 10));
    flip(document.querySelector("[data-minutes-ones]"), minutes % 10);
    flip(document.querySelector("[data-seconds-tens]"), Math.floor(seconds / 10));
    flip(document.querySelector("[data-seconds-ones]"), seconds % 10);
  }

  function flip(flipCard, newNumber) {
    const topHalf = flipCard.querySelector(".top");
    const startNumber = parseInt(topHalf.textContent);
    if (newNumber === startNumber) return;

    const bottomHalf = flipCard.querySelector(".bottom");
    const topFlip = document.createElement("div");
    topFlip.classList.add("top-flip");
    const bottomFlip = document.createElement("div");
    bottomFlip.classList.add("bottom-flip");

    topHalf.textContent = startNumber;
    bottomHalf.textContent = startNumber;
    topFlip.textContent = startNumber;
    bottomFlip.textContent = newNumber;

    topFlip.addEventListener("animationstart", e => {
      topHalf.textContent = newNumber;
    });
    topFlip.addEventListener("animationend", e => {
      topFlip.remove();
    });
    bottomFlip.addEventListener("animationend", e => {
      bottomHalf.textContent = newNumber;
      bottomFlip.remove();
    });
    flipCard.append(topFlip, bottomFlip);
  }

  return (
    <div className="container">
      <div className="container-segment">
        <div className="segment-title">Hours</div>
        <div className="segment">
          <div className="flip-card" data-hours-tens>
            <div className="top">2</div>
            <div className="bottom">2</div>
          </div>
          <div className="flip-card" data-hours-ones>
            <div className="top">4</div>
            <div className="bottom">4</div>
          </div>
        </div>
      </div>
      <div className="container-segment">
        <div className="segment-title">Minutes</div>
        <div className="segment">
          <div className="flip-card" data-minutes-tens>
            <div className="top">0</div>
            <div className="bottom">0</div>
          </div>
          <div className="flip-card" data-minutes-ones>
            <div className="top">0</div>
            <div className="bottom">0</div>
          </div>
        </div>
      </div>
      <div className="container-segment">
        <div className="segment-title">Seconds</div>
        <div className="segment">
          <div className="flip-card" data-seconds-tens>
            <div className="top">0</div>
            <div className="bottom">0</div>
            </div>
      </div>
    </div>
    <div className="container-segment">
      <div className="segment-title">Seconds</div>
      <div className="segment">
        <div className="flip-card" data-seconds-tens>
          <div className="top">0</div>
          <div className="bottom">0</div>
        </div>
        <div className="flip-card" data-seconds-ones>
          <div className="top">0</div>
          <div className="bottom">0</div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Counter;