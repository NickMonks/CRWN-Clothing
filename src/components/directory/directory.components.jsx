import React from 'react';
import MenuItem from '../menu-item/menu-item.component'
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectDirectorySections } from '../../redux/directory/directory.selectors';
import './directory.styles.scss';

{/* In this case we define a class component, since we need to store the state value of the menu items that we want to pass the state of the menu items */}



const Directory = ({sections}) => (
    
          <div className = "directory-menu">
              {
                  // we render the menuitem using map
                  //                        \/destructure here
                  // To avoid verbose , ES6 can spread the values adding ..otherSectionProps, which repeats operations of other fields
                  sections.map(({id, ...otherSectionProps}) => (
                      <MenuItem key={id} {...otherSectionProps}/>
                  ))
              }
          </div>
      
);    

const mapStateToProps = createStructuredSelector ({
  sections: selectDirectorySections
})

export default connect(mapStateToProps)(Directory);

