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
          // console.log('Login Berhasil');
          // console.log(result[i].id)
          var userID = result[i].id;
          res.send((userID).toString());
          break;
        }
        else if (i === result.length-1)
        {
          res.send('-1');
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
  WHERE itemstatus_id="1" GROUP BY orderID`
  db.query(pullData, (err, result) => 
  { 
    // take data from checkout that needed to be confirmed its payment status by admin (itemstatus_id=5 means process)
    // the result will displayed in Need Process Tab in User's Payment page at admin
    if(err) throw err
    else 
    {
      res.send(result);
      // console.log(result);
    }
  });
})
// User Unpaid List for Admin page

app.post('/UnpaidView', (req, res) =>
{
  var orderID = req.body.orderID;

  var takeData = `SELECT * FROM checkout WHERE orderID=?`;
  db.query(takeData, [orderID], (err, results) =>
  {
    if (err) throw err;
    else
    {
      // console.log(results)
      res.send(results);
    }
  })
})
// take unpaid list for admin view

app.get('/NPList', (req, res) =>
{  
  var pullData = `SELECT DISTINCT orderID, username, orderDate,
  sum(subtotal)+dev_price AS total FROM checkout JOIN userprofile ON checkout.user_id=userprofile.id 
  WHERE itemstatus_id="5" GROUP BY orderID`
  db.query(pullData, (err, result) => 
  { 
    // take data from checkout that needed to be confirmed its payment status by admin (itemstatus_id=5 means process)
    // the result will displayed in Need Process Tab in User's Payment page at admin
    if(err) throw err
    else 
    {
      res.send(result);
      // console.log(result);
    }
  });
})
// User NeedProcess List for Admin page

app.post('/NPView', (req, res) =>
{
  var orderID = req.body.orderID;

  var takeData = `SELECT * FROM checkout WHERE orderID=?`;
  db.query(takeData, [orderID], (err, results) =>
  {
    if (err) throw err;
    else
    {
      // console.log(results)
      res.send(results);
    }
  })
})
// take need process list for admin view

app.post('/paymentSuccess', (req, res) =>
{
  var orderID = req.body.orderID
  // console.log(orderID)

  var updateCheckout = `UPDATE checkout SET itemstatus_id="3" WHERE orderID="${orderID}";`
  updateCheckout += `UPDATE cart SET cart.checkoutstat_id="3" WHERE id IN (SELECT checkout.cart_id FROM checkout
  WHERE checkout.orderID="${orderID}");`
  updateCheckout += `SELECT * FROM checkout WHERE orderID="${orderID}"`
  db.query(updateCheckout, (err, result) => 
  {
    // query 1: update table checkout, before was unpaid (1), now become paid (3)
    // query 2: update table cart, before was unpaid (1), now become paid (3)
    // query 3: select all from checkout with desire orderID (order id that already confirmed by admin)
    // to be inserted into inv_detail table
    if (err) throw err
    else
    {
      // console.log(result[2])
      var dataforINV = result[2]
      // console.log(dataforINV)
      // take data for selected orderID (result of query 2 above that wil be inserted into inv_detail table)
      
      var takeorderID = 'SELECT INV FROM inv_detail'
      db.query(takeorderID, (err, results) =>
      {
        // takeorderID query to see the latest invoice code, to generate new inv code
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

          intoINVHead = () => 
          {
            var pullData = `SELECT DISTINCT INV, user_id, orderDate,
            sum(subtotal)+dev_price AS grandtotal FROM inv_detail 
            WHERE itemstatus_id="3" AND INV="${INVcode}"`
            db.query(pullData, (err, result) => 
            { 
              // pull data from inv_detail then inserted into inv_header
              if(err) throw err
              else 
              {
                // console.log(result[0].orderDate)
                var itemstatus_id = 3; // 3 means paid
                var userID = result[0].user_id;
                var INVCode = result[0].INV;
                var GrandTotal = result[0].grandtotal;
                var orderDate = result[0].orderDate;
                var insertINV_header = `INSERT INTO inv_header SET user_id=?,
                INV=?, grandtotal=?, itemstatus_id=?, orderDate=?`
                db.query(insertINV_header, [userID, INVCode, GrandTotal, itemstatus_id, orderDate], (err, result) => 
                {
                  // query above to insert the data into inv_header (data from inv_detail)
                  if (err) throw err;
                  else res.send('1')
                })
              }
            });
          }

          var counts = 0;
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
            itemstatus_id, dataforINV[i].orderDate],
            (err, results) =>
            {
              // query above to insert selected data from checkout table (query 2 of updateCheckout) into inv_detail table
              if (err) throw err
              else
              {
                counts++
                if (counts === dataforINV.length) intoINVHead()
                // counts === dataforINV.length because the if else in this query executed as much as the dataforINV.length
                // to make sure the intoINVHead() only called one time, we have to use this if-else
              }
            })
          }
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
  ON inv_header.user_id=userprofile.id WHERE inv_header.itemstatus_id="3" GROUP BY INV ORDER BY INV`
  db.query(pullData, (err, result) => 
  { 
    // take all data that the payment already confirmed (with status = success/paid payment only)
    if(err) throw err
    else 
    {
      res.send(result);
    }
  });
})
// User paid List for Admin page

app.post('/PaidView', (req, res) =>
{  
  var INVcode = req.body.codeINV;
  var pullData = `SELECT * FROM inv_detail JOIN userprofile
  ON inv_detail.user_id=userprofile.id WHERE inv_detail.INV="${INVcode}"`
  db.query(pullData, (err, result) => 
  { 
    if(err) throw err
    else 
    {
      res.send(result);
    }
  });
})
// User Invoice for Admin View

app.post('/paymentFailed', (req, res) => 
{
  var orderID = req.body.orderID
  // console.log(orderID)

  var updateCheckoutandCart = `UPDATE checkout SET itemstatus_id="4" WHERE orderID="${orderID}";`
  updateCheckoutandCart += `UPDATE cart SET cart.checkoutstat_id="4" WHERE id IN (SELECT checkout.cart_id FROM checkout
  WHERE checkout.orderID="${orderID}");`
  db.query(updateCheckoutandCart, (err, result) => 
  {
    if (err) throw err
    else res.send('1')
  })
})
// payment confirmed by admin - failed

app.get('/pfList', (req, res) => 
{
  var pullData = `SELECT DISTINCT orderID, username, orderDate,
  sum(subtotal)+dev_price AS total FROM checkout JOIN userprofile ON checkout.user_id=userprofile.id 
  WHERE itemstatus_id="4" GROUP BY orderID`
  db.query(pullData, (err, result) => 
  {
    if (err) throw err;
    else res.send(result)
  })
})
// User payment failed List for Admin page

app.post('/AdmFailed', (req, res) =>
{
  var orderID = req.body.orderID;
  // console.log(userID)

  var takeData = `SELECT * FROM checkout WHERE orderID=?`;
  db.query(takeData, [orderID], (err, results) =>
  {
    if (err) throw err;
    else
    {
      // console.log(results)
      res.send(results);
    }
  })
})
// take failed list for admin view

app.post('/pbsList', (req, res) =>
{
  var invoiceCode = req.body.invoice
  console.log(invoiceCode)

  var updatetoPBS = `UPDATE inv_header SET itemstatus_id="7" WHERE INV="${invoiceCode}";`
  updatetoPBS += `UPDATE inv_detail SET itemstatus_id="7" WHERE INV="${invoiceCode}";`
  updatetoPBS += `UPDATE checkout SET checkout.itemstatus_id="7" WHERE checkout.orderID IN (SELECT inv_detail.orderID
  FROM inv_detail WHERE inv_detail.INV="${invoiceCode}");`
  updatetoPBS += `UPDATE cart SET cart.checkoutstat_id="7" WHERE cart.id IN (SELECT checkout.cart_id FROM checkout
  JOIN inv_detail ON checkout.orderID=inv_detail.orderID WHERE inv_detail.INV="${invoiceCode}");`
  // itemstatus_id=7 means package being sent
  db.query(updatetoPBS, (err, result) => 
  {
    if (err) throw err;
    else res.send('1')
  })
})
// Query to update the status after paid list clicked to be being sent (from paid into beingsent)

app.get('/pbsList', (req, res) =>
{  
  var pullData = `SELECT username, INV, grandtotal, orderDate
  FROM inv_header JOIN userprofile
  ON inv_header.user_id=userprofile.id WHERE inv_header.itemstatus_id="7" GROUP BY INV ORDER BY INV`
  db.query(pullData, (err, result) => 
  { 
    // take all data that the payment already confirmed and declared that the package being sent
    // (with status = being sent only)
    if(err) throw err
    else 
    {
      res.send(result);
    }
  });
})
// User pbs List for Admin page

app.post('/paList', (req, res) =>
{
  var invoiceCode = req.body.invoice
  console.log(invoiceCode)

  var updatetoPA = `UPDATE inv_header SET itemstatus_id="8" WHERE INV="${invoiceCode}";`
  updatetoPA += `UPDATE inv_detail SET itemstatus_id="8" WHERE INV="${invoiceCode}";`
  updatetoPA += `UPDATE checkout SET checkout.itemstatus_id="8" WHERE checkout.orderID IN (SELECT inv_detail.orderID
  FROM inv_detail WHERE inv_detail.INV="${invoiceCode}");`
  updatetoPA += `UPDATE cart SET cart.checkoutstat_id="8" WHERE cart.id IN (SELECT checkout.cart_id FROM checkout
  JOIN inv_detail ON checkout.orderID=inv_detail.orderID WHERE inv_detail.INV="${invoiceCode}");`
  db.query(updatetoPA, (err, result) => 
  {
    if (err) throw err;
    else res.send('1')
  })
})
// Query to update the status after pbs list clicked to be delivered (from being sent into delivered)

app.get('/paList', (req, res) =>
{  
  var pullData = `SELECT username, INV, grandtotal, orderDate
  FROM inv_header JOIN userprofile
  ON inv_header.user_id=userprofile.id WHERE inv_header.itemstatus_id="8" GROUP BY INV ORDER BY INV`
  db.query(pullData, (err, result) => 
  { 
    // take all data that the payment already confirmed and declared that the package being sent
    // (with status = being sent only)
    if(err) throw err
    else 
    {
      res.send(result);
    }
  });
})
// User delivered List for Admin page

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

  if(req.files)
  {
    // to make sure that add new product must include the photo/pic of the product
    var prod_img = req.files.prodImg.name;
    if(prod_name !== '' && prod_price !== '' && prod_cat !== '' && prod_desc !== '' && prod_img !== '')
    {
      // If-else condition above to make sure that not null value inserted into table database

      // console.log('1: ' + prod_name)
      // console.log('2: ' + prod_price);
      // console.log('3: ' + prod_cat);
      // console.log('4: ' + prod_desc);
      // console.log('5: ' + prod_img);

      var ImgFile = req.files.prodImg;
      ImgFile.mv("./images/" + prod_img, (err) =>
      {
        // upload image
        if(err) throw err;
        else 
        {
          // console.log('Upload succeed');
          var newData = `INSERT INTO product SET cat_id="${prod_cat}", prod_name="${prod_name}", prod_img='${prod_img}', prod_price='${prod_price}', prod_desc='${prod_desc}' `;
          // query above to insert new product
          db.query(newData, (err, result) => 
          { 
            if(err) throw err;
            else
            {
              res.send('1')
            }
          });
        }
      })
    }
  }
  else
  {
    res.send('-1')
    // console.log('gagal')
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
      if(err) throw err
      else
      {        
        // console.log('Upload succeed');
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
    // console.log('6: tanpa gambar')
  }
})
// Admin Edit Product - Take value from Client and send it into database (update database)
// Also, edit in cart table (prodName and prodPrice coulumn)

app.post('/Delproduct', (req, res) =>
{  
  var idproduk = req.body.produkID;
  // console.log(idproduk);

  var delData = `DELETE FROM product where id='${idproduk}'`
  // query above to delete the data
  db.query(delData, (err, result) => { 
    if(err) {
      throw err
    }
    else
    {
      res.send('1')
    }
  });
  // Notes: we have to update the total product first, then deleted the data
})
// Admin Del Product - also delete from cart
// NOTE: Product set up, DONE
// NOTE (again): if the selected product needed in cart table, the product will not be deleted
// because of foreign key

// ========================= ADMIN - Category =========================

app.get('/Category', (req, res) =>
{  
  var pullData = `SELECT category.id, category.category,
  COUNT(product.cat_id) AS jumlahproduk FROM category
  LEFT JOIN product ON category.id=product.cat_id GROUP BY category.category`
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

  if (cat_stat === 'newcat')
  {
    // console.log(produknama);
    // console.log(produkharga);
    // console.log(produkgambar);
    var newData = `INSERT INTO category SET category="${cat_name}"`;
    db.query(newData, (err, result) => { 
      if(err) throw err
      else res.send('1')
    });
  }
  else if (cat_stat === 'editcat')
  {
    // console.log(produkid);
    // console.log(produknama);
    // console.log(produkharga);
    var editData = `UPDATE category SET category='${cat_name}' WHERE id='${cat_id}' `;
    db.query(editData, (err, result) => { 
      if(err) throw err
      else res.send('1')
    });
  }
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
        else {
          res.send('1')
        }
      });  
    }
  })
})
// Admin Delete category
// NOTE: Category set up, DONE
// NOTE (again): if the selected category still has product that needed in cart table, the category will not be deleted
// because of foreign key

// ================================================== USER SECTION ==================================================
// ========================= USER - Register and Login =========================
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

  // var lowerusername = Username.toLowerCase()
  // var cekUsername = `SELECT username FROM userprofile WHERE username="${Username}"`

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
          // console.log('Login Berhasil');
          // console.log(result[i].id)
          var userID = result[i].id;
          res.send((userID).toString());
          break;
        }
        else if (i === result.length-1)
        {
          // console.log('Data tidak ditemukan, login gagal');
          res.send('-1')
        }
      }
    }
  })
})
// User Login

// ========================= USER - Userprofile =========================
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

// ========================= USER - Payment History =========================
app.post('/userUnpaid', (req, res) =>
{  
  var userID = req.body.userID;
  var pullData = `SELECT DISTINCT orderID, username, orderDate,
  sum(subtotal)+dev_price AS total FROM checkout JOIN userprofile ON checkout.user_id=userprofile.id 
  WHERE itemstatus_id="1" AND checkout.user_id="${userID}" GROUP BY orderID`
  db.query(pullData, (err, result) => 
  { 
    // take data from checkout that needed to be confirmed its payment status by admin (itemstatus_id=5 means process)
    // the result will displayed in Need Process Tab in User's Payment page at admin
    if(err) throw err
    else 
    {
      res.send(result);
      // console.log(result);
    }
  });
})
// Unpaid List

app.post('/userBP', (req, res) =>
{  
  var userID = req.body.userID;
  var pullData = `SELECT DISTINCT orderID, username, orderDate,
  sum(subtotal)+dev_price AS total FROM checkout JOIN userprofile ON checkout.user_id=userprofile.id 
  WHERE itemstatus_id="5" AND checkout.user_id="${userID}" GROUP BY orderID`
  db.query(pullData, (err, result) => 
  { 
    // take data from checkout that needed to be confirmed its payment status by admin (itemstatus_id=5 means process)
    // the result will displayed in Need Process Tab in User's Payment page at admin
    if(err) throw err
    else 
    {
      res.send(result);
      // console.log(result);
    }
  });
})
// Being Process List

app.post('/userPaid', (req, res) =>
{  
  var userID = req.body.userID;
  var pullData = `SELECT username, INV, grandtotal, orderDate
  FROM inv_header JOIN userprofile
  ON inv_header.user_id=userprofile.id WHERE inv_header.itemstatus_id="3" AND inv_header.user_id="${userID}"
  GROUP BY INV ORDER BY INV`
  db.query(pullData, (err, result) => 
  { 
    // take all data that the payment already confirmed (with status = success/paid payment only)
    if(err) throw err
    else 
    {
      res.send(result);
    }
  });
})
// Paid List

app.post('/userPf', (req, res) => 
{
  var userID = req.body.userID
  var pullData = `SELECT DISTINCT orderID, username, orderDate,
  sum(subtotal)+dev_price AS total FROM checkout JOIN userprofile ON checkout.user_id=userprofile.id 
  WHERE itemstatus_id="4" AND checkout.user_id="${userID}" GROUP BY orderID`
  db.query(pullData, (err, result) => 
  {
    if (err) throw err;
    else res.send(result)
  })
})
// Payment Failed List`

app.post('/userPbs', (req, res) =>
{  
  var userID = req.body.userID;
  var pullData = `SELECT username, INV, grandtotal, orderDate
  FROM inv_header JOIN userprofile
  ON inv_header.user_id=userprofile.id WHERE inv_header.itemstatus_id="7" AND inv_header.user_id="${userID}"
  GROUP BY INV ORDER BY INV`
  db.query(pullData, (err, result) => 
  { 
    // take all data that the payment already confirmed and declared that the package being sent
    // (with status = being sent only)
    if(err) throw err
    else 
    {
      res.send(result);
    }
  });
})
// Package being sent

app.post('/userPa', (req, res) =>
{  
  var userID = req.body.userID;
  var pullData = `SELECT username, INV, grandtotal, orderDate
  FROM inv_header JOIN userprofile
  ON inv_header.user_id=userprofile.id WHERE inv_header.itemstatus_id="8" AND inv_header.user_id="${userID}"
  GROUP BY INV ORDER BY INV`
  db.query(pullData, (err, result) => 
  { 
    // take all data that the payment already confirmed and declared that the package being sent
    // (with status = being sent only)
    if(err) throw err
    else 
    {
      res.send(result);
    }
  });
})
// Delivered List

app.post('/userInvoice', (req, res) =>
{  
  var INVcode = req.body.codeINV;
  var pullData = `SELECT * FROM inv_detail JOIN userprofile
  ON inv_detail.user_id=userprofile.id WHERE inv_detail.INV="${INVcode}"`
  db.query(pullData, (err, result) => 
  { 
    if(err) throw err
    else 
    {
      res.send(result);
    }
  });
})
// User's Invoice

app.post('/BeingProcess', (req, res) =>
{
  var orderID = req.body.orderID;

  var takeData = `SELECT * FROM checkout WHERE orderID=?`;
  db.query(takeData, [orderID], (err, results) =>
  {
    if (err) throw err;
    else
    {
      // console.log(results)
      res.send(results);
    }
  })
})
// take being process list for user view

app.post('/Failed', (req, res) =>
{
  var orderID = req.body.orderID;
  // console.log(userID)

  var takeData = `SELECT * FROM checkout WHERE orderID=?`;
  db.query(takeData, [orderID], (err, results) =>
  {
    if (err) throw err;
    else
    {
      // console.log(results)
      res.send(results);
    }
  })
})
// take failed list for user view

// ========================= USER - Product =========================
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

app.post('/Productlist', (req, res) => 
{
  var catID = req.body.filterCat
  var pullData = `SELECT * FROM product WHERE cat_id="${catID}";`
    pullData += `SELECT * FROM category`
    db.query(pullData, (err, results) => { 
      if(err) {
        throw err
      } else {
        res.send(results);
        // console.log(results[1]);
      };
    })
})
//Filter product

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

// ========================= USER - Cart =========================
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
// because I take the value of the price, not the id of the product then take the price
// solution: function when admin edit the product data, its also change the table cart (prodName and prodPrice coulumn)
// see app.post('/Editproduct') in admin section

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

// ========================= USER - Checkout =========================
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
        var updateCart = `UPDATE cart SET checkoutstat_id="${statuscheckout}" WHERE user_id="${userID}" AND checkoutstat_id="2"`;
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
          
          var lastOrderID = 0;
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
    // if user has cart before cancel their order in checkout, delete first
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

// var haribaru = new Date()
// console.log(haribaru.getDate())
// var a = haribaru.getDate();
// console.log(haribaru.getMonth() + 1)
// var b = haribaru.getMonth() + 1;
// console.log(haribaru.getFullYear())
// var c = haribaru.getFullYear();
// console.log(haribaru.getHours())
// var d = haribaru.getHours();
// console.log(haribaru.getMinutes())
// var e = haribaru.getMinutes();
// console.log(haribaru.getSeconds())
// var f = haribaru.getSeconds();

// var orderDate = a + '-' + b + '-' + c
// console.log(orderDate)
// var orderTime = d + ':' + e + ':' + f
// console.log(orderTime)
// var expiryDate = d + ':' + (e+1) + ':' + f
// console.log(expiryDate)

// setToHappen = (fn, d) => 
// {
//   var t = d.getTime() - (new Date()).getTime();
//   return setTimeout(fn, t);
// }

// var fn = console.log('masuk')
// var dd = 
// console.log(haribaru.getTime())

// coba = () =>
// {
//   console.log('masuk')
// }

// setTimeout(coba, 5000)

app.listen(3001);