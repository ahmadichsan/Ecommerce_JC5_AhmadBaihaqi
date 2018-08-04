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
        nums: 0,
        detailCart: [],
        status: 0,
        operation: '',
        fullname: '',
        address: '',
        phone: '',
        defadd: false,
        chooseitem: ['Your Cart is Empty'],
        devMethod: [],
        devPrice: 0,
        grandTotal: 0
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
                            var takeData = response.data;
                            // console.log(takeData);
                            self.setState({
                                detailCart: takeData
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
        var userID = cookies.get('sessionID');
        axios.post('http://localhost:3001/Cart', {
            UserID: userID
        })
        .then((response) => 
        {
            var takeData = response.data;
            // console.log(takeData);
            this.setState({
                detailCart: takeData
            })
            // console.log(this.state.detailCart)
        })
        axios.get('http://localhost:3001/Cart')
        .then((response) => {
            var devMeth = response.data;
            // console.log(devMeth);
            this.setState({
                devMethod: devMeth
            })
        })
    }
    // to take the cart data

    increment = (val) => 
    {  
        this.setState({
            nums: this.state.nums + 1,
            status: val,
            operation: 'increment'
        })
    }
      
    decrement = (val) => 
    {  
        this.setState({
            nums: this.state.nums - 1,
            status: val,
            operation: 'decrement'
        })
    }

    handleChange = (e) =>
    {
        this.setState({
            nums: e.target.value
        })
    }

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
        // console.log('asd')
        var e = document.getElementById("delivery");
        var deliveryID = e.options[e.selectedIndex].value;
        deliveryID = parseInt(deliveryID, 10)
        // console.log(deliveryID)
        var listDev = this.state.devMethod

        for (var i=0; i<listDev.length; i++)
        {
            var devID = listDev[i].id
            var devPrice = listDev[i].price
            if (deliveryID === devID)
            {
                // console.log(devID)
                // console.log(typeof(devID))
                // console.log(typeof(deliveryID))
                this.setState({
                    devPrice: devPrice
                })
                break;
            }
            else
            {
                this.setState({
                    devPrice: 0
                })
            }
        }
    }
    // to display selected delivery method price

    grandtots = () =>
    {
        var totalAllItem = 0;
        var totPrice = [];
        this.state.detailCart.map((item, index) =>
        {
            // var cartID = item.id
            var prodPrice = item.prodPrice;
            var prodQty = item.qty;

            var totprice = prodPrice * prodQty
            totalAllItem = totalAllItem + totprice

            if (index === this.state.detailCart.length - 1) totPrice.push(totalAllItem)
            return totPrice
            // console.log(totalAllItem)
        })
        // console.log(totPrice[0])
        var totalAkhir = totPrice[0] + this.state.devPrice
        console.log(totalAkhir)
    }

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
            var prodPrice = item.prodPrice;
            var prodQty = item.qty;
            
            if (this.state.status === index)
            {
                prodQty = item.qty + this.state.nums;
            }

            // if (this.state.status === index && this.state.operation === 'increment')
            // {
            //     prodQty = item.qty + 1;
            // }
            // else if (this.state.status === index && this.state.operation === 'decrement')
            // {
            //     prodQty = item.qty - 1;
            // }

            var totprice = prodPrice * prodQty

            return <tr key={index} nilai={cartID}>
                    <td>{prodName}</td>
                    <td className="text-center"><strong>{prodPrice}</strong></td>
                    <td>
                        <center style={{marginTop:15}}>
                            <button className="btn btn-danger" onClick={() => this.decrement(index)}><i className="fa fa-minus"></i></button>&nbsp;
                            <input className="text-center styleproddet" ref="qty" type="number" value={(prodQty < 0) ? 0 : prodQty} onChange={this.handleChange}/>&nbsp;
                            <button className="btn btn-success" onClick={() => this.increment(index)}><i className="fa fa-plus"></i></button><br/><br/>
                        </center>
                    </td>
                    <td className="text-right"><strong>{totprice}</strong></td>
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
        // for mapping the dev=livery method

        // var totalAllItem = 0;
        // var totPrice = [];
        // this.state.detailCart.map((item, index) =>
        // {
        //     // var cartID = item.id
        //     var prodPrice = item.prodPrice;
        //     var prodQty = item.qty;

        //     var totprice = prodPrice * prodQty
        //     totalAllItem = totalAllItem + totprice

        //     if (index === this.state.detailCart.length - 1) totPrice.push(totalAllItem)
        //     return totPrice
        //     // console.log(totalAllItem)
        // })
        // // console.log(totPrice[0])
        // var totalAkhir = totPrice[0] + this.state.devPrice

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
                                                            <option>Choose one</option>
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
                                                        {/* <h3>{totalAkhir}</h3> */}
                                                        <span onCompositionUpdate={this.grandtots}>asd</span>
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