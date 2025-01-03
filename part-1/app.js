let favNumber = 5; // Favorite number to fetch facts about
let baseURL = "http://numbersapi.com"; // Base URL for the API

// 1. Fetch a fact for the favorite number
$.getJSON(`${baseURL}/${favNumber}?json`, function(data) {
  console.log(data); // Log the fetched data
});

// 2. Fetch facts for an array of favorite numbers
let favNumbers = [7, 11, 22];
$.getJSON(`${baseURL}/${favNumbers}?json`, function(data) {
  console.log(data); // Log the fetched data for multiple numbers
});

// 3. Fetch multiple facts for the favorite number and display them
let facts = []; // Array to store the fetched facts
$.getJSON(`${baseURL}/${favNumber}?json`, function(data) {
  facts.push(data.text); // Add the first fact to the array
  $.getJSON(`${baseURL}/${favNumber}?json`, function(data) {
    facts.push(data.text); // Add the second fact
    $.getJSON(`${baseURL}/${favNumber}?json`, function(data) {
      facts.push(data.text); // Add the third fact
      $.getJSON(`${baseURL}/${favNumber}?json`, function(data) {
        facts.push(data.text); // Add the fourth fact
        // Append each fact to the body of the document
        facts.forEach(fact => {
          $("body").append(`<p>${fact}</p>`); // Display each fact
        });
      });
    });
  });
});
