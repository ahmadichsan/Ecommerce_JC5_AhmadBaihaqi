import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Paymentfailed extends Component
{
    render()
    {
        return (
            <div id="homeback">
                <div className="container padbot padtop">
                    <div className="row">
                        <div className="col-md-10 col-md-offset-1">
                            <div className="panel panel-default">
                                <div className="panel-heading colorbacks">
                                    <div className="text-center fontcolorwhite"><h1><b>Payment Failed</b></h1></div>
                                </div>
                                <div className="panel-body text-center">
                                    <div id="Fugaz">
                                        <h1>SORRY BUT OUR SYSTEM DID NOT RECOGNIZE YOUR PAYMENT. PLEASE MAKE SURE THAT YOU ALREADY PAY THE BILL*.</h1><br/>
                                        <h4>*) If you have some trouble in finishing the payment, please contact us directly by email.<br/>Thank you</h4>
                                    </div>
                                    <Link to="/Paymenthis">
                                        <button className="btn btn-primary pull-left"><span className="fa fa-arrow-left">&nbsp;&nbsp;</span>to Payment History</button>    
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Paymentfailed;