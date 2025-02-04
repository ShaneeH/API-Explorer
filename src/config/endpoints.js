// Function to get methods from a specific collection in localStorage
export const getEndPointsByCollection = (collectionName) => {
  try {
    // Retrieve the collections data from localStorage
    const collectionsData = localStorage.getItem('collections');
    
    if (!collectionsData) {
      console.error("No collections found in localStorage.");
      return { GET_Methods: [], POST_Methods: [], getMethodsQty: 0, postMethodsQty: 0, totalQty: 0 };
    }

    let collections;
    try {
      collections = JSON.parse(collectionsData) || {};
    } catch (jsonError) {
      console.error("Error parsing collections from localStorage:", jsonError);
      return { GET_Methods: [], POST_Methods: [], getMethodsQty: 0, postMethodsQty: 0, totalQty: 0 };
    }

    // Initialize GET and POST method arrays for the specific collection
    const GET_Methods = [];
    const POST_Methods = [];

    // Check if the collection exists in localStorage
    const selectedCollection = collections[collectionName];

    if (!selectedCollection) {
      console.error(`Collection "${collectionName}" not found.`);
      return { GET_Methods, POST_Methods, getMethodsQty: 0, postMethodsQty: 0, totalQty: 0 };
    }

    try {
      // Separate GET and POST methods from the selected collection
      selectedCollection.forEach(item => {
        if (item.method === "GET") {
          GET_Methods.push(item);
        } else if (item.method === "POST") {
          POST_Methods.push(item);
        }
      });
    } catch (iterationError) {
      console.error("Error processing collection items:", iterationError);
      return { GET_Methods: [], POST_Methods: [], getMethodsQty: 0, postMethodsQty: 0, totalQty: 0 };
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
  } catch (e) {
    console.error("Unexpected error in getEndPointsByCollection:", e);
    return { GET_Methods: [], POST_Methods: [], getMethodsQty: 0, postMethodsQty: 0, totalQty: 0 };
  }
};

export default getEndPointsByCollection;
