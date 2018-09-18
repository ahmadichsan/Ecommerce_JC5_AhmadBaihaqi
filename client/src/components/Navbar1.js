import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar1 extends Component
{
    render()
    {
        return (
            <div>
                <nav className="navbar navbar-default" id="colorback">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <Link to="/" className="navbar-brand fontsizeku"><span id="Fountain">Han</span><sub id="Pacifico">Cakes</sub></Link>
                        </div>
                        
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <form className="navbar-form navbar-left">
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="What are you looking for?" id="borderrad2"/>
                                </div>
                                <button type="submit" className="btn btn-default" id="borderrad1"><i className="fa fa-search"></i></button>&nbsp;
                                <Link to="/Cart">
                                    <button type="button" className="btn btn-default">
                                        <span className="fa fa-shopping-cart"></span>
                                    </button>
                                </Link>    
                            </form>
                            
                            <ul className="nav navbar-nav navbar-right">
                                <li><Link to="/Aboutus">About us</Link></li>
                                <li><Link to="/Productlist">Product</Link></li>
                                <li className="dropdown">
                                    <a href="" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">User <span className="caret"></span></a>
                                    <ul className="dropdown-menu tambahnya">
                                        <li><Link to="/Login">Login</Link></li>
                                        <li><Link to="/Register">Register</Link></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}
export default Navbar1;



























