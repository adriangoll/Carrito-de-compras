import Producto from "./claseProducto.js";

//Get products from localStorage using allItems, method from the Product class. 
const productosExistentes = Producto.allItems() || []
console.log(productosExistentes)
window.onload = ()=>{
    mostrarTodo()
}

// Define elements from html.
let linkImagen = document.getElementById("link-imagen")
let nombre = document.getElementById("nombre")
let codigo = document.getElementById("codigo")
let precio = document.getElementById("precio")
const mostrar = document.getElementById("productos");
const crear = document.getElementById("crear");



//Detect product with index

    
function creando(){
        let nuevoLink = linkImagen.value 
        let nuevoCodigo = parseInt(codigo.value)
        let nuevoNombre = nombre.value
        let nuevoPrecio = parseFloat(precio.value)
        Producto.crear(nuevoLink, nuevoCodigo, nuevoNombre, nuevoPrecio)
        linkImagen.value = " ";
        codigo.value = null;
        nombre.value = " ";
        precio.value = null;
        mostrarTodo()
}

// Create a function to display the products.  
const mostrarTodo = ()=>{
    mostrar.innerHTML = ``
    Producto.items.forEach((element, index) =>{
        mostrar.innerHTML += `<tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td  scope="row" class="px-6 py-4 font-medium whitespace-nowrap dark:text-white"><img class="w-20 h-20" src="${element.linkImagen}" alt="imagen"> </td>
                    <td class="px-6 py-4">${element.codigo} </td>
                    <td class="px-6 py-4">${element.nombre} </td>
                    <td class="px-6 py-4">$${element.precio} </td>
                    <td></tr><button class="eliminar" type="button" data-index ="${index}" id="borrar">Eliminar</button><button class="editar" type="button" data-index="${index}" id="editar">Editar</button></td>
                `
    })
    const botonesEliminar = document.querySelectorAll(".eliminar")
    const botonesEditar = document.querySelectorAll(".editar")


    botonesEliminar.forEach((b)=>{
        b.addEventListener("click", (e)=>{
            let index = e.target.dataset.index;
            Producto.eliminar(index)
                mostrarTodo()
        })
    })

    botonesEditar.forEach((b)=>{
        b.addEventListener("click", (e)=>{
            let indice = e.target.dataset.index;
            botonEditar(indice)
        })
    })

    function botonEditar(indice){
        const pantallaPrincipal = document.getElementById("pantallaPrincipal");
        const pantallaModificar = document.getElementById("modificacion")
        pantallaModificar.style.visibility = "visible"
        let productoEditar = Producto.items[indice];
        console.log(indice)
        pantallaPrincipal.style.visibility = "hidden"
        pantallaModificar.innerHTML = `<h1>Modificacion de producto</h1><input value=${productoEditar.linkImagen} id="linkModificado" type="text" required><input value="${productoEditar.nombre}" id="nombreModificado" type="text" required><input value="${productoEditar.codigo}" id="codigoModificado" type="text" required>
        <input value=${productoEditar.precio} id="precioModificado" type="number" required>
        <button type= "button" id="modificar">Confirmar modificacion</button>`
        pantallaModificar.style.visibility = "visible"
        const linkModificado = document.getElementById("linkModificado")
        const nombreModificado = document.getElementById("nombreModificado");
        const precioModificado = document.getElementById("precioModificado");
        const codigoModificado = document.getElementById("codigoModificado")
        const confirmaModificar = document.getElementById("modificar");

    
        //Create new product using the class with the values from html.
        confirmaModificar.addEventListener("click", ()=>{
            let productoModificado = new Producto(linkModificado.value, parseInt(codigoModificado.value), nombreModificado.value, parseFloat(precioModificado.value))
            //Replace the old product with new one
            Producto.editar(indice, productoModificado)
            mostrarTodo()
            pantallaPrincipal.style.visibility = "visible";
            pantallaModificar.style.visibility = "hidden";
        })

        Producto.renderDatabase()
    }

}




crear.addEventListener("click", creando)