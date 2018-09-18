import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookie = new Cookies()

class Navbar2 extends Component
{
    state = 
    {
        username: 'User',
        jumlahcart: 0
    }

    componentDidMount = () =>
    {
        // console.log(this.props.user)
        var userID = this.props.user
        if (userID !== undefined)
        {
            axios.post('http://localhost:3001/checkUsername', 
            {
                userID: userID
            })
            .then((response) => {
                var result = response.data.username
                // console.log(result)
                this.setState({
                    username: result
                })
            })

            axios.post('http://localhost:3001/jumlahcart', 
            {
                userID: userID
            })
            .then((response) => {
                var result = response.data.jumlahcart
                if (result !== null)
                {
                    this.setState({
                        jumlahcart: result
                    })
                }
                else
                {
                    this.setState({
                        jumlahcart: 0
                    })
                }
            })
        }
        else
        {
            this.setState({
                username: 'User',
                jumlahcart: 0
            })
        }
    }

    componentWillReceiveProps = (userID) =>
    {
        // console.log(userID.user)
        userID = userID.user
        if (userID !== undefined)
        {
            axios.post('http://localhost:3001/checkUsername', 
            {
                userID: userID
            })
            .then((response) => {
                var result = response.data.username
                // console.log(result)
                this.setState({
                    username: result
                })
            })

            axios.post('http://localhost:3001/jumlahcart', 
            {
                userID: userID
            })
            .then((response) => {
                var result = response.data.jumlahcart
                // console.log(result)
                if (result !== null)
                {
                    this.setState({
                        jumlahcart: result
                    })
                }
                else
                {
                    this.setState({
                        jumlahcart: 0
                    })
                }
            })
        }
        else
        {
            this.setState({
                username: 'User',
                jumlahcart: 0
            })
        }
    }

    logout = () =>
    {
        cookie.remove('sessionID')
    }

    render()
    {
        const opsi1 = <ul className="dropdown-menu tambahnya">
            <li><Link to="/Login">Login</Link></li>
            <li><Link to="/Register">Register</Link></li>
        </ul>

        const opsi2 = <ul className="dropdown-menu tambahnya">
            <li><Link to="/Userprofile">Profile</Link></li>
            <li onClick={this.logout}><Link to="/Login">Logout</Link></li>
        </ul>

        const opsichoosen = (this.props.user !== undefined) ? opsi2 : opsi1

        return (
            <div>
                <nav className="navbar navbar-default" id="colorback">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <Link to="/" className="navbar-brand fontsizeku"><span id="Fountain">Han</span><sub id="Pacifico">Cakes</sub></Link>
                        </div>
                        
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <form className="navbar-form navbar-left">
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="What are you looking for?" id="borderrad2"/>
                                </div>
                                <button type="submit" className="btn btn-default" id="borderrad1"><i className="fa fa-search"></i></button>&nbsp;
                                <Link to="/Cart">
                                    <button type="button" className="btn btn-default">
                                        <span className="fa fa-shopping-cart"></span>
                                        <span className="badge badge-success pull-right">{this.state.jumlahcart}</span>
                                    </button>
                                </Link>    
                            </form>
                            
                            <ul className="nav navbar-nav navbar-right">
                                <li><Link to="/Aboutus">About us</Link></li>
                                <li><Link to="/Productlist">Product</Link></li>
                                <li className="dropdown">
                                    <a href="" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{this.state.username} <span className="caret"></span></a>
                                    {opsichoosen}
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}
export default Navbar2;