import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component
{
    render()
    {
        return (
            <div id="homeback">
                <div className="jumbotron backjumbo paddingku col-md-12">
                    <div className="kotakku">
                        <div className="container-fluid">
                        <center style={{marginTop:160}}>
                            <h1 id="Pacifico" style={{color:"gold", letterSpacing:15}}>Hello, Sweet Lovers!</h1>
                            <p className="lead" id="Lobster">Sweet treat delicate for yours.</p>
                            <hr className="my-4"/>
                            <p id="Fugaz" style={{color:"black",fontSize:30}}>#IndieCakery <br/> #WeCountMemoriesNotCalories</p>
                            <div className="lead">
                                <a className="btn btn-primary btn-lg" href="#newestproduct">Grab Our Newest Product!</a>&nbsp;
                                <a className="btn btn-success btn-lg" href="#mostordered">Our Most Ordered Product!</a><br/><br/>
                                <center>
                                    <a className="btn btn-warning btn-lg" href="#custtest">Cust Testimonials</a>
                                </center>
                            </div>
                        </center>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-md-12 garisnya">
                            <h2 id="mostordered"><b>Most</b> Ordered</h2>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="card ada mb-3">
                                        <div className="card-header">
                                            <Link to="/Productdetail" id="nodecor"><h3>Fia's Cake</h3></Link>
                                        </div>
                                        <div className="card-body">
                                            <img className="" id="stylegambar" src="bootstrap-3.3.7-dist/css/img/stock/used/box1.jpg" alt=""/>     
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card ada mb-3">
                                        <div className="card-header">
                                            <Link to="/Productdetail" id="nodecor"><h3>Pony Horse Cake</h3></Link>
                                        </div>
                                        <div className="card-body">
                                            <img className="" id="stylegambar" src="bootstrap-3.3.7-dist/css/img/stock/used/box2.jpg" alt=""/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card ada mb-3">
                                        <div className="card-header">
                                            <Link to="/Productdetail" id="nodecor"><h3>Papa Cupcake</h3></Link>
                                        </div>
                                        <div className="card-body">
                                            <img className="" id="stylegambar" src="bootstrap-3.3.7-dist/css/img/stock/used/box3.jpg" alt=""/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card ada mb-3">
                                        <div className="card-header">
                                            <Link to="/Productdetail" id="nodecor"><h3>Muslimah Cupcake</h3></Link>
                                        </div>
                                        <div className="card-body">
                                            <img className="" id="stylegambar" src="bootstrap-3.3.7-dist/css/img/stock/used/box4.jpg" alt=""/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card ada mb-3">
                                        <div className="card-header">
                                            <Link to="/Productdetail" id="nodecor"><h3>Birthday Cupcake</h3></Link>
                                        </div>
                                        <div className="card-body">
                                            <img className="" id="stylegambar" src="bootstrap-3.3.7-dist/css/img/stock/used/box5.jpg" alt=""/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card ada mb-3">
                                        <div className="card-header">
                                            <Link to="/Productdetail" id="nodecor"><h3>Pure-white Wedding Cake</h3></Link>
                                        </div>
                                        <div className="card-body">
                                            <img className="" id="stylegambar" src="bootstrap-3.3.7-dist/css/img/stock/used/box6.jpg" alt=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <section id="testimonial">
                    <div className="container" id="custtest">
                        <div className="row text-center garisnya">
                            <h2 id="Pacifico" style={{letterSpacing:30}}><b>Testimonials</b></h2>
                        </div>
                        <div className="row">
                            <div className="testimonial-part">  
                                <div className="col-lg-9 col-md-9 col-sm-8 col-xs-12">
                                    <div className="comment-box">
                                        <p>Kuenya enak banget!! Kemarin saya beli cupcake isi enam. Engga nyesel deh beli cupcake di HanCake! Harganya terjangkau sama kantong mahasiswa, rasanya enak, desainnya juga lucu-lucu. Kalau mau beli kue lagi sudah pasti saya akan ke HanCake dong! Makasih banyak HanCake! - Risti, Mahasiswi
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                                    <img className="img-circle" src="bootstrap-3.3.7-dist/css/img/girls.jpg" style={{width:150,height:150}} alt=""/>
                                </div>
                            </div>  
                        </div> 
                            
                        <div className="row">
                            <div className="testimonial-part">
                                <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12 text-right">
                                    <img className="img-circle" src="bootstrap-3.3.7-dist/css/img/faldo.jpg" style={{width:150,height:150}} alt=""/>
                                </div>
                                <div className="col-lg-9 col-md-9 col-sm-8 col-xs-12">
                                    <div className="comment-box2">
                                        <p>Pernikahan saya menjadi sangat berkesan karena memesan Wedding Cake di HanCake! Desainnya simpel namun rasanya benar-benar di luar dugaan saya, sangat enak! Harganya juga murah dibandingkan dengan kebanyakan Wedding Cake. Jadi, saya sangat merekomendasikan HanCake bagi kalian yang ingin memesan Wedding Cake! Thank you, HanCake! - Faldo, Pegawai Swasta
                                        </p>
                                    </div>
                                </div>
                            </div>				
                        </div>
                        <div className="row">
                            <div className="testimonial-part">
                                <div className="col-lg-9 col-md-9 col-sm-8 col-xs-12">
                                    <div className="comment-box">
                                        <p>私はHanCakeを知って幸運です！ ケーキは非常においしい、価格は非常に手頃な価格です。 これはジャカルタを訪れた初めての経験であり、同僚がこのカップケーキを買うことを勧めました。 私は本当にとても幸せで、HanCakeから与えられたことには失望していません。 HanCakeありがとう！ - Yui, Tourist
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                                    <img className="img-circle" src="bootstrap-3.3.7-dist/css/img/yui.jpg" style={{width:150,height:150}} alt=""/>
                                </div>
                            </div>
                        </div>   
                    </div>    
                </section>
                
                <div className="container" id="newestproduct">
                    <div className="row">
                        <div className="col-md-12 garisnya">
                            <h2>Newest <b>Products</b></h2>
                            <div id="myCarousel" className="carousel slide" data-ride="carousel" data-interval="0">
                                <ol className="carousel-indicators">
                                    <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                                    <li data-target="#myCarousel" data-slide-to="1"></li>
                                    <li data-target="#myCarousel" data-slide-to="2"></li>
                                </ol>   
                                <div className="carousel-inner">
                                    <div className="item carousel-item active">
                                        <div className="row">
                                            <div className="col-sm-4 col-xs-12">
                                                <div className="thumb-wrapper">
                                                    <div className="img-box">
                                                        <Link to="/Productdetail">
                                                            <img src="bootstrap-3.3.7-dist/css/img/stock/used/box1.jpg" className="img-responsive img-fluid" alt=""/>
                                                        </Link>
                                                    </div>
                                                    <div className="thumb-content">
                                                        <h4>Fia's Cake</h4>
                                                        <p className="item-price">
                                                            <span>IDR250.000</span>
                                                        </p>
                                                        <Link to="/Productdetail" className="btn btn-primary">Add to Cart</Link>
                                                    </div>						
                                                </div>
                                            </div>
                                            <div className="col-sm-4 col-xs-12">
                                                <div className="thumb-wrapper">
                                                    <div className="img-box">
                                                        <Link to="/Productdetail">
                                                            <img src="bootstrap-3.3.7-dist/css/img/stock/used/box2.jpg" className="img-responsive img-fluid" alt=""/>
                                                        </Link>
                                                    </div>
                                                    <div className="thumb-content">
                                                        <h4>Pony Horse Cake</h4>
                                                        <p className="item-price"><span>IDR300.000</span></p>
                                                        <Link to="/Productdetail" className="btn btn-primary">Add to Cart</Link>
                                                    </div>						
                                                </div>
                                            </div>		
                                            <div className="col-sm-4 col-xs-12">
                                                <div className="thumb-wrapper">
                                                    <div className="img-box">
                                                        <Link to="/Productdetail">
                                                            <img src="bootstrap-3.3.7-dist/css/img/stock/used/box3.jpg" className="img-responsive img-fluid" alt=""/>
                                                        </Link>
                                                    </div>
                                                    <div className="thumb-content">
                                                        <h4>Papa Cupcake</h4>
                                                        <p className="item-price"><span>IDR150.000</span></p>
                                                        <Link to="/Productdetail" className="btn btn-primary">Add to Cart</Link>
                                                    </div>						
                                                </div>
                                            </div>								
                                        </div>
                                    </div>

                                    <div className="item carousel-item">
                                        <div className="row">
                                            <div className="col-sm-4 col-xs-12">
                                                <div className="thumb-wrapper">
                                                    <div className="img-box">
                                                        <Link to="/Productdetail">
                                                            <img src="bootstrap-3.3.7-dist/css/img/stock/used/box4.jpg" className="img-responsive img-fluid" alt=""/>
                                                        </Link>
                                                    </div>
                                                    <div className="thumb-content">
                                                        <h4>Muslimah Cupcake</h4>
                                                        <p className="item-price"><span>IDR95.000</span></p>
                                                        <Link to="/Productdetail" className="btn btn-primary">Add to Cart</Link>
                                                    </div>						
                                                </div>
                                            </div>
                                            <div className="col-sm-4 col-xs-12">
                                                <div className="thumb-wrapper">
                                                    <div className="img-box">
                                                        <Link to="/Productdetail">
                                                            <img src="bootstrap-3.3.7-dist/css/img/stock/used/box5.jpg" className="img-responsive img-fluid" alt=""/>
                                                        </Link>
                                                    </div>
                                                    <div className="thumb-content">
                                                        <h4>Birthday Cupcake</h4>
                                                        <p className="item-price"><span>IDR95.000</span></p>                                            
                                                        <Link to="/Productdetail" className="btn btn-primary">Add to Cart</Link>
                                                    </div>						
                                                </div>
                                            </div>
                                            <div className="col-sm-4 col-xs-12">
                                                <div className="thumb-wrapper">
                                                    <div className="img-box">
                                                        <Link to="/Productdetail">
                                                            <img src="bootstrap-3.3.7-dist/css/img/stock/used/box6.jpg" className="img-responsive img-fluid" alt=""/>
                                                        </Link>
                                                    </div>
                                                    <div className="thumb-content">
                                                        <h4>Pure-white Wedding Cake</h4>
                                                        <p className="item-price"><span>IDR1.000.000</span></p>
                                                        <Link to="/Productdetail" className="btn btn-primary">Add to Cart</Link>
                                                    </div>						
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="item carousel-item">
                                        <div className="row">
                                            <div className="col-sm-4 col-xs-12">
                                                <div className="thumb-wrapper">
                                                    <div className="img-box">
                                                        <Link to="/Productdetail">
                                                            <img src="bootstrap-3.3.7-dist/css/img/stock/used/box7.jpg" className="img-responsive img-fluid" alt=""/>
                                                        </Link>
                                                    </div>
                                                    <div className="thumb-content">
                                                        <h4>Wedding Cupcake</h4>
                                                        <p className="item-price"><span>IDR400.000</span></p>                                            
                                                        <Link to="/Productdetail" className="btn btn-primary">Add to Cart</Link>
                                                    </div>						
                                                </div>
                                            </div>
                                            <div className="col-sm-4 col-xs-12">
                                                <div className="thumb-wrapper">
                                                    <div className="img-box">
                                                        <Link to="/Productdetail">
                                                            <img src="bootstrap-3.3.7-dist/css/img/stock/used/box8.jpg" className="img-responsive img-fluid" alt=""/>
                                                        </Link>
                                                    </div>
                                                    <div className="thumb-content">
                                                        <h4>Cakepops</h4>
                                                        <p className="item-price"><span>IDR40.000</span></p>
                                                        <Link to="/Productdetail" className="btn btn-primary">Add to Cart</Link>
                                                    </div>						
                                                </div>
                                            </div>
                                            <div className="col-sm-4 col-xs-12">
                                                <div className="thumb-wrapper">
                                                    <div className="img-box">
                                                        <Link to="/Productdetail">
                                                            <img src="bootstrap-3.3.7-dist/css/img/stock/used/box9.jpg" className="img-responsive img-fluid" alt=""/>
                                                        </Link>
                                                    </div>
                                                    <div className="thumb-content">
                                                        <h4>Engagement Cupcake</h4>
                                                        <p className="item-price"><span>IDR75.000</span></p>                                            
                                                        <Link to="/Productdetail" className="btn btn-primary">Add to Cart</Link>
                                                    </div>						
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        
                                <a className="carousel-control left carousel-control-prev" href="#myCarousel" data-slide="prev">
                                    <i className="fa fa-angle-left"></i>
                                </a>
                                <a className="carousel-control right carousel-control-next" href="#myCarousel" data-slide="next">
                                    <i className="fa fa-angle-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <button id="myBtn"><i className="fa fa-caret-up"></i></button>
            </div>
        );
    }
}
export default Home;