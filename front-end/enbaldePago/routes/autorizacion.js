const { v1: uuidv1, v4: uuidv4 } = require('uuid');
var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  const descripcion = req.body.descripcion.split('\n');
  const pago = req.body.pago;
  const ticket = global.ticket = uuidv4();

  res.render('autorizacion', { titulo: 'EnbaldePago', descripcion, pago, ticket }, (err, html) => {
    res.json({ html, ticket });
  });
})

module.exports = router;
