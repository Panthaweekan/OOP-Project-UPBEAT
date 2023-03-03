gsap.registerPlugin(DrawSVGPlugin);
var tlMute = gsap.timeline({ paused: true});
var tlUnmute = gsap.timeline({paused: true})
var flag = true;

tlMute.to("#large-curve", {
  duration: 0.3,
  drawSVG: "99.9% 100%"
})
  .set("#large-curve", { opacity: 0 })
  .to("#small-curve", { duration: 0.3, drawSVG: "97% 100%" }, "-=0.15")
  .to("#small-curve", { duration: 0.2, y: -40 })
  .set("#dark-line", { drawSVG: "1%", opacity: 1 })
  .set("#small-curve", { opacity: 0 })
  .to("#dark-line", { drawSVG: "100%", duration: 0.2 })
  .set("#light-line", { drawSVG: "1%", opacity: 1, y: 30 })
  .to("#light-line", { y: 0, duration: 0.2 })
  .to("#light-line", { duration: 0.2, drawSVG: "100%" });

tlUnmute.set("#large-curve, #small-curve", {drawSVG: "1%"})
        .to("#large-curve", {drawSVG: "100%", duration: 0.2})
  .to("#small-curve", {duration: 0.2, drawSVG: "100%"}, "-=0.1");

$(".button").click(function () {
  if (flag) {
    tlMute.play();
    tlUnmute.progress(0).pause()
  } else {
    tlMute.progress(0).pause();
    tlUnmute.play();
  }
  flag = !flag;
});
