import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component
{
    render()
    {
        return (
            <div>
                <nav className="navbar navbar-default navbar-static-top" id="tambah">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link to="/Home" className="navbar-brand">Admin v1.0.1</Link>
                    </div>
                    
                    <ul className="nav navbar-top-links navbar-right">
                        <li className="dropdown">
                            <a className="dropdown-toggle" data-toggle="dropdown" href="">
                                <i className="fa fa-user fa-fw"></i> <i className="fa fa-caret-down"></i>
                            </a>
                            <ul className="dropdown-menu dropdown-user">
                                <li>
                                    <Link to="/Logout"><i className="fa fa-sign-out-alt fa-fw"></i> Logout</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    
                    <div className="navbar-default sidebar" role="navigation">
                        <div className="sidebar-nav navbar-collapse">
                            <ul className="nav">
                                <li className="sidebar-search">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Search..." />
                                        <span className="input-group-btn">
                                            <button className="btn btn-default" type="button">
                                                <i className="fa fa-search"></i>
                                            </button>
                                        </span>
                                    </div>
                                </li>
                                <li>
                                    <Link to="/Home"><i className="fa fa-tachometer-alt fa-fw"></i> Dashboard</Link>
                                </li>
                                <li id="userinfo">
                                    <a href="#user" data-toggle="collapse" data-parent="#userinfo"><i className="fa fa-users"></i> User's Information<span className="fa arrow"></span></a>
                                    <ul className="nav nav-second-level collapse" id="user">
                                        <li>
                                            <Link to="/User">List of User</Link>
                                        </li>
                                        <li>
                                            <Link to="/Invoice">User's Payment</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li id="productcat">
                                    <a href="#product" data-toggle="collapse" data-parent="#productcat"><i className="fa fa-th-list"></i> Product and Category<span className="fa arrow"></span></a>
                                    <ul className="nav nav-second-level collapse" id="product">
                                        <li>
                                            <Link to="/Category">Category List</Link>
                                        </li>
                                        <li>
                                            <Link to="/Product">Product List</Link>
                                        </li>
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
export default Navbar;