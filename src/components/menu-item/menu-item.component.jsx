import React from 'react';
import './menu-item.styles.scss';

const MenuItem = ({title, imageUrl, size}) => (
    
    <div style = {{
        // react allows us to pass into the divs some css styles, that were we insert the image
        // using javascript template string (to set the url function in the css) 
        // we can dinamically change the background of our website from the scss
        backgroundImage: `url(${imageUrl})` 
    }} className={`${size} menu-item`}> 
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

export default MenuItem;