import Producto from "./claseProducto.js";
import ProductoCarrito from "./claseItemCarrito.js";

const contenedor = document.getElementById("container");

console.log(Producto.items)
const mostrarTodo = ()=>{
    let productos = Producto.items
    let carrito = ProductoCarrito.itemsCarrito
    console.log(carrito)
    contenedor.innerHTML = ``
    productos.forEach((element, index) =>{
        contenedor.innerHTML += `<tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td  scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"><img class="w-20 h-20" src="${element.linkImagen}" alt="imagen"> </td>
                    <td class="px-6 py-4">${element.codigo} </td>
                    <td class="px-6 py-4">${element.nombre} </td>
                    <td class="px-6 py-4">$${element.precio} </td>
                    <td></tr><button class="agregar-carrito border" type="button" data-index="${index}" id="agregar">Agregar al carrito</button></td>
                `})
                const botonesAgregar = document.querySelectorAll(".agregar-carrito");
                console.log(botonesAgregar)
                botonesAgregar.forEach((b)=>{
                    b.addEventListener("click", (e)=>{
                        console.log("agregando")
                    let productoIndex = e.target.dataset.index;
                    let productoElegido = productos[productoIndex]
                        ProductoCarrito.agregar(productoElegido);
                    console.log(ProductoCarrito.itemsCarrito)
                })
    })
}

window.onload = ()=>{
    mostrarTodo()
}




