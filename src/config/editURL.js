import _ from 'lodash';

const updateMethodURL = (collectionName, methodName, newURL) => {
  let collections = JSON.parse(localStorage.getItem('collections')) || {};

  if (!collections[collectionName]) {
    console.error(`Collection "${collectionName}" not found.`);
    return;
  }

  // Update the URL immutably
  collections[collectionName] = collections[collectionName].map(method =>
    method.name === methodName
      ? { ...method, url: newURL } // create a new object with updated URL
      : method
  );

  // Save back to localStorage
  localStorage.setItem('collections', JSON.stringify(collections));

  return collections;
};

export default { updateMethodURL };
