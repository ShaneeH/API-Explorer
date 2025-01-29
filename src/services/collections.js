// services/collections.js

const getStoredCollections = () => JSON.parse(localStorage.getItem('collections')) || {}; // Retrieve the JSON LocalStorage Object

const getCollections = async () => {
    const storedCollections = getStoredCollections();
    return Object.keys(storedCollections);
};

const getMethodsForCollection = async (collectionName) => {
    const storedCollections = getStoredCollections();
    return storedCollections[collectionName] || [];
};

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
