var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
  const descripcion = req.body.descripcion.split('\n');
  const pago = req.body.pago;
  res.render('autorizacion', { titulo: 'EnbaldePago', descripcion, pago });
})

module.exports = router;
