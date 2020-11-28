import React from 'react';
import { Route } from 'react-router-dom';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
{/* Because we need to store data from actual components, we make it a class component*/}
{/* Shopage is wrapped inside route, so we automatically passes to match, location, history, we want match  */}
const ShopPage = ({match /* it provides us the current endpoint ,/shop for example*/}) => (
    <div className='shop-page'>
         <Route exact path={`${match.path}`} component={CollectionsOverview} />
         <Route path={`${match.path}/:collectionId`} component={CollectionPage}  // access to category ID
         />
     </div>
);



export default ShopPage;

