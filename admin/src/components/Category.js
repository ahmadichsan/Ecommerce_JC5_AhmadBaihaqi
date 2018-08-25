import React, { Component } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';
import $ from 'jquery';

const cookies = new Cookies();

class Category extends Component
{
    state =
    {
        catlist: [],
        cat_ID: 0,
        cat_Name: ''
    }

    componentWillMount = () =>
    {
        axios.get('http://localhost:3001/Category')
        .then((response) => 
        {
            // console.log(response.data);
            this.setState({
                catlist: response.data
            })
        })
    }
    
    editCat = (val) =>
    {
        console.log(val)
        var catID = val.id;
        var catName = val.category;
        this.setState({
            cat_ID: catID,
            cat_Name: catName
        })
        // console.log(this.state.cat_ID)
        // console.log(this.state.cat_Name)
    }

    changeName = (e) =>
    {
        this.setState({
            cat_Name: e.target.value
        })
    }

    delCat = (val) =>
    {
        // console.log(val)
        axios.post('http://localhost:3001/Delcat', 
        {
            catID: val
        })
        .then((response) => 
        {
            var hasil = response.data
            if (hasil === 1)
            {
                axios.get('http://localhost:3001/Category')
                .then((response) => 
                {
                    // console.log(response.data);
                    this.setState({
                        catlist: response.data
                    })
                })
            }
        })
    }

    addcat = (newcat) =>
    {
        var process = '';
        if (newcat.catid.value === '0' && newcat.catname.value !== '')
        {
            process = 'newcat';
            // console.log(process);
            axios.post('http://localhost:3001/Addcat',
            {
                status: process,
                catID: newcat.catid.value,
                catName: newcat.catname.value
            })
            .then((respon) => 
            {
                if (respon.data === 1)
                {
                    axios.get('http://localhost:3001/Category')
                    .then((response) => 
                    {
                        // console.log(response.data);
                        this.setState({
                            catlist: response.data,
                            cat_ID: 0,
                            cat_Name: ''
                        })

                        $(document).ready(() => 
                        {
                            $('#catid').val(this.state.cat_ID);
                            $('#catname').val(this.state.cat_Name);
                        })
                    })
                }
            })
        }
        else if (newcat.catid.value !== '0' && newcat.catname.value !== '')
        {
            process = 'editcat';
            // console.log(process);
            axios.post('http://localhost:3001/Addcat',
            {
                status: process,
                catID: newcat.catid.value,
                catName: newcat.catname.value
            })
            .then((respon) => 
            {
                if (respon.data === 1)
                {
                    axios.get('http://localhost:3001/Category')
                    .then((response) => 
                    {
                        // console.log(response.data);
                        this.setState({
                            catlist: response.data,
                            cat_ID: 0,
                            cat_Name: ''
                        })

                        $(document).ready(() => 
                        {
                            $('#catid').val(this.state.cat_ID);
                            $('#catname').val(this.state.cat_Name);
                        })
                    })
                }
            })
        }
    }

    render()
    {
        if (cookies.get('adminID') === undefined) return <Redirect to='/'/>
        // to check if the admin already login or not
        
        const daftarkategori = this.state.catlist.map((item, index) =>
        {
            let catid = item.id;
            let catname = item.category;
            let prodamount = item.jumlahproduk;
            return <tr key={index} nilai={catid}>
                    <td className="text-center" style={{width:20}}>
                        {index + 1}
                    </td>
                    <td className="text-center" style={{width:100}}>
                        {catname}
                    </td>
                    <td className="text-center" style={{width:100}}>
                        {prodamount}
                    </td>
                    <td style={{width:20}} className="text-center">
                        <button className="btn btn-primary btn-md" onClick={() => this.editCat(this.state.catlist[index])}>
                            <span className="fa fa-edit"></span>
                        </button>
                    </td>
                    <td style={{width:20}} className="text-center">
                        <button className="btn btn-danger btn-md" onClick={() => this.delCat(catid)}>
                            <span className="fa fa-trash-alt"></span>
                        </button>
                    </td>
                </tr>
        })
        return (
            <div id="backcoloradm">
            <Navbar/>
                <div id="wrapper">
                    <div id="page-wrapper">
                        <div className="row">
                            <div className="col-md-12">
                                <h1 className="page-header">Edit/Add New Category</h1>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <form className="form-horizontal">
                                        <div className="form-group"> 
                                            <div className="col-md-5">
                                                <input id="catid" ref="catid" value={this.state.cat_ID}
                                                placeholder="Category ID" className="form-control" type="hidden" required/>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-md-5 control-label" id="addprodcut">Category Name</label>  
                                            <div className="col-md-5">
                                                <input id="catname" ref="catname" value={this.state.cat_Name} onChange={this.changeName}
                                                placeholder="Category Name" className="form-control" type="text" required/>
                                            </div>
                                        </div>
                                        
                                        <div className="form-group">
                                            <label className="col-md-5 control-label"></label>
                                            <div className="col-md-5">
                                                <button type="button" onClick={() => this.addcat(this.refs)} className="btn btn-success" value="Submit">Submit</button>&nbsp;
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
                                                        <b style={{float:"left"}}>Category List</b>                                     
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
                                                                            <li><a href="">Total Product: Ascending</a></li>
                                                                            <li><a href="">Total Product: Descending</a></li>
                                                                        </ul>
                                                                    </div>
                                                                </td>
                                                                <td style={{width:100}}>
                                                                    <span>
                                                                        Display&nbsp;
                                                                            <select>
                                                                                <option value="5">5</option>
                                                                                <option value="15">15</option>
                                                                                <option value="20">20</option>
                                                                                <option value="25">25</option>
                                                                            </select>&nbsp;
                                                                        of 100 Categories
                                                                    </span>
                                                                </td>
                                                                <td style={{width:100}}></td>
                                                                <td style={{width:20}}></td>
                                                                <td style={{width:20}}></td>
                                                            </tr>
                                                            <tr>
                                                                <th className="text-center" style={{width:20}}>No.</th>
                                                                <th className="text-center" style={{width:100}}>Category Name</th>
                                                                <th className="text-center" style={{width:100}}>Product</th>
                                                                <th className="text-center" style={{width:20}}>Edit</th>
                                                                <th className="text-center" style={{width:20}}>Delete</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {daftarkategori}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center col-md-12 col-sm-12 col-xs-12">
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
                                    </div>
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
export default Category;