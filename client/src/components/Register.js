import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Register extends Component
{
    state =
    {
        gender: '',
        redirect: false,
        statusPass: <br/>
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

    // handleChange = (e) =>
    // {
    //     this.setState({
    //         password: e.target.value,
    //         confpassword: e.target.value
    //     })

    //     if (this.state.password !== this.state.confpassword)
    //     {
    //         this.setState({
    //             statusPass: 'Password Tidak Sama'
    //         })
    //     }
    //     else if (this.state.password === this.state.confpassword)
    //     {
    //         this.setState({
    //             statusPass: 'Password Sesuai'
    //         })
    //     }
    // }
    // confirm passwords

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
                                                {/* <input className="form-control" style={{width:390, display:'inline-block'}} onChange={this.handleChange} placeholder="Password" ref="password" type="password"/>&nbsp; */}
                                                <input className="form-control" style={{width:390, display:'inline-block'}} placeholder="Password" ref="password" type="password"/>&nbsp;
                                                <label>
                                                    <input style={{verticalAlign:'top'}} type="checkbox"/> Show Password
                                                </label>
                                            </div>

                                            <div className="form-group">
                                                {/* <input className="form-control" placeholder="Confirm Password" ref="confpassword" onChange={this.handleChange} type="password"/> */}
                                                <input className="form-control" placeholder="Confirm Password" ref="confpassword" type="password"/>
                                                {this.state.statusPass}
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