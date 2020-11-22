import React from 'react';
import {withRouter} from 'react-router-dom';
import './menu-item.styles.scss';

const MenuItem = ({title, imageUrl, size, history, linkUrl, match /* history is the parent property*/}) => (
    
    <div
        // react allows us to pass into the divs some css styles, that were we insert the image
        // using javascript template string (to set the url function in the css) 
        // we can dinamically change the background of our website from the scss

        //                                                         resolves: /somematchUrl/linkURL
       className={`${size} menu-item`} onClick={() => history.push(`${match.url}${linkUrl}`)} > 
            <div className='background-image'
                style = {{
                    // We dont want to increase the divs size, that's why we don't wrap it up
                    backgroundImage: `url(${imageUrl})` 
                }} />
                <div className="content">
                    <h1 className="title">{title.toUpperCase()}</h1>
                        <span className="subtitle">SHOP NOW</span>
                </div>
            </div>
        
);

{/* withRouter is a HOC, which means it powers up the MenuItem function and modifies the component by adding new functionality 
it returns the argument this function with access to properties from parents*/}
export default withRouter(MenuItem);