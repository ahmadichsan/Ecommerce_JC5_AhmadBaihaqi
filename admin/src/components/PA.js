import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class PA extends Component 
{
    state =
    {
        paList: [],
        noitem: ['Empty']
    }

    componentWillMount = () =>
    {
        axios.get('http://localhost:3001/paList')
        .then((response) =>
        {
            var result = response.data;
            this.setState({
                paList: result
            })
            // console.log(result)
        })
    }

    componentWillReceiveProps = (val) =>
    {
        // console.log(val.control)
        if (val.control === '2')
        {
            axios.get('http://localhost:3001/paList')
            .then((response) =>
            {
                var result = response.data;
                this.setState({
                    paList: result
                })
                // console.log(result)
            })
        }
    }

    render() 
    {
        const paUser = this.state.paList.map((item, index) => 
        {
            var username = item.username;
            var INV = item.INV;
            var GrandTotal = item.grandtotal;
            var orderDate = item.orderDate;

            return <tr key={index}>
            <td style={{paddingLeft:30, width:100}}>{username}</td>
            <td style={{width:100}} className="text-center">{INV}</td>
            <td style={{width:100}} className="text-center">{GrandTotal}</td>
            <td style={{width:100}} className="text-center">{orderDate}</td>
            <td style={{width:100}} className="text-center"><Link to={{pathname: '/InvoiceDetail', state: {INV: INV}}}>view</Link></td>
        </tr>
        })

        const noItem = this.state.noitem.map((item, index) => 
        {
            return <tr key={index}>
                    <td colSpan='5' className="text-center" style={{fontSize:30}}>{item}</td>
                </tr>
        })
        // to display info if the BP is empty

        const PALength = paUser.length
        // console.log(cartLength)

        const views = (PALength === 0) ? noItem : paUser

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
                                            <td style={{width:100}}>
                                                <div className="dropdown">
                                                    <button className="btn btn-primary dropdown-toggle" id="nodecor" data-toggle="dropdown" style={{color:"white"}}>Sort by <div className="caret"></div></button>
                                                    <ul className="dropdown-menu">
                                                        <li><a href="">Order Date</a></li>
                                                        <li><a href="">Username</a></li>
                                                        <li><a href="">Order ID</a></li>
                                                    </ul>
                                                </div>
                                            </td>
                                            <td colSpan="2" style={{width:100}}>
                                                <span>
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
                                            <td style={{width:100}}></td>
                                            <td style={{width:100}}>
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
                                            <th style={{paddingLeft:30, width:100}}>Username</th>
                                            <th style={{width:100}} className="text-center">Invoice</th>
                                            <th style={{width:100}} className="text-center">Grand Total</th>
                                            <th style={{width:100}} className="text-center">Order Date</th>
                                            <th style={{width:100}} className="text-center">Detail</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                       {views}
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
