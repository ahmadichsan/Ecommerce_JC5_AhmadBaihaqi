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

app.get('/', (req, res) => 
{
  res.send('Halaman Server')
})
// Starting point

app.post('/admlogin', (req, res) => 
{
  var Username = req.body.username;
  var Password = req.body.password;
  
  // console.log(Username);
  // console.log(Password);
  
  const encpass = crypto.createHash('sha256', secret).update(Password).digest('hex');
  // console.log(encpass);

  var pullData = "SELECT * FROM admin";
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
// Admin Login
// NOTE: Admin login setup is done

// ========================= ADMIN - User List =========================

app.get('/userList', (req, res) =>
{  
  var pullData = 'SELECT username, email, fullname, phone, CreatedDate FROM userprofile'
  db.query(pullData, (err, result) => 
  { 
    if(err) throw err
    else res.send(result);
  });
})
// User List for Admin page

// ========================= ADMIN - User's payment =========================

app.get('/unpaidList', (req, res) =>
{  
  var pullData = `SELECT DISTINCT orderID, username, orderDate,
  sum(subtotal)+dev_price AS total FROM checkout JOIN userprofile ON checkout.user_id=userprofile.id 
  WHERE itemstatus_id="5" GROUP BY orderID`
  db.query(pullData, (err, result) => 
  { 
    if(err) throw err
    else 
    {
      res.send(result);
      // console.log(result);
      // console.log('asd')
    }
  });
})
// User Unpaid List for Admin page

app.post('/paymentSuccess', (req, res) =>
{
  var orderID = req.body.orderID
  // console.log(orderID)

  var updateCheckout = `UPDATE checkout SET itemstatus_id="3" WHERE orderID="${orderID}";`
  updateCheckout += `SELECT * FROM checkout WHERE orderID="${orderID}"`
  db.query(updateCheckout, (err, result) => 
  {
    if (err) throw err
    else
    {
      // console.log(result[1])
      var dataforINV = result[1]
      // take data for selected orderID
      // console.log(dataforINV[0])   
      
      var takeorderID = 'SELECT INV FROM inv_detail'
      db.query(takeorderID, (err, results) =>
      {
        if (err) throw err
        else
        {
          var length = results.length;
          // console.log(length)
          // console.log(results)
          
          var lastINV = 0;
          (length === 0) ? lastINV = 0 : lastINV = parseInt(results[length-1].INV);
          var INV = lastINV + 1;
          var INVcode = '';
          
          if (INV < 10)  INVcode = INVcode + '0000' + INV
          else if (INV >= 10 && INV < 100) INVcode = INVcode + '000' + INV
          else if (INV >= 100 && INV < 1000) INVcode = INVcode + '00' + INV
          else if (INV >= 1000 && INV < 10000) INVcode = INVcode + '0' + INV
          else INVcode = INVcode + INV
          // generate Invoice Code
          // console.log(INVcode)

          for (var i=0; i<dataforINV.length; i++)
          {
            // loop for the item list
            var itemstatus_id = 3; // 3 means paid
            var insertINV_detail = `INSERT INTO inv_detail SET user_id=?, orderID=?, INV=?,
            prod_name=?, prod_price=?, quantity=?, subtotal=?,
            ship_name=?, ship_add=?, ship_phone=?, bank=?,
            dev_meth=?, dev_price=?, itemstatus_id=?, orderDate=?`;
            db.query(insertINV_detail,
            [dataforINV[i].user_id, dataforINV[i].orderID, INVcode,
            dataforINV[i].prod_name, dataforINV[i].prod_price,
            dataforINV[i].quantity, dataforINV[i].subtotal,
            dataforINV[i].ship_name, dataforINV[i].ship_add,
            dataforINV[i].ship_phone, dataforINV[i].bank,
            dataforINV[i].dev_meth, dataforINV[i].dev_price,
            itemstatus_id, dataforINV[i].orderDate], // value
            (err, results) =>
            {
              if (err) throw err
            })
            // if (i === dataforINV.length - 1) res.send('1')
          }

          var pullData = `SELECT DISTINCT INV, user_id, orderDate,
          sum(subtotal)+dev_price AS grandtotal FROM inv_detail 
          WHERE itemstatus_id="3" AND INV="${INVcode}"`
          // GROUP BY orderID
          db.query(pullData, (err, result) => 
          { 
            if(err) throw err
            else 
            {
              // console.log(result[0].orderDate)
              var userID = result[0].user_id;
              var INVCode = result[0].INV;
              var GrandTotal = result[0].grandtotal;
              var orderDate = result[0].orderDate;
              var insertINV_header = `INSERT INTO inv_header SET user_id=?,
              INV=?, grandtotal=?, orderDate=?`
              db.query(insertINV_header, [userID, INVCode, GrandTotal, orderDate], (err, result) => 
              {
                if (err) throw err;
                else res.send('1')
              })
            }
          });
        }
      })
    }
  })
})
// payment confirmed by admin - success

app.get('/paidList', (req, res) =>
{  
  var pullData = `SELECT username, INV, grandtotal, orderDate
  FROM inv_header JOIN userprofile
  ON inv_header.user_id=userprofile.id GROUP BY INV ORDER BY INV`
  db.query(pullData, (err, result) => 
  { 
    if(err) throw err
    else 
    {
      res.send(result);
    }
  });
})
// User paid List for Admin page

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
      // console.log(results);
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
  console.log('7: ' + prod_img);

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
            res.send(result)
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
        console.log('Upload failed');
      }
      else
      {        
        console.log('Upload succeed');
        var editData = `UPDATE product SET prod_name="${prod_name}", prod_img='${prod_img}',
        prod_price='${prod_price}', cat_id='${prod_cat}', prod_desc='${prod_desc}' WHERE id='${prod_id}'`;
        // query above to edit data in product table
        db.query(editData, (err, result) =>
        { 
          if(err) throw err;
          else
          {
            var editCart = `UPDATE cart SET prodName="${prod_name}", prodPrice="${prod_price}" WHERE prod_id="${prod_id}"`
            // query above to edit data in cart with selected product id that has been edited
            db.query(editCart, (err, result) => 
            {
              if (err) throw err;
              else
              {
                res.send('1')
              }
            })
          }
        });
      }
    })
  }
  else
  {
    var editData = `UPDATE product SET prod_name="${prod_name}", prod_price='${prod_price}',
    cat_id='${prod_cat}', prod_desc='${prod_desc}' WHERE id='${prod_id}' `;
    // query above to edit data in product table
    db.query(editData, (err, result) =>
    { 
      if(err) throw err;
      else
      {
        var editCart = `UPDATE cart SET prodName="${prod_name}", prodPrice="${prod_price}" WHERE prod_id="${prod_id}"`;
        // query above to edit data in cart with selected product id that has been edited
        db.query(editCart, (err, result) => 
        {
          if (err) throw err;
          else
          {
            res.send('1')
          }
        })
      }
    });
    console.log('6: tanpa gambar')
  }
})
// Admin Edit Product - Take value from Client and send it into database (update database)
// Also, edit in cart table (prodName and prodPrice coulumn)

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
      res.send(result);
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
// Admin Del Product - also delete from cart
// NOTE: Product set up, not finish

// ========================= ADMIN - Category =========================

app.get('/Category', (req, res) =>
{  
  var pullData = 'SELECT * FROM category'
  db.query(pullData, (err, result) =>
  { 
    if(err) 
    {
      throw err
    } 
    else 
    {
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
  // // console.log(encpass);

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

app.post('/Userprofile', (req, res) => 
{
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

app.post('/Order', (req, res) => 
{
  var userID = req.body.UserID;
  var Qty = req.body.prodQty;
  var prodID = req.body.prodID;
  var prodName = req.body.prodName;
  var prodPrice = req.body.prodPrice;
  var checkoutstat_id = 2;

  // console.log(userID);
  // console.log(Qty);
  // console.log(prodID);
  // console.log(prodName);
  // console.log(prodPrice);

  var checkCart = `SELECT * FROM cart WHERE user_id="${userID}" AND
  prod_id="${prodID}" AND checkoutstat_id="${checkoutstat_id}"`
  db.query(checkCart, (err, result) =>
  {
    if (err) throw err;
    else
    {
      // console.log(result.length)
      if (result.length > 0)
      {
        // if user already add the same item, the action is updating the qty
        var updateitem = `UPDATE cart SET qty="${Qty}" WHERE prod_id="${prodID}"`
        db.query(updateitem, (err, result) => 
        { 
          if(err) throw err;
          else 
          {
            var status = '1';
            res.send(status);
          };
        });
      }
      else
      {
        // if this is a new item, then, it will insert new data
        var storeData = `INSERT INTO cart SET user_id="${userID}", checkoutstat_id="${checkoutstat_id}",
        prod_id="${prodID}", qty="${Qty}", prodName="${prodName}", prodPrice="${prodPrice}"`
        db.query(storeData, (err, result) => 
        { 
          if(err) throw err;
          else 
          {
            var status = '1';
            res.send(status);
          };
        });
      }
    }
  })
})
// Add to cart

app.post('/Delcart', (req, res) =>
{
  var cartID = req.body.cartID;
  // console.log(cartID)
    var delCart = `DELETE FROM cart WHERE id="${cartID}"`
    db.query(delCart, (err, results) => { 
      if(err) throw err;
      else
      {
        res.send(results);
      }
    });
})
// Delete selected item in cart table

app.post('/Cart', (req, res) =>
{
  var userID = req.body.UserID;
    var pullData = `SELECT * FROM cart WHERE user_id="${userID}" AND checkoutstat_id="2";`
    pullData += `SELECT id, prodPrice*qty AS "tot_sub_price" FROM cart WHERE user_id="${userID}" AND checkoutstat_id="2"`
    db.query(pullData, (err, results) => { 
      if(err) {
        throw err
      } else {
        res.send(results);
      };
    });
})
// Display cart list - this works, but if admin change the price, it will not update automatically
// because i take the value of   the price, not the id of the product then take the price
// solutin: function when admin edit the product data, its also change the table cart (prodName and prodPrice coulumn)
// see app.post('/Editproduct')

app.post('/updateCart', (req, res) =>
{
  var cartID = req.body.cartID;
  var NewQty = req.body.QtyNew;
  var userID = req.body.userID;
  // console.log(NewQty)
  // console.log(cartID)
  
  var updateCart = `UPDATE cart SET qty="${NewQty}" WHERE id="${cartID}" AND checkoutstat_id="2"`
  // to update cart qty
  db.query(updateCart, (err, results) => 
  { 
    if(err) throw err;
    else
    {
      var retake = `SELECT * FROM cart WHERE user_id="${userID}" AND checkoutstat_id="2";` // retake the cart list
      retake += `SELECT id, prodPrice*qty AS "tot_sub_price" FROM cart WHERE user_id="${userID}" AND checkoutstat_id="2"`
      // count the subPrice
      db.query(retake, (err, results) => { 
        if(err) {
          throw err
        } else {
          res.send(results);
        };
      });
    }
  });
})
// Update selected item in cart table

app.get('/Cart', (req, res) => 
{
  var pullDevMeth = "SELECT * FROM delivery"
  db.query(pullDevMeth, (err, result) =>
  {
    if (err) throw err
    else
    {
      res.send(result)
    }
  })
})
// take list of Delivery Method

app.post('/Defaultaddress', (req, res) =>
{
  var userID = req.body.UserID;
    var pullData = `SELECT * FROM userprofile WHERE id="${userID}"`
    db.query(pullData, (err, results) => { 
      if(err) {
        throw err
      } else {
        res.send(results);
      };
    });
})
// Request default address from userprofile table to be displayed in cart component when needed

app.post('/Checkout', (req, res) =>
{
  var userID = req.body.userID; //user id
  var fullname = req.body.fullname; //recipient fullname
  var address = req.body.address; //recipient address
  var phone = req.body.phone; //recipient phone
  var deliveryChoosen = req.body.deliveryMethod; //selected delivery method
  var devPayPrice = parseInt(req.body.devPayPrice); //selected delivery method cost
  var methPay = req.body.methPay; //selected payment method
  var listCart = req.body.listCart; //cart list
  var listSubtot = req.body.listSubtot; //subtot per item of cart list
  
  var statuscheckout = req.body.statusCheckout;
  //status checkout, to update the cart table, so the cart looks like empty but actually the system just change the status
  // furthermore,
  //if the user suddenly cancel the order at checkout, then the status in cart item will channge
  //so the cart item will appear again in cart page.

  // console.log(userID);
  // console.log(fullname);
  // console.log(address);
  // console.log(phone);
  // console.log(deliveryChoosen);
  // console.log(statuscheckout);
  // console.log(methPay);
  // console.log(devPayPrice);
  // console.log(listCart);
  // console.log(listSubtot);

  DoCheckout = (JD) =>
  {
    // console.log(JD)
    
    if (JD === 0)
    {
      if (statuscheckout === 1)
      {
        var updateCart = `UPDATE cart SET checkoutstat_id="${statuscheckout}" WHERE user_id="${userID}"`;
        db.query(updateCart, (err, results) => {if(err) throw err});
      }
      // update the itemstatus of selected product in cart table
      // well, statuscheckout value will always be 1. See in the client side

      var takeorderID = 'SELECT orderID FROM checkout'
      db.query(takeorderID, (err, results) =>
      {
        if (err) throw err
        else
        {
          var length = results.length;
          // console.log(length)
          // console.log(results)
          
          var lastINV = 0;
          (length === 0) ? lastOrderID = 0 : lastOrderID = parseInt(results[length-1].orderID);
          var orderID = lastOrderID + 1;
          var orders = '';
          
          if (orderID < 10)  orders = orders + '0000' + orderID
          else if (orderID >= 10 && orderID < 100) orders = orders + '000' + orderID
          else if (orderID >= 100 && orderID < 1000) orders = orders + '00' + orderID
          else if (orderID >= 1000 && orderID < 10000) orders = orders + '0' + orderID
          else orders = orders + orderID
          // generate order ID
          // console.log(orders)

          for (var i=0; i<listCart.length; i++)
          {
            // loop for the item list
            for (var j=i; j<listSubtot.length; j++)
            {
              // loop for the subtotal per item
              var itemstatus_id = 1; // 1 means unpaid
              var insertCheckout = `INSERT INTO checkout SET user_id=?, cart_id=?, orderID=?,
              prod_name=?, prod_price=?, quantity=?, subtotal=?,
              ship_name=?, ship_add=?, ship_phone=?, bank=?,
              dev_meth=?, dev_price=?, itemstatus_id=?`;
              db.query(insertCheckout,
              [userID, listCart[i].id, orders, listCart[i].prodName, listCart[i].prodPrice,
              listCart[i].qty, listSubtot[j].tot_sub_price, fullname, address, phone, methPay,
              deliveryChoosen, devPayPrice, itemstatus_id], // value
              (err, results) =>
              {
                if (err) throw err
              })
              break;
              // this break is to make sure that the second loop is just for
              // adding one data that the item list and the subtotal match
            }
            if (i === listCart.length - 1) res.send('1')
          }
        }
      })
    }
    else
    {
      res.send('-1')
    }
  }

  var checkCheckout = `SELECT user_id, itemstatus_id FROM checkout WHERE user_id="${userID}" AND itemstatus_id="1"`
  db.query(checkCheckout, (err, result) =>
  {
    if (err) throw err;
    else
    {
      var JD = result.length
      DoCheckout(JD)
    }
  })
  // to check first, if the user have unpaid item, they should finish it first or cancel the current order then edit their cart
  // otherwise, they can not checkout for the second time
})
// for Checkout from cart page also insert orderID
// move data from cart to checkout table

app.post('/CheckoutComp', (req, res) =>
{
  var userID = req.body.userID;
  var itemstatus_id = 1;
  // console.log(userID)

  var takeData = `SELECT * FROM checkout WHERE user_id=? AND itemstatus_id=?`;
  db.query(takeData, [userID, itemstatus_id], (err, results) =>
  {
    if (err) throw err;
    else
    {
      // console.log(results)
      res.send(results);
    }
  })
})
// pull checkout item from current user ID

app.post('/cancelOrder', (req, res) =>
{
  var userID = req.body.userID;

  var deleteCart = `DELETE FROM cart WHERE user_id="${userID}" AND checkoutstat_id="2"`
  db.query(deleteCart, (err, result) =>
  {
    if (err) throw err;
    else
    {
      // console.log('berhasil delete remain cart')
      var updatemyCart = `UPDATE cart SET checkoutstat_id="2" WHERE user_id="${userID}" AND checkoutstat_id="1"`
      db.query(updatemyCart, (err, result) =>
      {
        if (err) throw err;
        else
        {
          var deleteCheckout = `DELETE FROM checkout WHERE user_id="${userID}" AND itemstatus_id="1"`
          db.query(deleteCheckout, (err, results) =>
          {
            if (err) throw err;
            else res.send('1')
          })
        }
      })
    }
  })  
})
// delete remain cart (if user already add new item before cancel the order)
// update status in cart
// delete the item in checkout table

app.post('/confirmPayment', (req, res) =>
{
  var userID = req.body.userID;

  var deleteCart = `UPDATE checkout SET itemstatus_id="5" WHERE user_id="${userID}" AND itemstatus_id="1"`
  db.query(deleteCart, (err, result) =>
  {
    if (err) throw err;
    else
    {
      // console.log('berhasil delete remain cart')
      var updatemyCart = `UPDATE cart SET checkoutstat_id="5" WHERE user_id="${userID}" AND checkoutstat_id="1"`
      db.query(updatemyCart, (err, result) =>
      {
        if (err) throw err;
        else
        {
          res.send('1')
        }
      })
    }
  })  
})
// confirm payment just change the status of the item in cart and checkout table
// after confirm by admin, the item will either move to invoice or back to checkout if failed (to be confirm)



























// app.post('/Cart', (req, res) =>
// {
//   var userID = req.body.UserID;
//     var pullData = `SELECT * FROM cart WHERE user_id="${userID}";`
//     pullData += `SELECT id, prodPrice*qty AS "tot_sub_price" FROM cart WHERE user_id="${userID}"`
//     db.query(pullData, (err, hasil) => { 
//       if(err) {
//         throw err
//       } else {
//         // console.log(hasil[0])
//         var counter = 0;
//         var cartitem = [];
//         for (var i=0; i<hasil[0].length; i++)
//         {
//           // console.log(hasil[0][i].prod_id)
//           var produkID = hasil[0][i].prod_id;
//           var pulldetprod = `SELECT * FROM product WHERE id="${produkID}"`
//           db.query(pulldetprod, (err, results) => 
//           {
//             if (err) throw err;
//             else
//             {
//               // console.log(results) 
//               cartitem.push(results);
//               counter++;
//               if (counter === hasil.length)
//               {
//                 // console.log(cartitem);
//                 var finalData =
//                 [
//                   {
//                     hasil
//                     // ambil dari tabel cart
//                   },
//                   {
//                     cartitem
//                     // ambil dari tabel product
//                   }
//                 ]
//                 // res.send('1')
//                 res.send(finalData);
//                 // console.log(finalData)
//               }
//             }
//           })
//         }
//       };
//     });
// })
// Get user cart list - still maintain

// app.post('/Cart', (req, res) =>
// {
//   var userID = req.body.UserID;
//     var pullData = `SELECT * FROM cart WHERE user_id="${userID}";`
//     db.query(pullData, (err, hasil) => { 
//       if(err) {
//         throw err
//       } else {
//         console.log(hasil)
//       };
//     });
// })
// get user cart list - still maintain from above

app.listen(3001);