import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Cookies from 'universal-cookie';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Aboutus from './components/Aboutus';
import Login from './components/Login';
import Register from './components/Register';
import Productlist from './components/Productlist';
import Userprofile from './components/Userprofile';
import Productdetail from './components/Productdetail';
import Paymenthis from './components/Paymenthis';
import Checkout from './components/Checkout';
import BeingProcess from './components/BeingProcess';
import Failed from './components/Failed';
import Invoice from './components/Invoice';
import Cart from './components/Cart';
import Footer from './components/Footer';

class App extends Component {
  render() {
    const cookies = new Cookies();
    let mycookie = cookies.get('sessionID')
    let Navigation = (!mycookie) ? <Navbar user={mycookie}/> : <Navbar user={mycookie}/>

    return (
      <div>
        {Navigation}
          <Route exact path="/" component={Home}/>
          <Route path="/Aboutus" component={Aboutus}/>
          <Route path="/Login" component={Login}/>
          <Route path="/Register" component={Register}/>
          <Route path="/Productlist" component={Productlist}/>
          <Route path="/Productdetail" component={Productdetail}/>
          <Route path="/Userprofile" component={Userprofile}/>
          <Route path="/Paymenthis" component={Paymenthis}/>
          <Route path="/Checkout" component={Checkout}/>
          <Route path="/BeingProcess" component={BeingProcess}/>
          <Route path="/PaymentFailed" component={Failed}/>
          <Route path="/Invoice" component={Invoice}/>
          <Route path="/Cart" component={Cart}/>
        <Footer/>
      </div>
    );
  }
}

export default App;
