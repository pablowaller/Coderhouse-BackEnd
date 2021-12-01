var express = require('express');
var router = express.Router();

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/login');
  }
}

router.get('/', checkAuthentication, function(req, res, next) {
  res.render('index', { title: 'Logeado con éxito', user: req.user });
});

router.get('/info', (req, res, next) => {
  res.json({
    argumentosDeEntrada: process.argv,
    plataforma: process.platform,
    versionDeNode: process.version,
    memoriaEnUso: process.memoryUsage(),
    pathDeEjecucion: process.execPath,
    idProceso: process.pid,
    carpetaCorriente: process.cwd()
  })
});

module.exports = router;