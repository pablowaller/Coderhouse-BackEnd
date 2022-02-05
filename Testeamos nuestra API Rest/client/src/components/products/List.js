import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './List.css'

function ProductsList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios(
            process.env.REACT_APP_SERVER_API + '/products',
        ).then(response => {
            setProducts(response.data);
        }).catch(console.error)
    }, []);

    return (<>
        <h2 id="title">Productos:</h2>

        <ul>
            {products.map(item => (
                <li id="product" key={item._id}>
                    <b>{item.title}</b>:&nbsp;"{item.text}" escrito por {item.author}
                </li>
            ))}
        </ul>
    </>
    )
}

export default ProductsList