import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';

import Navbar from './Navbar';

const cookies = new Cookies();

class BeingProcess extends Component
{
    state =
    {
        fullname: '',
        address: '',
        phone: '',
        devMeth: '',
        devPrice: '',
        paymentMeth: '',
        grandTotal: '',
        orderDate: '',
        orderID: '',
        listUnpaid: []
    }

    componentWillMount = () =>
    {
        var userID = cookies.get('sessionID');
        var orderID = this.props.location.state.orderID;

        if (userID !== undefined)
        {
            axios.post('http://localhost:3001/UnpaidView',
            {
                orderID: orderID
            })
            .then((response) =>
            {
                // console.log(response.data)
                var results = response.data
                var length = results.length

                if (length !== 0)
                {
                    var GT = 0;
                    for (var i in results) GT = GT + results[i].subtotal

                    this.setState({
                        listUnpaid: results,
                        fullname: results[0].ship_name,
                        address: results[0].ship_add,
                        phone: results[0].ship_phone,
                        paymentMeth: results[0].bank,
                        devMeth: results[0].dev_meth,
                        devPrice: results[0].dev_price,
                        grandTotal: results[0].dev_price + GT,
                        orderDate: results[0].orderDate,
                        orderID: 'OI_' + results[0].orderID
                    })
                }
            })
        }
    }
    // to pull being process item

    render()
    {
        if (cookies.get('sessionID') === undefined) return <Redirect to='/Login'/>
        // to check if the users already login or not

        const UnpaidList = this.state.listUnpaid.map((item, index) =>
        {
            var checkoutID = item.id // idcheckout
            var prodName = item.prod_name;
            var prodPrice = item.prod_price;
            var prodQty = item.quantity;
            var subtotal = item.subtotal;

            return <tr key={index} nilai={checkoutID}>
                    <td>{prodName}</td>
                    <td className="text-center"><strong>{prodPrice}</strong></td>
                    <td>
                        <input type="number" className="form-control text-center" id="number1" value={prodQty} disabled/>
                    </td>
                    <td className="text-right"><strong>{subtotal}</strong></td>
                </tr>
        })
        // for mapping the Unpaid list

        return (
            <div id="backcoloradm">
            <Navbar/>
                <div id="wrapper">
                    <div id="page-wrapper" style={{paddingTop:20, paddingBottom:1}}>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h2><strong>Order Summary - Unpaid Item</strong></h2>
                            </div>
                            <div className="panel-body">
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th className="text-center">Price (IDR)</th>
                                                <th className="text-center">Quantity</th>
                                                <th className="text-right">SubTotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {UnpaidList}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td><b>Shipped to</b></td>
                                                <td><input type="text" className="form-control text-left" id="" value={this.state.fullname} placeholder="Full Name" disabled/></td>
                                                <td><input type="text" className="form-control text-left" id="" value={this.state.address} placeholder="Address" disabled/></td>
                                                <td><input type="number" className="form-control text-left" id="" value={this.state.phone} placeholder="Phone Number" disabled/></td>
                                            </tr>
                                            <tr>
                                                <td><b>Delivery Method</b></td>
                                                <td></td>
                                                <td className="text-right">
                                                    {this.state.devMeth}
                                                </td>
                                                <td className="text-right"><b>{this.state.devPrice}</b></td>
                                            </tr>
                                            <tr>
                                                <td><b>Payment Method</b></td>
                                                <td></td>
                                                <td></td>
                                                <td className="text-right">
                                                    {this.state.paymentMeth}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><b>Date Order</b></td>
                                                <td></td>
                                                <td></td>
                                                <td className="text-right"><b>{this.state.orderDate}</b></td>
                                            </tr>
                                            <tr>
                                                <td><b>Order ID</b></td>
                                                <td></td>
                                                <td></td>
                                                <td className="text-right"><b>{this.state.orderID}</b></td>
                                            </tr>
                                            <tr>
                                                <td><b>Expiry Date</b></td>
                                                <td></td>
                                                <td></td>
                                                <td className="text-right"><b>Belom Diganti</b></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td className="text-right">
                                                    <h4>Total</h4>
                                                </td>
                                                <td className="text-right">
                                                    <h4>{this.state.grandTotal}</h4>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <Link to="/Invoice">
                                                        <button className="btn btn-primary">
                                                            <span className="fa fa-arrow-left">&nbsp;&nbsp;</span>User's Payment
                                                        </button>
                                                    </Link>
                                                </td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


                            




        );
    }
}
export default BeingProcess;