import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';
import $ from 'jquery';

const cookies = new Cookies();

class Cart extends Component
{
    state =
    {
        detailCart: [],
        subPrice: [],
        fullname: '',
        address: '',
        phone: '',
        defadd: false,
        chooseitem: ['Your Cart is Empty'],
        devMethod: [],
        devPrice: 0,
        grandTotal: 0,
    }

    componentWillMount = () =>
    {
        var self = this;
        $(document).ready(() => {
            // code to read selected table row cell data (values).
            $("#myTable").on('click','.btnDel', function() {
                // get the current row
                var currentRow = $(this).closest("tr"); 
                var col1 = currentRow.attr('nilai');
                
                // console.log(col1);
                axios.post('http://localhost:3001/Delcart', {
                    cartID: col1
                }).then((response) => {
                    if (response)
                    {
                        var userID = cookies.get('sessionID');
                        axios.post('http://localhost:3001/Cart', {
                            UserID: userID
                        })
                        .then((response) => 
                        {
                            var takeData = response.data[0];
                            var subprice = response.data[1];
                            // console.log(takeData);
                            // console.log(subprice);
                            self.setState({
                                detailCart: takeData,
                                subPrice: subprice
                            })
                            // console.log(this.state.detailCart)
                        })
                    }
                })
           });
        });
    };
    // to delete cart item and update the data

    componentDidMount = () =>
    {
        var self = this;
        var userID = cookies.get('sessionID');
        if (cookies.get('sessionID') !== undefined)
        {
            axios.post('http://localhost:3001/Cart', {
                UserID: userID
            })
            .then((response) => 
            {
                console.log(response.data)
                var takeData = response.data[0];
                var subprice = response.data[1];
                // console.log(takeData);
                // console.log(subprice);
                self.setState({
                    detailCart: takeData,
                    subPrice: subprice
                })
                // console.log(typeof(subprice))
                // console.log(this.state.detailCart)
            })
            // to take the cart data

            axios.get('http://localhost:3001/Cart')
            .then((response) => {
                var devMeth = response.data;
                // console.log(devMeth);
                self.setState({
                    devMethod: devMeth
                })
            })
            // to take the delivery method
        }
    }

    changeQty = (e, id) =>
    {
        // console.log(e)
        // console.log(id)
        var userID = cookies.get('sessionID');
        axios.post('http://localhost:3001/updateCart', {
            QtyNew: e,
            cartID: id,
            userID: userID
        }).then((respon) => {
            var retakeCart = respon.data[0];
            var subprice = respon.data[1];
            // console.log(takeData);
            // console.log(subprice);
            this.setState({
                detailCart: retakeCart,
                subPrice: subprice
            })
        })
    }
    // to change item cart quantity and upload it into database

    check = () =>
    {
        var self = this;
        if (document.getElementById("checked").checked === true)
        {
            // console.log('checked')
            var userID = cookies.get('sessionID');
            axios.post('http://localhost:3001/Defaultaddress', {
                UserID: userID
            })
            .then((response) => 
            {
                var takeData = response.data[0];
                // console.log(takeData);
                self.setState({
                    fullname: takeData.fullname,
                    address: takeData.address,
                    phone: takeData.phone,
                    defadd: true
                })
            })
        }
        else
        {
            self.setState({
                fullname: '',
                address: '',
                phone: '',
                defadd: false
            })
        }
    }
    // to take default address if users want to use their address that store in their userprofile

    delivery = () =>
    {
        var e = document.getElementById("delivery");
        var deliveryID = e.options[e.selectedIndex].value;
        deliveryID = parseInt(deliveryID, 10)
        var listDev = this.state.devMethod

        for (var i=0; i<listDev.length; i++)
        {
            var devID = listDev[i].id
            var devPrice = listDev[i].price
            if (deliveryID === devID) 
            {   
                this.setState({
                    devPrice: devPrice
                })
                break;
            }
            else if (deliveryID === 0)
            {
                this.setState({
                    devPrice: 0
                })
                break;
            }
        }
    }
    // to display selected delivery method price

    grandtots = () =>
    {
        var Alltotal = 0;
        var listPrice = this.state.subPrice

        for (var i=0; i<listPrice.length; i++)
        {
            Alltotal = Alltotal + listPrice[i].tot_sub_price
        }
        this.setState({
            grandTotal: Alltotal + this.state.devPrice
        })
        console.log(Alltotal + this.state.devPrice)
    }
    // for grandtotal

    render()
    {
        if (cookies.get('sessionID') === undefined)
        {
            return <Redirect to='/Login'/>
        }
        // to check if the users already login or not

        const noItem = this.state.chooseitem.map((item, index) => {
            return <tr key={index}>
                    <td colSpan='5' className="text-center" style={{fontSize:30}}>{item}</td>
                </tr>
        })
        // to display info if the cart is empty

        const cartList = this.state.detailCart.map((item, index) =>
        {
            var cartID = item.id
            var prodName = item.prodName;
            var prodQty = item.qty;
            var prodPrice = item.prodPrice;
            var subtotal = this.state.subPrice;

            for (var i=0; i<subtotal.length; i++)
            {
                // console.log(subtotal[i].id)
                if (subtotal[i].id === cartID)
                {
                    var subTotPrice = subtotal[i].tot_sub_price
                }
            }

            return <tr key={index} nilai={cartID}>
                    <td>{prodName}</td>
                    <td className="text-center"><strong>{prodPrice}</strong></td>
                    <td>
                        <center style={{marginTop:15}}>
                            <input className="text-center styleproddet" ref="qty" type="number" min={1} defaultValue={prodQty} onChange={(e) => this.changeQty(e.target.value, cartID)}/>&nbsp;
                        </center>
                    </td>
                    <td className="text-right"><strong>{subTotPrice}</strong></td>
                    <td className="text-center">
                        <button type="button" className="btn btn-danger btnDel">
                            <span className="fa fa-trash-alt"></span>
                        </button>
                    </td>
                </tr>
        })
        // for mapping the cart list

        const cartLength = cartList.length
        // console.log(cartLength)

        const devList = this.state.devMethod.map((item, index) =>
        {
            var devID = item.id
            var devName = item.method;

            return <option key={index} value={devID}>{devName}</option>
        })
        // for mapping the delivery method
        
        return (
            <div id="homeback">
               <div className="container padbot padtop">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h3><strong>My Cart</strong></h3>
                                </div>
                                <div className="panel-body">
                                    <div className="table-responsive">
                                        <table className="table table-hover" id="myTable">
                                            <thead>
                                                <tr>
                                                    <th>Product</th>
                                                    <th className="text-center">Price (IDR)</th>
                                                    <th className="text-center">Quantity</th>
                                                    <th className="text-right">Sub-Total</th>
                                                    <th className="text-center">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {(cartLength === 0) ? noItem : cartList}
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td><b>Shipped to</b></td>
                                                    <td>
                                                        <label className="checkbox-inline">
                                                            <input type="checkbox" id="checked" onChange={this.check}/> Default Address
                                                        </label>
                                                    </td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td><input type="text" className="form-control text-left" defaultValue={this.state.fullname} disabled={this.state.defadd} placeholder="Full Name"/></td>
                                                    <td><input type="text" className="form-control text-left" defaultValue={this.state.address} disabled={this.state.defadd} placeholder="Address"/></td>
                                                    <td><input type="text" className="form-control text-left" defaultValue={this.state.phone} disabled={this.state.defadd} placeholder="Phone Number"/></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td><b>Delivery Method</b></td>
                                                    <td></td>
                                                    <td className="text-right">
                                                        <select id="delivery" onChange={this.delivery}>
                                                            <option value={0}>Choose one</option>
                                                            {devList}
                                                        </select>
                                                    </td>
                                                    <td className="text-right"><b>{this.state.devPrice}</b></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td><b>Payment Method</b></td>
                                                    <td><input type="radio" name="bank" style={{verticalAlign:'top'}}/> BNI - 5264-2227-3113-6537</td>
                                                    <td><input type="radio" name="bank" style={{verticalAlign:'top'}}/> Mandiri - 4097-6631-0869-3632</td>
                                                    <td className="text-right">
                                                    </td>
                                                    <td></td>
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
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td>
                                                        <Link to="/Productlist">
                                                            <button type="button" className="btn btn-primary">
                                                                <span className="fa fa-shopping-cart"></span> Save Changes and Continue Shopping
                                                            </button>
                                                        </Link>
                                                    </td>
                                                    <td className="text-right">
                                                        <Link to="/Checkout">
                                                            <button type="button" className="btn btn-success">
                                                                Checkout <span className="fa fa-play"></span>
                                                            </button>
                                                        </Link>
                                                    </td>
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
            </div>
        );
    }
}
export default Cart;