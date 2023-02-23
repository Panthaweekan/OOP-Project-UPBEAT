var card__background = document.getElementById("image1");
var card__background = document.getElementById("image2");

card__background.addEventListener("click", function() {
  // remove "selected" class from other image
  icard__background.classList.remove("selected");
  
  // add "selected" class to this image
  card__background.classList.add("selected");
});

card__background.addEventListener("click", function() {
  // remove "selected" class from other image
  card__background.remove("selected");
  
  // add "selected" class to this image
  card__background.add("selected");
});