import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateCollections } from '../../redux/shop/shop.actions';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';
{/* Because we need to store data from actual components, we make it a class component*/}
{/* Shopage is wrapped inside route, so we automatically passes to match, location, history, we want match  */}

{/* We simply use this components wrapped inside the Router*/}
const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    
  state = {
    loading: true // instead of writing constructor-super, we simply do this and react
                  // will implement it under the hood 
  }
  
  
  unsubscribeFromSnapshot = null;
  /* Because the componentDidMount is the only that can give us the info that the app as loaded,
  We should wrap there our Spinner*/
  componentDidMount() {

    const { updateCollections } = this.props
    
    const collectionRef = firestore.collection('collections');

    collectionRef.onSnapshot(async snapshot => {
       const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      // pass the collectionsMap in the updatecollections dispatch:
      updateCollections(collectionsMap);
      // make spinner disappear
      this.setState({loading: false})
    } );
  }

    render () {
        const {match} = this.props;
        const {loading} = this.state;

        return (
            <div className='shop-page'>
            <Route exact path={`${match.path}`} 
                          render={(props) => // method that takes a function whose arguments are props and states
                          <CollectionsOverviewWithSpinner 
                          isLoading={loading} {...props} />} 
                          />
            <Route path={`${match.path}/:collectionId`} 
                          render={(props) => 
                          <CollectionPageWithSpinner
                          isLoading={loading} {...props} />} 
                          />  
            
        </div>
        )
};
}  /* it provides us the current endpoint ,/shop for example*/
  

const mapDispatchToProps = (dispatch) => ({
  updateCollections : collectionsMap =>
  dispatch(updateCollections(collectionsMap))
})

export default connect(null,mapDispatchToProps)(ShopPage);

