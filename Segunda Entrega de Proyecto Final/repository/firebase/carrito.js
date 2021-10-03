const admin = require("firebase-admin");


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://coder-ac5bc.firebaseio.com',
});


const db = admin.firestore()
const query = db.collection('productos')

console.log('Connected!')

create = async (id, entitie) => {
    try {
        let doc = query.doc(`${id}`)
        return await doc.create(entitie);
    } catch (error) {
        console.error(error);
    }
};


// createUser()

async function readAll() {
    try {
        let response = await query.get()
        response = response.docs.map((user) => {
            return {
                id: user.id,
                nombre: user.data().nombre,
                dni: user.data().dni,
            }
        })
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}

// readAll()

async function readOne() {
    try {
        const doc = query.doc('2')
        const item = await doc.get()
        let response = item.data()
        response.id = item.id
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}
// readOne()

async function update() {
    try {
        const doc = query.doc('1')
        const item = await doc.update({ dni: 666666 })
        console.log(item)
    } catch (error) {
        console.log(error)
    }
}

// update()

async function deleteUser() {
    try {
        const doc = query.doc('1')
        const item = await doc.delete()
        console.log(item)
    } catch (error) {
        console.log(error)
    }
}

deleteUser()