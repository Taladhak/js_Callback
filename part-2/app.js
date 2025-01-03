$(function() {
  let baseURL = 'https://deckofcardsapi.com/api/deck';

  // 1. Draw a single card from a new deck and log its value and suit
  $.getJSON(`${baseURL}/new/draw/`, function(data) {
    let { suit, value } = data.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
  });

  // 2. Draw two cards from the deck and log their values and suits
  $.getJSON(`${baseURL}/new/draw/`, function(data) {
    let firstCard = data.cards[0];
    let deckId = data.deck_id;
    $.getJSON(`${baseURL}/${deckId}/draw/`, function(data) {
      let secondCard = data.cards[0];
      [firstCard, secondCard].forEach(function(card) {
        console.log(
          `${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`
        );
      });
    });
  });

  // 3. Initialize deck and button for drawing cards
  let deckId = null; // Variable to store the deck ID
  let $btn = $('button'); // Button element for drawing cards
  let $cardArea = $('#card-area'); // Area to display drawn cards

  // Shuffle a new deck and show the button
  $.getJSON(`${baseURL}/new/shuffle/`, function(data) {
    deckId = data.deck_id; // Store the deck ID
    $btn.show(); // Show the button to draw cards
  });

  // Event listener for button click to draw a card
  $btn.on('click', function() {
    $.getJSON(`${baseURL}/${deckId}/draw/`, function(data) {
      let cardSrc = data.cards[0].image; // Get the image source of the drawn card
      let angle = Math.random() * 90 - 45; // Random rotation angle
      let randomX = Math.random() * 40 - 20; // Random X translation
      let randomY = Math.random() * 40 - 20; // Random Y translation
      $cardArea.append(
        $('<img>', {
          src: cardSrc,
          css: {
            transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)` // Apply transformations
          }
        })
      );
      if (data.remaining === 0) $btn.remove(); // Remove button if no cards remain
    });
  });
});
