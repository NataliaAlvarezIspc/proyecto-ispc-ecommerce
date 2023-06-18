var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  const pago = parseFloat(req.body.pago);
  const ticket = req.body.ticket;

  if (req.body.respuesta == "si") {
    if (ticket == global.ticket) {
      var transaccion = 0;
      transaccion = Math.floor(Math.random() * 1000000000);

      return res.status(200).json({ status: true, mensaje: "El usuario ha pagado.", transaccion, pago })
    }

    return res.status(200).json({ status: false, mensaje: "El ticket es inválido.", transaccion: null, pago: 0 });
  }

  return res.status(200).json({ status: false, mensaje: "El usuario ha rechazado el cargo.", transaccion: null, pago: 0 });
})

module.exports = router;
