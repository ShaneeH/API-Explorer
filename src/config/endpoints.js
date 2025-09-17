// A default fallback result to avoid duplication
const emptyResult = {
  GET_Methods: [],
  POST_Methods: [],
  getMethodsQty: 0,
  postMethodsQty: 0,
  totalQty: 0,
  editRequest: null
}

// Function to get methods from a specific collection in localStorage
export const getEndPointsByCollection = (collectionName) => {
  try {
    const collectionsData = localStorage.getItem("collections")
    if (!collectionsData) {
      console.warn("No collections found in localStorage.")
      return emptyResult
    }

    let collections = {}
    try {
      collections = JSON.parse(collectionsData) || {}
    } catch (err) {
      console.error("Error parsing collections:", err)
      return emptyResult
    }

    const selectedCollection = collections[collectionName]
    if (!selectedCollection) {
      console.warn(`Collection "${collectionName}" not found.`)
      return emptyResult
    }

    const GET_Methods = selectedCollection.filter(item => item.method === "GET")
    const POST_Methods = selectedCollection.filter(item => item.method === "POST")

    return {
      GET_Methods,
      POST_Methods,
      getMethodsQty: GET_Methods.length,
      postMethodsQty: POST_Methods.length,
      totalQty: GET_Methods.length + POST_Methods.length,
      editRequest: null
    }
  } catch (err) {
    console.error("Unexpected error in getEndPointsByCollection:", err)
    return emptyResult
  }
}

export default getEndPointsByCollection
