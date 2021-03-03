import React from 'react'


const ProductCard = ({
    imagen,
    title,
    price,
    stock,
    condition,


}) => {

    return (
        <>
            <div className="card-columns" >
                <img className="card" src={imagen} alt="imagen" />
                <div className="card-body">
                    <h5 className="card-title">Title:{title}</h5>
                    <p className='card-text'>Precio: ARS$ {price}</p>
                    <p className="card-text">Stock: {stock}</p>
                    <p className="card-text">Condition: {condition}</p>
                </div>
            </div>
        </>


    )
}



export default ProductCard
