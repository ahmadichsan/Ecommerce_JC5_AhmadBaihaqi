import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Productlist extends Component
{
    state =
    {
        prodlist: [],
        catlist: []
    }

    componentWillMount = () =>
    {
        axios.get('http://localhost:3001/Productlist')
        .then((response) => 
        {
            // console.log(response.data[0]);
            // console.log(response.data[1]);
            this.setState({
                prodlist: response.data[0],
                catlist: response.data[1]
            })
        })
    }
    // To send request product and category list to server and display the response

    render()
    {
        const daftarproduk = this.state.prodlist.map((item, index) =>
        {
            let prodid = item.id;
            let prodname = item.prod_name;
            let prodimage = item.prod_img;
            return <div key={index} className="col-md-6">
            <div className="card ada mb-3">
                <div className="card-header">
                    <Link to={{pathname: '/Productdetail/' + prodid, state: {prodid: prodid}}} id="nodecor"><h3>{prodname}</h3></Link>
                </div>
                <div className="card-body">
                    <img className="" id="stylegambar" src={'http://localhost:3001/images/' + prodimage} alt="asd"/>
                </div>
            </div>
        </div>
        })
        // for mapping the product list

        const datakategori = [].concat(this.state.catlist)
            .sort((a, b) => a.category > b.category)
            .map((item, i) =>
            {
                return <li key={i} className="list-group-item">
                    <label className="checkbox-inline">
                        <input type="radio" name="cat" value={item.id}/> {item.category}
                    </label>
                </li>
            }
        );
        // for mapping the category list also sort it ascending

        return (
            <div className="padtop padbot" id="homeback">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3 col-sm-3">
                            <div className="card bg-light mb-3 nobordercard">
                                <a href="#cat" data-toggle="collapse" className="card-header text-uppercase" id="nodecor"><i className="fa fa-list"></i> Filter Categories</a>
                                <form>
                                    <ul className="list-group category_block collapse" id="cat">
                                        {datakategori}
                                        <li className="list-group-item"><input type="button" className="btn btn-success" value="Apply"/>&nbsp;
                                        <input type="reset" className="btn btn-danger" value="Clear"/></li>
                                    </ul>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-8 col-sm-8">
                            <div className="row">
                                {daftarproduk}
                            </div>
                            <div className="text-center col-md-12 col-sm-12 col-xs-12">
                                <ul className="pagination">
                                    <li className="page-item disabled">
                                        <a className="page-link" href="">&laquo;</a>
                                    </li>
                                    <li className="page-item active">
                                        <a className="page-link" href="">1</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="">2</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="">3</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="">4</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="">5</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="">&raquo;</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <button id="myBtn"><i className="fa fa-caret-up"></i></button>
            </div>
        );
    }
}
export default Productlist;