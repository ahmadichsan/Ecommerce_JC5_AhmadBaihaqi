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
        paymentMeth: '',
        redirect: false,
        isCheckout: <br/>
    }

    componentWillMount = () =>
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
                // console.log(response.data)
                // console.log(response.data[0].length)
                // console.log(response.data[0][0].checkoutstat_id)
                var totalCart = response.data[0].length
                if (totalCart > 0)
                {
                    var takeData = response.data[0]; // contain list of item in cart based on userID
                    var subprice = response.data[1]; // contain price per cart ID based on userID
                    var statusout = response.data[0][0].checkoutstat_id 
                    // it totalcart > 0 to make sure that var statusout will work if there is at least one item
                    // in the cart list that ordered by the user
                    if (statusout === 2)
                    {
                        self.setState({
                            detailCart: takeData,
                            subPrice: subprice
                        })
                    }
                    // statusout === 2 means that the user still in the cart/cancel checkout and go back to cart
                    
                    else if (statusout !== 2)
                    {
                        self.setState({
                            detailCart: []
                        })
                    }
                    // statusout !== 2 (which mean change to 1)
                    // means that the user move to checkout but the cart item not remove yet from table
                    // cart item will change status again when user finish the payment
                    // (click confirm payment and accepted by admin)

                    var Alltotal = 0;
                    var listPrice = this.state.subPrice
                    for (var i=0; i<listPrice.length; i++)
                    {
                        Alltotal = Alltotal + listPrice[i].tot_sub_price
                    }
                    // looping to sum the total price of the all item
                    this.setState({
                        grandTotal: Alltotal
                    })
                    // initial grandtotal before select the delivery method
                }
                else
                {
                    // if there is no item in the cart list, then it will stay as an empty state in array type
                    self.setState({
                        detailCart: []
                    })
                }
            })
            // to take the cart data

            axios.get('http://localhost:3001/Cart')
            .then((response) => {
                var devMeth = response.data;
                self.setState({
                    devMethod: devMeth
                })
            })
            // to take the delivery method list
        }
        // this if (cookies) to avoid warning if user not login but try to access cart.
        // Redirect is work, but this if just to remove the warning
        // if the if wasn't removed, component did mount will work but the component not mounted, so it cause warning
    }

    delete = (val) =>
    {
        var self = this;
        axios.post('http://localhost:3001/Delcart', {
            cartID: val
        }).then((response) => 
        {
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
                    
                    self.setState({
                        detailCart: takeData,
                        subPrice: subprice
                    })
                    // to get the updated data after an item was deleted

                    var Alltotal = 0;
                    var listPrice = this.state.subPrice
                    for (var i=0; i<listPrice.length; i++)
                    {
                        Alltotal = Alltotal + listPrice[i].tot_sub_price
                    }

                    self.setState({
                        grandTotal: Alltotal + this.state.devPrice
                    })
                    // to update the grand total after an item deleted from the cart
                })
            }
        })
    };
    // delete cart item and update the data

    changeQty = (e, id) =>
    {
        var userID = cookies.get('sessionID');
        axios.post('http://localhost:3001/updateCart', {
            QtyNew: e,
            cartID: id,
            userID: userID
        }).then((respon) => {
            var retakeCart = respon.data[0];
            var subprice = respon.data[1];

            this.setState({
                detailCart: retakeCart,
                subPrice: subprice
            })
            // update the data cart item and each sub total after the qty of an item was changed

            var Alltotal = 0;
            var listPrice = this.state.subPrice
            for (var i=0; i<listPrice.length; i++)
            {
                Alltotal = Alltotal + listPrice[i].tot_sub_price
            }
            
            this.setState({
                grandTotal: Alltotal + this.state.devPrice
            })
            // update the grandtotal after the qty of an item in cart was changed
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
                // this function is to take the user info for default address (for shipping)

                $(document).ready(() => {
                    $('#fullname').val(this.state.fullname);
                    $('#address').val(this.state.address);
                    $('#phone').val(this.state.phone);
                })
                // if the input already inputed with some value, then the checkbox clicked, the remain value will change
                // with the default address value. If function above not exist, the setState can't replace the remain
                // value
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
            // if the checkbox uncheck

            $(document).ready(() => {
                $('#fullname').val(this.state.fullname);
                $('#address').val(this.state.address);
                $('#phone').val(this.state.phone);
            })
            // if the input already inputed with some value, then the checkbox clicked, the remain value will change
            // with the default setState value. If function above not exist, the setState can't replace the remain
            // value
        }
    }
    // to take default address if users want to use their address that store in their userprofile

    delivery = () =>
    {
        var e = document.getElementById("delivery");
        var deliveryID = e.options[e.selectedIndex].value; // take the value from the selected method option
        deliveryID = parseInt(deliveryID, 10); // 10 means radix parameter
        var listDev = this.state.devMethod;
        // this.state.devMethod is an array contain the delivery method, its ID and its price

        for (var i=0; i<listDev.length; i++)
        {
            var devID = listDev[i].id
            var devPricechange = listDev[i].price
            if (deliveryID === devID)
            {   
                var devPrice = devPricechange
            }
            else if (deliveryID === 0)
            {
                devPrice = 0
            }
        }
        // loop delivery method, selected method then create var which contain the price of the method

        var Alltotal = 0;
        var listPrice = this.state.subPrice
        for (var j=0; j<listPrice.length; j++)
        {
            Alltotal = Alltotal + listPrice[j].tot_sub_price
        }
        // to get the total price of all item
        
        this.setState({
            grandTotal: Alltotal + devPrice,
            devPrice: devPrice
        })
        // grandTotal is the total price of all item plus the delivery cost
        // devPrice is the price of the selected delivery method
    }
    // to display selected delivery method price

    selectPayment = (e) =>
    {
        // console.log(e.target.value);
        var selectedPayment = e.target.value
        if (selectedPayment === '1')
        {
            this.setState({
                paymentMeth: 'BNI - 5264-2227-3113-6537'
            })
        }
        else if (selectedPayment === '2')
        {
            this.setState({
                paymentMeth: 'Mandiri - 4097-6631-0869-3632'
            })
        }
    }
    // take payment method that will be sent to checkout table

    checkout = (val) =>
    {
        var recieveby = val.fullname.value;
        var recieveAdd = val.address.value;
        var recievePhone = val.phone.value;
        var idDelivery = val.delivery.value;
        var userID = cookies.get('sessionID');
        var checkoutstats = 1;
        var methPay = this.state.paymentMeth;
        var devPayPrice = this.state.devPrice;
        var listCart = this.state.detailCart;
        var listSubtot = this.state.subPrice;
        var cartItemLength = listCart.length;
        // console.log(val.fullname.value)
        // console.log(val.address.value)
        // console.log(val.phone.value)
        // console.log(this.state.grandTotal)
        // console.log(cookies.get('sessionID'))
        // console.log(checkoutstats)
        
        $(document).ready(() => 
        {
            var choosenDelivery = $("#delivery option:selected").text();
            // console.log(choosenDelivery)
            if (idDelivery !== '0' && cartItemLength > 0 && recieveby !== '' 
            && recieveAdd !== '' && recievePhone !== '' && methPay !== '') // if user already choose the delivery method, then checkout
            {
                axios.post('http://localhost:3001/Checkout', 
                {
                    fullname: recieveby,
                    address: recieveAdd,
                    phone: recievePhone,
                    userID: userID,
                    deliveryMethod: choosenDelivery, // delivery method
                    statusCheckout: checkoutstats,
                    methPay: methPay,
                    devPayPrice: devPayPrice,
                    listCart: listCart,
                    listSubtot: listSubtot
                })
                .then((respon) =>
                {
                    var response = respon.data;
                    if (response === 1)
                    {
                        this.setState({
                            redirect: true
                        })
                        // console.log('hasilnya')
                    }
                    else if (response === -1)
                    {
                        this.setState({
                            isCheckout: `You have an unpaid item. Please finish the payment first.
                            Otherwise, you have to cancel your order in your payment history, then edit your cart.`
                        })
                    }
                })
            }
        })
    }

    render()
    {
        if (cookies.get('sessionID') === undefined) return <Redirect to='/Login'/>
        // to check if the users already login or not

        if (this.state.redirect) return <Redirect to="/Checkout"/>
        // if checkout success, then redirect to checkout page

        const noItem = this.state.chooseitem.map((item, index) => 
        {
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
                if (subtotal[i].id === cartID)
                {
                    var subTotPrice = subtotal[i].tot_sub_price
                }
            }
            // to match the subtotal price with the item (this.state.subPrice contain the id of Cart and the subtotal per cartID)

            return <tr key={index}>
                    <td>{prodName}</td>
                    <td className="text-center"><strong>{prodPrice}</strong></td>
                    <td>
                        <center style={{marginTop:15}}>
                            <input className="text-center styleproddet" ref="qty" type="number" min={1}
                            defaultValue={prodQty} onChange={(e) => this.changeQty(e.target.value, cartID)}/>&nbsp;
                        </center>
                    </td>
                    <td className="text-right"><strong>{subTotPrice}</strong></td>
                    <td className="text-center">
                        <button type="button" className="btn btn-danger btnDel" onClick={() => this.delete(cartID)}>
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
                                    <form>
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
                                                    <td>
                                                        <input type="text" className="form-control text-left" id="fullname" ref="fullname"
                                                        defaultValue={this.state.fullname} disabled={this.state.defadd} placeholder="Full Name"/>
                                                    </td>
                                                    <td>
                                                        <input type="text" className="form-control text-left" id="address" ref="address"
                                                        defaultValue={this.state.address} disabled={this.state.defadd} placeholder="Address"/>
                                                    </td>
                                                    <td>
                                                        <input type="number" className="form-control text-left" id="phone" ref="phone"
                                                        defaultValue={this.state.phone} disabled={this.state.defadd} placeholder="Phone Number"/>
                                                    </td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td><b>Delivery Method</b></td>
                                                    <td></td>
                                                    <td className="text-right">
                                                        <select id="delivery" ref="delivery" onChange={this.delivery}>
                                                            <option value={0}>Choose one</option>
                                                            {devList}
                                                        </select>
                                                    </td>
                                                    <td className="text-right"><b>{this.state.devPrice}</b></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td><b>Payment Method</b></td>
                                                    <td><input type="radio" name="bank" style={{verticalAlign:'top'}} onChange={this.selectPayment} value="1"/> BNI - 5264-2227-3113-6537</td>
                                                    <td><input type="radio" name="bank" style={{verticalAlign:'top'}} onChange={this.selectPayment} value="2"/> Mandiri - 4097-6631-0869-3632</td>
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
                                                        <h3 ref="grandtotal" defaultValue={this.state.grandTotal}>
                                                            {this.state.grandTotal}
                                                        </h3>
                                                    </td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td>
                                                        <Link to="/Productlist">
                                                            <button type="button" className="btn btn-primary">
                                                                <span className="fa fa-shopping-cart"></span> Continue Shopping
                                                            </button>
                                                        </Link>
                                                    </td>
                                                    <td className="text-right">
                                                        <button type="button" className="btn btn-success" onClick={() => this.checkout(this.refs)}>
                                                            Checkout <span className="fa fa-play"></span>
                                                        </button>
                                                    </td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={5}>
                                                        {this.state.isCheckout}
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                        <Link to="/Paymenthis">
                                            <button className="btn btn-primary"><span className="fa fa-arrow-left">&nbsp;&nbsp;</span>to Payment History</button>    
                                        </Link>
                                    </form>
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