// src/config/endPoints.js

export const endPoints = {
  GET_Methods: [
    'https://catfact.ninja/fact',
    'https://catfact.ninja/fact',
    'https://catfact.ninja/error'
  ],
  POST_Methods: [
    'https://reqbin.com/echo/post/json'
  ]
};

// Calculate quantities after defining the object
endPoints.getMethodsQty = endPoints.GET_Methods.length;
endPoints.postMethodsQty = endPoints.POST_Methods.length;
endPoints.totalQty = endPoints.getMethodsQty + endPoints.postMethodsQty;

export default endPoints;
