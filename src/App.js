import './App.css';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from "./pages/shop/shop.component.jsx";

const HatsPage = () => (
  <div>
    <h1>HATS PAGE </h1>
  </div>
)
function App() {
  return (
    <div>
      <Switch>
      {/* Switch is used to only render whichever endpoint is being hit*/}
      {/* history component is only passed to the children, but we need to avoid prop drilling! */}
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage}/>
      </Switch>
     
    </div>
  );
}

export default App;
