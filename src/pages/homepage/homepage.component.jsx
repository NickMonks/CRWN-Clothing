import React from 'react';
import './homepage.style.scss';

import '../../components/directory/directory.components';
import '../../components/menu-item/menu-item.component';
import Directory from '../../components/directory/directory.components';

const HomePage = () => (
    <div className="homepage">
         <Directory />
    </div>
 
    
);

export default HomePage;