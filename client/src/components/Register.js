import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Register extends Component
{
    state =
    {
        gender: '',
        redirect: false,
        statusPass: <br/>,
        typePass: 'password'
    }

    selectGender = (e) =>
    {
        // console.log(e.target.value);
        this.setState({
            gender: e.target.value
        })
    }

    register = (userdata) =>
    {
        var fullname = userdata.fullname.value;
        var birth = userdata.birth.value;
        var username = userdata.username.value;
        var password = userdata.password.value;
        var confpassword = userdata.confpassword.value;
        var gender = this.state.gender;
        var phone = userdata.phone.value;
        var email = userdata.email.value;
        var address = userdata.address.value;
        var self = this;
        
        axios.post('http://localhost:3001/Register', {
            fullname: fullname,
            birth: birth,
            username: username,
            password: password,
            confpassword: confpassword,
            gender: gender,
            phone: phone,
            email: email,
            address: address
        }).then((response) => {
            var status = response.data
            if (status === 1)
            {
                self.setState({
                    redirect: true
                })
            }
        })
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

    checkPass = (e) =>
    {
        // console.log(document.getElementById("password").value)
        // console.log(e.target.value)
        var inputPass = document.getElementById("password").value;
        var confPass = e.target.value;

        if (confPass === inputPass)
        {
            this.setState({
                statusPass: 'Password Match'
            })
        }
        else
        {
            this.setState({
                statusPass: 'Password Not Match'
            })
        }
    }
    // confirm pass

    render()
    {
        if (this.state.redirect) return <Redirect to='/Login'/>

        return (
            <div id="homeback">
                <div className="container padbot padtop">
                    <div className="row">
                        <div className="col-md-6 col-md-offset-3">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h3 className="panel-title">Please Register</h3>
                                </div>
                                <div className="panel-body">
                                    <form>
                                        <fieldset>
                                            <div className="form-group">
                                                <input className="form-control" placeholder="Full Name" ref="fullname" type="text"/>
                                            </div>

                                            <div className="form-group">
                                                <input className="form-control" placeholder="Birth" ref="birth" type="date"/>
                                            </div>

                                            <div className="form-group">
                                                <input className="form-control" placeholder="Username" ref="username" type="text"/>
                                            </div>

                                            <div className="form-group">
                                                <input id="password" className="form-control" style={{width:390, display:'inline-block'}} placeholder="Password" ref="password" type={this.state.typePass}/>&nbsp;
                                                <label>
                                                    <input id="showpass" style={{verticalAlign:'top'}} type="checkbox" onChange={this.showPass}/> Show Password
                                                </label>
                                            </div>

                                            <div className="form-group">
                                                <input className="form-control" onChange={this.checkPass} placeholder="Confirm Password" ref="confpassword" type="password"/>
                                                <label>{this.state.statusPass}</label>
                                            </div>

                                            <div className="form-group">
                                                <label style={{fontWeight:'normal'}}><input style={{verticalAlign:'top'}} onChange={this.selectGender} value="Man" name="sex" type="radio"/> Man </label> &nbsp;
                                                <label style={{fontWeight:'normal'}}><input style={{verticalAlign:'top'}} onChange={this.selectGender} value="Woman" name="sex" type="radio"/> Woman </label>
                                            </div>

                                            <div className="form-group">
                                                <input className="form-control" placeholder="Phone" ref="phone" type="number"/>
                                            </div>

                                            <div className="form-group">
                                                <input className="form-control" placeholder="E-mail" ref="email" type="email"/>
                                            </div>

                                            <div className="form-group">
                                                <textarea className="form-control" placeholder="Address" ref="address" type="text"></textarea>
                                            </div>

                                            <button type="button" onClick={() => this.register(this.refs)} className="btn btn-lg btn-success btn-block">Register</button>
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
export default Register;