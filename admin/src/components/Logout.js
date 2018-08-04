import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';

export default class Logout extends Component {
  render() {
        const cookies = new Cookies();
        cookies.remove('adminID');

        if (cookies.get('adminID') === undefined)
        {
            return <Redirect to='/'/>
        }
    return (
      <div>
        
      </div>
    )
  }
}
