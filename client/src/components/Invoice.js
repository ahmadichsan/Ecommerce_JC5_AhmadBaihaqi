import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';

const cookies = new Cookies();

class Invoice extends Component
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
        invoiceID: '',
        listInvoice: []
    }

    componentWillMount = () =>
    {
        var userID = cookies.get('sessionID');
        var INVcode = this.props.location.state.INV;
        if (userID !== undefined)
        {
            axios.post('http://localhost:3001/userInvoice', 
            {
                codeINV: INVcode
                // codeINV: '00001'
            })
            .then((response) => 
            {
                console.log(response.data)
                var results = response.data
                var length = results.length

                if (length !== 0)
                {
                    // that if is to make sure that code below only works
                    // when there is at least one data that sent from servers
                    var GT = 0;
                    for (var i in results) GT = GT + results[i].subtotal

                    var date = results[0].orderDate;
                    var indexT = date.indexOf('T')
                    var orderDate = date.slice(0, indexT)

                    this.setState({
                        listInvoice: results,
                        fullname: results[0].ship_name,
                        address: results[0].ship_add,
                        phone: results[0].ship_phone,
                        paymentMeth: results[0].bank,
                        devMeth: results[0].dev_meth,
                        devPrice: results[0].dev_price,
                        grandTotal: results[0].dev_price + GT,
                        orderDate: orderDate,
                        orderID: 'RC_' + results[0].INV
                    })
                }
            })
        }
    }

    render()
    {
        if (cookies.get('sessionID') === undefined) return <Redirect to='/Login'/>
        // to check if the users already login or not

        const invoiceList = this.state.listInvoice.map((item, index) =>
        {
            var checkoutID = item.id // idcheckout
            var prodName = item.prod_name;
            var prodPrice = item.prod_price;
            var prodQty = item.quantity;
            var subtotal = item.subtotal;

            return <tr key={index} nilai={checkoutID}>
                    <td>{prodName}</td>
                    <td className="text-center"><strong>{prodPrice}</strong></td>
                    <td className="text-center">
                        {prodQty}
                    </td>
                    <td className="text-right"><strong>{subtotal}</strong></td>
                </tr>
        })
        // for mapping the invoice list
        
        return (
            <div id="homeback">
                <div className="container padbot padtop">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h3><strong>Reciept</strong></h3>
                                </div>
                                <div className="panel-body">
                                    <div className="table-responsive">
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th style={{width:200}}>Product</th>
                                                    <th style={{width:200}} className="text-center">Price (IDR)</th>
                                                    <th style={{width:200}} className="text-center">Quantity</th>
                                                    <th style={{width:200}} className="text-right">SubTotal</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {invoiceList}
                                                <tr>
                                                    <td><b>Shipped to</b></td>
                                                    <td className="text-center">{this.state.fullname}</td>
                                                    <td className="text-center">{this.state.address}</td>
                                                    <td className="text-right">{this.state.phone}</td>
                                                </tr>
                                                <tr>
                                                    <td><b>Delivery Method</b></td>
                                                    <td></td>
                                                    <td className="text-center">
                                                        {this.state.devMeth}
                                                    </td>
                                                    <td className="text-right">
                                                        <b>{this.state.devPrice}</b>
                                                    </td>
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
                                                    <td className="text-right">
                                                        <b>{this.state.orderDate}</b>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><b>Reciept Code</b></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td className="text-right">
                                                        <b>{this.state.orderID}</b>
                                                    </td>
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
                                                    <td className="text-center">
                                                        <h3>Total</h3>
                                                    </td>
                                                    <td className="text-right">
                                                        <h3>{this.state.grandTotal}</h3>
                                                    </td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td>
                                                        <Link to="/Paymenthis">
                                                            <button className="btn btn-primary"><span className="fa fa-arrow-left">&nbsp;&nbsp;</span>to Payment History</button>    
                                                        </Link>
                                                    </td>
                                                    <td></td>
                                                    <td></td>
                                                    <td className="text-right">
                                                        <Link to="/Paymenthis">
                                                            <button className="btn btn-success">Download PDF</button>    
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
export default Invoice;