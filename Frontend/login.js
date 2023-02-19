const form = document.querySelector("form");
const message = document.getElementById("message");
const smallMessage = document.getElementById("smallMessage");
const nameMessage = "Type your name";
const passwordMessage = "Choose your password";
const name = document.getElementById("name");
const password = document.getElementById("password");
const submitBtn = document.getElementById("submit");

function firstMessage() {
  message.innerHTML = nameMessage;
  smallMessage.innerHTML = "";
  document.body.style.background = "#88C9E8";
}

// function message(el,message,color){
// 	el.innerHTML = message;
// 	document.body.style.background = color;
// }

function secondMessage() {
  message.innerHTML = passwordMessage;

  document.body.style.background = "#D5F3A6";
}
function length() {
  if (password.value.length <= 3) {
    smallMessage.innerHTML = "Make it strong";
  } else if (password.value.length > 3 && password.value.length < 10) {
    smallMessage.innerHTML = "Strong as a bull!";
  } else if (password.value.length >= 10) {
    smallMessage.innerHTML = "It's unbreakable!!!";
  } else {
    smallMessage.innerHTML = "";
  }
}

function formValidation() {
  //step 1 email
  //display Type your email when user clicks on input and types,
  //hide after user clicks on something else
  email.addEventListener("input", firstMessage);
  //step 2 password
  //display Choose your password as user clicks on input
  //change small message as user enters longer password
  password.addEventListener("input", secondMessage);
  password.addEventListener("keyup", length);

  //step 3 when input 1 and 2 are filled out
  //display message You're a click away, small message that is why you are here fore
  submitBtn.addEventListener("mouseover", function (event) {
    message.innerHTML = "You're a click away";
    smallMessage.innerHTML = "Do it. That's what you are here for.";
    document.body.style.background = "#FCEFA6";
  });

  submitBtn.addEventListener("click", function (event) {
    form.innerHTML =
      ' <h1>Good job!</h1><p class="success-message">There is a confirmation link waiting in your email inbox.</p>';
    document.body.style.background = "#D7F5DE";
  });
}

formValidation();
