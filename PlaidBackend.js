var express = require('express');
var plaid = require('plaid');
var requestify = require('requestify');


var app = express();

var access_token = "test_bofa";

app.set('port', process.env.PORT || 3000);

var plaidClient = new plaid.Client('test_id',
                                   'test_secret',
                                   plaid.environments.tartan);

console.log(plaid.environments);



app.listen(3000, function () {
  console.log("listening on port 3000");
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, public_token");
  next();
});


app.post('/authenticate', function(req, res) {
  console.log("reached node server endpoint");
  //var public_token = req.header('public_token');
  //console.log("public token is: " + public_token);

  requestify.get('https://tartan.plaid.com/connect?client_id=test_id&secret=test_secret&access_token=test_bofa').then(function(response) {
     // Get the response body (JSON parsed - JSON response or jQuery object in case of XML response)
     var jsonRes = response.getBody();
     console.log("Mock Transactions returned");

     //send the json response
     res.send(jsonRes);
 });

});
