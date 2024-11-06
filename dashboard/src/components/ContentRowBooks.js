import React from 'react';
import SmallCard from './SmallCard';
import { useState, useEffect } from 'react';

/*  Cada set de datos es un objeto literal */

/* <!-- Movies in DB --> */


function ContentRowBooks({products, users}){
          
    let totalProductos = {
        title: 'Cantidad de Libros',
        color: 'primary', 
        cuantity: products.count,
        icon: 'fa-clipboard-list'
    }
    
    /* <!-- Total awards --> */
    
    let totalCategory = {
        title:'Cantidad de Categorias de Libros', 
        color:'success', 
        cuantity: Object.keys(products.countByCategory).length,
        icon:'fa-award'
    }
    
    /* <!-- Actors quantity --> */
    
    let totalUsers = {
        title:'Cantidad de Usuarios' ,
        color:'warning',
        cuantity:users.count,
        icon:'fa-user-check'
    }
    
    let cartProps = [totalProductos, totalCategory, totalUsers];
    return (
    
        <div className="row">
            
            {cartProps.map( (movie, i) => {

                return <SmallCard {...movie} key={i}/>
            
            })}
        </div>
        
    )
}

export default ContentRowBooks;