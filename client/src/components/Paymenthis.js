import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Paymenthis extends Component
{
    render()
    {
        return (
            <div id="homeback">
                <div className="container padtop padbot">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <div className="">
                                        <h3>
                                            <b style={{float:"left"}}>Payment History</b>                                     
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
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <td>
                                                        <div className="dropdown">
                                                            <button className="btn btn-primary dropdown-toggle" id="nodecor" data-toggle="dropdown" style={{color:"white"}}>Sort by <div className="caret"></div></button>
                                                            <ul className="dropdown-menu">
																<li><a href="">Paid</a></li>
                                                                <li><a href="">Unpaid</a></li>
																<li><a href="">Expired</a></li>
                                                                <li><a href="">Order Date</a></li>
                                                                <li><a href="">Order ID</a></li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                    <td colspan="2">
                                                        <span claassName="">
                                                            Display&nbsp;
                                                                <select>
                                                                    <option value="5" selected>5</option>
                                                                    <option value="15">15</option>
                                                                    <option value="20">20</option>
                                                                    <option value="25">25</option>
                                                                </select>&nbsp;
                                                            of 100 Data
                                                        </span>
                                                    </td>
                                                    <td></td>
                                                    <td className="text-center"><button className="btn btn-danger"><span className="fa fa-trash-alt"></span> All</button></td>
                                                </tr>
                                                <tr>
                                                    <th>Order ID</th>
                                                    <th className="text-center">Order Status</th>
                                                    <th className="text-center">Order Date</th>
                                                    <th className="text-center">Detail</th>
                                                    <th className="text-center">Settings</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>2018052601</td>
                                                    <td className="text-center">Unpaid</td>
                                                    <td className="text-center">20180526</td>
                                                    <td className="text-center"><Link to="/Checkout">view</Link></td>
                                                    <td className="text-center"><button className="btn btn-danger"><span className="fa fa-trash-alt"></span></button></td>
                                                </tr>
                                                <tr>
                                                    <td>2018052122</td>
                                                    <td className="text-center">Paid</td>
                                                    <td className="text-center">20180521</td>
                                                    <td className="text-center"><Link to="/Invoice">view</Link></td>
                                                    <td className="text-center"><button className="btn btn-danger"><span className="fa fa-trash-alt"></span></button></td>
                                                </tr>
                                                <tr>
                                                    <td>2018050912</td>
                                                    <td className="text-center">Expired</td>
                                                    <td className="text-center">20180509</td>
                                                    <td className="text-center"></td>
                                                    <td className="text-center"><button className="btn btn-danger"><span className="fa fa-trash-alt"></span></button></td>
                                                </tr>
                                            </tbody>
                                            
                                        </table>
                                        <Link to="/Userprofile">
                                            <button className="btn btn-primary pull-left"><span className="fa fa-arrow-left">&nbsp;&nbsp;</span>to Profile</button>    
                                        </Link>
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
        );
    }
}
export default Paymenthis;