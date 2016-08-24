var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/omicron';

router.get('/names', function(req, res){

  pg.connect(connectionString, function (err, client, done){
    if (err){
      res.sendStatus(500);
    }

    client.query('SELECT COUNT (orders.id), customers.id, customers.first_name, customers.last_name FROM orders ' + 'RIGHT JOIN addresses ON addresses.id = orders.address_id ' +
    'JOIN customers ON customers.id = addresses.customer_id ' +
    'GROUP BY customers.id;', function (err, result){
      console.log("post request");
      done();

      if (err){
        res.sendStatus(500);
      }
      console.log(result.rows);
      res.send(result.rows);
    });
  });
});

// router.get('/orders', function(req, res){
//   // var id = req.params.id;
//   // console.log(id);
//   pg.connect(connectionString, function (err, client, done){
//     if (err){
//       res.sendStatus(500);
//     }
//
//     client.query('SELECT (line_items.quantity), customers.id, orders.order_date,'+
// ' products.description, line_items.unit_price, customers.first_name, customers.last_name, addresses.street,'+
// ' addresses.city, addresses.zip, addresses.state FROM line_items'+
// ' JOIN products ON products.id = line_items.product_id'+
// ' JOIN orders ON orders.id = line_items.order_id'+
// ' JOIN addresses ON addresses.id = orders.address_id'+
// ' JOIN customers ON customers.id = addresses.customer_id'+
// ' ORDER BY orders.order_date ASC;', function (err, result){
//       done();
//
//       if (err){
//         res.sendStatus(500);
//       }
//       console.log(result.rows);
//       res.send(result.rows);
//     });
//   });
// });

router.get('/orders/:id', function(req, res){
  var id = req.params.id;

  pg.connect(connectionString, function (err, client, done){
    if (err){
      res.sendStatus(500);
    }

    client.query('SELECT (line_items.quantity), customers.id, orders.order_date,'+
' products.description, line_items.unit_price, customers.first_name, customers.last_name, addresses.street,'+
' addresses.city, addresses.zip, addresses.state, orders.id FROM line_items'+
' JOIN products ON products.id = line_items.product_id'+
' JOIN orders ON orders.id = line_items.order_id'+
' JOIN addresses ON addresses.id = orders.address_id'+
' JOIN customers ON customers.id = addresses.customer_id'+
' WHERE customers.id = $1'+
' ORDER BY orders.order_date ASC;',
      [id],
      function (err, result){
      done();

      if (err){
        res.sendStatus(500);
      }
      console.log(result.rows);
      res.send(result.rows);
    });
  });
});

module.exports = router;
