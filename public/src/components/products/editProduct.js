import React from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import swal from 'sweetalert';
import { Link } from "react-router-dom";

export default function Editarproduct(props) {

    const params = useParams();

    const [form, setForm] = React.useState({
            timestamp:'',
            nombre:'',
            descripcion:'',
            codigo:'',
            foto:'',
            precio:'',
            stock:'',
            id:''
    });

    const [error, setError] = React.useState("")
    var flag=0;
    const buscarProductoPorId = async (id) => {
        try {
            const respuesta = await axios.get("/productos/listar/" + id)
            setForm(respuesta.data);       
        } catch (e) {
            setError(e.response.data.error);
        }
    }

    React.useEffect(() => {
        if (!params.id) return;
        buscarProductoPorId(params.id)
    }, [params] );


    const handleChangeNombre = (e) => {
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.nombre = e.target.value;
        setForm(nuevoState);
    }

    const handleChangeCodigo = (e) => {
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.codigo = e.target.value;
        setForm(nuevoState);
    }

    const handleChangeDescripcion = (e) => {
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.descripcion = e.target.value;
        setForm(nuevoState);
    }

    const handleChangeFoto = (e) => {
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.foto = e.target.value;
        setForm(nuevoState);
    }

    const handleChangePrecio = (e) => {
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.precio = e.target.value;
        setForm(nuevoState);
    }

    const handleChangeStock = (e) => {
        const nuevoState = JSON.parse(JSON.stringify(form));
        nuevoState.stock = e.target.value;
        setForm(nuevoState);
    }
    const handleSave = async () => {
        const body = {
            nombre:form.nombre,
            descripcion:form.descripcion,
            codigo:form.codigo,
            foto:form.foto,
            precio:form.precio,
            stock:form.stock,
            id:form.id
        };
        try {

        if (body.nombre.trim()===""|| body.descripcion.trim()===""||!body.codigo||body.foto.trim()===""||
        !body.precio||!body.stock){
            flag=1;
            swal({
            title: "Error: ",
            text: "Faltan llenar campos",
            icon: "Warning",
            buttons: ["continuar", 0]})
        .then(()=>{
            return;
        })
        
        }
        if (flag===0){
            const respuesta = await axios.put("/productos/actualizar/"+body.id, body);
            props.history.push("/products/saved/"+respuesta.data.id+"/"+respuesta.data.nombre);
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
            
    }
    if (flag!==0){
        flag=0;
    }
    if (error.length===0){
        return (
         <div className="flex-container posicion">
             <div className="col-md"></div>
             <div className="col-md-3">
                <div className="card distancia-box">
                    <div className="card-body card-product-new">
                        <h5 className="card-title">Editar Producto</h5>
                        <input type="text" name="nombre" placeholder="nombre" className="form-control" value={form.nombre} onChange={handleChangeNombre}/>
                        <input type="text" name="descripcion" placeholder="descripcion" className="form-control" value={form.descripcion} onChange={handleChangeDescripcion}/>
                        <input type="text" name="codigo" placeholder="codigo" value={form.codigo} className="form-control" onChange={handleChangeCodigo}/>
                        <input type="text" name="foto" placeholder="foto" className="form-control" value={form.foto} onChange={handleChangeFoto}/>
                        <input type="number" name="precio" placeholder="precio" className="form-control" value={form.precio} onChange={handleChangePrecio}/>
                        <input type="number" name="stock" placeholder="stock" className="form-control" value={form.stock} onChange={handleChangeStock}/>
                        <button className="btn btn-primary" onClick={handleSave}>Enviar</button>
                    </div>
                </div>
            </div>
            <div className="col-md"></div>
              <div className="col-md-4">
                <div className="col-md-6">
                </div>
              </div>
         </div>   
            
        )
    }else{
        <div className="flex-container">
          <div>  
              <div className="col-sm">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Error {error}</h5>        
                  </div>
                  <Link to={"/products"} type="button" className="btn btn-primary">Volver</Link>
                </div>
              </div>
            </div>
        </div>
    }
    
}