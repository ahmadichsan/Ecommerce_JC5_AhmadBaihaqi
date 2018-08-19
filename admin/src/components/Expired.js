import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Expired extends Component {
  render() {
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
                                            <span className="">
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
                                        <th>Username</th>
                                        <th className="text-center">Order ID</th>
                                        <th className="text-center">Order Status</th>
                                        <th className="text-center">Order Date</th>
                                        <th className="text-center">Detail</th>
                                        <th className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>ahmdichsan</td>
                                        <td className="text-center">2018052601</td>
                                        <td className="text-center">Unpaid</td>
                                        <td className="text-center">20180526</td>
                                        <td className="text-center"><Link to="/Checkout">view</Link></td>
                                        <td className="text-center"><button className="btn btn-success"><span className="fa fa-recycle"></span></button></td>
                                    </tr>
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
