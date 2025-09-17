// services/collections.js

const getStoredCollections = () => {
  try {
    const raw = localStorage.getItem('collections')
    if (!raw) {
      const defaults = { "Default": [] }
      localStorage.setItem('collections', JSON.stringify(defaults))
      return defaults
    }
    return JSON.parse(raw)
  } catch (e) {
    console.error("Failed to parse collections:", e)
    return {}
  }
}

const getCollections = async () => {
    const storedCollections = getStoredCollections();
    return Object.keys(storedCollections);
};

const getMethodsForCollection = async (collectionName) => {
    const storedCollections = getStoredCollections();
    const collection = storedCollections[collectionName] || [];
    return collection; 
}

const createCollection = async (collectionName) => {
    const storedCollections = getStoredCollections();

    // Check if the collection already exists
    if (storedCollections[collectionName]) {
        return false; // Collection already exists
    }

    storedCollections[collectionName] = []; // Create a new collection with an empty array of methods
    localStorage.setItem('collections', JSON.stringify(storedCollections));
    return true; // Successfully created collection
};

const addMethodToCollection = async (collectionName, methodData) => {
    const storedCollections = getStoredCollections();

    // Check if the collection exists
    if (!storedCollections[collectionName]) {
        return false; // Collection doesn't exist
    }

    storedCollections[collectionName].push(methodData);
    localStorage.setItem('collections', JSON.stringify(storedCollections));
    return true; // Successfully added method to collection
};

export { getCollections, getMethodsForCollection, createCollection, addMethodToCollection };
