const removeMethodFromCollection = (collectionName, methodName) => {
    // Retrieve collections from localStorage
    const collectionsData = localStorage.getItem("collections");

    if (!collectionsData) {
        console.error("No collections found in localStorage.");
        return { GET_Methods: [], POST_Methods: [], getMethodsQty: 0, postMethodsQty: 0, totalQty: 0, editRequest: null };
    }

    let collections = JSON.parse(collectionsData);

    // Check if the collection exists
    if (!collections[collectionName]) {
        console.error(`Collection "${collectionName}" not found.`);
        return;
    }

    let selectedCollection = collections[collectionName];

    // Find the method index
    const methodIndex = selectedCollection.findIndex(obj => obj.name === methodName);

    if (methodIndex === -1) {
        console.error(`Method "${methodName}" not found in collection "${collectionName}".`);
        return;
    }

    // Remove the method from the collection array
    selectedCollection.splice(methodIndex, 1);

    // Update the collections object with the modified selectedCollection
    collections[collectionName] = selectedCollection;

    // Save back to localStorage
    localStorage.setItem("collections", JSON.stringify(collections));

    // Return the updated collections data
    return collections;
};

export default { removeMethodFromCollection };