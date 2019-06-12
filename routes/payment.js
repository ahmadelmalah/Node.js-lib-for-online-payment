var express = require('express');
var router = express.Router();

/* Payment API. */
router.post('/', function(req, res, next) {
  var braintree = require('braintree');

  var gateway = braintree.connect({
    environment:  braintree.Environment.Sandbox,
    merchantId:   process.env.BRAINTREE_MERCHANT_ID,
    publicKey:    process.env.BRAINTREE_PUBLIC_KEY,
    privateKey:   process.env.BRAINTREE_PRIVATE_KEY
  });

  gateway.transaction.sale({
    amount: '5.00',
    paymentMethodNonce: 'nonce-from-the-client',
    options: {
      submitForSettlement: true
    }
  }, function (err, result) {
    if (err) {
      console.error(err);
      return;
    }

    if (result.success) {
      res.send('Transaction ID: ' + result.transaction.id);
    } else {
      console.error(result.message);
      res.send('Payment is not done!');
    }
  });

});

module.exports = router;
