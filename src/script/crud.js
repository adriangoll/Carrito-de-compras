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
        mostrar.innerHTML += `
            <tr class="bg-gray-50 shadow-lg rounded-lg mx-auto my-4 text-center w-3/4">
                <td class="px-4 py-2">
                    <img class="w-20 h-20 mx-auto rounded-md" src="${element.linkImagen}" alt="imagen">
                </td>
                <td class="px-4 py-2 font-medium text-black">${element.codigo}</td>
                <td class="px-4 py-2 font-medium text-black">${element.nombre}</td>
                <td class="px-4 py-2 font-semibold text-black">$${element.precio}</td>
                <td class="flex justify-center space-x-4 py-4">
                    <button class="eliminar bg-red-500 hover:bg-red-800 text-white font-semibold py-1 px-3 rounded" type="button" data-index="${index}">Eliminar</button>
                    <button class="editar bg-blue-500 hover:bg-blue-800 text-white font-semibold py-1 px-3 rounded" type="button" data-index="${index}">Editar</button>
                </td>
            </tr>
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
        pantallaModificar.innerHTML = `
        <h1 class="text-2xl text-center font-bold text-blue-700 mb-6">Modificación de Producto</h1>
        <div class="flex flex-col items-center space-y-4">
            <label>Link Imagen</label>
            <input class="border rounded bg-blue-100 px-3 py-2 w-full max-w-md" value="${productoEditar.linkImagen}" id="linkModificado" type="text" required>
            <label>Nombre</label>
            <input class="border rounded bg-blue-100 px-3 py-2 w-full max-w-md" value="${productoEditar.nombre}" id="nombreModificado" type="text" required>
            <label>Codigo</label>
            <input class="border rounded bg-blue-100 px-3 py-2 w-full max-w-md" value="${productoEditar.codigo}" id="codigoModificado" type="text" required>
            <label>Precio</label>
            <input class="border rounded bg-blue-100 px-3 py-2 w-full max-w-md" value="${productoEditar.precio}" id="precioModificado" type="text" required>
            <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" type="button" id="modificar">Confirmar Modificación</button>
        </div>
    `;
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