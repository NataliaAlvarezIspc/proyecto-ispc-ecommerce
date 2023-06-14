var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  const pago = parseFloat(req.body.pago);

  if (req.body.si == "si") {
    var transaccion = 0;
    transaccion = Math.floor(Math.random() * 1000000000);

    return res.status(200).json({ status: true, mensaje: "El usuario ha pagado.", transaccion, pago })
  }

  return res.status(400).json({ status: false, mensaje: "El usuario ha rechazado el cargo.", pago });
})

module.exports = router;
