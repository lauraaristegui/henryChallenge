import React, { useState } from 'react'
import ProductCard from './ProductCard'
import Searchbar from './Searchbar'
import axios from 'axios'
import Pagination from './Pagination'
import _ from 'lodash'


const CatalogoContainer = () => {

    const [productos, setProductos] = useState([])// trae todos los prodcutos 
    const [sort, setSort] = useState() // oredena por precio
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState("")



    const handleSubmit = (searchProduct) => {
        axios(`http://localhost:3001/api/search?query=${searchProduct}`)
            .then(res => {
                console.log('busqueda', res.data)
                setProductos(res.data)
                setSearch(searchProduct)
            })
    }

    const productsCondition = (condicion) => {
        axios('http://localhost:3001/api/search?query=' + search + " " + (condicion === 'new' ? "nuevo" : "usado"))
            .then(res => {
                let aux = res.data
                aux = aux.filter(p => p.condition === condicion)
                setProductos(aux)
            })
    }

    const filtrado = (e) => {
        productsCondition(e.target.value)
        console.log(e.target.value)

    }

    // ordenar por precio
    const sortProductos = (sort) => {
        let aux = productos
        if (sort === 'menorPrecio') {
            aux.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
        }
        if (sort === 'mayorPrecio') {
            aux.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
        }
        console.log(aux)
        return setProductos(aux)
    }

    const sortProducts = event => {
        setSort(event.target.value)
        sortProductos(event.target.value)
        console.log(event.target.value)

    }

    //paginacion
    const paginate = (items, pageNumber, pageSize) => {
        const startIndex = (pageNumber - 1) * pageSize
        return _(items).slice(startIndex).take(pageSize).value()
    }

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }
    const productsPag = paginate(productos, currentPage, 30)



    return (
        <>

            <Searchbar handleSubmit={handleSubmit} />

            <div className="align-items-center">
                <p className="m-0 px-2">Precio:</p>
                <select
                    className="form-control form-control-sm"
                    onChange={sortProducts}
                >
                    <option value="menorPrecio">Menor precio</option>
                    <option value="mayorPrecio">Mayor precio</option>
                </select>


                <div className="align-items-center">
                    <p className="m-0 px-2">Condición:</p>
                    <select
                        className="form-control form-control-sm mb-2"
                        onChange={filtrado}
                    >
                        <option value="new">Nuevo</option>
                        <option value="used">Usado</option>
                    </select>
                </div>
            </div>

            <div>
                {
                    productsPag.map(producto => (
                        <ProductCard
                            title={producto.title}
                            price={producto.price}
                            stock={producto.available_quantity}
                            condition={producto.condition}
                            imagen={producto.thumbnail}
                            key={producto.id}
                        />
                    ))
                }
            </div>

            <Pagination
                itemsCount={productos.length}
                pageSize={30}
                onPageChange={handlePageChange}
                currentPage={currentPage}
            />
        </>
    )
}


export default CatalogoContainer