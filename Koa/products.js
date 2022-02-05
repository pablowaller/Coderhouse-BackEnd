const Router = require('koa-router');

const router = new Router({
    prefix: '/products'
});

let products = [
    {
        "id": "1",
        "nombre": "Escuadra",
        "descripcion": "Escuadra para dibujar",
        "foto": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
        "precio": "200",
        "stock": "2"
    },
    {
        "id": 2,
        "nombre": "Regla larga",
        "descripcion": "Regla para medir",
        "foto": "https://th.bing.com/th/id/OIP.lw--bUimP009U15xYwReMwHaHa?pid=ImgDet&rs=1",
        "precio": "170",
        "stock": "10"
    },
    {
        "id": 3,
        "nombre": "Tiza",
        "descripcion": "Tiza para escribir en pizzarrón",
        "foto": "https://th.bing.com/th/id/OIP.lw--bUimP009U15xYwReMwHaHa?pid=ImgDet&rs=1",
        "precio": "170",
        "stock": "10"
    }
];

/* Get all */
router.get('/', (ctx, next) => {
    ctx.body = {
        status: 'success',
        message: products
    };
    next();
});

/* Get by id */
router.get('/:id', (ctx, next) => {
    let getCurrentProduct = products.filter(function (product) {
        if (product.id == ctx.params.id) {
            return true;
        }
    });
    if (getCurrentProduct.length) {
        ctx.body = getCurrentBook[0];
    } else {
        ctx.response.status = 404;
        ctx.body = {
            status: 'error!',
            message: 'Book Not Found with that id!'
        };
    }
    next();
});

/* Post */
router.post('/new', (ctx, next) => {
    if (
        !ctx.request.body.id || !ctx.request.body.id || !ctx.request.body.nombre || !ctx.request.body.descripcion || !ctx.request.body.foto || !ctx.request.body.precio || !ctx.request.body.stock
    ) {
        ctx.response.status = 400;
        ctx.body = {
            status: 'error',
            message: 'Pleasse enter the data'
        }
    } else {
        let newProduct = products.push({
            id: ctx.request.body.id,
            nombre: ctx.request.body.nombre,
            descripcion: ctx.request.body.descripcion,
            foto: ctx.request.body.foto,
            precio: ctx.request.body.precio,
            stock: ctx.request.body.stock,
        });
        ctx.response.status = 201;
        ctx.body = {
            status: 'success',
            message: 'New book added'
        };
    }
    next();
});

/* Put */
router.put('/update/:id', (ctx, next) => {
    // Check if any of the data field not empty
    if (
        !ctx.request.body.id || !ctx.request.body.id || !ctx.request.body.nombre || !ctx.request.body.descripcion || !ctx.request.body.foto || !ctx.request.body.precio || !ctx.request.body.stock
    ) {
        ctx.response.status = 400;
        ctx.body = {
            status: 'error',
            message: 'Please enter the data'
        }
    } else {
        let id = ctx.params.id
        let index = products.findIndex(product => product.id == id)
        products.splice(index, 1, ctx.request.body)
        ctx.response.status = 201;
        ctx.body = {
            status: 'success',
            message: `New book updated`
        };
    }
    next();
});

/* Delete */
router.delete('/delete/:id', (ctx, next) => {
    let id = ctx.params.id
	let index = products.findIndex(product => product.id == id)
    products.splice(index,1)
    ctx.response.status = 200;
    ctx.body = {
        status: 'success',
        message: `Product deleted`
    };
	next();
});


module.exports = router;