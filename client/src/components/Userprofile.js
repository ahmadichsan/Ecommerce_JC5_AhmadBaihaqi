import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';

const cookies = new Cookies();

class Userprofile extends Component
{
    state =
    {
        fullname: '',
        birth: '',
        username: '',
        gender: '',
        phone: '',
        email: '',
        address: '',
        statusOldPas: '',
        statusChangeProfile: <br/>
    }

    componentWillMount = () =>
    {
        // console.log(cookies.get('sessionID'))
        axios.post('http://localhost:3001/Userprofile', {
            userID: cookies.get('sessionID')
        })
        .then((response) => 
        {
            // console.log(response.data[0]);
            this.setState({
                prodlist: response.data[0],
                fullname: response.data[0].fullname,
                birth: response.data[0].birth,
                username: response.data[0].username,
                gender: response.data[0].gender,
                phone: response.data[0].phone,
                email: response.data[0].email,
                address: response.data[0].address
            })
        })
    }

    handleChange = (e) =>
    {
        this.setState({
            address: e.target.value
        })
    }

    selectGender = (e) =>
    {
        // console.log(e.target.value);
        this.setState({
            gender: e.target.value
        })
    }

    changeProfile = (val) =>
    {
        var fullname = val.fullname.value
        var birth = val.birth.value
        var username = val.username.value
        var gender = document.querySelector('input[name="gender"]:checked').value;
        var phone = val.phone.value
        var email = val.email.value
        var address = val.address.value
        var userID = cookies.get('sessionID')
        // console.log(fullname)
        // console.log(birth)
        // console.log(username)
        // console.log(gender)
        // console.log(phone)
        // console.log(email)
        // console.log(address)

        if (fullname !== '' && birth !== '' && username !== '' && gender !== '' && phone !== '' && email !== '' && address !== '')
        {
            axios.post('http://localhost:3001/changeProfile', 
            {
                userID: userID,
                fullname: fullname,
                birth: birth,
                username: username,
                gender: gender,
                phone: phone,
                email: email,
                address: address
            })
            .then((respon) => {
                var hasil = respon.data
                if (hasil === 1)
                {
                    axios.post('http://localhost:3001/Userprofile', 
                    {
                        userID: cookies.get('sessionID')
                    })
                    .then((response) => 
                    {
                        // console.log(response.data[0]);
                        this.setState({
                            prodlist: response.data[0],
                            fullname: response.data[0].fullname,
                            birth: response.data[0].birth,
                            username: response.data[0].username,
                            gender: response.data[0].gender,
                            phone: response.data[0].phone,
                            email: response.data[0].email,
                            address: response.data[0].address
                        })
                    })
                }
            })
        }
        else
        {
            this.setState({
                statusChangeProfile: 'Please fill all data'
            })
        }

        
    }
    
    checkOldPass = (e) =>
    {
        // console.log(e.target.value)
        var input = e.target.value
        var userID = cookies.get('seesionID')
        axios.post('http://localhost:3001/checkOldPass', {
            oldPass: input,
            userID: userID
        })
        .then((respon) => {
            var hasil = respon.data
            
        })
    }

    changePassword = () =>
    {
        
    }

    render()
    {
        // console.log(cookies.get('sessionID'))
        if (cookies.get('sessionID') === undefined)
        {
            return <Redirect to='/Login'/>
        }

        return (
            <div id="homeback">
                <div className="container-fluid padtop padbot">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <legend className="col-md-12 col-xs-12">Edit Profile</legend>
                                    <form className="form-horizontal">
                                        <div className="form-group">
                                            <label className="col-md-5 control-label" id="fromprof">Full Name</label>  
                                            <div className="col-md-5">
                                                <input ref="fullname" type="text" defaultValue={this.state.fullname} placeholder="Full Name" className="form-control"/>
                                            </div>
                                        </div>
                                            
                                        <div className="form-group">
                                            <label className="col-md-5 control-label" id="fromprof">Date of Birth</label>  
                                            <div className="col-md-5">
                                                <input ref="birth" type="date" defaultValue={this.state.birth} className="form-control input-md"/>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-md-5 control-label" id="fromprof">Username</label>  
                                            <div className="col-md-5">
                                                <input ref="username" type="text" defaultValue={this.state.username} placeholder="Username" className="form-control input-md"/>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-md-5 control-label" id="fromprof">Gender</label>  
                                            <div className="col-md-5">
                                                <label className="radio-inline">
                                                    <input type="radio" name="gender" onChange={this.selectGender} value="Man" checked={(this.state.gender === "Man")}/>
                                                    {/* if value of this.state.gender is  Man, then this radio button will get selected by default */}
                                                    Man
                                                </label>
                                                <label className="radio-inline">
                                                    <input type="radio" name="gender" onChange={this.selectGender} value="Woman" checked={(this.state.gender === "Woman")}/>
                                                    {/* if value of this.state.gender is  Woman, then this radio button will get selected by default */}
                                                    Woman
                                                </label>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-md-5 control-label" id="fromprof">Phone</label>  
                                            <div className="col-md-5">
                                                <input ref="phone" type="number" defaultValue={this.state.phone} placeholder="Phone No" className="form-control input-md"/>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-md-5 control-label" id="fromprof">Email</label>  
                                            <div className="col-md-5">
                                                <input ref="email" defaultValue={this.state.email} type="email" placeholder="Email Address" className="form-control input-md"/>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-md-5 control-label" id="fromprof">Address</label> 
                                            <div className="col-md-5">
                                                <textarea placeholder="Address" className="form-control" ref="address" rows="10" value={this.state.address} onChange={this.handleChange}>Address</textarea>
                                            </div>
                                            <div>
                                                <span style={{color:'red'}}>{this.state.statusChangeProfile}</span>
                                            </div>
                                        </div>
                                            
                                        <div className="form-group">
                                            <label className="col-md-5 control-label"></label>
                                            <div className="col-md-5">
                                                <button type="button" onClick={() => this.changeProfile(this.refs)} className="btn btn-success">Submit</button>
                                            </div>
                                        </div>
                                    </form>    
                                </div>
                            </div>
                
                            <div className="col-md-6">
                                <div className="form-group">
                                    <legend className="col-md-12 col-xs-12">Change Password</legend>
                                    <form className="form-horizontal">
                                        <div className="form-group">
                                            <label className="col-md-5 control-label" id="fromprof">Old Password</label>  
                                            <div className="col-md-5">
                                                <input id="oldpass" ref="oldpass" type="password" onChange={this.checkOldPass}
                                                placeholder="Old Password" className="form-control"/>
                                            </div>
                                        </div>
                                            
                                        <div className="form-group">
                                            <label className="col-md-5 control-label" id="fromprof">New Password</label>
                                            <div className="col-md-5">
                                                <input id="newpass" ref="newpass" type="password" placeholder="New Password" className="form-control"/>
                                            </div>
                                        </div>
                                            
                                        <div className="form-group">
                                            <label className="col-md-5 control-label" id="fromprof">Confirm Password</label>
                                            <div className="col-md-5">                     
                                                <input id="confpass" ref="confpass" type="password" placeholder="Confirm Password" className="form-control"/>
                                            </div>
                                        </div>
                                        
                                        <div className="form-group">
                                            <label className="col-md-5 control-label"></label>
                                            <div className="col-md-5">
                                                <input type="button" id="singlebutton" name="singlebutton" className="btn btn-success" defaultValue="Submit"/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-md-5 control-label"></label>
                                            <div className="col-md-5">
                                                <Link to="/Paymenthis" id="nodecor"><button className="btn btn-primary">My Payment History</button></Link>
                                            </div>
                                        </div>
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
export default Userprofile;