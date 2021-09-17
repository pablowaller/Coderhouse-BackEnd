import axios from "axios";
import React from "react";
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import '../../App.css';

export default function Productnew(){
    
  const [id, setId] = React.useState("");

  const history = useHistory();

  const handleSave = async () => {

    const body = {
            id:id
    };
    try {
      if (body.id.trim()===""){
        console.log("Ingresa"+body.id)
        swal({
          title:"Error: ",
          text: "faltan llenar campos",
          icon:"warning",
          buttons:["continuar",0]})
      .then(()=>{
          return;
      })
      }
     const respuesta = await axios.post("/carrito/agregar/"+ body.id);
     console.log(respuesta.status);
     if (respuesta.status === 200) {
        history.push("/carrito/saved/"+respuesta.data.id+"/"+respuesta.data.producto.nombre); 
        
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
            <input type="number" name="id" placeholder="id" className="form-control" onChange={(e) => {
                setId(e.target.value);
              }}
            />
            <button className="btn btn-primary" onClick={handleSave}>Enviar</button>
          </div>
        </div>
        </div>
      );

        
  
}