import React, { Component } from 'react';

// import Cookies from 'universal-cookie';


class Aboutus extends Component
{
    render()
    {
        // const cookies = new Cookies();
        // console.log(cookies.get('myCat')); // Pacman
        // cookies.remove('myCat');
        // console.log(cookies.get('myCat')); // Pacman

        return (
            <div id="homeback">
                <div className="padtop padbot">    
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 garisnya kotaknya">
                                <h2><b>About</b> us</h2>
                                <p id="justifylah">
                                    I am a half student and a half baker. I'm student of Chemistry Department in University of Indonesia.
                                    Hannaacupcake has been operating since 2011.
                                    we are speacialty on custom cupcake, cake, cakepops, cookies, jarcake and sweet desserts.
                                    We can make your day more special and happy!
                                    Come on be your own desainer to your cake!
                                    the cake is made with much love and don't worry about the taste, we used the great ingredients and also <b>HALAL</b>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Aboutus;