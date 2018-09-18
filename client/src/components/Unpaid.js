import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Unpaid extends Component
{
    state =
    {
        unpaidList: [],
        noitem: ['Empty'],
    }

    componentWillMount = () =>
    {
        var userID = cookies.get('sessionID');
        axios.post('http://localhost:3001/userUnpaid', 
        {
            userID: userID
        })
        .then((response) =>
        {
            var result = response.data;
            this.setState({
                unpaidList: result
            })
            // console.log(result)
        })
    }

    render() 
    {
        const unpaidUser = this.state.unpaidList.map((item, index) => 
        {
            var orderID = item.orderID;
            var date = item.orderDate;
            var indexT = date.indexOf('T')
            var orderDate = date.slice(0, indexT)
            var total = item.total;

            return <tr key={index}>
            <td style={{width:200}} className="text-center">{orderID}</td>
            <td style={{width:200}} className="text-center">{total}</td>
            <td style={{width:200}} className="text-center">{orderDate}</td>
            <td style={{width:200}} className="text-center"><Link to="/Checkout">view</Link></td>
        </tr>
        })

        const noItem = this.state.noitem.map((item, index) => 
        {
            return <tr key={index}>
                    <td colSpan='4' className="text-center" style={{fontSize:30}}>{item}</td>
                </tr>
        })
        // to display info if the unpaid is empty

        const unpaidLength = unpaidUser.length
        // console.log(unpaidLength)

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
                                            <th style={{width:200}} className="text-center">Invoice ID</th>
                                            <th style={{width:200}} className="text-center">Grand Total</th>
                                            <th style={{width:200}} className="text-center">Order Date</th>
                                            <th style={{width:200}} className="text-center">Detail</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(unpaidLength === 0) ? noItem : unpaidUser}
                                    </tbody>
                                </table>
                                {/* <div className="text-center col-md-12 col-sm-12 col-xs-12">
                                    <ul className="pagination">
                                        <li className="page-item disabled">
                                            <a className="page-link" href="">&laquo;</a>
                                        </li>
                                        <li className="page-item active">
                                            <a className="page-link" href="">1</a>
                                        </li>
                                        <li className="page-item disabled">
                                            <a className="page-link" href="">&raquo;</a>
                                        </li>
                                    </ul>
                                </div> */}
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
