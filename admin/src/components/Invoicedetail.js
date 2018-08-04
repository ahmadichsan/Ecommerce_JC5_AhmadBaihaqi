import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';

const cookies = new Cookies();

class Invoicedetail extends Component
{
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
                            <div className="col-xs-12">
                                <div className="text-center">
                                    <h2>Invoice for Order ID 2018052122</h2>
                                </div>
                                <hr/>
                                <div className="row">
                                    <div className="col-xs-12 col-md-3 pull-left">
                                        <div className="panel panel-default height">
                                            <div className="panel-heading">Billed to</div>
                                            <div className="panel-body">
                                                <strong>John Tor:</strong><br/>
                                                Sabeni Street,<br/>
                                                Melati Garden Sub-Districts,<br/>
                                                Brother Land Districts,<br/>
                                                <strong>No. 99</strong><br/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-12 col-md-3">
                                        <div className="panel panel-default height">
                                            <div className="panel-heading">Shipped to</div>
                                            <div className="panel-body">
                                                <strong>John Tor:</strong><br/>
                                                Sabeni Street,<br/>
                                                Melati Garden Sub-Districts,<br/>
                                                Brother Land Districts,<br/>
                                                <strong>No. 99</strong><br/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-12 col-md-3">
                                        <div className="panel panel-default height">
                                            <div className="panel-heading">Payment Information</div>
                                            <div className="panel-body">
                                                <strong>Payment Method:</strong> Go-Pay<br/>
                                                <strong>Phone Number:</strong> 081310823820<br/>
                                                <strong>Payment Date:</strong> 20180521<br/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-12 col-md-3 pull-right">
                                        <div className="panel panel-default height">
                                            <div className="panel-heading">Order Information</div>
                                            <div className="panel-body">
                                                <strong>Order Date:</strong> 20180521<br/>
                                                <strong>Express Delivery:</strong> Yes<br/>
                                                <strong>Delivered by:</strong> Go-Send<br/>
                                                <strong>Insurance:</strong> No<br/>
                                                <strong>Coupon:</strong> Mei Ceria<br/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h3 className="panel-title"><strong>Order summary</strong></h3>
                                    </div>
                                    <div className="panel-body">
                                        <div className="table-responsive">
                                            <table className="table table-condensed">
                                                <thead>
                                                    <tr>
                                                        <td><strong>Item</strong></td>
                                                        <td className="text-center"><strong>Price<br/>(IDR)</strong></td>
                                                        <td className="text-center"><strong>Quantity</strong></td>
                                                        <td className="text-right"><strong>Totals</strong></td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Pony Horse Cake</td>
                                                        <td className="text-center">250000</td>
                                                        <td className="text-center">1</td>
                                                        <td className="text-right">250000</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Superman Cupcakes</td>
                                                        <td className="text-center">40000</td>
                                                        <td className="text-center">3</td>
                                                        <td className="text-right">120000</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Wedding Cake</td>
                                                        <td className="text-center">2000000</td>
                                                        <td className="text-center">1</td>
                                                        <td className="text-right">2000000</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="thick-line"></td>
                                                        <td className="thick-line"></td>
                                                        <td className="thick-line text-left"><strong>Subtotal</strong></td>
                                                        <td className="thick-line text-right">2370000</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="no-line"></td>
                                                        <td className="no-line"></td>
                                                        <td className="no-line text-left"><strong>Shipping</strong></td>
                                                        <td className="no-line text-right">100000</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="no-line"></td>
                                                        <td className="no-line"></td>
                                                        <td className="no-line text-left"><strong>Total</strong></td>
                                                        <td className="no-line text-right">2470000</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div>
                                            <Link to="/Invoice">
                                                <button className="btn btn-primary pull-left"><span className="fa fa-arrow-left">&nbsp;&nbsp;</span>to User's Invoice History</button>    
                                            </Link>
                                            <button className="btn btn-success pull-right">DOWNLOAD PDF</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Invoicedetail;