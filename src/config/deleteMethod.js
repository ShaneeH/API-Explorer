import _ from 'lodash';

const removeMethodFromCollection = (collectionName, methodName) => {
  let collections = JSON.parse(localStorage.getItem('collections')) || {};

  if (!collections[collectionName]) {
    console.error(`Collection "${collectionName}" not found.`);
    return;
  }

  // Remove the method immutably
  collections[collectionName] = _.reject(collections[collectionName], { name: methodName });

  // Save back to localStorage
  localStorage.setItem('collections', JSON.stringify(collections));

  return collections;
};


export default { removeMethodFromCollection };