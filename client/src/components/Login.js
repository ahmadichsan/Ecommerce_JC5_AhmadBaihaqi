import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Login extends Component
{
    state =
    {
        redirect: false,
        statusLogin: <br/>,
        typePass: 'password'
    }

    showPass = () =>
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

    login = (userdata) =>
    {
        var username = userdata.username.value;
        var password = userdata.password.value;
        
        axios.post('http://localhost:3001/Login', 
        {
            username: username,
            password: password
        })
        .then((response) => 
        {
            if (response.data !== -1)    
            {
                var userSession = response.data;
                // console.log(response.data);
                cookies.set('sessionID', userSession, { path: '/' });
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
                                                <input className="form-control" placeholder="Password" ref="password" type={this.state.typePass}/>
                                            </div>
                                            <div className="checkbox">
                                                <label>
                                                    <input id="showpass" type="checkbox" onChange={this.showPass}/> Show Password
                                                </label><br/>
                                                <span style={{color:'red'}}>{this.state.statusLogin}</span>
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