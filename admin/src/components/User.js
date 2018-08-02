import React, { Component } from 'react';
import Navbar from './Navbar';

class Userdata extends Component
{
    render()
    {
        return (
            <div id="backcoloradm">
            <Navbar/>
                <div id="wrapper">
                    <div id="page-wrapper">
                        <div className="row">
                            <div className="col-md-12">
                                <h1 className="page-header">User Data</h1>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="panel panel-default">
                                            <div className="panel-heading">
                                                <div>
                                                    <h3>
                                                        <b style={{float:"left"}}>User Data List</b>                                     
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
                                                                    <button>
                                                                        <div className="dropdown">
                                                                            <a href="" className="dropdown-toggle" id="nodecor" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Sort by <span className="caret"></span></a>
                                                                            <ul className="dropdown-menu">
                                                                                <li><a href="">Username: Ascending</a></li>
                                                                                <li><a href="">Username: Descending</a></li>
                                                                                <li><a href="">Date Joined: Ascending</a></li>
                                                                                <li><a href="">Date Joined: Descending</a></li>
                                                                                <li><a href="">Last Activity</a></li>
                                                                            </ul>
                                                                        </div>
                                                                    </button>
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
                                                                <td className="text-center"><button className="btn btn-danger"><span className="fa fa-trash-alt"></span> All</button></td>
                                                            </tr>
                                                            <tr>
                                                                <th>Username</th>
                                                                <th className="text-center">Date Joined</th>
                                                                <th className="text-center">Last Activity</th>
                                                                <th className="text-center">Delete Data</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>ahmdichsan</td>
                                                                <td className="text-center">20170902</td>
                                                                <td className="text-center">20180102</td>
                                                                <td className="text-center"><button className="btn btn-danger"><span className="fa fa-trash-alt"></span></button></td>
                                                            </tr>
                                                            <tr>
                                                                <td>faldoilyanda</td>
                                                                <td className="text-center">20160902</td>
                                                                <td className="text-center">20180502</td>
                                                                <td className="text-center"><button className="btn btn-danger"><span className="fa fa-trash-alt"></span></button></td>
                                                            </tr>
                                                            <tr>
                                                                <td>esaadama</td>
                                                                <td className="text-center">20160902</td>
                                                                <td className="text-center">20180301</td>
                                                                <td className="text-center"><button className="btn btn-danger"><span className="fa fa-trash-alt"></span></button></td>
                                                            </tr>
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
export default Userdata;