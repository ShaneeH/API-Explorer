import _ from 'lodash';

const emptyResult = {
  GET_Methods: [],
  POST_Methods: [],
  getMethodsQty: 0,
  postMethodsQty: 0,
  totalQty: 0,
  editRequest: null
};

export const getEndPointsByCollection = (collectionName) => {
  const collectionsData = localStorage.getItem('collections');
  if (!collectionsData) {
    console.warn("No collections found in localStorage.");
    return emptyResult;
  }

  let collections = {};
  try {
    collections = JSON.parse(collectionsData) || {};
  } catch (err) {
    console.error("Error parsing collections:", err);
    return emptyResult;
  }

  const selectedCollection = collections[collectionName];
  if (!selectedCollection) {
    console.warn(`Collection "${collectionName}" not found.`);
    return emptyResult;
  }

  const GET_Methods = _.filter(selectedCollection, { method: 'GET' });
  const POST_Methods = _.filter(selectedCollection, { method: 'POST' });

  return {
    GET_Methods,
    POST_Methods,
    getMethodsQty: GET_Methods.length,
    postMethodsQty: POST_Methods.length,
    totalQty: GET_Methods.length + POST_Methods.length,
    editRequest: null
  };
};

export default getEndPointsByCollection;
