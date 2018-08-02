import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Checkout extends Component
{
    render()
    {
        return (
            <div id="homeback">
                <div className="container padbot padtop">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h3><strong>Order Information</strong></h3>
                                </div>
                                <div className="panel-body">
                                    <div className="table-responsive">
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Product</th>
                                                    <th className="text-center">Price (IDR)</th>
                                                    <th className="text-center">Quantity</th>
                                                    <th className="text-right">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Pony Horse Cake</td>
                                                    <td className="text-center"><strong>250000</strong></td>
                                                    <td>
                                                        <input type="number" className="form-control text-center" id="number1" value="1" disabled/>
                                                    </td>
                                                    <td className="text-right"><strong>250000</strong></td>
                                                </tr>
                                                <tr>
                                                    <td>Wedding Cake</td>
                                                    <td className="text-center"><strong>2000000</strong></td>
                                                    <td>
                                                        <input type="number" className="form-control text-center" id="number2" value="1" disabled/>
                                                    </td>
                                                    <td className="text-right"><strong>2000000</strong></td>
                                                </tr>
                                                
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td><b>Shipped to</b></td>
                                                    <td>
                                                        <label className="checkbox-inline">
                                                            <input type="checkbox" name="" id="" checked disabled/> Default Address
                                                        </label>
                                                    </td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td><input type="text" className="form-control text-left" id="" value="" placeholder="Full Name" disabled/></td>
                                                    <td><input type="text" className="form-control text-left" id="" value="" placeholder="Address" disabled/></td>
                                                    <td><input type="number" className="form-control text-left" id="" value="" placeholder="Phone Number" disabled/></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td><b>Delivery Method</b></td>
                                                    <td></td>
                                                    <td className="text-right">
                                                        <select name="" id="" disabled>
                                                            <option value="">JNE</option>
                                                            <option value="">Go-Send</option>
                                                            <option value="">TIKI</option>
                                                        </select>
                                                    </td>
                                                    <td className="text-right"><b>200000</b></td>
                                                </tr>
                                                <tr>
                                                    <td><b>Payment Method</b></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td className="text-right">
                                                        <select name="" id="" disabled>
                                                            <option value="">Internet Banking</option>
                                                            <option value="">Go-Pay</option>
                                                            <option value="">ATM</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><b>Date Order</b></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td className="text-right"><b>20180526</b></td>
                                                </tr>
                                                <tr>
                                                    <td><b>Order ID</b></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td className="text-right"><b>2018052601</b></td>
                                                </tr>
                                                <tr>
                                                    <td><b>Expiry Date</b></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td className="text-right"><b>20180527</b></td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td>
                                                        <h3>Total</h3>
                                                    </td>
                                                    <td className="text-right">
                                                        <h3>2450000</h3>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <Link to="/Paymenthis">
                                                            <button className="btn btn-primary"><span className="fa fa-arrow-left">&nbsp;&nbsp;</span>to Payment History</button>    
                                                        </Link>
                                                    </td>
                                                    <td></td>
                                                    <td>
                                                        <div>
                                                            <button type="button" className="btn btn-danger">
                                                                <span className="fa fa-times"></span> Cancel Order
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="text-right">
                                                        {/* <Link to="/Invoice">
                                                            <button type="button" className="btn btn-success">
                                                                Confirm Payment <span className="fa fa-play"></span>
                                                            </button>
                                                        </Link> */}
                                                        <Link to="/Paymentfailed">
                                                            <button type="button" className="btn btn-success">
                                                                Confirm Payment <span className="fa fa-play"></span>
                                                            </button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table>
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
export default Checkout;