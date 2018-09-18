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
        typePass: 'password',
        statusUsername: <br/>,
        statusEmail: <br/>,
        eyePass: 'fa fa-eye-slash',
        eyeStatus: false,
        statusColor: '',
        statusColorPass: '',
        listData: []
    }    

    selectGender = (e) =>
    {
        // console.log(e.target.value);
        this.setState({
            gender: e.target.value
        })
    }
    // make the select option value change-able

    showPass = () =>
    {
        if (!this.state.eyeStatus)
        {
            this.setState({
                eyePass: 'fa fa-eye',
                eyeStatus: true,
                typePass: 'text'
            })
        }
        else
        {
            this.setState({
                eyePass: 'fa fa-eye-slash',
                eyeStatus: false,
                typePass: 'password'
            })
        }
    }
    // show password feature

    checkPass = () =>
    {
        var inputPass = document.getElementById("password").value;
        var confPass = document.getElementById("confpassword").value;

        if (/\s/.test(inputPass)) 
        {
            this.setState({
                statusColorPass: 'red',
                statusPass: 'Please do not use space/tab for your password'
            })
            // to make sure that user password did not contain any whitespace
        }
        else
        {
            this.setState({
                statusColorPass: 'red',
                statusPass: ''
            })
            if (confPass === inputPass && confPass !== '')
            {
                this.setState({
                    statusColorPass: 'green',
                    statusPass: "Password Match"
                })
            }
            else if (confPass !== inputPass && confPass !== '')
            {
                this.setState({
                    statusColorPass: 'red',
                    statusPass: "Password Not Match"
                })
            }
        }
    }
    // confirm password feature

    takeValue = (val) =>
    {
        var fullname = val.fullname.value;
        var birth = val.birth.value;
        var username = val.username.value;
        var password = val.password.value;
        var confpassword = val.confpassword.value;
        var gender = val.genderID.value;
        var phone = val.phone.value;
        var email = val.email.value;
        var address = val.address.value;

        var listData = []
        listData.push(
            {
                fullname: fullname, birth: birth,
                username: username, password: password,
                confpassword: confpassword, gender: gender,
                phone: phone, email: email, address: address
            }
        )
        // console.log(listData)
        this.setState({
            listData: listData
        })
    }
    // change/take the form value

    register = (e) =>
    {
        e.preventDefault();
        var userData = this.state.listData
        var password = userData[0].password
        var confirmPass = userData[0].confpassword
        if (password === confirmPass)
        {
            axios.post('http://localhost:3001/Register', {
                userData: userData
            })
            .then((response) => {
                var result = response.data;
                if (result === 1)
                {
                    this.setState({
                        redirect: true
                    })
                    // registration success
                }
                else if (result === 0)
                {
                    this.setState({
                        statusUsername: 'Username already taken',
                        statusEmail: '',
                        statusColor: 'red'
                    })
                    // username already taken
                }
                else if (result === -1)
                {
                    this.setState({
                        statusEmail: 'Email already used',
                        statusUsername: '',
                        statusColor: 'red'
                    })
                    // email already used
                }
                else if (result === -2)
                {
                    this.setState({
                        statusUsername: 'Username and Email already used',
                        statusColor: 'red'
                    })
                    // both email and username already taken
                }
            })
        }
    }
    // sending the data into server

    render()
    {
        if (this.state.redirect) return <Redirect to='/Login'/>

        return (
            <div id="homeback">
                <div className="container padtop" style={{paddingBottom:25}}>
                    <div className="row">
                        <div className="col-md-10 col-md-offset-1">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h3 className="panel-title text-center" id="Pacifico" style={{fontSize:19}}>Registration</h3>
                                </div>
                                <div className="panel-body">
                                    <form onSubmit={this.register}>
                                        <fieldset>
                                            <div className="form-group col-md-4" style={{float:"left"}}>
                                                <div className="form-group">
                                                    <input className="form-control" placeholder="Full Name" ref="fullname" type="text" required/>
                                                </div>

                                                <div className="form-group">
                                                    <input className="form-control" placeholder="Birth" ref="birth" type="date" required/>
                                                </div>

                                                <div className="form-group">
                                                    <input className="form-control" placeholder="Username" ref="username" type="text" required/>
                                                    <label style={{fontSize:11, textIndent:8, color:this.state.statusColor}}>{this.state.statusUsername}</label>
                                                </div>
                                            </div>

                                            <div className="form-group col-md-4" style={{float:"left"}}>
                                                <div className="form-group">
                                                    <input className="form-control" placeholder="Phone" ref="phone" type="number" required/>
                                                </div>

                                                <div className="form-group">
                                                    <textarea style={{height:34}} className="form-control" placeholder="Address"
                                                    ref="address" type="text" required></textarea>
                                                </div>

                                                <div className="form-group">
                                                    <input className="form-control" placeholder="E-mail" ref="email" type="email" required/>
                                                    <label style={{fontSize:11, textIndent:8, color:this.state.statusColor}}>{this.state.statusEmail}</label>
                                                </div>
                                            </div>

                                            <div className="form-group col-md-4" style={{float:"left"}}>
                                                <div className="form-group">
                                                    <select className="form-control" style={{height:34, width:274.33, borderRadius:4}} id="genderID" ref="genderID" 
                                                    value={this.state.gender} onChange={this.selectGender} required>
                                                        <option value={0}>Sex</option>
                                                        <option value="Man">Man</option>
                                                        <option value="Woman">Woman</option>
                                                    </select>
                                                </div>

                                                <div className="form-group">
                                                    <input id="password" className="form-control borderrad2" style={{display:'inline-block', width:232}}
                                                    placeholder="Password" ref="password" type={this.state.typePass} onInput={this.checkPass} required/>
                                                    <button style={{verticalAlign:'top'}} type="button" className="btn btn-default borderrad1 hilangkan"
                                                    onClick={this.showPass}>
                                                        <span className={this.state.eyePass}></span>
                                                    </button>
                                                </div>

                                                <div className="form-group">
                                                    <input id="confpassword" className="form-control" onInput={this.checkPass}
                                                    placeholder="Confirm Password" ref="confpassword" type="password" required/>
                                                    <label style={{fontSize:11, textIndent:8, color:this.state.statusColorPass}}>
                                                        {this.state.statusPass}
                                                    </label>
                                                </div>
                                            </div>

                                            <button type="submit" onClick={() => this.takeValue(this.refs)} 
                                            className="btn btn-lg btn-block btn-register">Submit</button>
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