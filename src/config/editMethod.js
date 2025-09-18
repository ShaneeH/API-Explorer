import _ from 'lodash';

const updateMethodType = (collectionName, methodName, newMethodType) => {
  let collections = JSON.parse(localStorage.getItem('collections')) || {};

  if (!collections[collectionName]) {
    console.error(`Collection "${collectionName}" not found.`);
    return;
  }

  // Update the method immutably
  collections[collectionName] = collections[collectionName].map(method =>
    method.name === methodName
      ? { ...method, method: newMethodType.toUpperCase() }
      : method
  );

  // Save back to localStorage
  localStorage.setItem('collections', JSON.stringify(collections));

  return collections;
};

export default { updateMethodType };
