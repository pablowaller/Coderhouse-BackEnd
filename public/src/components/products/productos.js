import axios from "axios";
import React from "react";
import Product from './cardProduct';
import Productnew from './formNewProduct';
import { Link } from "react-router-dom";

export default function Productos() {
  const [error, setError] = React.useState("no");
  const [productos, setProductos] = React.useState([]);

  function ListadeProductos(){
    const listadoProducto = async () => {
      try {

        const respuesta = await axios.get("/productos/listar");
        setProductos(respuesta.data);
        setError("no")
      } catch (e) {
        if(e.response.data.error==='no hay productos cargados'){
          setProductos([]);
        }
        setError(e.response.data.error);
      }
    };
    listadoProducto();
  }

  React.useEffect(() => {
     ListadeProductos();
  }, []);

  function borrador(id) {
    const borradoProducts = async () => {
      try {
        await axios.delete("/productos/borrar/" + id);
        ListadeProductos();
      } catch (e) {
        setError(e.response.data.error);
      }
    };
    borradoProducts();
  }
 

if (error === "no") {

return (
        <div className="flex-container posicion">
            <div className="col-md"></div>
            <div className="col-md-3">
              {productos.map((unProducto, index) => {
                      return (
                        <div key={index}>
                        <div className="col-md-10">
                          <div className="card distancia-card-producto">
                            <div className="card-body card-product-new">
                              <Product unProducto={unProducto} index={index}/>   
                            </div>
                            <div className="card-footer">
                              <div className="btn-group" role="group" aria-label="Basic Example">
                              <button type="button" className="btn btn-primary" onClick={() => borrador(unProducto.id) }>Borrar</button>            
                              <Link to={"/products/editar/"+ unProducto.id.toString()} type="button" className="btn btn-primary">Editar </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>         
                      );
              })}
              </div>
              <div className="col-md"></div>
              <div className="col-md-4">
                <div className="col-md-6">
                    <div className="formulario-agregar-genero">
                        <Productnew/>
                    </div>
                </div>
              </div>
              
            </div>
        
        
      )       
    } else {
    
      return (
        <div className="flex-container">
          <div>  
              <div className="col-sm">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Error {error}</h5>        
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
                <div className="col-md-6">
                    <div className="formulario-agregar-genero">
                        <Productnew/>
                    </div>
                </div>
              </div>
        </div>
      )
    }   
}