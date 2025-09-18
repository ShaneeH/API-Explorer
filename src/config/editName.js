import _ from 'lodash';

const updateMethodNAME = (collectionName, methodName, newNAME) => {
  let collections = JSON.parse(localStorage.getItem('collections')) || {};

  if (!collections[collectionName]) {
    console.error(`Collection "${collectionName}" not found.`);
    return;
  }

  // Update the method name immutably
  collections[collectionName] = collections[collectionName].map(method =>
    method.name === methodName
      ? { ...method, name: newNAME } // create a new object with updated name
      : method
  );

  // Save back to localStorage
  localStorage.setItem('collections', JSON.stringify(collections));

  return collections;
};

export default { updateMethodNAME };
