import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Cookies from 'universal-cookie';

import Navbar1 from './components/Navbar1';
import Navbar2 from './components/Navbar2';
import Home from './components/Home';
import Aboutus from './components/Aboutus';
import Login from './components/Login';
import Register from './components/Register';
import Productlist from './components/Productlist';
import Userprofile from './components/Userprofile';
import Productdetail from './components/Productdetail';
import Paymenthis from './components/Paymenthis';
import Checkout from './components/Checkout';
import Paymentfailed from './components/Paymentfailed';
import Invoice from './components/Invoice';
import Cart from './components/Cart';
import Footer from './components/Footer';
import Logout from './components/Logout';
// import CobaCart from './components/CobaCart';

class App extends Component {
  render() {
    const cookies = new Cookies();
    let mycookie = cookies.get('sessionID')
    let Navigation = (!mycookie) ? <Navbar1/> : <Navbar2/>

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
          <Route path="/Paymentfailed" component={Paymentfailed}/>
          <Route path="/Invoice" component={Invoice}/>
          <Route path="/Cart" component={Cart}/>
          {/* <Route path="/Cart" component={CobaCart}/> */}
          <Route path="/Logout" component={Logout}/>
        <Footer/>
      </div>
    );
  }
}

export default App;
