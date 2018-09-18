import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';

import BPList from './BPList';
import Unpaid from './Unpaid';
import Paid from './Paid';
import PBS from './PBS';
import PA from './PA';
import Expired from './Expired';
import PF from './PF';

const cookies = new Cookies();

class Paymenthis extends Component
{
    render()
    {
        if (cookies.get('sessionID') === undefined) return <Redirect to='/Login'/>
        // to check if the users already login or not

        return (
            <div id="homeback">
                <div className="container padbot">
                    <div className="row">
                        <div className="row">
                            <div className="col-lg-12">
                                <h1 className="page-header">Payment History</h1>
                            </div>
                        </div>
                        <div>
                            <ul className="nav nav-tabs fontcolors">
                                <li className="active"><a href="#Unpaid" data-toggle="tab" aria-expanded="true">Unpaid</a></li>
                                <li><a href="#NP" data-toggle="tab" aria-expanded="false">Being Process</a></li>
                                <li><a href="#Paid" data-toggle="tab" aria-expanded="false">Paid</a></li>
                                <li><a href="#PBS" data-toggle="tab" aria-expanded="false">Package Being Sent</a></li>
                                <li><a href="#PD" data-toggle="tab" aria-expanded="false">Package Arrived</a></li>
                                <li><a href="#Expired" data-toggle="tab" aria-expanded="false">Expired</a></li>
                                <li><a href="#Failed" data-toggle="tab" aria-expanded="false">Failed</a></li>
                            </ul>
                            <div id="myTabContent" className="tab-content">
                                <div className="tab-pane active in" id="Unpaid">
                                    <Unpaid/>
                                </div>
                                <div className="tab-pane" id="NP">
                                    <BPList/>
                                </div>
                                <div className="tab-pane" id="Paid">
                                    <Paid/>
                                </div>
                                <div className="tab-pane" id="PBS">
                                    <PBS/>
                                </div>
                                <div className="tab-pane" id="PD">
                                    <PA/>
                                </div>
                                <div className="tab-pane" id="Expired">
                                    <Expired/>
                                </div>
                                <div className="tab-pane" id="Failed">
                                    <PF/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Paymenthis;