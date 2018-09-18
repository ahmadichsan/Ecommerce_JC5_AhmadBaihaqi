import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';

export default class Logout extends Component 
{
  render() 
  {
    const cookies = new Cookies();
    cookies.remove('sessionID');

    if (cookies.get('sessionID') === undefined) return <Redirect to='/Login'/>
    
    return (
      <div>
        
      </div>
    )
  }
}
