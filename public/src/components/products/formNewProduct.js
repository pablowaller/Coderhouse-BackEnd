import axios from "axios";
import React from "react";
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import '../../App.css';

export default function Productnew(){
    
  const [nombre, setNombre] = React.useState("");
  const [descripcion, setDescripcion] = React.useState("");
  const [codigo, setCodigo] = React.useState("");
  const [foto, setFoto] = React.useState("");
  const [precio, setPrecio] = React.useState("");
  const [stock, setStock] = React.useState("");
  const history = useHistory();

  const handleSave = async () => {
    const body = {
            nombre:nombre,
            descripcion:descripcion,
            codigo:codigo,
            foto:foto,
            precio:precio,
            stock:stock
    };
    try {
      if (body.nombre.trim()===""|| body.descripcion.trim()===""||body.codigo.trim()===""||body.foto.trim()===""||
      body.precio.trim()===""||body.stock.trim()===""){
        swal({
          title:"Error: ",
          text: "Faltan llenar campos",
          icon:"warning",
          buttons:["continuar",0]})
      .then(()=>{
          return;
      })
      }
     const respuesta = await axios.post("/productos/agregar", body);
      if (respuesta.status === 200) {
        history.push("/products/saved/"+respuesta.data.id+"/"+respuesta.data.nombre); 
        
      }
  
    } catch (e) {
      
      swal({
        title:"Error: ",
        text: e.response.data.error,
        icon:"warning",
        buttons:["volver",0]})
    .then(()=>{
        return;
    })      
    }
  };

    return (
        <div>
          <div className="card distancia-box">
            <div className="card-body card-product-new">
            <h5 className="card-title">Agregar Producto</h5>
            <input type="text" name="nombre" placeholder="nombre" className="form-control" onChange={(e) => {
                setNombre(e.target.value);
              }}
            />
            <input type="text" name="descripcion" placeholder="descripcion" className="form-control" onChange={(e) => {
                setDescripcion(e.target.value);
              }}
            />
            <input type="text" name="codigo" placeholder="codigo" className="form-control" onChange={(e) => {
                setCodigo(e.target.value);
              }}
            />
            <input type="text" name="foto" placeholder="foto" className="form-control" onChange={(e) => {
                setFoto(e.target.value);
              }}
            />
            <input type="number" name="precio" placeholder="precio" className="form-control" onChange={(e) => {
                setPrecio(e.target.value);
              }}
            />
            <input type="number" name="stock" placeholder="stock" className="form-control" onChange={(e) => {
                setStock(e.target.value);
              }}
            />
            <button className="btn btn-primary" onClick={handleSave}>Enviar</button>
          </div>
        </div>
        </div>
      );

        
  
}