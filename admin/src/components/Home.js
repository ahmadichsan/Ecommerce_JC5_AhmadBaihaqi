import React, { Component } from 'react';
import Navbar from './Navbar';
import Cookies from 'universal-cookie';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

const cookies = new Cookies();

class Dashboard extends Component
{
    state =
    {
        numberofUser: 0,
        numberofSales: 0,
        numberofOrder: 0,
        grossIncome: 0
    }
    componentWillMount = () =>
    {
        axios.get('http://localhost:3001/numberofSales')
        .then((respon) => 
        {
            var hasil = respon.data[0].transactionCount
            console.log(hasil)
            this.setState({
                numberofSales: hasil
            })
        })
        // to view user with most order

        axios.get('http://localhost:3001/numberofOrder')
        .then((respon) => 
        {
            var hasil = respon.data[0].number_order
            console.log(hasil)
            this.setState({
                numberofOrder: hasil
            })
        })

        axios.get('http://localhost:3001/numberofUsers')
        .then((respon) => 
        {
            var hasil = respon.data[0].number_user
            console.log(hasil)
            this.setState({
                numberofUser: hasil
            })
        })

        axios.get('http://localhost:3001/grossIncome')
        .then((respon) => 
        {
            var hasil = respon.data[0].gross_income
            console.log(hasil)
            this.setState({
                grossIncome: hasil
            })
        })



    }
    // admin report

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
                                <div className="panel panel-green">
                                    <div className="panel-heading">
                                        <div className="row">
                                            <div className="col-xs-3">
                                                <i className="fa fa-dollar-sign fa-5x"></i>
                                            </div>
                                            <div className="col-xs-9 text-right">
                                                <div className="huge">{this.state.grossIncome}</div>
                                                <div>Gross Income</div>
                                            </div>
                                        </div>
                                    </div>
                                    <Link to="/Invoice">
                                        <div className="panel-footer">
                                            <span className="pull-left">View Details</span>
                                            <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                            <div className="clearfix"></div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="panel panel-primary">
                                    <div className="panel-heading">
                                        <div className="row">
                                            <div className="col-xs-3">
                                                <i className="fa fa-users fa-5x"></i>
                                            </div>
                                            <div className="col-xs-9 text-right">
                                                <div className="huge">{this.state.numberofUser}</div>
                                                <div>Total Users</div>
                                            </div>
                                        </div>
                                    </div>
                                    <Link to="/User">
                                        <div className="panel-footer">
                                            <span className="pull-left">View Details</span>
                                            <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                            <div className="clearfix"></div>
                                        </div>
                                    </Link>
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
                                                <div className="huge">{this.state.numberofOrder}</div>
                                                <div>New Order!</div>
                                            </div>
                                        </div>
                                    </div>
                                    <Link to="/Invoice">
                                        <div className="panel-footer">
                                            <span className="pull-left">View Details</span>
                                            <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                            <div className="clearfix"></div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="panel panel-yellow">
                                    <div className="panel-heading">
                                        <div className="row">
                                            <div className="col-xs-3">
                                                <i className="fa fa-check-circle fa-5x"></i>
                                            </div>
                                            <div className="col-xs-9 text-right">
                                                <div className="huge">{this.state.numberofSales}</div>
                                                <div>Total Sales!</div>
                                            </div>
                                        </div>
                                    </div>
                                    <Link to="/Invoice">
                                        <div className="panel-footer">
                                            <span className="pull-left">View Details</span>
                                            <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                            <div className="clearfix"></div>
                                        </div>
                                    </Link>
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