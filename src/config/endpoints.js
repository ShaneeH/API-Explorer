// src/config/endPoints.js

export const endPoints = {
  GET_Methods: [
    'https://catfact.ninja/fact',
    'https://catfact.ninja/fact',
    'Error Example',
    'https://jsonplaceholder.typicode.com/posts/1',
    'http://universities.hipolabs.com/search'
  ],
  POST_Methods: [
    'https://reqbin.com/echo/post/json',
    'https://api.restful-api.dev/objects'
  ]
};

// Calculate quantities after defining the object
endPoints.getMethodsQty = endPoints.GET_Methods.length;
endPoints.postMethodsQty = endPoints.POST_Methods.length;
endPoints.totalQty = endPoints.getMethodsQty + endPoints.postMethodsQty;

export default endPoints;
