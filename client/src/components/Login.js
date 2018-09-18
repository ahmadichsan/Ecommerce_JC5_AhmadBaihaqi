// import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
// import axios from 'axios';
// import Cookies from 'universal-cookie';

// const cookies = new Cookies();

// class Login extends Component
// {
//     state =
//     {
//         redirect: false,
//         statusLogin: <br/>,
//         typePass: 'password'
//     }

//     showPass = () =>
//     {
//         if(document.getElementById("showpass").checked === true)
//         {
//             this.setState({
//                 typePass: 'text'
//             })
//             // console.log(this.state.typePass)
//         }
//         else if (document.getElementById("showpass").checked === false)
//         {
//             this.setState({
//                 typePass: 'password'
//             })
//             // console.log(this.state.typePass)
//         }
//     }

//     login = (userdata) =>
//     {
//         var username = userdata.username.value;
//         var password = userdata.password.value;
        
//         axios.post('http://localhost:3001/Login', 
//         {
//             username: username,
//             password: password
//         })
//         .then((response) => 
//         {
//             if (response.data !== -1)    
//             {
//                 var userSession = response.data;
//                 // console.log(response.data);
//                 cookies.set('sessionID', userSession, { path: '/' });
//                 this.setState({
//                     redirect: true
//                 })
//             }
//             else
//             {
//                 this.setState({
//                     statusLogin: 'Username/Password Incorrect'
//                 })
//             }
                
//         });    
//     }

//     render()
//     {   
//         if (this.state.redirect) return <Redirect to='/Userprofile'/>

//         return (
//             <div id="homeback">
//                 <div className="container padbot padtop">
//                     <div className="row">
//                         <div className="col-md-6 col-md-offset-3">
//                             <div className="panel panel-default">
//                                 <div className="panel-heading">
//                                     <h3 className="panel-title">Please Sign In</h3>
//                                 </div>
//                                 <div className="panel-body">
//                                     <form>
//                                         <fieldset>
//                                             <div className="form-group">
//                                                 <input className="form-control" placeholder="Username" ref="username" type="text"/>
//                                             </div>
//                                             <div className="form-group">
//                                                 <input className="form-control" placeholder="Password" ref="password" type={this.state.typePass}/>
//                                             </div>
//                                             <div className="checkbox">
//                                                 <label>
//                                                     <input id="showpass" type="checkbox" onChange={this.showPass}/> Show Password
//                                                 </label><br/>
//                                                 <span style={{color:'red'}}>{this.state.statusLogin}</span>
//                                             </div>
//                                             <button type="button" onClick={() => this.login(this.refs)} className="btn btn-lg btn-success btn-block">Login</button>
//                                         </fieldset>
//                                     </form>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }
// export default Login;

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
        typePass: 'password',
        eyePass: 'fa fa-eye-slash',
        eyeStatus: false,
        username: '',
        password: '',
        counter: 0
    }
    
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

    takeValue = (val) =>
    {
        this.setState({
            username: val.username.value,
            password: val.password.value
        })
    }
    // change/take the form value

    login = (userdata) =>
    {
        userdata.preventDefault();
        
        axios.post('http://localhost:3001/Login', 
        {
            username: this.state.username,
            password: this.state.password
        })
        .then((response) => 
        {
            var result = response.data
            // console.log(result)
            if (result === -1 || result === 0)    
            {
                this.setState({
                    statusLogin: 'Username/Password Incorrect',
                    counter: this.state.counter + 1
                })
                if (this.state.counter >= 3)
                {
                    this.setState({
                        statusLogin: 'If you do not have an account, please register instead'
                    })
                }
            }
            else
            {
                var userSession = response.data;
                cookies.set('sessionID', userSession, { path: '/' });
                this.setState({
                    redirect: true
                })
            }
                
        });    
    }
    // login function

    render()
    {   
        if (this.state.redirect) return <Redirect to='/Userprofile'/>

        return (
            <div id="homeback">
                <div className="container" style={{paddingBottom:57, paddingTop:58}}>
                    <div className="row">
                        <div className="col-md-6 col-md-offset-3">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h3 className="panel-title text-center" id="Pacifico" style={{fontSize:19}}>Please Sign In</h3>
                                </div>
                                <div className="panel-body">
                                    <form onSubmit={this.login}>
                                        <fieldset>
                                            <div className="form-group">
                                                <input className="form-control" placeholder="Username" ref="username" type="text"/>
                                            </div>
                                            <div className="form-group">
                                                <input id="password" className="form-control borderrad2" style={{display:'inline-block', width:481}}
                                                placeholder="Password" ref="password" type={this.state.typePass} onInput={this.checkPass} required/>
                                                <button style={{verticalAlign:'top'}} type="button" className="btn btn-default borderrad1 hilangkan"
                                                onClick={this.showPass}>
                                                    <span className={this.state.eyePass}></span>
                                                </button>
                                            </div>
                                            <div style={{color:'red'}}>{this.state.statusLogin}</div><br/>
                                            <button type="submit" onClick={() => this.takeValue(this.refs)} className="btn btn-lg btn-success btn-block">Login</button>
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