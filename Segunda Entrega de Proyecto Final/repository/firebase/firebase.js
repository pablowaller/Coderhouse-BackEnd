const admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://coder-ac5bc.firebaseio.com',
});

const db = admin.firestore()
const query = db.collection('productos')

class Firebase {
    constructor() {}

    create = async (id, entitie) => {
        try {
            let doc = query.doc(`${id}`)
            return await doc.create(entitie);
        } catch (err) {
            console.err.message(err.message);
        }
    };

    update = (id, entitie) => {
        try {
            const doc = query.doc(id)
            return await doc.update(entitie)
        } catch (err) {
            console.log(err.message);
        }
    };

    deleteById = async (id) => {
        try {
            const doc = query.doc(id)
            return await doc.delete()
        } catch (err) {
            console.log(err.message);
        }
    }


    findAll = async () => {
        try {
            let response = await query.get()
            response = response.docs.map((producto) => {
                return {
                    nombre: producto.data().nombre,
                    precio: producto.data().precio,
                    foto: producto.data().foto
                }
            })
            console.log(response);
        } catch (err) {
            console.log(err.message);
        }
    }

    findById = async (id) => {
        try {
            const doc = query.doc(id)
            const producto = await doc.get()
            let response = producto.data()
            response.id = producto.id
            console.log(response);
        } catch (err) {
            console.log(err.message);
        }
    }

}

module.exports = new Firebase();