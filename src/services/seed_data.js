// src/config/seedData.js

export function seedDefaultData() {
  const DefaultCollection = [
    {
      name: "Get Dog Breeds",
      url: "https://dogapi.dog/api/v2/breeds",
      method: "GET",
    },
    {
      name: "Random Cat Fact",
      url: "https://catfact.ninja/fact",
      method: "GET",
    },
    {
      name: "Advice Slip",
      url: "https://api.adviceslip.com/advice",
      method: "GET",
    },
    {
      name: "Public Holidays (US)",
      url: "https://date.nager.at/api/v3/PublicHolidays/2024/US",
      method: "GET",
    },
    {
      name: "Random Joke",
      url: "https://official-joke-api.appspot.com/random_joke",
      method: "GET",
    },
    // ✅ POST examples
    {
      name: "Echo Test (Postman)",
      url: "https://postman-echo.com/post",
      method: "POST",
    },
    {
      name: "JSONPlaceholder Create Post",
      url: "https://jsonplaceholder.typicode.com/posts",
      method: "POST",
    },
    {
      name: "ReqRes Create User",
      url: "https://reqres.in/api/users",
      method: "POST",
    },
  ];

  // Store under your collections key if not already there
  const collections = JSON.parse(localStorage.getItem("collections")) || {};
  if (!collections["MyCollection"] || collections["MyCollection"].length === 0) {
    collections["MyCollection"] = DefaultCollection;
    localStorage.setItem("collections", JSON.stringify(collections));
    console.log("Seed data added to localStorage!");
  } else {
    console.log("Seed data already exists, skipping.");
  }
}
