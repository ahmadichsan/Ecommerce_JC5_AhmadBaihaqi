import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Login extends Component
{
    state =
    {
        redirect: false
    }

    login = (userdata) =>
    {
        var username = userdata.username.value;
        var password = userdata.password.value;
        
        axios.post('http://localhost:3001/Login', {
            username: username,
            password: password
        })
        .then((response) => {
            var userSession = response.data;
            // console.log(response.data);
            cookies.set('sessionID', userSession, { path: '/' });
            this.setState({
                redirect: true
            })
        });    
    }

    render()
    {   
        if (this.state.redirect) return <Redirect to='/Userprofile'/>

        return (
            <div id="homeback">
                <div className="container padbot padtop">
                    <div className="row">
                        <div className="col-md-6 col-md-offset-3">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h3 className="panel-title">Please Sign In</h3>
                                </div>
                                <div className="panel-body">
                                    <form>
                                        <fieldset>
                                            <div className="form-group">
                                                <input className="form-control" placeholder="Username" ref="username" type="text"/>
                                            </div>
                                            <div className="form-group">
                                                <input className="form-control" placeholder="Password" ref="password" type="password"/>
                                            </div>
                                            <div className="checkbox">
                                                <label>
                                                    <input name="remember" type="checkbox" value="Remember Me"/> Remember Me
                                                </label>
                                            </div>
                                            <button type="button" onClick={() => this.login(this.refs)} className="btn btn-lg btn-success btn-block">Login</button>
                                        </fieldset>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;