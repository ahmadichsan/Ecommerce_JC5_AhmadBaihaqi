import React, { Component } from 'react';
import Navbar from './Navbar';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';

import NPList from './NPList';
import Unpaid from './Unpaid';
import Paid from './Paid';
import PBS from './PBS';
import PA from './PA';
import Expired from './Expired';
import PF from './PF';

const cookies = new Cookies();

class Invoice extends Component
{
    state =
    {
        controller: ''
    }

    change = (val) =>
    {
        // console.log(val)
        if (val === '1') this.setState({controller: '2'})
    }

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
                                <li className="active"><a href="#Unpaid" data-toggle="tab" aria-expanded="true">Unpaid</a></li>
                                <li><a href="#NP" data-toggle="tab" aria-expanded="false">Need Process</a></li>
                                <li><a href="#Paid" data-toggle="tab" aria-expanded="false">Paid</a></li>
                                <li><a href="#PBS" data-toggle="tab" aria-expanded="false">Package Being Sent</a></li>
                                <li><a href="#PD" data-toggle="tab" aria-expanded="false">Package Arrived</a></li>
                                <li><a href="#Expired" data-toggle="tab" aria-expanded="false">Expired</a></li>
                                <li><a href="#Failed" data-toggle="tab" aria-expanded="false">Failed</a></li>
                            </ul>
                            <div id="myTabContent" className="tab-content">
                                <div className="tab-pane active in" id="Unpaid">
                                    <Unpaid control={this.state.controller}/>
                                </div>
                                <div className="tab-pane" id="NP">
                                    <NPList control={this.state.controller} theChange={this.change}/>
                                </div>
                                <div className="tab-pane" id="Paid">
                                    <Paid control={this.state.controller} theChange={this.change}/>
                                </div>
                                <div className="tab-pane" id="PBS">
                                    <PBS control={this.state.controller} theChange={this.change}/>
                                </div>
                                <div className="tab-pane" id="PD">
                                    <PA control={this.state.controller} theChange={this.change}/>
                                </div>
                                <div className="tab-pane" id="Expired">
                                    <Expired control={this.state.controller}/>
                                </div>
                                <div className="tab-pane" id="Failed">
                                    <PF control={this.state.controller} theChange={this.change}/>
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