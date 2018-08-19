import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';

const cookies = new Cookies();
var userID = cookies.get('sessionID')

class Checkout extends Component
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
        listCheckout: [],
        redirect: false,
        redirectConfirm: false
    }

    componentWillMount = () =>
    {
        if (userID !== undefined)
        {
            axios.post('http://localhost:3001/CheckoutComp',
            {
                userID: userID
            })
            .then((response) =>
            {
                console.log(response.data)
                var results = response.data
                var length = results.length

                if (length !== 0)
                {
                    var GT = 0;
                    for (var i in results) GT = GT + results[i].subtotal

                    this.setState({
                        listCheckout: results,
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
    // to pull checkout item

    cancelOrder = () =>
    {
        // console.log(checkoutList)
        axios.post('http://localhost:3001/cancelOrder',
        {
            userID: userID
        })
        .then((response) =>
        {
            // console.log(response.data)
            var results = response.data
            // console.log(results)
            if (results === 1)
            {
                this.setState({
                    redirect: true
                })
            }
        })
    }
    // to cancel the current order

    confirmPayment = () =>
    {
        axios.post('http://localhost:3001/confirmPayment',
        {
            userID: userID
        })
        .then((response) =>
        {
            // console.log(response.data)
            var results = response.data
            console.log(results)
            if (results === 1)
            {
                this.setState({
                    redirectConfirm: true
                })
            }
        })
    }

    render()
    {
        if (userID === undefined) return <Redirect to='/Login'/>
        // to check if the users already login or not
        if (this.state.redirect) return <Redirect to="/Cart"/>
        // if user cancel the order
        if (this.state.redirectConfirm) return <Redirect to="/Paymenthis"/>
        // if user confirm payment

        const checkoutList = this.state.listCheckout.map((item, index) =>
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
        // for mapping the cart list

        return (
            <div id="homeback">
                <div className="container padbot padtop">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h3><strong>Order Summary - Checkout</strong></h3>
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
                                                {checkoutList}
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td><b>Shipped to</b></td>
                                                    <td><input type="text" className="form-control text-left" id="" value={this.state.fullname} placeholder="Full Name" disabled/></td>
                                                    <td><input type="text" className="form-control text-left" id="" value={this.state.address} placeholder="Address" disabled/></td>
                                                    <td><input type="number" className="form-control text-left" id="" value={this.state.phone} placeholder="Phone Number" disabled/></td>
                                                    <td></td>
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
                                                    <td>
                                                        <h3>Total</h3>
                                                    </td>
                                                    <td className="text-right">
                                                        <h3>{this.state.grandTotal}</h3>
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
                                                            <button onClick={this.cancelOrder} type="button" className="btn btn-danger">
                                                                <span className="fa fa-times"></span> Cancel Order
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="text-right">
                                                        <button onClick={this.confirmPayment} type="button" className="btn btn-success">
                                                            Confirm Payment <span className="fa fa-play"></span>
                                                        </button>
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