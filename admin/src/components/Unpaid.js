import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Unpaid extends Component
{
    state =
    {
        unpaidList: []
    }

    componentWillMount = () =>
    {
        axios.get('http://localhost:3001/unpaidList')
        .then((response) =>
        {
            var result = response.data;
            this.setState({
                unpaidList: result
            })
            console.log(result)
        })
    }

    componentWillReceiveProps = (val) =>
    {
        console.log(val.control)
        if (val.control === '2')
        {
            axios.get('http://localhost:3001/unpaidList')
            .then((response) =>
            {
                var result = response.data;
                this.setState({
                    unpaidList: result
                })
                console.log(result)
            })
        }
    }

    success = (val) =>
    {
        console.log(val)
        axios.post('http://localhost:3001/paymentSuccess', 
        {
            orderID: val
        })
        .then((response) =>
        {
            var results = response.data
            // console.log(results)
            if (results === 1)
            {
                axios.get('http://localhost:3001/unpaidList')
                .then((response) =>
                {
                    var result = response.data;
                    this.setState({
                        unpaidList: result
                    })
                    // console.log(result)
                })
                this.props.theChange('1')
            }
        })
    }

    failed = (val) =>
    {
        console.log(val)
    }

    render() 
    {
        const unpaidUser = this.state.unpaidList.map((item, index) => 
        {
            var orderID = item.orderID;
            var userID = item.username;
            var orderDate = item.orderDate;
            var total = item.total;

            return <tr key={index}>
            <td style={{paddingLeft:30}}>{userID}</td>
            <td className="text-center">{orderID}</td>
            <td className="text-center">{total}</td>
            <td className="text-center">{orderDate}</td>
            <td className="text-center"><Link to="/Checkout">view</Link></td>
            <td className="text-center">
                <button className="btn btn-success" onClick={() => this.success(orderID)}>
                    <span className="fa fa-check"></span>
                </button>&nbsp;
                <button className="btn btn-danger" onClick={() => this.failed(orderID)}>
                    <span className="fa fa-ban"></span>
                </button>
            </td>
        </tr>
        })
        return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <div className="panel panel-default admin">
                        <div className="panel-body">
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <td>
                                                <div className="dropdown">
                                                    <button className="btn btn-primary dropdown-toggle" id="nodecor" data-toggle="dropdown" style={{color:"white"}}>Sort by <div className="caret"></div></button>
                                                    <ul className="dropdown-menu">
                                                        <li><a href="">Order Date</a></li>
                                                        <li><a href="">Username</a></li>
                                                        <li><a href="">Order ID</a></li>
                                                    </ul>
                                                </div>
                                            </td>
                                            <td colSpan="2">
                                                <span style={{paddingLeft:20}}>
                                                    Display&nbsp;
                                                        <select>
                                                            <option value="5">5</option>
                                                            <option value="15">15</option>
                                                            <option value="20">20</option>
                                                            <option value="25">25</option>
                                                        </select>&nbsp;
                                                    of 100 Data
                                                </span>
                                            </td>
                                            <td></td>
                                            <td></td>
                                            <td style={{width:200}}>
                                                <div className="input-group">
                                                    <input type="text" className="form-control" placeholder="Search..." />
                                                    <span className="input-group-btn">
                                                        <button className="btn btn-default" type="button">
                                                            <i className="fa fa-search"></i>
                                                        </button>
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th style={{paddingLeft:30}}>Username</th>
                                            <th className="text-center">Order ID</th>
                                            <th className="text-center">Total Payment</th>
                                            <th className="text-center">Order Date</th>
                                            <th className="text-center">Detail</th>
                                            <th className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {unpaidUser}
                                    </tbody>
                                </table>
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
        </div>
        )
    }
}
export default Unpaid;
