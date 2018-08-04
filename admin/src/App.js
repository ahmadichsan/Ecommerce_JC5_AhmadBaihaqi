import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';

import Login from './components/Login';
import Home from './components/Home';
import User from './components/User';
import Invoice from './components/Invoice';
import Category from './components/Category';
import Product from './components/Product';
import Productedit from './components/Productedit';
import Logout from './components/Logout';

class App extends Component {
  render()
  {
    return (
    <div>
        <Route exact path="/" component={Login}/>
        <Route path="/Home" component={Home}/>
        <Route path="/User" component={User}/>
        <Route path="/Invoice" component={Invoice}/>
        <Route path="/Category" component={Category}/>
        <Route path="/Product" component={Product}/>
        <Route path="/Editproduct" component={Productedit}/>
        <Route path="/Logout" component={Logout}/>
    </div>
    );
  }
}
export default App;
