import React, { Component } from 'react';
import Navbar from './Navbar';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';

import Unpaid from './Unpaid';
import Paid from './Paid';
import PBS from './PBS';
import PA from './PA';
import Expired from './Expired';
import PF from './PF';

const cookies = new Cookies();

class Invoice extends Component
{
    render()
    {
        if (cookies.get('adminID') === undefined) return <Redirect to='/'/>
        // to check if the admin already login or not
        
        return (
            <div id="backcoloradm">
            <Navbar/>
                <div id="wrapper">
                    <div id="page-wrapper">
                        <div className="row">
                            <div className="col-lg-12">
                                <h1 className="page-header">User's Payment</h1>
                            </div>
                        </div>
                        <div>
                            <ul className="nav nav-tabs">
                                <li className="active"><a href="#NP" data-toggle="tab" aria-expanded="true">Need Process</a></li>
                                <li><a href="#Paid" data-toggle="tab" aria-expanded="false">Paid</a></li>
                                <li><a href="#PBS" data-toggle="tab" aria-expanded="false">Package Being Sent</a></li>
                                <li><a href="#PD" data-toggle="tab" aria-expanded="false">Package Arrived</a></li>
                                <li><a href="#Expired" data-toggle="tab" aria-expanded="false">Expired</a></li>
                                <li><a href="#Failed" data-toggle="tab" aria-expanded="false">Failed</a></li>
                            </ul>
                            <div id="myTabContent" className="tab-content">
                                <div className="tab-pane fade active in" id="NP">
                                    <Unpaid/>
                                </div>
                                <div className="tab-pane fade" id="Paid">
                                    <Paid/>
                                </div>
                                <div className="tab-pane fade" id="PBS">
                                    <PBS/>
                                </div>
                                <div className="tab-pane fade" id="PD">
                                    <PA/>
                                </div>
                                <div className="tab-pane fade" id="Expired">
                                    <Expired/>
                                </div>
                                <div className="tab-pane fade" id="Failed">
                                    <PF/>
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
export default Invoice;