import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component
{
    render()
    {
        return (
            <div id="backcolor">
                <div className="container-fluid padbot padtop">
                    <div className="col-lg-4 col-md-4 col-sm-5 col-xs-12 col-md-offset-4 col-sm-offset-4">
                        <div className="garis">
                            <h1 id="admstyle">Admin</h1>
                        </div>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title" id="logstyle"><b>Login</b></h3>
                            </div>
                            <div className="panel-body">
                                <form>
                                    <div className="form-group">
                                        <input className="form-control" placeholder="E-mail" name="email" type="email" />
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" placeholder="Password" name="password" type="password" value="" />
                                    </div>
                                    <div className="checkbox">
                                        <label>
                                            <input name="remember" type="checkbox" value="Remember Me" /> Remember Me
                                        </label>
                                    </div>
                                    <Link to="/Productlist" id="nodecor">
                                        <input className="btn btn-lg btn-success btn-block" type="button" value="Login" />
                                    </Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;