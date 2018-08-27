import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';

const cookies = new Cookies();

class Login extends Component
{
    state =
    {
        redirect: false,
        statusLogin: <br/>,
        typePass: 'password'
    }

    login = (userdata) =>
    {
        var username = userdata.username.value;
        var password = userdata.password.value;
        
        axios.post('http://localhost:3001/admlogin', {
            username: username,
            password: password
        }).then((response) => {
            var hasil = response.data;
            // console.log(response.data);
            if (hasil !== -1)
            {
                cookies.set('adminID', hasil, { path: '/' });
                this.setState({
                    redirect: true
                })
            }
            else
            {
                this.setState({
                    statusLogin: 'Username/Password Incorrect'
                })
            }
        });    
    }

    showPassword = (e) =>
    {
        if(document.getElementById("showpass").checked === true)
        {
            this.setState({
                typePass: 'text'
            })
            // console.log(this.state.typePass)
        }
        else if (document.getElementById("showpass").checked === false)
        {
            this.setState({
                typePass: 'password'
            })
            // console.log(this.state.typePass)
        }
    }

    render()
    {
        if (this.state.redirect) return <Redirect to='/Home'/> // if admin already logged in, go to Home component
        if (cookies.get('adminID') !== undefined) return <Redirect to='/Home'/>
        // if admin still have session, then move to Home

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
                                        <input className="form-control" placeholder="Username" ref="username" type="text" />
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" placeholder="Password" ref="password" type={this.state.typePass}/><br/>
                                        {this.state.statusLogin}
                                    </div>
                                    <div className="checkbox">
                                        <label>
                                            <input id="showpass" type="checkbox" onChange={this.showPassword}/> Show Password
                                        </label>
                                    </div>
                                    <button type="button" onClick={() => this.login(this.refs)} className="btn btn-lg btn-success btn-block">Login</button>
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