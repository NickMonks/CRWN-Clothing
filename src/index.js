import React from 'react';
import ReactDOM from 'react-dom';


// React Router:
import {BrowserRouter} from 'react-router-dom'; 
// Component that we wrap the entire application, to make it to have access to the store
// from redux. It will the parent of anything in the app.
import {Provider} from 'react-redux';
import store from './redux/store';


import './index.css';
import App from './App';



ReactDOM.render(
  // we add the store in our provider so the child component can pull out and add in the store
  <Provider store={store}>
    
    <BrowserRouter>
    <App />
    </BrowserRouter>
  
  </Provider>,
  
  document.getElementById('root')
);

