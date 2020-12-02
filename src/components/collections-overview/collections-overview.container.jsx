import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux' // allows to not need to wrap too many arguments for HOC
import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';
import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionsOverview from './collections-overview.component';

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionFetching
})

const CollectionsOverviewContainer = compose(
        connect(mapStateToProps),
        WithSpinner) // it will evaluate first the withspinner against collectionsoverview and so forth
        (CollectionsOverview);

export default CollectionsOverviewContainer;