class Carrito {
  constructor() {
    this.carritos = [];
  }

  create = async (entitie) => {
    entitie.id = String(this.carritos.length + 1);
    this.carritos.push(entitie);
  };

  update = async (id, entitie) => {
    try {
      const index = this.carritos.findIndex((p) => p.id === id);

      const last = this.carritos[index];
      entitie.id = last.id;

      this.carritos[index] = entitie;
    } catch (err) {
      console.error(err.message);
    }
  };

  delete = async (id) => {
    try {
      const index = this.carritos.findIndex((p) => p.id === id);
      this.carritos.splice(index, 1);
    } catch (err) {
      console.error(err.message);
    }
  };

  findAll = async () => {
    return this.carritos;
  };

  findById = async (id) => {
    return this.carritos.filter((p) => p.id === id);
  };
}

module.exports = new Carrito();
