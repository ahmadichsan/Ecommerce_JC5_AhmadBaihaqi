import React, { Component } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import $ from 'jquery';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';

const cookies = new Cookies();

class Product extends Component
{
    state =
    {
        prodlist: [],
        catlist: [],
        prodID: 0,
        prodName: '',
        prodPrice: '',
        prodCat: 0,
        prodDesc: '',
        prodImg: '',
        statusAdd: <br/>
    }
    
    componentWillMount = () =>
    {
        axios.get('http://localhost:3001/Product')
        .then((response) => 
        {
            // console.log(response.data[1]);
            this.setState({
                prodlist: response.data[0],
                catlist: response.data[1]
            })
            // console.log(this.state.catlist)
        })
    };
    // To send request product and category list to server and display the response


    delProd = (val) =>
    {
        var prodID = val
        // console.log(prodID);
        axios.post('http://localhost:3001/Delproduct', 
        {
            produkID: prodID
        })
        .then((response) => 
        {
            if (response.data === 1)
            {
                axios.get('http://localhost:3001/Product')
                .then((response) => 
                {
                    // console.log(response.data[1]);
                    this.setState({
                        prodlist: response.data[0],
                        catlist: response.data[1]
                    })
                    // console.log(this.state.catlist)
                })
            }
        })
    }
    // for delete data

    editProd = (val) =>
    {
        // console.log(val.id)
        // console.log(val.cat_id)
        // console.log(val.prod_name)
        // console.log(val.prod_price)
        // console.log(val.prod_desc)
        var idProduct = val.id;
        var catProduct = val.cat_id;
        var nameProduct = val.prod_name;
        var priceProduct = val.prod_price;
        var descProduct = val.prod_desc

        this.setState({
            prodID: idProduct,
            prodName: nameProduct,
            prodPrice: priceProduct,
            prodCat: catProduct,
            prodDesc: descProduct
        })

        $(document).ready(() => 
        {
            $('#idProd').val(this.state.prodID);
            $('#prodnames').val(this.state.prodName);
            $('#prodprices').val(this.state.prodPrice);
            $('#catID').val(this.state.prodCat);
            $('#proddesc').val(this.state.prodDesc);
        })
    }

    changeDesc = (e) =>
    {
        this.setState({
            prodDesc: e.target.value
        })
    }

    changeCat = (e) =>
    {
        this.setState({
            prodCat: e.target.value
        })
    }

    onchange = (e) => 
    {
        switch(e.target.name)
        {
            case 'prodimg':
            this.setState({
                prodImg: e.target.files[0],
            });
            break;
            default:
        }
    }

    addprod = (newprod) =>
    {
        // console.log(newprod.prodnames.value)
        this.setState({
            prodID: newprod.idProd.value,
            prodName: newprod.prodnames.value,
            prodPrice: newprod.prodprices.value,
            prodCat: newprod.catID.value,
            prodDesc: newprod.proddesc.value
        })
    }

    updateData = (e) =>
    {
        e.preventDefault();
        let formData = new FormData();
        formData.append('prodID', this.state.prodID);
        formData.append('prodName', this.state.prodName);
        formData.append('prodPrice', this.state.prodPrice);
        formData.append('prodCat', this.state.prodCat);
        formData.append('prodDesc', this.state.prodDesc);
        formData.append('prodImg', this.state.prodImg);

        // console.log(typeof(this.state.prodID))
        var productID = this.state.prodID;
        if (productID === '0')
        {
            axios.post('http://localhost:3001/Addprod/', formData)
            .then((respon) => 
            {
                // console.log(respon.data)
                if (respon.data === 1)
                {
                    // console.log('berhasil')
                    axios.get('http://localhost:3001/Product')
                    .then((response) => 
                    {
                        // console.log(response.data[1]);
                        this.setState({
                            prodlist: response.data[0],
                            catlist: response.data[1],
                            prodID: 0,
                            prodName: '',
                            prodPrice: '',
                            prodCat: 0,
                            prodDesc: '',
                            prodImg: ''
                        })
                        // console.log(this.state.catlist)
            
                        $(document).ready(() => 
                        {
                            $('#idProd').val(this.state.prodID);
                            $('#prodnames').val(this.state.prodName);
                            $('#prodprices').val(this.state.prodPrice);
                            $('#catID').val(this.state.prodCat);
                            $('#proddesc').val(this.state.prodDesc);
                            $('#prodimg').val(this.state.prodImg);
                        })
                    })   
                }
                else if (respon.data === -1)
                {
                    // console.log('gagal')
                    this.setState({
                        statusAdd: 'Failed, please insert the picture of the product'
                    })
                }
            })
        }
        else
        {
            axios.post('http://localhost:3001/Editproduct/', formData)
            .then((respon) =>
            {
                if (respon.data === 1)
                {
                    axios.get('http://localhost:3001/Product')
                    .then((response) => 
                    {
                        // console.log(response.data[1]);

                        this.setState({
                            prodlist: response.data[0],
                            catlist: response.data[1],
                            prodID: 0,
                            prodName: '',
                            prodPrice: '',
                            prodCat: 0,
                            prodDesc: '',
                            prodImg: ''
                        })
                        // console.log(this.state.catlist)
            
                        $(document).ready(() => 
                        {
                            $('#idProd').val(this.state.prodID);
                            $('#prodnames').val(this.state.prodName);
                            $('#prodprices').val(this.state.prodPrice);
                            $('#catID').val(this.state.prodCat);
                            $('#proddesc').val(this.state.prodDesc);
                            $('#prodimg').val(this.state.prodImg);
                        })
                    })
                }
            })
        }
    }
    // buat kirim ke backend

    render()
    {
        if (cookies.get('adminID') === undefined) return <Redirect to='/'/>
        // to check if the admin already login or not
        
        const daftarproduk = this.state.prodlist.map((item, index) =>
        {
            var prodcat = item.cat_id;
            let catdata = this.state.catlist;
            for (var i=0; i<catdata.length; i++)
            {
                if (catdata[i].id === prodcat)
                {
                    // console.log(catdata[i].category)
                    prodcat = catdata[i].category;
                }
            }
            // for loop and if else above is to change the category id into category name
            // console.log(prodcat)
            
            let prodid = item.id;
            let prodname = item.prod_name;
            let prodprice = item.prod_price;
            let prodimage = item.prod_img;
            let proddesc = item.prod_desc;
            return <tr key={index} nilai={prodid}>
                    <td style={{width:20}} className="text-center">
                        {index + 1}
                    </td>
                    <td style={{width:20}} id="prodname" className="text-center">
                        {prodname}
                    </td>
                    <td style={{width:20}} id="prodcat" className="text-center">
                        {prodcat}
                    </td>
                    <td style={{width:20}} id="prodprice" className="text-center">
                        {prodprice}
                    </td>
                    <td style={{width:20}} className="text-center">
                        {prodimage}
                    </td>
                    <td style={{width:20}} className="text-center">
                        {proddesc}
                    </td>
                    <td style={{width:20}} className="text-center">
                        <button className="btn btn-primary btn-md"onClick={() => this.editProd(this.state.prodlist[index])}><span className="fa fa-edit"></span></button>
                    </td>
                    <td style={{width:20}} className="text-center">
                        <button className="btn btn-danger btn-md" onClick={() => this.delProd(prodid)}>
                            <span className="fa fa-trash-alt"></span>
                        </button>
                    </td>
                </tr>
        })
        // for mapping the product list

        const datakategori = [].concat(this.state.catlist)
            .sort((a, b) => a.category > b.category)
            .map((item, i) =>
            {
                return <option key={i} value={item.id}>{item.category}</option>
            }
        );
        // for mapping the category list also sort it ascending

        return (
            <div id="backcoloradm">
            <Navbar/>
                <div id="wrapper">
                    <div id="page-wrapper">
                        <div className="row">
                            <div className="col-md-12">
                                <h1 className="page-header">Add/Edit New Product</h1>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <form className="form-horizontal" onSubmit={this.updateData} encType="multipart/form-data">
                                        <div className="form-group">
                                            <div className="col-md-5">
                                                <input id="idProd" ref="idProd" value={this.state.prodID} placeholder="Product ID" className="form-control" type="hidden" required/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-md-5 control-label" id="addprodcut">Product Name</label>
                                            <div className="col-md-5">
                                                <input id="prodnames" ref="prodnames" defaultValue={this.state.prodName} placeholder="Product Name" className="form-control" type="text" required/>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-md-5 control-label" id="addprodcut">Product Price</label>
                                            <div className="col-md-5">
                                                <input id="prodprices" ref="prodprices" defaultValue={this.state.prodPrice} placeholder="Product Price" className="form-control" type="number" required/>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-md-5 control-label" id="addprodcut">Product Category</label>
                                            <div className="col-md-5">
                                                <select id="catID" ref="catID" value={this.state.prodCat} onChange={this.changeCat} required>
                                                <option value={0}>Choose One</option>
                                                    {datakategori}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-md-5 control-label" id="addprodcut">Product Image</label>  
                                            <div className="col-md-5">
                                                <input id="prodimg" ref="prodimg" name="prodimg" onChange={this.onchange} type="file"/>
                                                {this.state.statusAdd}
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-md-5 control-label" id="addprodcut">Product Description</label>
                                            <div className="col-md-5">
                                                <textarea id="proddesc" ref="proddesc" value={this.state.prodDesc} onChange={this.changeDesc} placeholder="Product Desc" className="form-control" required></textarea>
                                            </div>
                                        </div>
                                        
                                        <div className="form-group">
                                            <label className="col-md-5 control-label" id="addprodcut" style={{color:'red'}}></label>
                                            <div className="col-md-5">
                                                <button type="submit" onClick={() => this.addprod(this.refs)} className="btn btn-success">Submit</button>&nbsp;
                                                <input type="reset" className="btn btn-danger" value="Clear"/>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="panel panel-default" style={{marginTop:40}}>
                                            <div className="panel-heading">
                                                <div>
                                                    <h3>
                                                        <b style={{float:"left"}}>Product List</b>                                     
                                                    </h3>
                                                    <div className="input-group col-md-3 col-md-offset-9 col-xs-12">
                                                        <input type="text" className="form-control" placeholder="Search..." />
                                                        <span className="input-group-btn">
                                                            <button className="btn btn-default" type="button">
                                                                <i className="fa fa-search"></i>
                                                            </button>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="panel-body">
                                                <div className="table-responsive">
                                                    <table className="table table-hover" id="myTable">
                                                        <thead>
                                                            <tr>
                                                                <td style={{width:20}}>
                                                                    <div className="dropdown">
                                                                        <button className="btn btn-primary dropdown-toggle" id="nodecor" data-toggle="dropdown" style={{color:"white"}}>Sort by <div className="caret"></div></button>
                                                                        <ul className="dropdown-menu">
                                                                            <li><a href="">Name: Ascending</a></li>
                                                                            <li><a href="">Name: Descending</a></li>
                                                                            <li><a href="">Price: Low - High</a></li>
                                                                            <li><a href="">Price: High - Low</a></li>
                                                                        </ul>
                                                                    </div>
                                                                </td>
                                                                <td colSpan="2" style={{width:40}}>
                                                                    <span className="">
                                                                        Display&nbsp;
                                                                            <select>
                                                                                <option value="5">5</option>
                                                                                <option value="15">15</option>
                                                                                <option value="20">20</option>
                                                                                <option value="25">25</option>
                                                                            </select>&nbsp;
                                                                        of 100 Products
                                                                    </span>
                                                                </td>
                                                                <td style={{width:20}}></td>
                                                                <td style={{width:20}}></td>
                                                                <td style={{width:20}}></td>
                                                                <td style={{width:20}}></td>
                                                                <td style={{width:20}}></td>
                                                            </tr>
                                                            <tr>
                                                                <th style={{width:20}} className="text-center">No.</th>
                                                                <th style={{width:20}} className="text-center">Name</th>
                                                                <th style={{width:20}} className="text-center">Category</th>
                                                                <th style={{width:20}} className="text-center">Price</th>
                                                                <th style={{width:20}} className="text-center">Image</th>
                                                                <th style={{width:20}} className="text-center">Desc</th>
                                                                <th style={{width:20}} className="text-center">Edit</th>
                                                                <th style={{width:20}} className="text-center">Delete</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {daftarproduk}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <div className="text-center col-md-12 col-sm-12 col-xs-12">
                                        <ul className="pagination">
                                            <li className="page-item disabled">
                                                <a className="page-link" href="">&laquo;</a>
                                            </li>
                                            <li className="page-item active">
                                                <a className="page-link" href="">1</a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link" href="">2</a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link" href="">3</a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link" href="">4</a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link" href="">5</a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link" href="">&raquo;</a>
                                            </li>
                                        </ul>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>  
                </div>
                <button id="myBtn"><i className="fa fa-caret-up"></i></button>
            </div>
        );
    }
}
export default Product;