import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

const selectShop = state => state.shop;

export const selectCollections = createSelector (
    [selectShop],
    shop => shop.collections
);

// Will return a function (HOC), createSelector so we will do currying
// this function, due to the nature of being dynamically changing is not memoized,
// so we need to implement the memoized helper function from lodash, and wrap this function

//By wrapping this function is memoize, we're saying that whenever this function gets called 
//and receives collectionUrlParam, I want to memoize the return of this function (in this case we 
//return a selector). If this function gets called again with the same collectionUrlParam, don't 
//rerun this function because we'll return the same value as last time, which we've memoized so 
//just return the selector that's been stored.


export const selectCollection = memoize((collectionUrlParam) =>
  createSelector(
    [selectCollections],
    //(collections) => collections.find(collection => (collection.id === COLLECTION_ID_MAP[collectionUrlParam]))
    // However find is not optimal; imagine if we had thousands of collections and the very end is our object. It will take longer
    // We need to do data normalization: 
    collections => collections ? collections[collectionUrlParam] : null
));

// Collections-Overview still needs the array format for map, so we can convert
// the hash table into an array
export const selectCollectionsForPreview = createSelector(
  [selectCollections],                    // map will evaluate for each key (mens,jackets, etc) the collection, and add them into the array
  collections => collections ? Object.keys(collections).map(key => collections[key]) : []
)
