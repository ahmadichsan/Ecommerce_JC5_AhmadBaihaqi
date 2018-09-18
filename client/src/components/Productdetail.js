import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';

class Productdetail extends Component
{
    state =
    {
        detprod: [],
        categoryname: '',
        nums: 1,
        redirectCart: false,
        redirectLogin: false
    }

    componentWillMount = () =>
    {
        var id_sblm = this.props.location.state.prodid;
        // console.log(id_sblm)
        axios.get('http://localhost:3001/Productdetail/' + id_sblm)
        .then((response) => 
        {
            // console.log(response.data[0].hasil);
            // console.log(response.data[1].catname);
            this.setState({
                detprod: response.data[0].hasil,
                categoryname: response.data[1].catname
            })
        })
    }
    // To send request product and category list to server and display the response

    Qty = (e) =>
    {
        this.setState({
            nums: e.target.value
        })
    }
    // to make the value of qty of the selected product editable

    increment = () => 
    {  
        this.setState({
            nums: this.state.nums + 1
        })
    }
    // Function to add item
      
    decrement = () => 
    {  
        this.setState({
            nums: this.state.nums - 1
        })
        
        if (this.state.nums < 2)
        {
            this.setState({
                nums: 1
            })
        }
    }
    // Function to reduce item

    order = (ordered) =>
    {
        // console.log(ordered.qty.value);
        // console.log(ordered.prodName.value);
        // console.log(ordered.prodPrice.value);
        const cookies = new Cookies();
        var userID = cookies.get('sessionID')
        // console.log('jumlah barang: ' + ordered.qty.value);
        // console.log('id produk: ' + ordered.prodID.value);

        if (userID !== undefined)
        {
            axios.post('http://localhost:3001/Order', 
            {
                UserID: userID,
                prodQty: ordered.qty.value,
                prodID: ordered.prodID.value,
                prodName: ordered.prodName.value,
                prodPrice: ordered.prodPrice.value
            })
            .then((response) => 
            {
                // console.log(response.data)
                var storestat = response.data;
                if (storestat === 1)
                {
                    this.setState({
                        redirectCart: true
                    })
                }
                // to redirect to cart
            })
        }
        else
        {
            this.setState({
                redirectLogin: true
            })
        }
    }
    // Function to send the order to cart table

    render()
    {
        if (this.state.redirectCart) return <Redirect to='/Cart'/>
        // if user success add to cart, then move to cart page
        if (this.state.redirectLogin) return <Redirect to='/Login'/>
        // if user not login yet, when user hit add to cart, they will
        // redirect to login

        const detproduk = this.state.detprod.map((item, index) =>
        {
            let prodID = item.id;
            let photo = item.prod_img;
            let prodname = item.prod_name;
            let prodprice = item.prod_price;
            let prodcat = this.state.categoryname;
            let proddesc = item.prod_desc
            return <div key={index}>
                    <div className="col-md-5 col-md-offset-1">
                    <div className="card bg-light mb-3">
                        <div className="card-body">
                            <img id="stylegambar1" src={'http://localhost:3001/images/' + photo} alt=""/>
                        </div>
                    </div>
                </div>

                <div className="col-md-5">
                    <div className="card mb-3">
                        <div className="card-header" id="Lobster"><h3>{prodname}</h3></div>
                        <div className="card-body">
                            <p className="price defaultmarg">IDR {prodprice}</p>
                            <div>
                                <label className="padding10">Quantity :</label>
                                <div className="form-group">
                                    <center>
                                        <button className="btn btn-danger width90" onClick={() => this.decrement()}><i className="fa fa-minus"></i></button>&nbsp;
                                        <input className="text-center styleproddet" ref="qty" type="number" value={this.state.nums} onChange={this.Qty}/>&nbsp;
                                        <input className="text-center styleproddet" ref="prodID" type="hidden" value={prodID}/>&nbsp;
                                        <input className="text-center styleproddet" ref="prodName" type="hidden" value={prodname}/>&nbsp;
                                        <input className="text-center styleproddet" ref="prodPrice" type="hidden" value={prodprice}/>&nbsp;
                                        <button className="btn btn-success width90" onClick={() => this.increment()}><i className="fa fa-plus"></i></button><br/><br/>
                                        <button type="button" className="btn btn-success" onClick={() => this.order(this.refs)}>
                                            <i className="fa fa-shopping-cart"></i> Add To Cart
                                        </button>
                                    </center>
                                </div>
                            </div>             
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="card-header"><i className="fa fa-info-circle"></i> Description</div>
                        <div className="card-body padding10">
                            <ul className="defaultmarg">
                                <li>Category: {prodcat}</li>
                                <li>{proddesc}</li>
                            </ul>
                            <Link to="/Productlist">
                                <button className="btn btn-primary pull-left"><span className="fa fa-arrow-left">&nbsp;&nbsp;</span>to Product List</button>    
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        })

        return (
            <div id="homeback">
                <div className="container-fluid padbot padtop">
                    <div className="row">
                        {detproduk}
                    </div>
                </div>
            </div>
        );
    }
}
export default Productdetail;