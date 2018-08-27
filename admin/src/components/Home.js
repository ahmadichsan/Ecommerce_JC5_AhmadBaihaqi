import React, { Component } from 'react';
import Navbar from './Navbar';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const cookies = new Cookies();

class Dashboard extends Component
{
    componentWillMount = () =>
    {
        axios.get('http://localhost:3001/mostOrderUser')
        .then((respon) => 
        {
            var hasil = respon.data
            console.log(hasil)
        })
        // to view user with most order
    }
    render()
    {
        if (cookies.get('adminID') === undefined)
        {
            return <Redirect to='/'/>
        }
        // to check if the admin already login or not

        return (
            <div id="backcoloradm">
            <Navbar/>
                <div id="wrapper">
                    <div id="page-wrapper">
                        <div className="row">
                            <div className="col-lg-12">
                                <h1 className="page-header">Dashboard</h1>
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="col-lg-4 col-md-6">
                                <div className="panel panel-primary">
                                    <div className="panel-heading">
                                        <div className="row">
                                            <div className="col-xs-3">
                                                <i className="fa fa-comments fa-5x"></i>
                                            </div>
                                            <div className="col-xs-9 text-right">
                                                <div className="huge">26</div>
                                                <div>New Mail!</div>
                                            </div>
                                        </div>
                                    </div>
                                    <a href="">
                                        <div className="panel-footer">
                                            <span className="pull-left">View Details</span>
                                            <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                            <div className="clearfix"></div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="panel panel-green">
                                    <div className="panel-heading">
                                        <div className="row">
                                            <div className="col-xs-3">
                                                <i className="fa fa-users fa-5x"></i>
                                            </div>
                                            <div className="col-xs-9 text-right">
                                                <div className="huge">12</div>
                                                <div>New Users!</div>
                                            </div>
                                        </div>
                                    </div>
                                    <a href="">
                                        <div className="panel-footer">
                                            <span className="pull-left">View Details</span>
                                            <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                            <div className="clearfix"></div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="panel panel-yellow">
                                    <div className="panel-heading">
                                        <div className="row">
                                            <div className="col-xs-3">
                                                <i className="fa fa-shopping-cart fa-5x"></i>
                                            </div>
                                            <div className="col-xs-9 text-right">
                                                <div className="huge">124</div>
                                                <div>New Orders!</div>
                                            </div>
                                        </div>
                                    </div>
                                    <a href="">
                                        <div className="panel-footer">
                                            <span className="pull-left">View Details</span>
                                            <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                            <div className="clearfix"></div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Dashboard;