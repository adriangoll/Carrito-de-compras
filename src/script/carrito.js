import ProductoCarrito from "./claseItemCarrito.js";



const mostrarCarrito = ()=>{
    const verCarrito = document.getElementById('carrito');
    const totalCarrito = document.getElementById("total")
    const carrito = ProductoCarrito.itemsCarrito;
    let total = 0
    verCarrito.innerHTML = ``
    
    carrito.forEach((item)=>{
        let subtotal = item.producto.precio * item.cantidad;
            total += subtotal;

            verCarrito.innerHTML += `
            <tr class=" even:dark:bg-gray-800 border-b dark:border-gray-700">
                <td class="px-6 py-4"><img class="w-24 h-24 m-2 p-1 border rounded-lg" alt="No se puede ver la imagen" src="${item.producto.linkImagen}"></td>
                <td class="px-6 py-4">${item.producto.nombre}</td>
                <td class="px-6 py-4 flex items-center justify-between space-x-2">
                    <button type="button" class="restar text-black py-1 px-2 rounded hover:bg-blue-600" data-codigo="${item.producto.codigo}">-</button>
                    <span>${item.cantidad}</span>
                    <button type="button" class="sumar text-black py-1 px-2 rounded hover:bg-blue-600" data-codigo="${item.producto.codigo}">+</button>
                </td>
                <td class="px-6 py-4">${subtotal}</td>
                <td class="px-6 py-4">
                    <button class="eliminarProducto bg-blue-500 text-white py-1 px-4 rounded hover:bg-red-600">Eliminar</button>
                </td>
            </tr>
        `
    
    })
    totalCarrito.innerHTML = total

    const restar = document.querySelectorAll(".restar")
    const sumar = document.querySelectorAll(".sumar")
    const eliminarProducto = document.querySelectorAll(".eliminarProducto")

    eliminarProducto.forEach((r)=>{
        r.addEventListener("click",(e)=>{
            let codigo = e.target.dataset.codigo
            let producto = ProductoCarrito.itemsCarrito.find(item => item.producto.codigo === parseInt(codigo));
            ProductoCarrito.removeProduct(producto);
            mostrarCarrito()
            })
    })
    restar.forEach((r)=>{
        r.addEventListener("click",(e)=>{
            console.log("a")
            let codigo = e.target.dataset.codigo
            console.log(`Restando cantidad para el producto con código: ${codigo}`);
            ProductoCarrito.actualizarCantidad(codigo, -1);
            mostrarCarrito()
            })
    })

    sumar.forEach((s)=>{
        s.addEventListener("click", (e)=>{
            console.log("b")
            let codigo = e.target.dataset.codigo
            console.log(`Sumando cantidad para el producto con código: ${codigo}`);
            ProductoCarrito.actualizarCantidad(codigo, 1);
            mostrarCarrito()
        })
    })
    
}
window.onload = ()=>{
    mostrarCarrito();
}