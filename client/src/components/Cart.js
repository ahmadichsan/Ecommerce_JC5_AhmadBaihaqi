import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';

const cookies = new Cookies();

class Cart extends Component
{
    state =
    {
        nums: 0,
        detailCart: []
    }

    componentDidMount = () =>
    {
        var userID = cookies.get('sessionID');
        axios.post('http://localhost:3001/Cart', {
            UserID: userID
        })
        .then((response) => 
        {
            var takeData = response.data;
            console.log(takeData);
            // this.setState({
            //     detprod: response.data[0].hasil,
            // })
        })
    }

    increment = () => 
    {  
        this.setState({
            nums: this.state.nums + 1
        })
    }
      
    decrement = () => 
    {  
        this.setState({
            nums: this.state.nums - 1
        })
        
        if (this.state.nums < 1)
        {
            this.setState({
                nums: 0
            })
        }
    }

    render()
    {
        if (cookies.get('sessionID') === undefined)
        {
            return <Redirect to='/Login'/>
        }

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
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Product</th>
                                                    <th className="text-center">Price (IDR)</th>
                                                    <th className="text-center">Quantity</th>
                                                    <th className="text-right">Total</th>
                                                    <th className="text-center">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Pony Horse Cake</td>
                                                    <td className="text-center"><strong>250000</strong></td>
                                                    <td>
                                                        <center style={{marginTop:15}}>
                                                            <button className="btn btn-danger" onClick={() => this.decrement()}><i className="fa fa-minus"></i></button>&nbsp;
                                                            <input className="text-center styleproddet" ref="qty" type="number" value={this.state.nums}/>&nbsp;
                                                            <button className="btn btn-success" onClick={() => this.increment()}><i className="fa fa-plus"></i></button><br/><br/>
                                                        </center>
                                                    </td>
                                                    <td className="text-right"><strong>250000</strong></td>
                                                    <td className="text-center">
                                                        <button type="button" className="btn btn-danger">
                                                            <span className="fa fa-trash-alt"></span>
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td><b>Shipped to</b></td>
                                                    <td>
                                                        <label className="checkbox-inline">
                                                            <input type="checkbox" name="" id=""/> Default Address
                                                        </label>
                                                    </td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td><input type="text" className="form-control text-left" id="" defaultValue="" placeholder="Full Name"/></td>
                                                    <td><input type="text" className="form-control text-left" id="" defaultValue="" placeholder="Address"/></td>
                                                    <td><input type="number" className="form-control text-left" id="" defaultValue="" placeholder="Phone Number"/></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td><b>Delivery Method</b></td>
                                                    <td></td>
                                                    <td className="text-right">
                                                        <select name="" id="">
                                                            <option defaultValue="">JNE</option>
                                                            <option defaultValue="">Go-Send</option>
                                                            <option defaultValue="">TIKI</option>
                                                        </select>
                                                    </td>
                                                    <td className="text-right"><b>200000</b></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td><b>Payment Method</b></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td className="text-right">
                                                        <select name="" id="">
                                                            <option defaultValue="">Internet Banking</option>
                                                            <option defaultValue="">Go-Pay</option>
                                                            <option defaultValue="">ATM</option>
                                                        </select>
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
                                                        <h3>2450000</h3>
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