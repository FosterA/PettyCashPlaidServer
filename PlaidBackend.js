var express = require('express');
var plaid = require('plaid');

var app = express();

var access_token;

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


app.post('/upgrade', function(req, res) {
  plaidClient.upgradeUser(access_token, upgrade_to, options, callback);
  if(!access_token){
    //error handling to handle case where there is no set access token
  }
});

app.post('/authenticate', function(req, res) {
  console.log("reached node server endpoint");
  var public_token = req.header('public_token');
  console.log("public token is: " + public_token);


  // Exchange a public_token for a Plaid access_token
  plaidClient.exchangeToken(public_token, function(err, exchangeTokenRes) {
    if (err != null) {
      // Handle error!
      console.log("error during the exchangeToken.");
    } else {
      // This is your Plaid access token - store somewhere persistent
      // The access_token can be used to make Plaid API calls to
      // retrieve accounts and transactions
      access_token = exchangeTokenRes.access_token;
      console.log("access token is: " + access_token);

      plaidClient.getAuthUser(access_token, function(err, authRes) {
        if (err != null) {
          // Handle error!
          console.log("error during the getAuthUser.");
        } else {
          // An array of accounts for this user, containing account
          // names, balances, and account and routing numbers.
          var accounts = authRes.accounts;

          // Return account data
          //res.send("my response back");
          res.json({accounts: accounts});
            console.log("Responded with account into");
        }
      });
    }
  });


});
