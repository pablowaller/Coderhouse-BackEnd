class Producto {
  constructor() {
    this.productos = [];
  }

  create = async (entitie) => {
    entitie.id = String(this.productos.length + 1);
    this.productos.push(entitie);
  };

  update = async (id, entitie) => {
    try {
      const index = this.productos.findIndex((p) => p.id === id);
      const last = this.productos[index];
      entitie.id = last.id;

      this.productos[index] = entitie;
    } catch (err) {
      console.error(err.message);
    }
  };

  delete = async (id) => {
    try {
      const index = this.productos.findIndex((p) => p.id === id);
      this.productos.splice(index, 1);
    } catch (err) {
      console.error(err.message);
    }
  };

  findAll = async (params) => {
    let objs = [...this.productos];
    if (params.nombre) {
      objs = objs.filter((p) => p.nombre === params.nombre);
    }

    if (params.codigo) {
      objs = objs.filter((p) => p.codigo === params.codigo);
    }

    if (
      params.startPrecio &&
      params.endPrecio &&
      !isNaN(params.startPrecio) &&
      !isNaN(params.endPrecio)
    ) {
      objs = objs.filter(
        (p) =>
          p.precio > Number(params.startPrecio) &&
          p.precio < Number(params.endPrecio)
      );
    }

    if (
      params.startStock &&
      params.endStock &&
      !isNaN(params.startStock) &&
      !isNaN(params.endStock)
    ) {
      objs = objs.filter(
        (p) =>
          p.stock > Number(params.startStock) &&
          p.stock < Number(params.endStock)
      );
    }
    return objs;
  };

  findById = async (id) => {
    return this.productos.filter((p) => p.id === id);
  };
}

module.exports = new Producto();
