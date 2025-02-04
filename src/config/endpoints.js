// Function to get methods from a specific collection in localStorage
export const getEndPointsByCollection = (collectionName) => {
  // Retrieve the collections data from localStorage
  const collections = JSON.parse(localStorage.getItem('collections')) || {};

  // Initialize GET and POST method arrays for the specific collection
  const GET_Methods = [];
  const POST_Methods = [];

  // Check if the collection exists in localStorage
  const selectedCollection = collections[collectionName];

  if (selectedCollection) {
    // Separate GET and POST methods from the selected collection
    selectedCollection.forEach(item => {
      if (item.method === "GET") {
        GET_Methods.push(item);
      } else if (item.method === "POST") {
        POST_Methods.push(item);
      }
    });
  } else {
    console.error(`Collection "${collectionName}" not found.`);
  }

  // Calculate quantities dynamically
  const getMethodsQty = GET_Methods.length;
  const postMethodsQty = POST_Methods.length;
  const totalQty = getMethodsQty + postMethodsQty;

  return {
    GET_Methods,
    POST_Methods,
    getMethodsQty,
    postMethodsQty,
    totalQty
  };
};

export default getEndPointsByCollection;
