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

            verCarrito.innerHTML += `<tr>
            <td><img class="w-24 h-24 m-2 p-1 border" alt="No se puede ver la imagen" src="${item.producto.linkImagen}"></td>
            <td>${item.producto.nombre}</td>
            <td class="cantidad"><button type="button" class="restar" data-codigo="${item.producto.codigo}">-</button>${item.cantidad}<button type="button" class="sumar" data-codigo="${item.producto.codigo}">+</button></td>
            <td>${subtotal}</td><td><button class="eliminarProducto border">Eliminar</button></td>
        </tr>`
    
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