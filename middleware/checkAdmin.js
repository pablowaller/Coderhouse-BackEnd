const admin= true;

function esAdmin(req,res,next){
    if(!admin) {
        res.json({"error": `Acceso denegado ruta ${req.originalUrl} no autorizada`});
        return;
    }
    return next();
}

module.exports= esAdmin;