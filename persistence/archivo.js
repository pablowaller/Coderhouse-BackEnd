class Archivo {

    fs = require('fs');

    constructor(nameOfTheFile){
        this.nameOfTheFile = nameOfTheFile;
    }

    async read() {

        try {
            const content= await this.fs.promises.readFile(this.nameOfTheFile,'utf-8');
            return JSON.parse(content);
        } catch{ 
            return [];
        }
    }

    async search(id){

        const content=await this.read();

        if (content == []){
            return [];
        }

        let i=0;

        let found = 0;

        while (i<content.length && found ==0){
            if (content[i].id == id){
                found = 1;
            } else{
                i++;
            }
        }
        if (found == 1){
            return content[i];
        } else{
            return [];
        }
    }

    async modify(producto){

        const content=await this.read();

        if (content==[]){
            return [];
        }
    
        let i=0;

        let found = 0;

        while (i<content.length && found  == 0){
            if (content[i].id == producto.id){
                found =1;
                content[i] = producto;
                try {    
                    await this.fs.promises.writeFile(this.nameOfTheFile,JSON.stringify(content)); 
                    return producto;
                } catch (e) {
                    return [];
                }
            }else{
                i++;
            }
        }

        if (found == 0){
            return [];
        }

    }

    async deleteProduct(producto){
    
        const content = await this.read();
       
        if (content.length == 0){
            return "There are no products on the database";
        }

        let i= 0;
        let found = 0;

        while (i < content.length && found == 0){
        
            if (content[i].id==producto){
                found = 1;
                let deleteElement = content[i];
                content.splice(i,1);
        
                try {    
                    await this.fs.promises.writeFile(this.nameOfTheFile,JSON.stringify(content)); 
                    return deleteElement;
                } catch (e) {
                    return [];
                }
            } else{
                i++;
            }
        }
        if (found == 0){
            return "Element not found";
        }
    }

    async save(producto) {
        
        const content = await this.read();

        if (content.length == 0){
            producto.id = content.length + 1;
        } else{
            producto.id = parseInt(content[content.length-1].id)+1;
        }
         
        content.push(producto);

        try {    
            await this.fs.promises.writeFile(this.nameOfTheFile, JSON.stringify(content));
            return producto;
        } catch (e) {
            return [];
        }
    }     

    async delete() {
        try {
            await this.fs.promises.unlink(this.nameOfTheFile);
        } catch (error) {
            console.error("Error trying to delete the file");
        }
    }
}

module.exports = new Archivo('productos.txt');