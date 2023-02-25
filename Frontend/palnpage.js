
(function(e){"use strict";e.fn.textTyper=function(t){var n={typingClass:"typing",beforeAnimation:function(){},afterAnimation:function(){},speed:10,nextLineDelay:400,startsFrom:0,repeatAnimation:false,repeatDelay:4e3,repeatTimes:1,cursorHtml:'<span class="cursor">|</span>'},r=e.extend({},n,t);this.each(function(){var t=e(this),n=1,i="typingCursor";var s=t,o=s.length,u=[];while(o--){u[o]=e.trim(e(s[o]).html());e(s[o]).html("")}t.init=function(e){var n=r.beforeAnimation;if(n)n();t.animate(0)};t.animate=function(o){var a=s[o],f=r.typingClass,l=r.startsFrom;e(a).addClass(f);var c=setInterval(function(){var f=r.cursorHtml;f=e("<div>").append(e(f).addClass(i)).html();e(a).html(u[o].substr(0,l)+f);l++;if(u[o].length<l){clearInterval(c);o++;if(s[o]){setTimeout(function(){e(a).html(u[o-1]);t.animate(o)},r.nextLineDelay)}else{e(a).find("."+i).remove();if(r.repeatAnimation&&(r.repeatTimes==0||n<r.repeatTimes)){setTimeout(function(){t.animate(0);n++},r.repeatDelay)}else{var h=r.afterAnimation;if(h)h()}}}},r.speed)};t.init()});return this}})(jQuery)


// Let's do it!!
$(document).ready(function() {

  $('.command').hide();
  $('input[type="text"]').focus();
  $('#home').addClass('open');
  $('#home').textTyper({
        speed:20,
        afterAnimation:function(){
          $('.command').fadeIn();
          $('input[type="text"]').focus();
          $('input[type="text"]').val('');
        }
      });

// get array of section ids, that exist in DOM
var sectionArray = [];
// We are using <section> here, you can use <div> or <article> if you want
$('section').each( function(i,e) {
    //you can use e.id instead of $(e).attr('id')
    sectionArray.push($(e).attr('id'));
});

// Debug
//console.log(sectionArray);



// Command Input------------------------------

  $('input[type="text"]').keyup(function(e){

    if(e.which == 13){// ENTER key pressed

      $('.command').hide();
      var destination = $('input[type="text"]').val();

      // Display section with id == destination and hide all others
      $('section[id="' + destination + '"]').addClass('open').siblings().removeClass('open');

      // If destination does not match our array of section ids, display error section
      if($.inArray(destination, sectionArray) == -1){
        $('#error').addClass('open');
        $('#error').siblings().removeClass('open');
      }

      // All sections with class .open init textTyper
      $('.open').textTyper({
        speed:20,
        afterAnimation:function(){
          $('.command').fadeIn();
          $('input[type="text"]').focus();
          $('input[type="text"]').val('');
        }
      });

    }// end if ENTER key pressed

  });// end keyup function

// End Command Input-----------------------------


});
(function(e){"use strict";e.fn.textTyper=function(t){var n={typingClass:"typing",beforeAnimation:function(){},afterAnimation:function(){},speed:10,nextLineDelay:400,startsFrom:0,repeatAnimation:false,repeatDelay:4e3,repeatTimes:1,cursorHtml:'<span class="cursor">|</span>'},r=e.extend({},n,t);this.each(function(){var t=e(this),n=1,i="typingCursor";var s=t,o=s.length,u=[];while(o--){u[o]=e.trim(e(s[o]).html());e(s[o]).html("")}t.init=function(e){var n=r.beforeAnimation;if(n)n();t.animate(0)};t.animate=function(o){var a=s[o],f=r.typingClass,l=r.startsFrom;e(a).addClass(f);var c=setInterval(function(){var f=r.cursorHtml;f=e("<div>").append(e(f).addClass(i)).html();e(a).html(u[o].substr(0,l)+f);l++;if(u[o].length<l){clearInterval(c);o++;if(s[o]){setTimeout(function(){e(a).html(u[o-1]);t.animate(o)},r.nextLineDelay)}else{e(a).find("."+i).remove();if(r.repeatAnimation&&(r.repeatTimes==0||n<r.repeatTimes)){setTimeout(function(){t.animate(0);n++},r.repeatDelay)}else{var h=r.afterAnimation;if(h)h()}}}},r.speed)};t.init()});return this}})(jQuery)

// Let's do it!!
$(document).ready(function() {

  $('.command').hide();
  $('input[type="text"]').focus();
  $('#home').addClass('open');
  $('#home').textTyper({
        speed:20,
        afterAnimation:function(){
          $('.command').fadeIn();
          $('input[type="text"]').focus();
          $('input[type="text"]').val('');
        }
      });

// get array of section ids, that exist in DOM
var sectionArray = [];
// We are using <section> here, you can use <div> or <article> if you want
$('section').each( function(i,e) {
    //you can use e.id instead of $(e).attr('id')
    sectionArray.push($(e).attr('id'));
});

// Debug
//console.log(sectionArray);



// Command Input------------------------------

  $('input[type="text"]').keyup(function(e){

    if(e.which == 13){// ENTER key pressed

      $('.command').hide();
      var destination = $('input[type="text"]').val();

      // Display section with id == destination and hide all others
      $('section[id="' + destination + '"]').addClass('open').siblings().removeClass('open');

      // If destination does not match our array of section ids, display error section
      if($.inArray(destination, sectionArray) == -1){
        $('#error').addClass('open');
        $('#error').siblings().removeClass('open');
      }

      // All sections with class .open init textTyper
      $('.open').textTyper({
        speed:20,
        afterAnimation:function(){
          $('.command').fadeIn();
          $('input[type="text"]').focus();
          $('input[type="text"]').val('');
        }
      });

    }// end if ENTER key pressed

  });// end keyup function

// End Command Input-----------------------------

});




//time
window.addEventListener("DOMContentLoaded",() => {
	const clock = new BouncyBlockClock(".clock");
});

class BouncyBlockClock {
	constructor(qs) {
		this.el = document.querySelector(qs);
		this.time = { a: [], b: [] };
		this.rollClass = "clock__block--bounce";
		this.digitsTimeout = null;
		this.rollTimeout = null;
		this.mod = 0 * 60 * 1000;

		this.loop();
	}
	animateDigits() {
		const groups = this.el.querySelectorAll("[data-time-group]");

		Array.from(groups).forEach((group,i) => {
			const { a, b } = this.time;

			if (a[i] !== b[i]) group.classList.add(this.rollClass);
		});

		clearTimeout(this.rollTimeout);
		this.rollTimeout = setTimeout(this.removeAnimations.bind(this),900);
	}
	displayTime() {
		// screen reader time
		const timeDigits = [...this.time.b];
		const ap = timeDigits.pop();

		this.el.ariaLabel = `${timeDigits.join(":")} ${ap}`;

		// displayed time
		Object.keys(this.time).forEach(letter => {
			const letterEls = this.el.querySelectorAll(`[data-time="${letter}"]`);

			Array.from(letterEls).forEach((el,i) => {
				el.textContent = this.time[letter][i];
			});
		});
	}
	loop() {
		this.updateTime();
		this.displayTime();
		this.animateDigits();
		this.tick();
	}
	removeAnimations() {
		const groups = this.el.querySelectorAll("[data-time-group]");
	
		Array.from(groups).forEach(group => {
			group.classList.remove(this.rollClass);
		});
	}
	tick() {
		clearTimeout(this.digitsTimeout);
		this.digitsTimeout = setTimeout(this.loop.bind(this),1e3);	
	}
	updateTime() {
		const rawDate = new Date();
		const date = new Date(Math.ceil(rawDate.getTime() / 1e3) * 1e3 + this.mod);
		let h = date.getHours();
		const m = date.getMinutes();
		const s = date.getSeconds();
		const ap = h < 12 ? "AM" : "PM";

		if (h === 0) h = 12;
		if (h > 12) h -= 12;

		this.time.a = [...this.time.b];
		this.time.b = [
			(h < 10 ? `0${h}` : `${h}`),
			(m < 10 ? `0${m}` : `${m}`),
			(s < 10 ? `0${s}` : `${s}`),
			ap
		];

		if (!this.time.a.length) this.time.a = [...this.time.b];
	}
}




//hex
(function(){
  var canvas = document.getElementById('hexmap');

  var hexHeight,
      hexRadius,
      hexRectangleHeight,
      hexRectangleWidth,
      hexagonAngle = 0.523598776, // 30 degrees in radians
      sideLength = 36,
      boardWidth = 10,
      boardHeight = 10;

  hexHeight = Math.sin(hexagonAngle) * sideLength;
  hexRadius = Math.cos(hexagonAngle) * sideLength;
  hexRectangleHeight = sideLength + 2 * hexHeight;
  hexRectangleWidth = 2 * hexRadius;

  if (canvas.getContext) {
      var ctx = canvas.getContext('2d');

      ctx.fillStyle = "#000000";
      ctx.strokeStyle = "#CCCCCC";
      ctx.lineWidth = 1;

      drawBoard(ctx, boardWidth, boardHeight);
    
      canvas.addEventListener("mousedown", function(eventInfo){
          var x,
              y,
              hexX,
              hexY,
              screenX,
              screenY;

          x = eventInfo.offsetX || eventInfo.layerX;
          y = eventInfo.offsetY || eventInfo.layerY;

          
          hexY = Math.floor(y / (hexHeight + sideLength));
          hexX = Math.floor((x - (hexY % 2) * hexRadius) / hexRectangleWidth);
          screenX = hexX * hexRectangleWidth + ((hexY % 2) * hexRadius);
          screenY = hexY * (hexHeight + sideLength);
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          drawBoard(ctx, boardWidth, boardHeight);
          // Check if the mouse's coords are on the board
          if(hexX >= 0 && hexX < boardWidth) {
              if(hexY >= 0 && hexY < boardHeight) {
                // vecinos
                ctx.fillStyle = "#004C00";
                p = coordinateToPosition(hexX, hexY-1);
                drawHexagon(ctx, p.x, p.y, true);
                let xx = hexX;
                let yy = hexY-1;                  
                p = coordinateToPosition(hexX+1, hexY, eventInfo);
                drawHexagon(ctx, p.x, p.y, true);
                p = coordinateToPosition(hexX, hexY+1, eventInfo);
                drawHexagon(ctx, p.x, p.y, true);
                p = coordinateToPosition(hexX-1, hexY+1, eventInfo);
                drawHexagon(ctx, p.x, p.y, true);
                
                p = coordinateToPosition(hexX-1, hexY, eventInfo);
                drawHexagon(ctx, p.x, p.y, true);
                
                p = coordinateToPosition(hexX-1, hexY-1, eventInfo);
                drawHexagon(ctx, p.x, p.y, true);
                
                ctx.fillStyle = "#000000";
              }
          }
      });

      canvas.addEventListener("mousemove", function(eventInfo) {
          var x,
              y,
              hexX,
              hexY,
              screenX,
              screenY;

          x = eventInfo.offsetX || eventInfo.layerX;
          y = eventInfo.offsetY || eventInfo.layerY;

          
          hexY = Math.floor(y / (hexHeight + sideLength));
          hexX = Math.floor((x - (hexY % 2) * hexRadius) / hexRectangleWidth);

          screenX = hexX * hexRectangleWidth + ((hexY % 2) * hexRadius);
          screenY = hexY * (hexHeight + sideLength);

          ctx.clearRect(0, 0, canvas.width, canvas.height);

          drawBoard(ctx, boardWidth, boardHeight);

          // Check if the mouse's coords are on the board
          if(hexX >= 0 && hexX < boardWidth) {
              if(hexY >= 0 && hexY < boardHeight) {
                  ctx.fillStyle = "#000000";
                  drawHexagon(ctx, screenX, screenY, true);
              }
          }
      });
  }

  function coordinateToPosition(x, y) {
    var posX = x * hexRectangleWidth + ((y % 2) * hexRadius);
    var posY = y * (sideLength + hexHeight);
    return {"x": posX, "y": posY};
  }

  function drawBoard(canvasContext, width, height) {
      var i,
          j;

      for(i = 0; i < width; ++i) {
          for(j = 0; j < height; ++j) {
            let posX = i * hexRectangleWidth + ((j % 2) * hexRadius);
            let posY = j * (sideLength + hexHeight);
              drawHexagon(
                  ctx, 
                  posX, 
                  posY, 
                  false
              );
              drawText(ctx, i, j,posX, posY, false);
          }
      }
  }

  function drawText(canvasContext, x, y, posX, posY, fill) {
    ctx.font = "11px Arial";
    ctx.fillText(x + ", "+y,posX+ 26, posY+36);
  }

  function drawHexagon(canvasContext, x, y, fill) {           
      var fill = fill || false;

      canvasContext.beginPath();
      canvasContext.moveTo(x + hexRadius, y);
      canvasContext.lineTo(x + hexRectangleWidth, y + hexHeight);
      canvasContext.lineTo(x + hexRectangleWidth, y + hexHeight + sideLength);
      canvasContext.lineTo(x + hexRadius, y + hexRectangleHeight);
      canvasContext.lineTo(x, y + sideLength + hexHeight);
      canvasContext.lineTo(x, y + hexHeight);
      canvasContext.closePath();

      if(fill) {
          canvasContext.fill();
      } else {
          canvasContext.stroke();
      }
  }

})();

Vue.filter('zerofill', function (value) {
  //value = ( value < 0 ? 0 : value );
  return ( value < 10 && value > -1 ? '0' : '' ) + value;
});

var Tracker = Vue.extend({
  template: `
  <span v-show="show" class="flip-clock__piece">
    <span class="flip-clock__card flip-card">
      <b class="flip-card__top">{{current | zerofill}}</b>
      <b class="flip-card__bottom" data-value="{{current | zerofill}}"></b>
      <b class="flip-card__back" data-value="{{previous | zerofill}}"></b>
      <b class="flip-card__back-bottom" data-value="{{previous | zerofill}}"></b>
    </span>
    <span class="flip-clock__slot">{{property}}</span>
  </span>`, 
  props: ['property','time'],
  data: () => ({
    current: 0,
    previous: 0,
    show: false
  }),
  
  events: {
    time(newValue) {
      
      if ( newValue[this.property] === undefined ) { 
        this.show = false; 
        return;
      }
      
      var val = newValue[this.property];
      this.show = true;
      
      val = ( val < 0 ? 0 : val );
      
      if ( val !== this.current ) {
  
        this.previous = this.current;
        this.current = val;
  
        this.$el.classList.remove('flip');
        void this.$el.offsetWidth;
        this.$el.classList.add('flip');
      }
      
    }
  },

});
  

  // time
  let countdown;

const init_countdown = () => {
  countdown = new FlipClock($('.countdown'), {
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
        const time = this.factory.getTime().time;
        if (time) {
          console.log('Clock interval', time);
        }
      }
    }
  });

  return countdown;
};

const set_countdown = (minutes, start) => {

  if (countdown.running) {
    return;
  }

  const seconds = minutes * 60;

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

countdown = init_countdown();
set_countdown(1, new Date());
