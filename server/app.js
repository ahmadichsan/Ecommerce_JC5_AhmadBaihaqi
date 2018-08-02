// ================================================== SERVER CONFIG ==================================================
var express = require('express'); 
var app = express();

app.use('/images', express.static('images'));
// this is important for you to display the images. See the client site code in product list. See how the code
// to pull the images

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var upload = require('express-fileupload');
app.use(upload());

var cors = require('cors');
app.use(cors());

const crypto = require('crypto');
const secret = 'abcdefg';

const mysql = require('mysql');
const db = mysql.createConnection({ 
  host : 'localhost', 
  port: '3306',
  user : 'root', 
  password : '',
  database : 'ecommerce',
  multipleStatements: true
});
db.connect();


// ================================================== ADMIN SECTION ==================================================

app.get('/', (req, res) => {
  res.send('Halaman Server')
  // res.sendFile('/images/box1.jpg', {root : __dirname})
})
// Starting point

app.post('/admlogin', (req, res) => {

  var Username = req.body.username;
  var Password = req.body.password;
  
  // console.log(Username);
  // console.log(Password);
  // res.end();
  
  const encpass = crypto.createHash('sha256', secret).update(Password).digest('hex');
  // console.log(encpass);

  var pullData = "SELECT * FROM admin";
  db.query(pullData, (err, result) => { 
    if(err) throw err;
    else {
      for (var i=0; i<result.length; i++)
      {
        if (Username === result[i].Username && encpass === result[i].Password)
        {
          console.log('Login Berhasil');
          var status = '1';
          res.send(status);
          break;
        }
        else if (i === result.length-1)
        {
          console.log('Data tidak ditemukan, login gagal');
          var status = '-1';
          res.send(status);
        }
      }
    }
  });
})
// Admin Login
// NOTE: Admin login is not set up yet, also at the front-end the redux for login still not set up

// ========================= ADMIN - Product =========================

app.get('/Product', (req, res) =>
{
  var pullData = 'SELECT * FROM product;'
  pullData += 'SELECT * FROM category'
  db.query(pullData, (err, results) => { 
    if(err) {
      throw err
    } else {
      res.send(results);
      // console.log(results[1]);
    };
  });
})
// Admin Pull Data Product (for Product List) and Category (for input Category when Admin add new product) List

app.get('/Editproduct', (req, res) =>
{
    var pullData = 'SELECT * FROM category'
    db.query(pullData, (err, results) => { 
      if(err) {
        throw err
      } else {
        res.send(results);
      };
    });
})
// Admin Pull Data Category (for input Category when Admin edit new product) List

app.post('/Addprod', (req, res) =>
{
  var prod_name = req.body.prodName;
  var prod_price = req.body.prodPrice;
  var prod_cat = req.body.prodCat;
  var prod_desc = req.body.prodDesc;
  var prod_img = req.files.prodImg.name;
  
  // console.log(prod_name)
  // console.log('4: ' + prod_price);
  // console.log('5: ' + prod_cat);
  // console.log('6: ' + prod_desc);
  // console.log('7: ' + prod_img);

  if(prod_name !== '' && prod_price !== '' && prod_cat !== '' && prod_desc !== '' && prod_img !== '')
  {
    // If-else condition above to make sure that not null value inserted into table database
    console.log('3: ' + prod_name);
    console.log('4: ' + prod_price);
    console.log('5: ' + prod_cat);
    console.log('6: ' + prod_desc);
    console.log('7: ' + prod_img);

    var ImgFile = req.files.prodImg;
    ImgFile.mv("./images/" + prod_img, (err) =>
    {
      // upload image
      if(err)
      {
        console.log('Upload failed');
      }
      else 
      {
        console.log('Upload succeed');
        var newData = `INSERT INTO product SET cat_id="${prod_cat}", prod_name="${prod_name}", prod_img='${prod_img}', prod_price='${prod_price}', prod_desc='${prod_desc}' `;
        // query above to insert new product
        db.query(newData, (err, result) => { 
          if(err) throw err;
          else
          {
            var takeProdCatAmount = `SELECT totalprod FROM category WHERE id="${prod_cat}"`
            // query above to take the inital amount (before new product added) of product based on categoryID
              db.query(takeProdCatAmount, (err, result) => {
              if (err) {
                throw err
              }
              else
              {
                var initialAmount = result[0].totalprod;
                var newAmount = initialAmount + 1;
                var addProdAmount = `UPDATE category SET totalprod="${newAmount}" WHERE id="${prod_cat}"`
                // query above to update the total amount of product based on the category after new product was added
                db.query(addProdAmount, (err, result) => {
                  if (err) throw err
                })
              }
            })
          }
        });
      }
    })
  }
})
// Admin Add Product - Take value from Client and send it into database

app.post('/Editproduct', (req, res) =>
{
  var prod_id = req.body.prodID;
  var prod_name = req.body.prodName;
  var prod_price = req.body.prodPrice;
  var prod_cat = req.body.prodCat;
  var prod_desc = req.body.prodDesc;
  
  // console.log('1: ' + prod_id);
  // console.log('2: ' + prod_name);
  // console.log('3: ' + prod_price);
  // console.log('4: ' + prod_cat);
  // console.log('5: ' + prod_desc);

  if(req.files)
  {
    var prod_img = req.files.prodImg.name;
    // console.log('6: ' + prod_img);
    var ImgFile = req.files.prodImg;
    ImgFile.mv("./images/" + prod_img, (err) =>
    {
      if(err)
      {
        // res.send('Upload failed');
        console.log('Upload failed');
      }
      else
      {
        // res.send('Upload berhasil');
        console.log('Upload succeed');
        var editData = `UPDATE product SET prod_name="${prod_name}", prod_img='${prod_img}', prod_price='${prod_price}', cat_id='${prod_cat}', prod_desc='${prod_desc}' WHERE id='${prod_id}' `;
        db.query(editData, (err, result) => { 
          if(err) throw err;
        });
      }
    })
  }
  else
  {
    var editData = `UPDATE product SET prod_name="${prod_name}", prod_price='${prod_price}', cat_id='${prod_cat}', prod_desc='${prod_desc}' WHERE id='${prod_id}' `;
    db.query(editData, (err, result) => { 
      if(err) throw err;
    });
    console.log('6: tanpa gambar')
  }
})
// Admin Edit Product - Take value from Client and send it into database (update database)

app.post('/Delproduct', (req, res) =>
{  
  var idproduk = req.body.produkID;
  // console.log(idproduk);

  var takeCat = `SELECT cat_id FROM product WHERE id="${idproduk}"`
  // query above to take the category ID of the deleted product ID
  db.query(takeCat, (err, result) => { 
    if(err) {
      throw err
    }
    else
    {
      var categoryID = result[0].cat_id;
      var takeProdCatAmount = `SELECT totalprod FROM category WHERE id="${categoryID}"`
      // query above to take the inital amount (before product deleted) of product based on categoryID
      db.query(takeProdCatAmount, (err, result) => {
        if (err) {
          throw err
        }
        else
        {
          var initialAmount = result[0].totalprod;
          var newAmount = initialAmount - 1;
          var reduceProdAmount = `UPDATE category SET totalprod="${newAmount}" WHERE id="${categoryID}"`
          // query above to update the total amount of product based on the category after a product was delete
          db.query(reduceProdAmount, (err, result) => {
            if (err) throw err
          })
        }
      })
    }
  });

  var delData = `DELETE FROM product where id='${idproduk}'`
  // query above to delete the data
  db.query(delData, (err, result) => { 
    if(err) {
      throw err
    }
  });
  // Notes: we have to update the total product first, then deleted the data
})
// Admin Del Product
// NOTE: Product set up, DONE

// ========================= ADMIN - Category =========================

app.get('/Category', (req, res) => {
  
  var pullData = 'SELECT * FROM category'
  db.query(pullData, (err, result) => { 
    if(err) {
      throw err
    } else {
      res.send(result);
    };
  });
})
// Admin Category List

app.post('/Addcat', (req, res) =>
{
  var cat_stat = req.body.status;
  var cat_id = req.body.catID;
  var cat_name = req.body.catName;
  
  // console.log(cat_stat);
  // console.log(cat_id);
  // console.log(cat_name);

  var prodamount = `SELECT * FROM product WHERE cat_id="${cat_id}"`;
  db.query(prodamount, (err, result) => { 
    if(err) throw err;
    // else console.log(result.length);
    else
    {
      if (cat_stat === 'newcat')
      {
        // console.log(produknama);
        // console.log(produkharga);
        // console.log(produkgambar);
        var newData = `INSERT INTO category SET category="${cat_name}", totalprod="${result.length}"`;
        db.query(newData, (err, result) => { 
          if(err) throw err;
        });
      }
      else if (cat_stat === 'editcat')
      {
        // console.log(produkid);
        // console.log(produknama);
        // console.log(produkharga);
        var editData = `UPDATE category SET category='${cat_name}', totalprod="${result.length}" WHERE id='${cat_id}' `;
        db.query(editData, (err, result) => { 
          if(err) throw err;
        });
      }
    }
  });
  res.end();
})
// Admin Add and Edit Category

app.post('/Delcat', (req, res) =>
{  
  var cat_id = req.body.catID;
  // console.log(idproduk);

  var delProdCat = `DELETE FROM product WHERE cat_id="${cat_id}"`
  // query above to delete all product with specific category id
  db.query(delProdCat, (err, result) => {
    if (err) throw err;
    else
    {
      var delData = `DELETE FROM category WHERE id='${cat_id}'`;
      // query above to delete the category
      db.query(delData, (err, result) => { 
        if(err) {
          throw err
        }
      });  
    }
  })
})
// Admin Delete category
// NOTE: Category set up, DONE

// ================================================== USER SECTION ==================================================

app.post('/Register', (req, res) =>
{
  var FullName = req.body.fullname;
  var Birth = req.body.birth;
  var Username = req.body.username;
  var Password = req.body.password;
  // var Confpass = req.body.confpassword;
  var Gender = req.body.gender;
  var Phone = req.body.phone;
  var Email = req.body.email;
  var Address = req.body.address;
            
  console.log(FullName);
  console.log(Birth);
  console.log(Username);
  console.log(Password);
  // console.log(Confpass);
  console.log(Gender);
  console.log(Phone);
  console.log(Email);
  console.log(Address);
  
  var encpass = crypto.createHash('sha256', secret).update(Password).digest('hex');
  // console.log(encpass);

  var sql = `INSERT INTO userprofile SET fullname="${FullName}", birth="${Birth}", 
  username="${Username}", password="${Password}", 
  gender="${Gender}", phone="${Phone}", 
  email="${Email}", address="${Address}"`;
  db.query(sql, (err, result) => { 
    if(err) throw err;
    else
    {
      res.send('1')
    }
  });
})
// User Register

app.post('/Login', (req, res) =>
{
  var Username = req.body.username;
  var Password = req.body.password;
            
  // console.log(Username);
  // console.log(Password);
  
  var encpass = crypto.createHash('sha256', secret).update(Password).digest('hex');
  // console.log(encpass);

  var pullData = "SELECT * FROM userprofile";
  db.query(pullData, (err, result) => {
    if (err) throw err;
    else
    {
      for (var i=0; i<result.length; i++)
      {
        if (Username === result[i].username && Password === result[i].password)
        {
          console.log('Login Berhasil');
          // console.log(result[i].id)
          var userID = result[i].id;
          res.send((userID).toString());
          break;
        }
        else if (i === result.length-1)
        {
          console.log('Data tidak ditemukan, login gagal');
        }
      }
    }
  })
})
// User Login

app.get('/Productlist', (req, res) =>
{
    var pullData = 'SELECT * FROM product;'
    pullData += 'SELECT * FROM category'
    db.query(pullData, (err, results) => { 
      if(err) {
        throw err
      } else {
        res.send(results);
        // res.sendFile('/images/box1.jpg', {root : __dirname})
        // console.log(results[1]);
      };
    });
})
// User Product List

app.get('/Productdetail/:id', (req, res) =>
{
  var productID = req.params.id;
    var pullData = `SELECT * FROM product WHERE id=${productID}`
    // query above to take all data from a specific product id
    db.query(pullData, (err, hasil) => { 
      if(err) {
        throw err
      } else {
        // console.log(results[0].cat_id);
        var prodcatid = hasil[0].cat_id;
        // variable above to take the category id of the selected product
        var pullcatname = `SELECT category FROM category WHERE id="${prodcatid}"`
        // query above to take the name of the category based on category id of the selected product
        db.query(pullcatname, (err, results) => {
          if (err) throw err;
          else
          {
            // console.log(results[0].category);
            var catname = results[0].category;
            // varable above contain the name of the category of the selected product
            var finaldata =
            [
              {
                hasil
              },
              {
                catname
              }
            ]
            res.send(finaldata);
          }
        })
      };
    });
})
// User Product Detail

app.post('/Userprofile', (req, res) => {
  
  var userID = req.body.userID

  var pullData = `SELECT * FROM userprofile WHERE id="${userID}"`
  db.query(pullData, (err, result) => { 
    if(err) {
      throw err
    } else {
      res.send(result);
    };
  });
})
// to get the user data in userprofile

app.post('/Order', (req, res) => {
  
  var userID = req.body.UserID;
  var Qty = req.body.prodQty;
  var prodID = req.body.prodID;

  // console.log(userID);
  // console.log(Qty);
  // console.log(prodID);

  if (Qty > 0)
  {
    var storeData = `INSERT INTO cart SET user_id="${userID}", prod_id="${prodID}", qty="${Qty}"`
    db.query(storeData, (err, result) => { 
      if(err) {
        throw err
      } else {
        var status = '1';
        res.send(status);
        // console.log('cart success')
      };
    });
  }
})
// Add to cart

app.post('/Cart', (req, res) =>
{
  var userID = req.body.UserID;
    var pullData = `SELECT * FROM cart WHERE user_id="${userID}"`
    db.query(pullData, (err, hasil) => { 
      if(err) {
        throw err
      } else {
        res.send('1');
        // console.log(results)
        var cartitem = [];
        for (var i=0; i<hasil.length; i++)
        {
          var produkID = hasil[i].prod_id;
          // console.log(produkID);
          // var pulldetprod = `SELECT * FROM product WHERE id="${produkID}"`
          // db.query(pulldetprod, (err, results) => {
          //   if (err) throw err;
          //   else
          //   {
          //     // cartitem.push(results);
          //     console.log(results)
          //   }
          // })
        }
        // console.log(cartitem);
      };
    });
})
// Get user cart list


app.listen(3001);