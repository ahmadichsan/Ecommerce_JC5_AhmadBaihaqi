import React, { Component } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Productedit extends Component
{
    state =
    {
        catlist: [],
        inputid: 0,
        inputprod: '',
        inputprice: '',
        inputdesc: '',
        inputprodcat: '',
        inputimg: '',
        redirect: false
    }

    componentDidMount = () =>
    {
        axios.get('http://localhost:3001/Editproduct')
        .then((response) => 
        {
            // console.log(response.data);
            this.setState({
                catlist: response.data
            })
        })

        var idprod = this.props.location.state.prodid;
        var nameprod = this.props.location.state.prodname;
        var catprod = this.props.location.state.prodcat;
        var priceprod = this.props.location.state.prodprice;
        var descprod = this.props.location.state.proddesc;
        this.setState({
            inputid: idprod,
            inputprod: nameprod,
            inputprice: priceprod,
            inputdesc: descprod,
            inputprodcat: catprod
        })
        // console.log(this.state.inputid);
        // console.log(this.state.inputprod);
        // console.log(this.state.inputprice);
        // console.log(this.state.inputdesc);
        // console.log(this.state.inputprodcat);
    }
    // To send request product and category list to server and display the response

    descChange = (e) =>
    {
        this.setState({
            inputdesc: e.target.value
        })
    }
    // to make the description input value editable

    change = (e) =>
    {
        this.setState({
            inputprodcat: e.target.value
        })
    }
    // To change the input value of category - select tag

    onchange = (e) => 
    {
        switch(e.target.name)
        {
            case 'prodimg':
            this.setState({
                inputimg: e.target.files[0],
            });
            break;
            default:
        }
    }
    // to take the image file

    editprod = (editprod) =>
    {
        this.setState({
            inputid: editprod.prodid.value,
            inputprod: editprod.prodnames.value,
            inputprice: editprod.prodprices.value,
            inputprodcat: editprod.catID.value,
            inputdesc: editprod.proddesc.value
        })
    }
    // to change the value that want to be submited

    updateData = (e) =>
    {
        e.preventDefault();
        let formData = new FormData();
        formData.append('prodID', this.state.inputid);
        formData.append('prodName', this.state.inputprod);
        formData.append('prodPrice', this.state.inputprice);
        formData.append('prodCat', this.state.inputprodcat);
        formData.append('prodDesc', this.state.inputdesc);
        formData.append('prodImg', this.state.inputimg);
        axios.post('http://localhost:3001/Editproduct/', formData)
        .then((respon) =>
        {
            if (respon.data === 1)
            {
                this.setState({
                    redirect: true
                })
            }
        })

        // console.log(this.state.inputid);
        // console.log(this.state.inputprod);
        // console.log(this.state.inputprice);
        // console.log(this.state.inputdesc);
        // console.log(this.state.inputprodcat);
        // console.log(this.state.inputimg);
    }
    // send all data to backend

    render()
    {
        if (cookies.get('adminID') === undefined)
        {
            return <Redirect to='/'/>
        }
        // to check if the admin already login or not

        if (this.state.redirect) return <Redirect to='/Product'/>
        // to redirect after add product
        
        const datakategori = [].concat(this.state.catlist)
        .sort((a, b) => a.category > b.category)
        .map((item, i) => { return <option key={i} value={item.id}>{item.category}</option> });
        // for mapping the category list also sort it ascending

        return (
            <div id="backcoloradm">
            <Navbar/>
                <div id="wrapper">
                    <div id="page-wrapper">
                        <div className="row">
                            <div className="col-md-12">
                                <h1 className="page-header">Edit Product</h1>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <form className="form-horizontal" onSubmit={this.updateData} encType="multipart/form-data">
                                        <div className="form-group"> 
                                            <div className="col-md-5">
                                                <input ref="prodid" value={this.state.inputid}
                                                placeholder="Product Name" className="form-control" type="text" required/>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-md-5 control-label" id="addprodcut">Product Name</label>
                                            <div className="col-md-5">
                                                <input ref="prodnames" defaultValue={this.state.inputprod}
                                                placeholder="Product Name" className="form-control" type="text" required/>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-md-5 control-label" id="addprodcut">Product Price</label>
                                            <div className="col-md-5">
                                                <input ref="prodprices" defaultValue={this.state.inputprice}
                                                placeholder="Product Price" className="form-control" type="number" required/>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-md-5 control-label" id="addprodcut">Product Category</label>
                                            <div className="col-md-5">
                                                <select ref="catID" value={this.state.inputprodcat} onChange={this.change} required>
                                                    {datakategori}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-md-5 control-label" id="addprodcut">Product Image</label>  
                                            <div className="col-md-5">
                                                <input ref="prodimg" name="prodimg" onChange={this.onchange} type="file"/>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-md-5 control-label" id="addprodcut">Product Description</label>
                                            <div className="col-md-5">
                                                <textarea type='text' ref="proddesc" value={this.state.inputdesc}
                                                placeholder="Product Desc" className="form-control" onChange={this.descChange} required></textarea>
                                            </div>
                                        </div>
                                        
                                        <div className="form-group">
                                            <label className="col-md-5 control-label" id="addprodcut" style={{color:'red'}}></label>
                                            <div className="col-md-5">
                                                <button type='submit' onClick={() => this.editprod(this.refs)} className="btn btn-success">Submit</button>&nbsp;
                                                <input type="reset" className="btn btn-danger" value="Clear"/>
                                            </div>
                                        </div>
                                    </form>
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
export default Productedit;