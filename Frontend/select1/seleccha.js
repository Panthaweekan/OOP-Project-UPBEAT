// Get references to the cards and add click event listeners
const card1 = document.querySelector('.card:nth-of-type(1)');
const card2 = document.querySelector('.card:nth-of-type(2)');

card1.addEventListener('click', () => {
  // Player 1 card clicked
  localStorage.setItem('player', '1'); // Store player selection in local storage
  card1.classList.add('selected'); // Add selected class to card
  card2.classList.remove('selected'); // Remove selected class from other card
});

card2.addEventListener('click', () => {
  // Player 2 card clicked
  localStorage.setItem('player', '2'); // Store player selection in local storage
  card2.classList.add('selected'); // Add selected class to card
  card1.classList.remove('selected'); // Remove selected class from other card
});

// Check local storage for previous player selection
const playerSelection = localStorage.getItem('player');
if (playerSelection === '1') {
  card1.classList.add('selected'); // Add selected class to player 1 card
} else if (playerSelection === '2') {
  card2.classList.add('selected'); // Add selected class to player 2 card
}
