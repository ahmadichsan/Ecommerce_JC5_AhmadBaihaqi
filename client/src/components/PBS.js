import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class PBS extends Component 
{
    state =
    {
        pbsList: [],
        noitem: ['Empty']
    }

    componentWillMount = () =>
    {
        var userID = cookies.get('sessionID');
        axios.post('http://localhost:3001/userPbs', 
        {
            userID: userID
        })
        .then((response) =>
        {
            var result = response.data;
            this.setState({
                pbsList: result
            })
            // console.log(result)
        })
    }

    render() 
    {
        const pbsUser = this.state.pbsList.map((item, index) => 
        {
            var INV = item.INV;
            var GrandTotal = item.grandtotal;
            var date = item.orderDate;
            var indexT = date.indexOf('T')
            var orderDate = date.slice(0, indexT)

            return <tr key={index}>
            <td style={{width:200}} className="text-center">{INV}</td>
            <td style={{width:200}} className="text-center">{GrandTotal}</td>
            <td style={{width:200}} className="text-center">{orderDate}</td>
            <td style={{width:200}} className="text-center"><Link to={{pathname: '/Invoice', state: {INV: INV}}}>view</Link></td>
        </tr>
        })

        const noItem = this.state.noitem.map((item, index) => 
        {
            return <tr key={index}>
                    <td colSpan='5' className="text-center" style={{fontSize:30}}>{item}</td>
                </tr>
        })
        // to display info if the PBS is empty

        const PBSLength = pbsUser.length
        // console.log(PBSLength)

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
                                            <td style={{width:200}}>
                                                <div className="dropdown">
                                                    <button className="btn btn-primary dropdown-toggle" id="nodecor" data-toggle="dropdown" style={{color:"white"}}>Sort by <div className="caret"></div></button>
                                                    <ul className="dropdown-menu">
                                                        <li><a href="">Order Date</a></li>
                                                        <li><a href="">Username</a></li>
                                                        <li><a href="">Order ID</a></li>
                                                    </ul>
                                                </div>
                                            </td>
                                            <td colSpan="2" style={{width:200}}></td>
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
                                            <th style={{width:200}} className="text-center">Reciept Code</th>
                                            <th style={{width:200}} className="text-center">Grand Total</th>
                                            <th style={{width:200}} className="text-center">Order Date</th>
                                            <th style={{width:200}} className="text-center">Detail</th>                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                       {(PBSLength === 0) ? noItem : pbsUser}
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
