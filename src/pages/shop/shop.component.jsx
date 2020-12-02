import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';

//import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';
/* Because we need to store data from actual components, we make it a class component*/
/* Shopage is wrapped inside route, so we automatically passes to match, location, history, we want match  */

/* We simply use this components wrapped inside the Router*/
//onst CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
//const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    
  
  
  unsubscribeFromSnapshot = null;
  /* Because the componentDidMount is the only that can give us the info that the app as loaded,
  We should wrap there our Spinner*/
  componentDidMount() {
    const {fetchCollectionsStartAsync} = this.props;
    fetchCollectionsStartAsync();

  }

    render () {
        const {match} = this.props;
      

        return (
            <div className='shop-page'>
            <Route exact path={`${match.path}`} 
                          component={CollectionsOverviewContainer}
                          // A container is replaced so that we can separate the responsabilities
                          // from isCollectionFetched, and basically connect all elements together
                          />
            <Route path={`${match.path}/:collectionId`} 
                          component={CollectionPageContainer}
                          
                          //render={(props) => 
                         // <CollectionPageWithSpinner
                          // If collection is not loaded, then this will be set to true
                          // and tell the spinner to render ( the problem is if we re-load the webpage
                          // we will see that the isLoading is re-set to false), so we need to use this parameter

                         // isLoading={!isCollectionLoaded} {...props} />} 
                          />  
            
        </div>
        )
};
}  /* it provides us the current endpoint ,/shop for example*/
  

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})

export default connect( null,
                        mapDispatchToProps)
                        (ShopPage);

