import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component
{
    render()
    {
        return (
            <div>
                <footer>
                    <div className="footerHeader col-xs-12 col-md-12"></div>
                    <div className="container">
                        <div className="col-md-6 col-xs-12">
                            <h3>Our Location </h3>
                            <iframe title="This is a unique title" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31726.41114246735!2d106.82156643899451!3d-6.289815258644433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f20d0da8dec1%3A0x2ed1af546a9b32d3!2sPasar+Minggu%2C+South+Jakarta+City%2C+Jakarta!5e0!3m2!1sen!2sid!4v1528761598881" style={{border:0, width:500, height:"auto"}} allowFullScreen/>
                        </div>
                        <div className="col-md-6 col-xs-12 text-right fontsizeku">
                            <h3>Contact Us</h3>
                            <ul>
                                <li>+6281-2985-5072-8 &nbsp; <span className="fab fa-whatsapp fontsizeku"></span></li>
                                <li>hannaacupcake@gmail.com &nbsp; <span className="fa fa-envelope fontsizeku"></span></li>
                                <li>@hannaacupcakes &nbsp; <span className="fab fa-line fontsizeku"></span></li>
                            </ul>
                            <ul className="sm">
                                <li><Link to="https://www.instagram.com/hannaacupcake/" target="_blank" id="nodecor"><i className="fab fa-instagram fontsizeku"></i></Link></li>
                                <li><Link to="https://www.youtube.com/channel/UCq7hYn8K1D0Ih8ru_iOeo6w" target="_blank" id="nodecor"><i className="fab fa-youtube fontsizeku"></i></Link></li>
                            </ul>
                        </div>
                        <span className="col-md-12 col-xs-12 text-center fontsizeku padding10" id="Lobster">&copy; <span id="Fountain">Han</span><sub id="Pacifico">Cakes</sub> 2018</span>
                    </div>
                </footer>
            </div>
        );
    }
}
export default Footer;