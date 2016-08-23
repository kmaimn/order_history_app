var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/omicron';

router.get('/', function(req, res){

  pg.connect(connectionString, function (err, client, done){
    if (err){
      res.sendStatus(500);
    }

    client.query('SELECT * FROM customers JOIN addresses ON customer_id = customers.id LEFT JOIN orders ON address_id = addresses.id', function (err, result){
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


router.get('/', function(req, res){
  pg.connect(connectionString), function (err, client, done){
    if (err){
      res.sendStatus(500);
    }

    client.query('SELECT * FROM customers ORDER by id ASC', function (err, result){
      done();

      if (err){
        res.sendStatus(500);
      }

      res.send(result.rows);
    });
  };
});

module.exports = router;
