const fs = require("fs") 

class Archivo {

    constructor(archivo) {
        this.archivo = archivo;
        this.data = [];
        this.id = 0;
    }

    async save(producto) {
        await this.getAll()  
        this.id++
        this.data.push({     
            id: this.id,
			product: producto,
        })
        try {
            await fs.promises.writeFile(this.archivo, JSON.stringify(this.data));

        } catch (error) {
            console.log('The file could not be saved', error)
        }

    }

    async read() {
        try {
            const data = await fs.promises.readFile(this.archivo)
            console.log(JSON.parse(data));
        } catch (error) {
            console.log("The file cannot be read", error)
            return []
        }
    }

    async getById(id) {

        const data = await fs.promises.readFile(this.archivo);
        const dataParseada = JSON.parse(data);
        let productoI = []

        dataParseada.map((producto) => {
            if (producto.id === id) productoI = producto;
        });

        console.log(productoI)

    }

    async getAll() {

        try {
            const data = await fs.promises.readFile(this.archivo);
            return JSON.parse(data)
        } catch (error) {
            return []
        }
      }


    async deleteById(id) {

        const data = await fs.promises.readFile(this.archivo);
        const dataParseada = JSON.parse(data);

        let productoI = 0;

        dataParseada.map((producto)=>{
          if(producto.id === id) productoI = dataParseada.indexOf(producto);
        });

        dataParseada.splice(productoI, 1);

        try {
          await fs.promises.writeFile(this.archivo, JSON.stringify(dataParseada));
          console.log("The product has been deleted successfully");
        } catch (error) {
          console.log("The product could not be deleted", error);
        }
      
      }


    async deleteAll() {
        try {
            await fs.promises.unlink(this.archivo)
            console.log("The file has been deleted successfully");
        } catch (error) {
            console.log("The file could not be deleted", error);
        }
    }

}
const p1 = {
    title: "Escuadra",
    price: 123.45,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
  }
  
  const p2 = {
    title: "Calculadora",
    price: 234.56,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
  }
  
  const p3 = {
    title: "Globo Terráqueo",
    price: 345.67,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
  }


const prueba = async () => {


    const rutaArchivo = new Archivo('./productos.txt')

    console.log('Muestro todo')

    let productos = await rutaArchivo.getAll();
    console.log(productos);

    console.log('Guardo productos')

    await rutaArchivo.save(p1);
    await rutaArchivo.save(p2);
    await rutaArchivo.save(p3);

    console.log('Muestro todo de vuelta')

    let productos2 = await rutaArchivo.getAll();
    console.log(productos2);

    console.log('Tomo un producto por su ID')

    await rutaArchivo.getById(2)

    // Se elimina el producto
    //await rutaArchivo.deleteById(2)

    // Se elimina el archivo
    //await rutaArchivo.deleteAll()

}

prueba()
